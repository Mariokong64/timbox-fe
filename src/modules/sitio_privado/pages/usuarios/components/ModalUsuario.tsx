import { useEffect, useRef, useState, type ChangeEvent } from "react";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { REQUISITOS_CONTRASENA } from "../../../../../shared/validaciones/contrasena";
import {
  crearFormularioDesdeUsuario,
  cambiarPermiso,
  hayErroresUsuario,
  listarPermisosUsuario,
  obtenerMensajeErrorUsuarios,
  validarCampoUsuario,
  validarFormularioUsuario,
  verificarDisponibilidadUsuario,
  type ErroresUsuarioFormulario,
  type AccionPermiso,
  type PermisoPantalla,
  type UsuarioFormulario,
  type UsuarioListado,
} from "../servicio/usuariosServicio";

interface ModalUsuarioProps {
  usuario: UsuarioListado | null;
  guardando: boolean;
  onCerrar: () => void;
  onGuardar: (formulario: UsuarioFormulario, permisos: PermisoPantalla[]) => Promise<void>;
}

const estiloCampo = {
  "& .MuiInputBase-root": {
    fontFamily: "var(--fuente-regular)",
  },
  "& .MuiInputLabel-root": {
    fontFamily: "var(--fuente-regular)",
  },
  "& .MuiFormHelperText-root": {
    mx: 0,
    fontFamily: "var(--fuente-regular)",
  },
};

