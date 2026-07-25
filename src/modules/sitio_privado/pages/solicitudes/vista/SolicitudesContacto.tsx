import {
  Alert,
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import ContactMailRoundedIcon from "@mui/icons-material/ContactMailRounded";
import InboxRoundedIcon from "@mui/icons-material/InboxRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { DetalleSolicitudChat } from "../components/DetalleSolicitudChat";
import { DetalleSolicitudFormulario } from "../components/DetalleSolicitudFormulario";
import { EstadoSolicitudChip } from "../components/EstadoSolicitudChip";
import {
  listarSolicitudes,
  obtenerErrorSolicitudes,
} from "../servicio/solicitudesServicio";
import type {
  EstadoFiltroSolicitud,
  OrigenSolicitud,
  SolicitudResumen,
} from "../servicio/solicitudes.types";

const filtros: { valor: EstadoFiltroSolicitud; etiqueta: string }[] = [
  { valor: "todas", etiqueta: "Todas" },
  { valor: "por_atender", etiqueta: "Por atender" },
  { valor: "en_atencion", etiqueta: "En atención" },
  { valor: "cerrada", etiqueta: "Cerradas" },
];

const filtroInactividad: {
  valor: EstadoFiltroSolicitud;
  etiqueta: string;
} = {
  valor: "inactivas_30_dias",
  etiqueta: "Último mensaje hace +30 días",
};

function normalizarBusqueda(valor: string): string {
  return valor
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function fechaLista(fecha: string): string {
  const valor = new Date(fecha);

  return Number.isNaN(valor.getTime())
    ? "Sin fecha"
    : new Intl.DateTimeFormat("es-MX", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(valor);
}

export function SolicitudesContacto() {
  const [parametros, setParametros] = useSearchParams();
  const origen: OrigenSolicitud =
    parametros.get("origen") === "chat" ? "chat" : "formulario";
  const estadoParametro = parametros.get("estado");
  const estadoPermitido =
    filtros.some((filtro) => filtro.valor === estadoParametro) ||
    (origen === "chat" && estadoParametro === "inactivas_30_dias");
  const estado: EstadoFiltroSolicitud = estadoPermitido
    ? (estadoParametro as EstadoFiltroSolicitud)
    : "todas";
  const [solicitudes, setSolicitudes] = useState<SolicitudResumen[]>([]);
  const [seleccionadaId, setSeleccionadaId] = useState<string | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState("");
  const filtrosVisibles =
    origen === "chat" ? [...filtros, filtroInactividad] : filtros;
  const solicitudesVisibles = useMemo(() => {
    const termino = normalizarBusqueda(busqueda);

    if (!termino) {
      return solicitudes;
    }

    return solicitudes.filter((solicitud) =>
      [
        solicitud.nombre,
        solicitud.correo,
        solicitud.telefono,
        solicitud.estatus,
        solicitud.resumen,
      ].some((valor) =>
        normalizarBusqueda(valor ?? "").includes(termino)
      )
    );
  }, [busqueda, solicitudes]);

  const actualizarParametros = (
    nuevoOrigen: OrigenSolicitud,
    nuevoEstado: EstadoFiltroSolicitud
  ) => {
    setParametros(
      { origen: nuevoOrigen, estado: nuevoEstado },
      { replace: true }
    );
  };

  const cargarLista = useCallback(async () => {
    try {
      const resultado = await listarSolicitudes(origen, estado);
      setSolicitudes(resultado);
      setSeleccionadaId((actual) =>
        actual && resultado.some((solicitud) => solicitud.id === actual)
          ? actual
          : null
      );
      setError(null);
    } catch (errorActual) {
      setError(obtenerErrorSolicitudes(errorActual));
    } finally {
      setCargando(false);
    }
  }, [estado, origen]);

  useEffect(() => {
    const inicio = window.setTimeout(() => void cargarLista(), 0);
    const intervalo =
      origen === "chat"
        ? window.setInterval(() => void cargarLista(), 5000)
        : null;

    return () => {
      window.clearTimeout(inicio);

      if (intervalo !== null) {
        window.clearInterval(intervalo);
      }
    };
  }, [cargarLista, origen]);

  return (
    <Box
      sx={{
        minWidth: 0,
        minHeight: 0,
        height: { xs: "auto", md: "100%" },
        display: { xs: "block", md: "flex" },
        flexDirection: "column",
        overflow: { md: "hidden" },
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        sx={{ mb: 2, alignItems: { md: "center" }, gap: 1.5 }}
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
            Solicitudes de contacto
          </Typography>
          <Typography
            sx={{
              color: "rgba(21,33,47,.58)",
              fontFamily: "var(--fuente-regular)",
              fontSize: 13.5,
            }}
          >
            Consultas recibidas mediante formulario y atención por chat
          </Typography>
        </Box>
        <Box sx={{ flex: 1 }} />
        <Stack direction="row" sx={{ alignItems: "center", gap: 1 }}>
          <Tooltip title="Actualizar solicitudes">
            <IconButton
              aria-label="Actualizar solicitudes"
              onClick={() => void cargarLista()}
              sx={{ color: "var(--azul-timbox)" }}
            >
              <RefreshRoundedIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>

      <ToggleButtonGroup
        exclusive
        fullWidth
        value={origen}
        onChange={(_, valor: OrigenSolicitud | null) => {
          if (valor) {
            setCargando(true);
            setSeleccionadaId(null);
            actualizarParametros(
              valor,
              valor === "formulario" && estado === "inactivas_30_dias"
                ? "todas"
                : estado
            );
          }
        }}
        aria-label="Origen de las solicitudes"
        sx={{
          mb: 1.5,
          bgcolor: "#f4f5f6",
          "& .MuiToggleButton-root": {
            minHeight: 52,
            gap: 1,
            border: 0,
            color: "rgba(21,33,47,.65)",
            fontFamily: "var(--fuente-regular)",
            fontSize: { xs: 12, sm: 14 },
            fontWeight: 700,
            textTransform: "none",
            "&.Mui-selected": {
              bgcolor: "var(--azul-timbox)",
              color: "var(--blanco-timbox)",
              "&:hover": { bgcolor: "var(--azul-timbox)" },
            },
          },
        }}
      >
        <ToggleButton value="formulario">
          <ContactMailRoundedIcon />
          Formulario de contacto
        </ToggleButton>
        <ToggleButton value="chat">
          <ChatRoundedIcon />
          Conversaciones por chat
        </ToggleButton>
      </ToggleButtonGroup>

      <Stack
        direction={{ xs: "column", md: "row" }}
        sx={{
          mb: 1.5,
          alignItems: { md: "center" },
          justifyContent: "flex-start",
          gap: 1.25,
        }}
      >
        <ToggleButtonGroup
          exclusive
          value={estado}
          onChange={(_, valor: EstadoFiltroSolicitud | null) => {
            if (valor) {
              setCargando(true);
              setSeleccionadaId(null);
              actualizarParametros(origen, valor);
            }
          }}
          aria-label="Estado de las solicitudes"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 0.75,
            "& .MuiToggleButtonGroup-grouped": {
              m: 0,
              px: 1.6,
              py: 0.7,
              border: "1px solid rgba(21,33,47,.1)",
              borderRadius: "999px !important",
              color: "rgba(21,33,47,.62)",
              fontFamily: "var(--fuente-regular)",
              fontSize: 11.5,
              fontWeight: 700,
              textTransform: "none",
              "&.Mui-selected": {
                color: "var(--rojo-timbox)",
                bgcolor: "rgba(220,62,38,.08)",
                borderColor: "rgba(220,62,38,.28)",
              },
            },
          }}
        >
          {filtrosVisibles.map((filtro) => (
            <ToggleButton key={filtro.valor} value={filtro.valor}>
              {filtro.etiqueta}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <Typography
          sx={{
            color: "var(--azul-timbox)",
            fontFamily: "var(--fuente-regular)",
            fontSize: 12.5,
            fontWeight: 800,
            whiteSpace: "nowrap",
          }}
        >
          {solicitudesVisibles.length}{" "}
          {solicitudesVisibles.length === 1 ? "solicitud" : "solicitudes"}
        </Typography>

        <TextField
          size="small"
          value={busqueda}
          placeholder="Buscar en estos resultados..."
          onChange={(evento) => {
            setBusqueda(evento.target.value);
            setSeleccionadaId(null);
          }}
          slotProps={{
            htmlInput: {
              "aria-label": "Buscar solicitudes",
            },
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon sx={{ fontSize: 20 }} />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            ml: { md: "auto" },
            width: { xs: "100%", md: 320 },
            flex: { md: "0 0 320px" },
            "& .MuiOutlinedInput-root": {
              bgcolor: "var(--blanco-timbox)",
              borderRadius: "999px",
              fontFamily: "var(--fuente-regular)",
              fontSize: 12.5,
            },
          }}
        />
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 1.5 }}>
          {error}
        </Alert>
      )}

      <Box
        sx={{
          minHeight: { xs: 560, md: 0 },
          height: { xs: 650, md: "auto" },
          flex: { md: 1 },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "350px minmax(0, 1fr)" },
          overflow: "hidden",
          bgcolor: "var(--blanco-timbox)",
          border: "1px solid rgba(21,33,47,.09)",
          borderRadius: 3,
          boxShadow: "0 12px 34px rgba(21,33,47,.07)",
        }}
      >
        <Box
          component="aside"
          aria-label="Listado de solicitudes"
          sx={{
            minHeight: 0,
            overflowY: "auto",
            borderRight: { lg: "1px solid rgba(21,33,47,.08)" },
            display: { xs: seleccionadaId ? "none" : "block", lg: "block" },
          }}
        >
          {cargando ? (
            <Stack sx={{ py: 7, alignItems: "center" }}>
              <CircularProgress size={28} />
            </Stack>
          ) : solicitudesVisibles.length === 0 ? (
            <Stack
              sx={{
                px: 3,
                py: 8,
                alignItems: "center",
                textAlign: "center",
                color: "rgba(21,33,47,.42)",
              }}
            >
              <InboxRoundedIcon sx={{ mb: 1, fontSize: 44 }} />
              <Typography
                sx={{ fontFamily: "var(--fuente-regular)", fontSize: 14 }}
              >
                No hay solicitudes con este filtro.
              </Typography>
            </Stack>
          ) : (
            solicitudesVisibles.map((solicitud) => (
              <Box
                key={solicitud.id}
                component="button"
                type="button"
                onClick={() => setSeleccionadaId(solicitud.id)}
                sx={{
                  width: "100%",
                  display: "flex",
                  gap: 1.25,
                  p: 1.7,
                  border: 0,
                  borderBottom: "1px solid rgba(21,33,47,.06)",
                  bgcolor:
                    seleccionadaId === solicitud.id
                      ? "rgba(220,62,38,.07)"
                      : "transparent",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "background-color 150ms ease",
                  "&:hover": { bgcolor: "rgba(21,33,47,.04)" },
                }}
              >
                <Avatar
                  sx={{
                    width: 38,
                    height: 38,
                    bgcolor:
                      solicitud.origen === "chat"
                        ? "var(--azul-timbox)"
                        : "var(--rojo-timbox)",
                    fontSize: 15,
                  }}
                >
                  {solicitud.nombre.charAt(0).toUpperCase()}
                </Avatar>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Stack direction="row" sx={{ alignItems: "center", gap: 0.75 }}>
                    <Typography
                      noWrap
                      sx={{
                        minWidth: 0,
                        flex: 1,
                        color: "var(--azul-timbox)",
                        fontFamily: "var(--fuente-regular)",
                        fontSize: 13.5,
                        fontWeight: 700,
                      }}
                    >
                      {solicitud.nombre}
                    </Typography>
                    <EstadoSolicitudChip estado={solicitud.estadoAtencion} />
                  </Stack>
                  <Typography
                    noWrap
                    sx={{
                      mt: 0.3,
                      color: "rgba(21,33,47,.56)",
                      fontFamily: "var(--fuente-regular)",
                      fontSize: 11.5,
                    }}
                  >
                    {solicitud.resumen || solicitud.correo}
                  </Typography>
                  <Typography
                    sx={{
                      mt: 0.45,
                      color: "rgba(21,33,47,.4)",
                      fontFamily: "var(--fuente-regular)",
                      fontSize: 10,
                    }}
                  >
                    {fechaLista(solicitud.fechaUltimaActividad)}
                    {solicitud.origen === "chat" &&
                      ` · ${solicitud.cantidadMensajes} mensajes`}
                  </Typography>
                </Box>
              </Box>
            ))
          )}
        </Box>

        <Box sx={{ minWidth: 0, minHeight: 0 }}>
          {!seleccionadaId ? (
            <Stack
              sx={{
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(21,33,47,.4)",
                textAlign: "center",
              }}
            >
              {origen === "chat" ? (
                <ChatRoundedIcon sx={{ fontSize: 52 }} />
              ) : (
                <ContactMailRoundedIcon sx={{ fontSize: 52 }} />
              )}
              <Typography
                sx={{ mt: 1, fontFamily: "var(--fuente-regular)" }}
              >
                Selecciona una solicitud para consultar sus detalles
              </Typography>
            </Stack>
          ) : origen === "formulario" ? (
            <DetalleSolicitudFormulario
              key={seleccionadaId}
              id={seleccionadaId}
              onActualizarLista={() => void cargarLista()}
              onVolver={() => setSeleccionadaId(null)}
            />
          ) : (
            <DetalleSolicitudChat
              key={seleccionadaId}
              id={seleccionadaId}
              onActualizarLista={() => void cargarLista()}
              onEliminada={() => setSeleccionadaId(null)}
              onVolver={() => setSeleccionadaId(null)}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}
