import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { useCallback, useEffect, useRef, useState } from "react";
import { ModalConfirmacion } from "../../../../../shared/components/ModalConfirmacion";
import {
  eliminarSolicitudChat,
  enviarMensajeSolicitudChat,
  finalizarSolicitudChat,
  obtenerErrorSolicitudes,
  obtenerSolicitudChat,
} from "../servicio/solicitudesServicio";
import type {
  AlertaSolicitudes,
  MensajeSolicitudChat,
  SolicitudChatDetalle,
} from "../servicio/solicitudes.types";
import { EstadoSolicitudChip } from "./EstadoSolicitudChip";

function fechaCorta(fecha: string): string {
  const valor = new Date(fecha);

  return Number.isNaN(valor.getTime())
    ? ""
    : new Intl.DateTimeFormat("es-MX", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      }).format(valor);
}

function BurbujaMensaje({ mensaje }: { mensaje: MensajeSolicitudChat }) {
  if (mensaje.remitente === "sistema") {
    return (
      <Typography
        sx={{
          alignSelf: "center",
          maxWidth: "82%",
          px: 1.5,
          py: 0.65,
          color: "rgba(21,33,47,.58)",
          bgcolor: "rgba(21,33,47,.07)",
          borderRadius: "999px",
          fontFamily: "var(--fuente-regular)",
          fontSize: 11,
          textAlign: "center",
        }}
      >
        {mensaje.contenido}
      </Typography>
    );
  }

  const esAgente = mensaje.remitente === "agente";

  return (
    <Box
      sx={{
        alignSelf: esAgente ? "flex-end" : "flex-start",
        maxWidth: "78%",
        px: 1.6,
        py: 1.15,
        color: esAgente ? "var(--blanco-timbox)" : "var(--azul-timbox)",
        bgcolor: esAgente ? "var(--azul-timbox)" : "var(--blanco-timbox)",
        border: esAgente ? "none" : "1px solid rgba(21,33,47,.08)",
        borderRadius: esAgente
          ? "18px 18px 5px 18px"
          : "18px 18px 18px 5px",
        boxShadow: "0 5px 14px rgba(21,33,47,.07)",
      }}
    >
      {mensaje.nombreRemitente && (
        <Typography
          sx={{
            mb: 0.35,
            color: esAgente
              ? "rgba(255,255,255,.72)"
              : "var(--rojo-timbox)",
            fontFamily: "var(--fuente-regular)",
            fontSize: 10.5,
            fontWeight: 700,
          }}
        >
          {mensaje.nombreRemitente}
        </Typography>
      )}
      <Typography
        sx={{
          whiteSpace: "pre-wrap",
          overflowWrap: "anywhere",
          fontFamily: "var(--fuente-regular)",
          fontSize: 13.5,
          lineHeight: 1.45,
        }}
      >
        {mensaje.contenido}
      </Typography>
      <Typography
        sx={{
          mt: 0.45,
          color: esAgente
            ? "rgba(255,255,255,.6)"
            : "rgba(21,33,47,.45)",
          fontFamily: "var(--fuente-regular)",
          fontSize: 9.5,
          textAlign: "right",
        }}
      >
        {fechaCorta(mensaje.fechaRegistro)}
      </Typography>
    </Box>
  );
}

interface DetalleSolicitudChatProps {
  id: string;
  onActualizarLista: () => void;
  onAlerta: (alerta: AlertaSolicitudes) => void;
  onEliminada: () => void;
  onVolver: () => void;
}

