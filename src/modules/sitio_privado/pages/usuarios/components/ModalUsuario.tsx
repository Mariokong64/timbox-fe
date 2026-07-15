import { useEffect, useRef, useState, type ChangeEvent } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  crearFormularioDesdeUsuario,
  hayErroresUsuario,
  usuarioFormularioInicial,
  validarCampoUsuario,
  validarFormularioUsuario,
  verificarDisponibilidadUsuario,
  type ErroresUsuarioFormulario,
  type UsuarioFormulario,
  type UsuarioListado,
} from "../servicio/usuariosServicio";

interface ModalUsuarioProps {
  abierto: boolean;
  usuario: UsuarioListado | null;
  guardando: boolean;
  onCerrar: () => void;
  onGuardar: (formulario: UsuarioFormulario) => Promise<void>;
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

export function ModalUsuario({ abierto, usuario, guardando, onCerrar, onGuardar }: ModalUsuarioProps) {
  const editando = Boolean(usuario);
  const [formulario, setFormulario] = useState<UsuarioFormulario>(usuarioFormularioInicial);
  const [errores, setErrores] = useState<ErroresUsuarioFormulario>({});
  const [validandoUsuario, setValidandoUsuario] = useState(false);
  const [usuarioDisponible, setUsuarioDisponible] = useState<boolean | null>(null);
  const timeoutUsuarioRef = useRef<number | null>(null);

  useEffect(() => {
    if (abierto) {
      setFormulario(crearFormularioDesdeUsuario(usuario));
      setErrores({});
      setValidandoUsuario(false);
      setUsuarioDisponible(null);
    }
  }, [abierto, usuario]);

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

  const cambiarCampo =
    (campo: keyof UsuarioFormulario) => (event: ChangeEvent<HTMLInputElement>) => {
      const valor = campo === "usuario" ? event.target.value.toUpperCase() : event.target.value;
      const errorCampo = validarCampoUsuario(campo, valor, editando);

      setFormulario((actual) => ({
        ...actual,
        [campo]: valor,
      }));
      setErrores((actual) => ({
        ...actual,
        [campo]: errorCampo,
      }));

      if (campo === "usuario") {
        programarValidacionUsuario(valor, errorCampo);
      }
    };

  const enviar = async () => {
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

    await onGuardar(formulario);
  };

  return (
    <Dialog
      open={abierto}
      onClose={guardando ? undefined : onCerrar}
      fullWidth
      maxWidth="sm"
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

      <DialogContent sx={{ pt: 3 }}>
        <Box sx={{ display: "grid", gap: 2.2, pt: 0.5 }}>
          <TextField
            label="Usuario"
            value={formulario.usuario}
            onChange={cambiarCampo("usuario")}
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
              helperText={errores.contrasena}
              type="password"
              fullWidth
              sx={estiloCampo}
            />
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
          disabled={guardando}
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
