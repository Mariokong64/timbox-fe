import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  enviarMensajeChat,
  finalizarChat,
  listarChats,
  obtenerChat,
  obtenerErrorChats,
} from "../servicio/chatsServicio";
import type {
  ChatPrivado,
  MensajeChatPrivado,
} from "../servicio/chatsServicio";

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

function BurbujaMensaje({ mensaje }: { mensaje: MensajeChatPrivado }) {
  if (mensaje.remitente === "sistema") {
    return (
      <Typography
        sx={{
          alignSelf: "center",
          px: 1.5,
          py: 0.65,
          color: "rgba(21,33,47,.58)",
          bgcolor: "rgba(21,33,47,.06)",
          borderRadius: "999px",
          fontFamily: "var(--fuente-regular)",
          fontSize: 11,
        }}
      >
        {mensaje.contenido}
      </Typography>
    );
  }

  const agente = mensaje.remitente === "agente";

  return (
    <Box
      sx={{
        alignSelf: agente ? "flex-end" : "flex-start",
        maxWidth: "75%",
        px: 1.6,
        py: 1.2,
        color: agente ? "var(--blanco-timbox)" : "var(--azul-timbox)",
        bgcolor: agente ? "var(--azul-timbox)" : "var(--blanco-timbox)",
        border: agente ? "none" : "1px solid rgba(21,33,47,.08)",
        borderRadius: agente
          ? "18px 18px 5px 18px"
          : "18px 18px 18px 5px",
        boxShadow: "0 5px 14px rgba(21,33,47,.07)",
      }}
    >
      {mensaje.nombreRemitente && (
        <Typography
          sx={{
            mb: 0.35,
            color: agente
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
          color: agente ? "rgba(255,255,255,.6)" : "rgba(21,33,47,.45)",
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

export function ChatsPrivados() {
  const [chats, setChats] = useState<ChatPrivado[]>([]);
  const [seleccionadoId, setSeleccionadoId] = useState<string | null>(null);
  const [chatSeleccionado, setChatSeleccionado] =
    useState<ChatPrivado | null>(null);
  const [mensaje, setMensaje] = useState("");
  const [cargandoLista, setCargandoLista] = useState(true);
  const [procesando, setProcesando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const finalRef = useRef<HTMLDivElement>(null);

  const cargarLista = useCallback(async () => {
    try {
      const resultado = await listarChats();
      setChats(resultado);
      setSeleccionadoId((actual) => actual ?? resultado[0]?.id ?? null);
      setError(null);
    } catch (errorActual) {
      setError(obtenerErrorChats(errorActual));
    } finally {
      setCargandoLista(false);
    }
  }, []);

  const cargarSeleccionado = useCallback(async () => {
    if (!seleccionadoId) {
      setChatSeleccionado(null);
      return;
    }

    try {
      setChatSeleccionado(await obtenerChat(seleccionadoId));
      setError(null);
    } catch (errorActual) {
      setError(obtenerErrorChats(errorActual));
    }
  }, [seleccionadoId]);

  useEffect(() => {
    const inicio = window.setTimeout(() => void cargarLista(), 0);
    const intervalo = window.setInterval(() => void cargarLista(), 5000);

    return () => {
      window.clearTimeout(inicio);
      window.clearInterval(intervalo);
    };
  }, [cargarLista]);

  useEffect(() => {
    const inicio = window.setTimeout(() => void cargarSeleccionado(), 0);
    const intervalo = window.setInterval(
      () => void cargarSeleccionado(),
      2500
    );

    return () => {
      window.clearTimeout(inicio);
      window.clearInterval(intervalo);
    };
  }, [cargarSeleccionado]);

  useEffect(() => {
    finalRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [chatSeleccionado?.mensajes]);

  const ejecutar = async (accion: () => Promise<void>) => {
    setProcesando(true);
    setError(null);

    try {
      await accion();
      await Promise.all([cargarLista(), cargarSeleccionado()]);
    } catch (errorActual) {
      setError(obtenerErrorChats(errorActual));
    } finally {
      setProcesando(false);
    }
  };

  const enviar = () => {
    if (!seleccionadoId || !mensaje.trim()) {
      return;
    }

    const contenido = mensaje.trim();
    void ejecutar(async () => {
      await enviarMensajeChat(seleccionadoId, contenido);
      setMensaje("");
    });
  };

  const finalizar = () => {
    if (!seleccionadoId) {
      return;
    }

    void ejecutar(async () => {
      await finalizarChat(seleccionadoId);
      setSeleccionadoId(null);
      setChatSeleccionado(null);
    });
  };

  return (
    <Box sx={{ minWidth: 0 }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        sx={{ mb: 2.5, alignItems: { sm: "center" }, gap: 1.5 }}
      >
        <Box>
          <Typography
            component="h1"
            sx={{
              color: "var(--azul-timbox)",
              fontFamily: "var(--fuente-regular)",
              fontSize: { xs: 27, md: 32 },
              fontWeight: 700,
            }}
          >
            Chats
          </Typography>
          <Typography
            sx={{
              color: "rgba(21,33,47,.58)",
              fontFamily: "var(--fuente-regular)",
              fontSize: 13.5,
            }}
          >
            Conversaciones activas del sitio público
          </Typography>
        </Box>
        <Box sx={{ flex: 1 }} />
        <IconButton
          aria-label="Actualizar chats"
          onClick={() => void cargarLista()}
          sx={{ alignSelf: "flex-start", color: "var(--azul-timbox)" }}
        >
          <RefreshRoundedIcon />
        </IconButton>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box
        sx={{
          minHeight: 600,
          height: "calc(100dvh - 205px)",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "330px minmax(0, 1fr)" },
          overflow: "hidden",
          bgcolor: "var(--blanco-timbox)",
          border: "1px solid rgba(21,33,47,.09)",
          borderRadius: 3,
          boxShadow: "0 12px 34px rgba(21,33,47,.07)",
        }}
      >
        <Box
          component="aside"
          sx={{
            minHeight: 0,
            overflowY: "auto",
            borderRight: { lg: "1px solid rgba(21,33,47,.08)" },
            display: { xs: chatSeleccionado ? "none" : "block", lg: "block" },
          }}
        >
          <Box sx={{ px: 2, py: 1.5 }}>
            <Chip
              label={`${chats.length} activas`}
              size="small"
              sx={{ fontFamily: "var(--fuente-regular)" }}
            />
          </Box>
          <Divider />
          {cargandoLista ? (
            <Stack sx={{ py: 6, alignItems: "center" }}>
              <CircularProgress size={28} />
            </Stack>
          ) : chats.length === 0 ? (
            <Stack sx={{ px: 3, py: 8, alignItems: "center", textAlign: "center" }}>
              <ChatRoundedIcon sx={{ mb: 1, color: "rgba(21,33,47,.25)", fontSize: 42 }} />
              <Typography sx={{ fontFamily: "var(--fuente-regular)", fontSize: 14 }}>
                No hay conversaciones activas.
              </Typography>
            </Stack>
          ) : (
            chats.map((chat) => (
              <Box
                key={chat.id}
                component="button"
                type="button"
                onClick={() => setSeleccionadoId(chat.id)}
                sx={{
                  width: "100%",
                  display: "flex",
                  gap: 1.25,
                  p: 1.75,
                  border: 0,
                  borderBottom: "1px solid rgba(21,33,47,.06)",
                  bgcolor:
                    seleccionadoId === chat.id
                      ? "rgba(220,62,38,.07)"
                      : "transparent",
                  textAlign: "left",
                  cursor: "pointer",
                  "&:hover": { bgcolor: "rgba(21,33,47,.04)" },
                }}
              >
                <Avatar sx={{ width: 38, height: 38, bgcolor: "var(--azul-timbox)" }}>
                  {chat.nombreVisitante.charAt(0).toUpperCase()}
                </Avatar>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Stack direction="row" sx={{ alignItems: "center", gap: 1 }}>
                    <Typography
                      noWrap
                      sx={{
                        flex: 1,
                        color: "var(--azul-timbox)",
                        fontFamily: "var(--fuente-regular)",
                        fontSize: 13.5,
                        fontWeight: 700,
                      }}
                    >
                      {chat.nombreVisitante}
                    </Typography>
                  </Stack>
                  <Typography
                    noWrap
                    sx={{
                      color: "rgba(21,33,47,.56)",
                      fontFamily: "var(--fuente-regular)",
                      fontSize: 11.5,
                    }}
                  >
                    {chat.ultimoMensaje}
                  </Typography>
                  <Typography
                    sx={{
                      mt: 0.4,
                      color: "rgba(21,33,47,.4)",
                      fontFamily: "var(--fuente-regular)",
                      fontSize: 10,
                    }}
                  >
                    {fechaCorta(chat.fechaUltimaActividad)}
                  </Typography>
                </Box>
              </Box>
            ))
          )}
        </Box>

        <Box sx={{ minWidth: 0, minHeight: 0, display: "grid", gridTemplateRows: "auto minmax(0, 1fr) auto" }}>
          {!chatSeleccionado ? (
            <Stack sx={{ gridRow: "1 / -1", alignItems: "center", justifyContent: "center", color: "rgba(21,33,47,.4)" }}>
              <ChatRoundedIcon sx={{ fontSize: 52 }} />
              <Typography sx={{ mt: 1, fontFamily: "var(--fuente-regular)" }}>
                Selecciona una conversación
              </Typography>
            </Stack>
          ) : (
            <>
              <Box sx={{ px: 2.25, py: 1.5, borderBottom: "1px solid rgba(21,33,47,.08)" }}>
                <Stack direction="row" sx={{ alignItems: "center", gap: 1.5 }}>
                  <IconButton
                    aria-label="Volver a la lista"
                    onClick={() => {
                      setSeleccionadoId(null);
                      setChatSeleccionado(null);
                    }}
                    sx={{ display: { lg: "none" } }}
                  >
                    <PersonRoundedIcon />
                  </IconButton>
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography sx={{ fontFamily: "var(--fuente-regular)", fontSize: 15, fontWeight: 700 }}>
                      {chatSeleccionado.nombreVisitante}
                    </Typography>
                    <Typography noWrap sx={{ color: "rgba(21,33,47,.52)", fontFamily: "var(--fuente-regular)", fontSize: 11.5 }}>
                      {chatSeleccionado.correoVisitante}
                      {chatSeleccionado.telefonoVisitante
                        ? ` · ${chatSeleccionado.telefonoVisitante}`
                        : ""}
                    </Typography>
                  </Box>
                  <Button
                    color="success"
                    variant="outlined"
                    startIcon={<CheckCircleRoundedIcon />}
                    disabled={procesando}
                    onClick={finalizar}
                    sx={{ textTransform: "none" }}
                  >
                    Finalizar
                  </Button>
                </Stack>
              </Box>

              <Stack
                spacing={1.25}
                sx={{
                  minHeight: 0,
                  overflowY: "auto",
                  p: 2.5,
                  bgcolor: "#f5f6f7",
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, rgba(21,33,47,.05) 1px, transparent 0)",
                  backgroundSize: "22px 22px",
                }}
              >
                {chatSeleccionado.mensajes.map((mensajeActual) => (
                  <BurbujaMensaje key={mensajeActual.id} mensaje={mensajeActual} />
                ))}
                <Box ref={finalRef} />
              </Stack>

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
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}