export function DetalleSolicitudChat({
  id,
  onActualizarLista,
  onAlerta,
  onEliminada,
  onVolver,
}: DetalleSolicitudChatProps) {
  const [chat, setChat] = useState<SolicitudChatDetalle | null>(null);
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(true);
  const [procesando, setProcesando] = useState(false);
  const [confirmarFinalizacion, setConfirmarFinalizacion] = useState(false);
  const [confirmarEliminacion, setConfirmarEliminacion] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const finalRef = useRef<HTMLDivElement>(null);

  const cargar = useCallback(async (mostrarError = false) => {
    try {
      setChat(await obtenerSolicitudChat(id));
      setError(null);
    } catch (errorActual) {
      const mensajeError = obtenerErrorSolicitudes(errorActual);
      setError(mensajeError);

      if (mostrarError) {
        onAlerta({
          tipo: "error",
          titulo: "No se pudo cargar la conversación",
          descripcion: mensajeError,
        });
      }
    } finally {
      setCargando(false);
    }
  }, [id, onAlerta]);

  useEffect(() => {
    const inicio = window.setTimeout(() => void cargar(true), 0);
    const intervalo = window.setInterval(() => void cargar(false), 2500);

    return () => {
      window.clearTimeout(inicio);
      window.clearInterval(intervalo);
    };
  }, [cargar]);

  useEffect(() => {
    finalRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [chat?.mensajes]);

  const ejecutar = async (
    accion: () => Promise<void>,
    alertaCarga: Omit<AlertaSolicitudes, "tipo">,
    alertaExito: Omit<AlertaSolicitudes, "tipo">
  ) => {
    setProcesando(true);
    setError(null);
    onAlerta({ tipo: "loading", ...alertaCarga });

    try {
      await accion();
      await cargar(false);
      onActualizarLista();
      onAlerta({ tipo: "success", ...alertaExito });
    } catch (errorActual) {
      const mensajeError = obtenerErrorSolicitudes(errorActual);
      setError(mensajeError);
      onAlerta({
        tipo: "error",
        titulo: "No se pudo completar la operación",
        descripcion: mensajeError,
      });
    } finally {
      setProcesando(false);
    }
  };

  const enviar = () => {
    const contenido = mensaje.trim();

    if (!contenido || !chat || chat.estadoAtencion === "cerrada") {
      return;
    }

    void ejecutar(async () => {
      await enviarMensajeSolicitudChat(id, contenido);
      setMensaje("");
    }, {
      titulo: "Enviando respuesta",
      descripcion: "Registrando el mensaje en la conversación.",
    }, {
      titulo: "Respuesta enviada",
      descripcion: "El mensaje se agregó correctamente a la conversación.",
    });
  };

  const finalizar = () => {
    void ejecutar(async () => {
      await finalizarSolicitudChat(id);
    }, {
      titulo: "Finalizando conversación",
      descripcion: "Actualizando el estado de la conversación.",
    }, {
      titulo: "Conversación finalizada",
      descripcion: "La conversación quedó cerrada correctamente.",
    }).finally(() => setConfirmarFinalizacion(false));
  };

  const eliminar = async () => {
    setProcesando(true);
    setError(null);
    onAlerta({
      tipo: "loading",
      titulo: "Eliminando conversación",
      descripcion: "Eliminando la conversación y sus mensajes asociados.",
    });

    try {
      await eliminarSolicitudChat(id);
      setConfirmarEliminacion(false);
      onActualizarLista();
      onEliminada();
      onAlerta({
        tipo: "success",
        titulo: "Conversación eliminada",
        descripcion: "La conversación y sus mensajes se eliminaron correctamente.",
      });
    } catch (errorActual) {
      const mensajeError = obtenerErrorSolicitudes(errorActual);
      setError(mensajeError);
      onAlerta({
        tipo: "error",
        titulo: "No se pudo eliminar la conversación",
        descripcion: mensajeError,
      });
    } finally {
      setProcesando(false);
    }
  };

  if (cargando) {
    return (
      <Stack sx={{ height: "100%", alignItems: "center", justifyContent: "center" }}>
        <CircularProgress size={30} />
      </Stack>
    );
  }

  if (!chat) {
    return (
      <Stack sx={{ height: "100%", alignItems: "center", justifyContent: "center" }}>
        <Typography sx={{ color: "rgba(21,33,47,.58)" }}>
          {error || "No se encontró la conversación."}
        </Typography>
      </Stack>
    );
  }

  const cerrada = chat.estadoAtencion === "cerrada";

  return (
    <>
      <Box
      sx={{
        minWidth: 0,
        minHeight: 0,
        height: "100%",
        display: "grid",
        gridTemplateRows: "auto auto minmax(0, 1fr) auto",
      }}
    >
      <Stack
        direction="row"
        sx={{
          px: 2,
          py: 1.4,
          alignItems: "center",
          gap: 1.25,
          borderBottom: "1px solid rgba(21,33,47,.08)",
        }}
      >
        <IconButton
          aria-label="Volver a la lista"
          onClick={onVolver}
          sx={{ display: { lg: "none" } }}
        >
          <ArrowBackRoundedIcon />
        </IconButton>
        <Avatar sx={{ width: 38, height: 38, bgcolor: "var(--azul-timbox)" }}>
          {chat.nombreVisitante.charAt(0).toUpperCase()}
        </Avatar>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography
            sx={{
              color: "var(--azul-timbox)",
              fontFamily: "var(--fuente-regular)",
              fontSize: 15,
              fontWeight: 700,
            }}
          >
            {chat.nombreVisitante}
          </Typography>
          <Typography
            noWrap
            sx={{
              color: "rgba(21,33,47,.52)",
              fontFamily: "var(--fuente-regular)",
              fontSize: 11.5,
            }}
          >
            {chat.correoVisitante}
            {chat.telefonoVisitante ? ` · ${chat.telefonoVisitante}` : ""}
          </Typography>
        </Box>
        <EstadoSolicitudChip estado={chat.estadoAtencion} />
        {chat.eliminablePorInactividad && (
          <>
            <IconButton
              color="error"
              aria-label="Eliminar conversación"
              disabled={procesando}
              onClick={() => setConfirmarEliminacion(true)}
              sx={{ display: { xs: "inline-flex", sm: "none" } }}
            >
              <DeleteForeverRoundedIcon />
            </IconButton>
            <Button
              color="error"
              variant="outlined"
              startIcon={<DeleteForeverRoundedIcon />}
              disabled={procesando}
              onClick={() => setConfirmarEliminacion(true)}
              sx={{
                display: { xs: "none", sm: "inline-flex" },
                textTransform: "none",
              }}
            >
              Eliminar
            </Button>
          </>
        )}
        {!cerrada && (
          <Button
            color="success"
            variant="outlined"
            startIcon={<CheckCircleRoundedIcon />}
            disabled={procesando}
            onClick={() => setConfirmarFinalizacion(true)}
            sx={{
              display: { xs: "none", sm: "inline-flex" },
              textTransform: "none",
            }}
          >
            Finalizar
          </Button>
        )}
      </Stack>

      <Stack
        spacing={1.25}
        sx={{
          minHeight: 0,
          overflowY: "auto",
          p: { xs: 1.5, sm: 2.5 },
          bgcolor: "#f5f6f7",
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(21,33,47,.05) 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      >
        {chat.mensajes.map((mensajeActual) => (
          <BurbujaMensaje key={mensajeActual.id} mensaje={mensajeActual} />
        ))}
        <Box ref={finalRef} />
      </Stack>

      {cerrada ? (
        <Box
          sx={{
            m: 1.5,
            p: 1.5,
            color: "#1b6e4b",
            bgcolor: "rgba(38,154,106,.1)",
            borderRadius: 1.5,
            fontFamily: "var(--fuente-regular)",
            fontSize: 13,
          }}
        >
          Esta conversación está cerrada y se conserva para consulta.
        </Box>
      ) : (
        <Box
          component="form"
          onSubmit={(evento) => {
            evento.preventDefault();
            enviar();
          }}
          sx={{ p: 1.5, borderTop: "1px solid rgba(21,33,47,.08)" }}
        >
          <Stack direction="row" sx={{ alignItems: "flex-end", gap: 1 }}>
            <TextField
              fullWidth
              multiline
              maxRows={4}
              value={mensaje}
              placeholder="Escribe una respuesta..."
              onChange={(evento) => setMensaje(evento.target.value)}
            />
            <IconButton
              type="submit"
              aria-label="Enviar respuesta"
              disabled={procesando || !mensaje.trim()}
              sx={{
                width: 48,
                height: 48,
                flex: "0 0 48px",
                bgcolor: "var(--rojo-timbox)",
                color: "var(--blanco-timbox)",
                "&:hover": { bgcolor: "#c73520" },
                "&.Mui-disabled": { bgcolor: "rgba(21,33,47,.1)" },
              }}
            >
              <SendRoundedIcon />
            </IconButton>
          </Stack>
        </Box>
      )}
      </Box>

      <ModalConfirmacion
        abierto={confirmarFinalizacion}
        titulo="Finalizar conversación"
        descripcion={`¿Seguro que quieres finalizar la conversación con ${chat.nombreVisitante}? Una vez finalizada, ya no podrás enviar nuevas respuestas.`}
        textoConfirmar="Finalizar"
        cargando={procesando}
        onCancelar={() => {
          if (!procesando) {
            setConfirmarFinalizacion(false);
          }
        }}
        onConfirmar={finalizar}
      />

      <Dialog
        open={confirmarEliminacion}
        onClose={() => {
          if (!procesando) {
            setConfirmarEliminacion(false);
          }
        }}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Eliminar conversación</DialogTitle>
        <DialogContent>
          <Typography
            sx={{
              color: "rgba(21,33,47,.72)",
              fontFamily: "var(--fuente-regular)",
              fontSize: 14,
              lineHeight: 1.55,
            }}
          >
            Se eliminarán permanentemente la conversación, todos sus mensajes y
            los datos técnicos relacionados. Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button
            disabled={procesando}
            onClick={() => setConfirmarEliminacion(false)}
            sx={{ textTransform: "none" }}
          >
            Cancelar
          </Button>
          <Button
            color="error"
            variant="contained"
            disabled={procesando}
            onClick={() => void eliminar()}
            sx={{ textTransform: "none" }}
          >
            Eliminar definitivamente
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
