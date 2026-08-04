import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddAPhotoRoundedIcon from "@mui/icons-material/AddAPhotoRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import LockResetRoundedIcon from "@mui/icons-material/LockResetRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { actualizarUsuarioSesion } from "../../../login/servicio/autenticacionServicio";
import {
  cambiarContrasenaPerfil,
  eliminarFotoPerfil,
  formularioContrasenaInicial,
  guardarFotoPerfil,
  obtenerFotoPerfil,
  obtenerMensajeErrorPerfil,
  obtenerPerfilUsuario,
  validarFormularioContrasena,
  validarFotoPerfil,
  type ErroresContrasena,
  type FormularioContrasena,
  type PerfilUsuario,
} from "../servicio/perfilServicio";

interface Aviso {
  mensaje: string;
  severidad: "success" | "error";
}

function iniciales(nombre: string, usuario: string): string {
  return (nombre || usuario || "U")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0]?.toUpperCase())
    .join("");
}

function actualizarSesionDesdePerfil(perfil: PerfilUsuario): void {
  actualizarUsuarioSesion({
    id: perfil.id,
    usuario: perfil.usuario,
    nombre: perfil.nombre,
    correo: perfil.correo,
    fotoPerfil: perfil.fotoPerfil,
  });
}

export function PerfilPrivado() {
  const selectorFoto = useRef<HTMLInputElement | null>(null);
  const [perfil, setPerfil] = useState<PerfilUsuario | null>(null);
  const [cargando, setCargando] = useState(true);
  const [fotoUrl, setFotoUrl] = useState<string | null>(null);
  const [versionFoto, setVersionFoto] = useState(0);
  const [fotoSeleccionada, setFotoSeleccionada] = useState<File | null>(null);
  const [vistaPrevia, setVistaPrevia] = useState<string | null>(null);
  const [procesandoFoto, setProcesandoFoto] = useState(false);
  const [formulario, setFormulario] = useState<FormularioContrasena>(
    formularioContrasenaInicial
  );
  const [errores, setErrores] = useState<ErroresContrasena>({});
  const [contrasenasVisibles, setContrasenasVisibles] = useState<
    Record<keyof FormularioContrasena, boolean>
  >({
    contrasenaActual: false,
    contrasenaNueva: false,
    confirmacionContrasena: false,
  });
  const [cambiandoContrasena, setCambiandoContrasena] = useState(false);
  const [aviso, setAviso] = useState<Aviso | null>(null);

  const textoIniciales = useMemo(
    () => iniciales(perfil?.nombre ?? "", perfil?.usuario ?? ""),
    [perfil]
  );

  useEffect(() => {
    let vigente = true;

    void obtenerPerfilUsuario()
      .then((perfilObtenido) => {
        if (!vigente) return;
        setPerfil(perfilObtenido);
        actualizarSesionDesdePerfil(perfilObtenido);
      })
      .catch((error) => {
        if (!vigente) return;
        setAviso({
          mensaje: obtenerMensajeErrorPerfil(error),
          severidad: "error",
        });
      })
      .finally(() => {
        if (vigente) setCargando(false);
      });

    return () => {
      vigente = false;
    };
  }, []);

  useEffect(() => {
    let vigente = true;
    let urlCreada: string | null = null;

    if (!perfil?.fotoPerfil) {
      return () => {
        vigente = false;
      };
    }

    void obtenerFotoPerfil()
      .then((foto) => {
        if (!vigente) return;
        urlCreada = URL.createObjectURL(foto);
        setFotoUrl(urlCreada);
      })
      .catch(() => {
        if (vigente) setFotoUrl(null);
      });

    return () => {
      vigente = false;
      if (urlCreada) URL.revokeObjectURL(urlCreada);
    };
  }, [perfil?.fotoPerfil, versionFoto]);

  useEffect(() => {
    return () => {
      if (vistaPrevia) URL.revokeObjectURL(vistaPrevia);
    };
  }, [vistaPrevia]);

  const seleccionarFoto = (event: ChangeEvent<HTMLInputElement>) => {
    const foto = event.target.files?.[0] ?? null;
    setAviso(null);

    if (!foto) {
      setFotoSeleccionada(null);
      setVistaPrevia(null);
      return;
    }

    const error = validarFotoPerfil(foto);

    if (error) {
      setFotoSeleccionada(null);
      setVistaPrevia(null);
      event.target.value = "";
      setAviso({ mensaje: error, severidad: "error" });
      return;
    }

    setFotoSeleccionada(foto);
    setVistaPrevia(URL.createObjectURL(foto));
  };

  const subirFoto = async () => {
    if (!fotoSeleccionada || procesandoFoto) return;

    setProcesandoFoto(true);
    setAviso(null);

    try {
      const perfilActualizado = await guardarFotoPerfil(fotoSeleccionada);
      setPerfil(perfilActualizado);
      setFotoUrl(null);
      actualizarSesionDesdePerfil(perfilActualizado);
      setFotoSeleccionada(null);
      setVistaPrevia(null);
      if (selectorFoto.current) selectorFoto.current.value = "";
      setVersionFoto((version) => version + 1);
      setAviso({
        mensaje: "Fotografía actualizada correctamente.",
        severidad: "success",
      });
    } catch (error) {
      setAviso({
        mensaje: obtenerMensajeErrorPerfil(error),
        severidad: "error",
      });
    } finally {
      setProcesandoFoto(false);
    }
  };

  const quitarFoto = async () => {
    if (procesandoFoto || !perfil?.fotoPerfil) return;

    setProcesandoFoto(true);
    setAviso(null);

    try {
      const perfilActualizado = await eliminarFotoPerfil();
      setPerfil(perfilActualizado);
      setFotoUrl(null);
      actualizarSesionDesdePerfil(perfilActualizado);
      setFotoSeleccionada(null);
      setVistaPrevia(null);
      if (selectorFoto.current) selectorFoto.current.value = "";
      setVersionFoto((version) => version + 1);
      setAviso({
        mensaje: "Fotografía eliminada correctamente.",
        severidad: "success",
      });
    } catch (error) {
      setAviso({
        mensaje: obtenerMensajeErrorPerfil(error),
        severidad: "error",
      });
    } finally {
      setProcesandoFoto(false);
    }
  };

  const cambiarCampoContrasena =
    (campo: keyof FormularioContrasena) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setFormulario((actual) => ({ ...actual, [campo]: event.target.value }));
      setErrores((actuales) => ({ ...actuales, [campo]: "" }));
      setAviso(null);
    };

  const alternarVisibilidadContrasena = (
    campo: keyof FormularioContrasena
  ) => {
    setContrasenasVisibles((actuales) => ({
      ...actuales,
      [campo]: !actuales[campo],
    }));
  };

  const adornadorVisibilidad = (
    campo: keyof FormularioContrasena,
    etiqueta: string
  ) => (
    <InputAdornment position="end">
      <IconButton
        type="button"
        edge="end"
        aria-label={`${contrasenasVisibles[campo] ? "Ocultar" : "Mostrar"} ${etiqueta}`}
        onClick={() => alternarVisibilidadContrasena(campo)}
      >
        {contrasenasVisibles[campo] ? (
          <VisibilityOffOutlinedIcon />
        ) : (
          <VisibilityOutlinedIcon />
        )}
      </IconButton>
    </InputAdornment>
  );

  const guardarContrasena = async (event: FormEvent) => {
    event.preventDefault();
    const nuevosErrores = validarFormularioContrasena(formulario);
    setErrores(nuevosErrores);

    if (Object.values(nuevosErrores).some(Boolean)) return;

    setCambiandoContrasena(true);
    setAviso(null);

    try {
      await cambiarContrasenaPerfil(formulario);
      setFormulario(formularioContrasenaInicial);
      setErrores({});
      setAviso({
        mensaje: "Contraseña actualizada correctamente.",
        severidad: "success",
      });
    } catch (error) {
      setAviso({
        mensaje: obtenerMensajeErrorPerfil(error),
        severidad: "error",
      });
    } finally {
      setCambiandoContrasena(false);
    }
  };

  if (cargando) {
    return (
      <Box sx={{ minHeight: 420, display: "grid", placeItems: "center" }}>
        <CircularProgress sx={{ color: "var(--rojo-timbox)" }} />
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", maxWidth: 1180, mx: "auto" }}>
      <Box sx={{ mb: 2.5 }}>
        <Typography
          component="h1"
          sx={{
            color: "var(--azul-timbox)",
            fontFamily: "var(--fuente-regular)",
            fontSize: { xs: 28, md: 34 },
            fontWeight: 900,
          }}
        >
          Mi perfil
        </Typography>
        <Typography
          sx={{
            mt: 0.5,
            color: "#6b7685",
            fontFamily: "var(--fuente-regular)",
            fontSize: 14.5,
          }}
        >
          Administra tu fotografía y mantén segura tu contraseña de acceso.
        </Typography>
      </Box>

      {aviso && (
        <Alert severity={aviso.severidad} sx={{ mb: 2.2 }} onClose={() => setAviso(null)}>
          {aviso.mensaje}
        </Alert>
      )}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "minmax(300px, 0.85fr) minmax(420px, 1.35fr)" },
          gap: 2.4,
          alignItems: "start",
        }}
      >
        <Box
          sx={{
            border: "1px solid #dce1e7",
            borderRadius: "8px",
            bgcolor: "var(--blanco-timbox)",
            p: { xs: 2.4, md: 3 },
            boxShadow: "0 14px 34px rgba(21, 33, 47, 0.06)",
          }}
        >
          <Stack sx={{ alignItems: "center", textAlign: "center" }}>
            <Avatar
              src={vistaPrevia ?? fotoUrl ?? undefined}
              sx={{
                width: 142,
                height: 142,
                bgcolor: "var(--azul-timbox)",
                border: "4px solid #edf1f5",
                fontFamily: "var(--fuente-regular)",
                fontSize: 42,
                fontWeight: 800,
              }}
            >
              {textoIniciales || <PersonRoundedIcon sx={{ fontSize: 58 }} />}
            </Avatar>

            <Typography
              sx={{
                mt: 2,
                color: "var(--azul-timbox)",
                fontFamily: "var(--fuente-regular)",
                fontSize: 22,
                fontWeight: 900,
              }}
            >
              {perfil?.nombre ?? "Usuario"}
            </Typography>
            <Typography sx={{ color: "#6b7685", fontSize: 14 }}>
              {perfil?.correo ?? ""}
            </Typography>

            <input
              ref={selectorFoto}
              hidden
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={seleccionarFoto}
            />

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.1} sx={{ mt: 2.5, width: "100%", justifyContent: "center" }}>
              <Button
                variant="outlined"
                startIcon={<AddAPhotoRoundedIcon />}
                disabled={procesandoFoto}
                onClick={() => selectorFoto.current?.click()}
                sx={{ textTransform: "none", color: "var(--azul-timbox)", borderColor: "#b9c2cc" }}
              >
                Elegir fotografía
              </Button>
              {perfil?.fotoPerfil && (
                <Button
                  color="error"
                  variant="text"
                  startIcon={<DeleteOutlineRoundedIcon />}
                  disabled={procesandoFoto}
                  onClick={() => void quitarFoto()}
                  sx={{ textTransform: "none" }}
                >
                  Quitar
                </Button>
              )}
            </Stack>

            {fotoSeleccionada && (
              <Button
                variant="contained"
                startIcon={procesandoFoto ? <CircularProgress size={16} color="inherit" /> : <SaveRoundedIcon />}
                disabled={procesandoFoto}
                onClick={() => void subirFoto()}
                sx={{
                  mt: 1.2,
                  textTransform: "none",
                  bgcolor: "var(--rojo-timbox)",
                  "&:hover": { bgcolor: "#c73520" },
                }}
              >
                Guardar fotografía
              </Button>
            )}

            <Typography sx={{ mt: 1.8, color: "#7b8794", fontSize: 12.5 }}>
              JPG, PNG o WebP. Tamaño máximo: 5 MB.
            </Typography>
          </Stack>

          <Divider sx={{ my: 2.6 }} />

          <Box sx={{ display: "grid", gap: 1.6 }}>
            <Box>
              <Typography sx={{ color: "#7b8794", fontSize: 12.5, fontWeight: 700 }}>
                USUARIO
              </Typography>
              <Typography sx={{ color: "var(--azul-timbox)", fontSize: 16, fontWeight: 800 }}>
                {perfil?.usuario ?? ""}
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ color: "#7b8794", fontSize: 12.5, fontWeight: 700 }}>
                CORREO
              </Typography>
              <Typography sx={{ color: "var(--azul-timbox)", fontSize: 15.5, overflowWrap: "anywhere" }}>
                {perfil?.correo ?? ""}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          component="form"
          onSubmit={(event) => void guardarContrasena(event)}
          sx={{
            border: "1px solid #dce1e7",
            borderRadius: "8px",
            bgcolor: "var(--blanco-timbox)",
            p: { xs: 2.4, md: 3 },
            boxShadow: "0 14px 34px rgba(21, 33, 47, 0.06)",
          }}
        >
          <Stack direction="row" spacing={1.4} sx={{ mb: 0.7, alignItems: "center" }}>
            <Box sx={{ width: 44, height: 44, borderRadius: "8px", bgcolor: "rgba(220, 62, 38, 0.1)", color: "var(--rojo-timbox)", display: "grid", placeItems: "center" }}>
              <LockResetRoundedIcon />
            </Box>
            <Box>
              <Typography sx={{ color: "var(--azul-timbox)", fontSize: 19, fontWeight: 900 }}>
                Cambiar contraseña
              </Typography>
              <Typography sx={{ color: "#7b8794", fontSize: 13.5 }}>
                Confirma tu contraseña actual antes de establecer una nueva.
              </Typography>
            </Box>
          </Stack>

          <Divider sx={{ my: 2.5 }} />

          <Stack spacing={2}>
            <TextField
              fullWidth
              type={contrasenasVisibles.contrasenaActual ? "text" : "password"}
              label="Contraseña actual"
              autoComplete="current-password"
              value={formulario.contrasenaActual}
              onChange={cambiarCampoContrasena("contrasenaActual")}
              error={Boolean(errores.contrasenaActual)}
              helperText={errores.contrasenaActual}
              disabled={cambiandoContrasena}
              slotProps={{
                input: {
                  endAdornment: adornadorVisibilidad(
                    "contrasenaActual",
                    "contraseña actual"
                  ),
                },
              }}
            />
            <TextField
              fullWidth
              type={contrasenasVisibles.contrasenaNueva ? "text" : "password"}
              label="Nueva contraseña"
              autoComplete="new-password"
              value={formulario.contrasenaNueva}
              onChange={cambiarCampoContrasena("contrasenaNueva")}
              error={Boolean(errores.contrasenaNueva)}
              helperText={errores.contrasenaNueva || "Utiliza al menos 8 caracteres."}
              disabled={cambiandoContrasena}
              slotProps={{
                input: {
                  endAdornment: adornadorVisibilidad(
                    "contrasenaNueva",
                    "nueva contraseña"
                  ),
                },
              }}
            />
            <TextField
              fullWidth
              type={contrasenasVisibles.confirmacionContrasena ? "text" : "password"}
              label="Confirmar nueva contraseña"
              autoComplete="new-password"
              value={formulario.confirmacionContrasena}
              onChange={cambiarCampoContrasena("confirmacionContrasena")}
              error={Boolean(errores.confirmacionContrasena)}
              helperText={errores.confirmacionContrasena}
              disabled={cambiandoContrasena}
              slotProps={{
                input: {
                  endAdornment: adornadorVisibilidad(
                    "confirmacionContrasena",
                    "confirmación de contraseña"
                  ),
                },
              }}
            />
          </Stack>

          <Box sx={{ mt: 2.6, display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="submit"
              variant="contained"
              startIcon={cambiandoContrasena ? <CircularProgress size={16} color="inherit" /> : <LockResetRoundedIcon />}
              disabled={cambiandoContrasena}
              sx={{
                minHeight: 42,
                px: 2.5,
                textTransform: "none",
                bgcolor: "var(--rojo-timbox)",
                fontWeight: 800,
                "&:hover": { bgcolor: "#c73520" },
              }}
            >
              Actualizar contraseña
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
