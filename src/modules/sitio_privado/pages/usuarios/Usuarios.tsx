import { useCallback, useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { AlertasServicio, type TipoAlertaServicio } from "../../../../shared/components/AlertasServicio";
import { ModalConfirmacion } from "../../../../shared/components/ModalConfirmacion";
import { ModalUsuario } from "./components/ModalUsuario";
import { TablaUsuarios } from "./components/TablaUsuarios";
import {
  eliminarUsuario,
  guardarUsuario,
  listarUsuarios,
  obtenerMensajeErrorUsuarios,
  type UsuarioFormulario,
  type UsuarioListado,
} from "./servicio/usuariosServicio";

interface EstadoAlerta {
  abierta: boolean;
  tipo: TipoAlertaServicio;
  titulo: string;
  descripcion?: string;
}

const alertaInicial: EstadoAlerta = {
  abierta: false,
  tipo: "info",
  titulo: "",
};

export function Usuarios() {
  const [usuarios, setUsuarios] = useState<UsuarioListado[]>([]);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState<UsuarioListado | null>(null);
  const [usuarioPorEliminar, setUsuarioPorEliminar] = useState<UsuarioListado | null>(null);
  const [alerta, setAlerta] = useState<EstadoAlerta>(alertaInicial);

  const cerrarAlerta = () => setAlerta(alertaInicial);

  const cargarUsuarios = useCallback(async (mostrarCarga = true) => {
    if (mostrarCarga) {
      setCargando(true);
    }

    try {
      const datos = await listarUsuarios();
      setUsuarios(datos);
    } catch (error) {
      setAlerta({
        abierta: true,
        tipo: "error",
        titulo: "No se pudieron cargar los usuarios",
        descripcion: obtenerMensajeErrorUsuarios(error),
      });
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    let componenteActivo = true;
    const cargarUsuariosIniciales = async () => {
      try {
        const datos = await listarUsuarios();
        if (componenteActivo) {
          setUsuarios(datos);
        }
      } catch (error) {
        if (componenteActivo) {
          setAlerta({
            abierta: true,
            tipo: "error",
            titulo: "No se pudieron cargar los usuarios",
            descripcion: obtenerMensajeErrorUsuarios(error),
          });
        }
      } finally {
        if (componenteActivo) {
          setCargando(false);
        }
      }
    };
    void cargarUsuariosIniciales();
    return () => {
      componenteActivo = false;
    };
  }, []);

  // useEffect(() => {
  //   void cargarUsuarios(false);
  // }, [cargarUsuarios]);

  const abrirCreacion = () => {
    setUsuarioEditando(null);
    setModalAbierto(true);
  };

  const abrirEdicion = (usuario: UsuarioListado) => {
    setUsuarioEditando(usuario);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    if (!guardando) {
      setModalAbierto(false);
      setUsuarioEditando(null);
    }
  };

  const guardar = async (formulario: UsuarioFormulario) => {
    setGuardando(true);
    cerrarAlerta();

    try {
      const mensaje = await guardarUsuario(formulario, usuarioEditando);
      setAlerta({
        abierta: true,
        tipo: "success",
        titulo: usuarioEditando ? "Usuario actualizado" : "Usuario creado",
        descripcion: mensaje,
      });
      cerrarModal();
      await cargarUsuarios(false);
    } catch (error) {
      setAlerta({
        abierta: true,
        tipo: "error",
        titulo: "No se pudo guardar",
        descripcion: obtenerMensajeErrorUsuarios(error),
      });
    } finally {
      setGuardando(false);
    }
  };

  const solicitarEliminacion = (usuario: UsuarioListado) => {
    setUsuarioPorEliminar(usuario);
  };

  const cancelarEliminacion = () => {
    if (!guardando) {
      setUsuarioPorEliminar(null);
    }
  };

  const confirmarEliminacion = async () => {
    if (!usuarioPorEliminar) {
      return;
    }

    setGuardando(true);
    cerrarAlerta();

    try {
      const mensaje = await eliminarUsuario(usuarioPorEliminar.id);
      setAlerta({
        abierta: true,
        tipo: "success",
        titulo: "Usuario eliminado",
        descripcion: mensaje,
      });
      setUsuarioPorEliminar(null);
      await cargarUsuarios(false);
    } catch (error) {
      setAlerta({
        abierta: true,
        tipo: "error",
        titulo: "No se pudo eliminar",
        descripcion: obtenerMensajeErrorUsuarios(error),
      });
    } finally {
      setGuardando(false);
    }
  };

  return (
    <Box sx={{ color: "var(--azul-timbox)" }}>
      <AlertasServicio
        abierta={alerta.abierta}
        tipo={alerta.tipo}
        titulo={alerta.titulo}
        descripcion={alerta.descripcion}
        onCerrar={cerrarAlerta}
      />

      <Box
        sx={{
          display: "flex",
          alignItems: { xs: "flex-start", sm: "center" },
          justifyContent: "space-between",
          gap: 2,
          mb: 3,
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Box>
          <Typography component="h1" sx={{ fontFamily: "var(--fuente-regular)", fontSize: 28, fontWeight: 800 }}>
            Usuarios
          </Typography>
          <Typography sx={{ mt: 0.5, color: "#6b7685", fontFamily: "var(--fuente-regular)", fontSize: 15 }}>
            Administra las cuentas que pueden entrar al sitio privado.
          </Typography>
        </Box>

        <Button
          type="button"
          startIcon={<AddRoundedIcon />}
          onClick={abrirCreacion}
          sx={{
            minWidth: 150,
            height: 40,
            borderRadius: "6px",
            bgcolor: "var(--rojo-timbox)",
            color: "var(--blanco-timbox)",
            fontFamily: "var(--fuente-regular)",
            textTransform: "none",
            "&:hover": {
              bgcolor: "#f04a32",
            },
          }}
        >
          Nuevo usuario
        </Button>
      </Box>

      <Box
        sx={{
          border: "1px solid #dce1e7",
          borderRadius: "8px",
          overflow: "hidden",
          bgcolor: "var(--blanco-timbox)",
        }}
      >
        <TablaUsuarios
          usuarios={usuarios}
          cargando={cargando}
          onEditar={abrirEdicion}
          onEliminar={solicitarEliminacion}
        />
      </Box>

      {modalAbierto && (
        <ModalUsuario
          usuario={usuarioEditando}
          guardando={guardando}
          onCerrar={cerrarModal}
          onGuardar={guardar}
        />
      )}

      <ModalConfirmacion
        abierto={Boolean(usuarioPorEliminar)}
        titulo="Eliminar usuario"
        descripcion={`¿Seguro que quieres eliminar el usuario ${usuarioPorEliminar?.usuario ?? ""}? Esta acción no se puede deshacer.`}
        textoConfirmar="Eliminar"
        cargando={guardando}
        onCancelar={cancelarEliminacion}
        onConfirmar={() => {
          void confirmarEliminacion();
        }}
      />
    </Box>
  );
}