export function ModalUsuario({ usuario, guardando, onCerrar, onGuardar }: ModalUsuarioProps) {
  const editando = Boolean(usuario);
  const [formulario, setFormulario] = useState<UsuarioFormulario>(() =>
    crearFormularioDesdeUsuario(usuario)
  );
  const [errores, setErrores] = useState<ErroresUsuarioFormulario>({});
  const [validandoUsuario, setValidandoUsuario] = useState(false);
  const [usuarioDisponible, setUsuarioDisponible] = useState<boolean | null>(null);
  const [contrasenaVisible, setContrasenaVisible] = useState(false);
  const [permisos, setPermisos] = useState<PermisoPantalla[]>([]);
  const [cargandoPermisos, setCargandoPermisos] = useState(Boolean(usuario));
  const [errorPermisos, setErrorPermisos] = useState("");
  const [intentoCarga, setIntentoCarga] = useState(0);
  const timeoutUsuarioRef = useRef<number | null>(null);

  useEffect(() => {
    if (!usuario) {
      return;
    }
    let activo = true;
    listarPermisosUsuario(usuario.id)
      .then((datos) => {
        if (activo) {
          setPermisos(datos);
          setErrorPermisos("");
        }
      })
      .catch((error: unknown) => {
        if (activo) {
          setErrorPermisos(obtenerMensajeErrorUsuarios(error));
        }
      })
      .finally(() => {
        if (activo) {
          setCargandoPermisos(false);
        }
      });
    return () => {
      activo = false;
    };
  }, [usuario, intentoCarga]);

  useEffect(() => {
    return () => {
      if (timeoutUsuarioRef.current) {
        window.clearTimeout(timeoutUsuarioRef.current);
      }
    };
  }, []);

  const programarValidacionUsuario = (valor: string, errorCampo: string) => {
    if (timeoutUsuarioRef.current) {
      window.clearTimeout(timeoutUsuarioRef.current);
    }

    const usuarioNormalizado = valor.trim().toUpperCase();
    const usuarioSinCambios = editando && usuarioNormalizado === usuario?.usuario.toUpperCase();

    setUsuarioDisponible(null);

    if (!usuarioNormalizado || errorCampo || usuarioSinCambios) {
      setValidandoUsuario(false);
      return;
    }

    setValidandoUsuario(true);
    timeoutUsuarioRef.current = window.setTimeout(() => {
      void verificarDisponibilidadUsuario(usuarioNormalizado, usuario?.id)
        .then((disponible) => {
          setUsuarioDisponible(disponible);
          setErrores((actual) => ({
            ...actual,
            usuario: disponible ? "" : "Ese usuario ya existe.",
          }));
        })
        .catch(() => {
          setUsuarioDisponible(null);
        })
        .finally(() => {
          setValidandoUsuario(false);
        });
    }, 450);
  };

  const cambiarUsuario = (event: ChangeEvent<HTMLInputElement>) => {
    const valor = event.target.value.toUpperCase();
    const errorCampo = validarCampoUsuario("usuario", valor, editando);

    setFormulario((actual) => ({
      ...actual,
      usuario: valor,
    }));
    setErrores((actual) => ({
      ...actual,
      usuario: errorCampo,
    }));
    programarValidacionUsuario(valor, errorCampo);
  };

  const cambiarCampo =
    (campo: Exclude<keyof UsuarioFormulario, "usuario">) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const valor = event.target.value;
      const errorCampo = validarCampoUsuario(campo, valor, editando);

      setFormulario((actual) => ({
        ...actual,
        [campo]: valor,
      }));
      setErrores((actual) => ({
        ...actual,
        [campo]: errorCampo,
      }));
    };

  const actualizarPermiso = (pantallaId: string, accion: AccionPermiso, activo: boolean) => {
    setPermisos((actuales) => actuales.map((permiso) =>
      permiso.pantallaId === pantallaId ? cambiarPermiso(permiso, accion, activo) : permiso
    ));
  };

  const enviar = async () => {
    if (editando && (cargandoPermisos || errorPermisos)) {
      return;
    }
    const nuevosErrores = validarFormularioUsuario(formulario, editando);

    if (usuarioDisponible === false) {
      nuevosErrores.usuario = "Ese usuario ya existe.";
    }

    if (validandoUsuario) {
      nuevosErrores.usuario = "Espera a que termine la validación del usuario.";
    }

    setErrores(nuevosErrores);

    if (hayErroresUsuario(nuevosErrores)) {
      return;
    }

    await onGuardar(formulario, permisos);
  };

  return (
    <Dialog
      open
      onClose={guardando ? undefined : onCerrar}
      fullWidth
      maxWidth={editando ? "md" : "sm"}
      slotProps={{
        paper: {
          sx: {
            borderRadius: "8px",
            bgcolor: "var(--blanco-timbox)",
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          bgcolor: "var(--azul-timbox)",
          color: "var(--blanco-timbox)",
          fontFamily: "var(--fuente-regular)",
          py: 1.7,
        }}
      >
        <Typography sx={{ fontFamily: "var(--fuente-regular)", fontSize: 20, fontWeight: 700 }}>
          {editando ? "Editar usuario" : "Crear usuario"}
        </Typography>
        <IconButton
          type="button"
          aria-label="Cerrar modal"
          onClick={onCerrar}
          disabled={guardando}
          sx={{ color: "var(--blanco-timbox)" }}
        >
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: "28px !important" }}>
        <Box sx={{ display: "grid", gap: 2.2 }}>
          <Typography component="h3" sx={{ color: "var(--azul-timbox)", fontFamily: "var(--fuente-regular)", fontSize: 17, fontWeight: 700 }}>
            Datos del usuario
          </Typography>
          <TextField
            label="Usuario"
            value={formulario.usuario}
            onChange={cambiarUsuario}
            error={Boolean(errores.usuario)}
            helperText={
              errores.usuario ||
              (validandoUsuario
                ? "Verificando disponibilidad..."
                : usuarioDisponible === true
                  ? "Usuario disponible."
                  : "")
            }
            fullWidth
            sx={estiloCampo}
          />
          <TextField
            label="Nombre"
            value={formulario.nombre}
            onChange={cambiarCampo("nombre")}
            error={Boolean(errores.nombre)}
            helperText={errores.nombre}
            fullWidth
            sx={estiloCampo}
          />
          <TextField
            label="Correo"
            value={formulario.correo}
            onChange={cambiarCampo("correo")}
            error={Boolean(errores.correo)}
            helperText={errores.correo}
            fullWidth
            sx={estiloCampo}
          />
          {!editando && (
            <TextField
              label="Contraseña"
              value={formulario.contrasena}
              onChange={cambiarCampo("contrasena")}
              error={Boolean(errores.contrasena)}
              helperText={errores.contrasena || REQUISITOS_CONTRASENA}
              type={contrasenaVisible ? "text" : "password"}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        type="button"
                        edge="end"
                        aria-label={contrasenaVisible ? "Ocultar contraseña" : "Mostrar contraseña"}
                        onClick={() => setContrasenaVisible((visible) => !visible)}
                      >
                        {contrasenaVisible ? (
                          <VisibilityOffOutlinedIcon />
                        ) : (
                          <VisibilityOutlinedIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              fullWidth
              sx={estiloCampo}
            />
          )}

          {editando && (
            <Box sx={{ mt: 1 }}>
              <Typography component="h3" sx={{ color: "var(--azul-timbox)", fontFamily: "var(--fuente-regular)", fontSize: 17, fontWeight: 700, mb: 0.5 }}>
                Permisos por pantalla
              </Typography>
              {cargandoPermisos ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, py: 2 }}>
                  <CircularProgress size={20} />
                  <Typography sx={{ fontFamily: "var(--fuente-regular)" }}>Cargando permisos...</Typography>
                </Box>
              ) : errorPermisos ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                  <Typography color="error" sx={{ fontFamily: "var(--fuente-regular)" }}>{errorPermisos}</Typography>
                  <Button onClick={() => { setCargandoPermisos(true); setIntentoCarga((actual) => actual + 1); }}>
                    Reintentar
                  </Button>
                </Box>
              ) : permisos.length === 0 ? (
                <Typography sx={{ fontFamily: "var(--fuente-regular)", color: "#6b7685" }}>No hay pantallas registradas.</Typography>
              ) : (
                <Box sx={{ overflowX: "auto" }}>
                  <Box sx={{ minWidth: 690 }}>
                    {permisos.map((permiso) => (
                      <Box
                        key={permiso.pantallaId}
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "240px minmax(0, 1fr)",
                          alignItems: "center",
                          gap: 10,
                          py: 2,
                          borderBottom: "1px solid #e4e4e4",
                        }}
                      >
                        <Typography sx={{ fontFamily: "var(--fuente-regular)", fontWeight: 700, color: "var(--azul-timbox)" }}>
                          {permiso.nombre}
                        </Typography>
                        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}>
                          {(["leer", "crear", "editar", "eliminar"] as const).map((accion) => (
                            <Box component="label" key={accion} sx={{ display: "flex", alignItems: "center", gap: 0.3, cursor: "pointer", fontFamily: "var(--fuente-regular)", color: "var(--azul-timbox)", textTransform: "capitalize" }}>
                              <Checkbox
                                checked={permiso[accion]}
                                onChange={(event) => actualizarPermiso(permiso.pantallaId, accion, event.target.checked)}
                                slotProps={{ input: { "aria-label": `${accion} en ${permiso.nombre}` } }}
                                sx={{ p: 0.5, color: "#7b8795", "&.Mui-checked": { color: "#1b6e4b" }, "& .MuiSvgIcon-root": { fontSize: 28 } }}
                              />
                              {accion}
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
        <Button
          type="button"
          onClick={onCerrar}
          disabled={guardando}
          sx={{
            color: "var(--azul-timbox)",
            fontFamily: "var(--fuente-regular)",
            textTransform: "none",
          }}
        >
          Cancelar
        </Button>
        <Button
          type="button"
          onClick={() => {
            void enviar();
          }}
          disabled={guardando || (editando && (cargandoPermisos || Boolean(errorPermisos)))}
          sx={{
            minWidth: 120,
            bgcolor: "var(--rojo-timbox)",
            color: "var(--blanco-timbox)",
            fontFamily: "var(--fuente-regular)",
            textTransform: "none",
            "&:hover": {
              bgcolor: "#f04a32",
            },
          }}
        >
          {guardando ? "Guardando..." : "Guardar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
