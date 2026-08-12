import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { ModalConfirmacion } from "../../../../../shared/components/ModalConfirmacion";
import {
  cerrarSolicitudFormulario,
  guardarRespuestaSolicitudFormulario,
  obtenerErrorSolicitudes,
  obtenerSolicitudFormulario,
} from "../servicio/solicitudesServicio";
import type {
  AlertaSolicitudes,
  SolicitudFormularioDetalle,
} from "../servicio/solicitudes.types";
import { EstadoSolicitudChip } from "./EstadoSolicitudChip";

function fechaCompleta(fecha: string): string {
  const valor = new Date(fecha);

  return Number.isNaN(valor.getTime())
    ? "Sin fecha"
    : new Intl.DateTimeFormat("es-MX", {
        dateStyle: "long",
        timeStyle: "short",
      }).format(valor);
}

function Dato({
  icono,
  etiqueta,
  valor,
}: {
  icono: ReactNode;
  etiqueta: string;
  valor: string;
}) {
  return (
    <Stack direction="row" sx={{ minWidth: 0, alignItems: "flex-start", gap: 1 }}>
      <Box sx={{ mt: 0.1, color: "var(--rojo-timbox)" }}>{icono}</Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography
          sx={{
            color: "rgba(21,33,47,.5)",
            fontFamily: "var(--fuente-regular)",
            fontSize: 10.5,
            fontWeight: 700,
            letterSpacing: ".06em",
            textTransform: "uppercase",
          }}
        >
          {etiqueta}
        </Typography>
        <Typography
          sx={{
            color: "var(--azul-timbox)",
            fontFamily: "var(--fuente-regular)",
            fontSize: 13.5,
            overflowWrap: "anywhere",
          }}
        >
          {valor}
        </Typography>
      </Box>
    </Stack>
  );
}

interface DetalleSolicitudFormularioProps {
  id: string;
  onActualizarLista: () => void;
  onAlerta: (alerta: AlertaSolicitudes) => void;
  onVolver: () => void;
}

export function DetalleSolicitudFormulario({
  id,
  onActualizarLista,
  onAlerta,
  onVolver,
}: DetalleSolicitudFormularioProps) {
  const [solicitud, setSolicitud] =
    useState<SolicitudFormularioDetalle | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [respuesta, setRespuesta] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [cerrando, setCerrando] = useState(false);
  const [confirmarCierre, setConfirmarCierre] = useState(false);

  useEffect(() => {
    let vigente = true;

    obtenerSolicitudFormulario(id)
      .then((resultado) => {
        if (vigente) {
          setSolicitud(resultado);
          setError(null);
        }
      })
      .catch((errorActual: unknown) => {
        if (vigente) {
          const mensaje = obtenerErrorSolicitudes(errorActual);
          setError(mensaje);
          onAlerta({
            tipo: "error",
            titulo: "No se pudo cargar la solicitud",
            descripcion: mensaje,
          });
        }
      })
      .finally(() => {
        if (vigente) {
          setCargando(false);
        }
      });

    return () => {
      vigente = false;
    };
  }, [id, onAlerta]);

  const guardarRespuesta = async () => {
    const contenido = respuesta.trim();

    if (!contenido || guardando) {
      return;
    }

    setGuardando(true);
    onAlerta({
      tipo: "loading",
      titulo: "Enviando respuesta",
      descripcion: "Guardando la respuesta y enviando el correo electrónico.",
    });

    try {
      const resultado = await guardarRespuestaSolicitudFormulario(id, contenido);
      setSolicitud(await obtenerSolicitudFormulario(id));
      setRespuesta("");
      onAlerta({
        tipo: resultado.correoEnviado ? "success" : "info",
        titulo: "Respuesta guardada",
        descripcion: resultado.correoEnviado
          ? "La respuesta se envió por correo electrónico."
          : "La respuesta se guardó, pero el correo electrónico no pudo enviarse.",
      });
      onActualizarLista();
    } catch (errorActual) {
      onAlerta({
        tipo: "error",
        titulo: "No se pudo enviar la respuesta",
        descripcion: obtenerErrorSolicitudes(errorActual),
      });
    } finally {
      setGuardando(false);
    }
  };

  const cerrar = async () => {
    if (cerrando || guardando) {
      return;
    }

    setCerrando(true);
    onAlerta({
      tipo: "loading",
      titulo: "Cerrando solicitud",
      descripcion: "Actualizando el estado de la solicitud.",
    });

    try {
      await cerrarSolicitudFormulario(id);
      setConfirmarCierre(false);
      setSolicitud(await obtenerSolicitudFormulario(id));
      onActualizarLista();
      onAlerta({
        tipo: "success",
        titulo: "Solicitud cerrada",
        descripcion: "La solicitud quedó cerrada correctamente.",
      });
    } catch (errorActual) {
      setConfirmarCierre(false);
      onAlerta({
        tipo: "error",
        titulo: "No se pudo cerrar la solicitud",
        descripcion: obtenerErrorSolicitudes(errorActual),
      });
    } finally {
      setCerrando(false);
    }
  };

  if (cargando) {
    return (
      <Stack sx={{ height: "100%", alignItems: "center", justifyContent: "center" }}>
        <CircularProgress size={30} />
      </Stack>
    );
  }

  if (error || !solicitud) {
    return (
      <Stack sx={{ height: "100%", alignItems: "center", justifyContent: "center" }}>
        <Typography sx={{ color: "rgba(21,33,47,.58)" }}>
          {error || "No se encontró la solicitud."}
        </Typography>
      </Stack>
    );
  }

  return (
    <Stack sx={{ minHeight: 0, height: "100%" }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        sx={{
          px: { xs: 2, md: 2.5 },
          py: 2,
          alignItems: { sm: "center" },
          gap: 1,
          borderBottom: "1px solid rgba(21,33,47,.08)",
        }}
      >
        <IconButton
          aria-label="Volver a la lista"
          onClick={onVolver}
          sx={{ display: { lg: "none" }, alignSelf: "flex-start" }}
        >
          <ArrowBackRoundedIcon />
        </IconButton>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography
            component="h2"
            sx={{
              color: "var(--azul-timbox)",
              fontFamily: "var(--fuente-regular)",
              fontSize: 19,
              fontWeight: 700,
            }}
          >
            {solicitud.nombre}
          </Typography>
          <Typography
            sx={{
              color: "rgba(21,33,47,.52)",
              fontFamily: "var(--fuente-regular)",
              fontSize: 11.5,
            }}
          >
            Recibida el {fechaCompleta(solicitud.fechaRegistro)}
          </Typography>
        </Box>
        <EstadoSolicitudChip
          estado={solicitud.estadoAtencion}
          etiqueta={solicitud.estatus}
        />
        {solicitud.estadoAtencion !== "cerrada" && (
          <Button
            color="success"
            variant="outlined"
            startIcon={
              cerrando ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                <CheckCircleRoundedIcon />
              )
            }
            disabled={cerrando || guardando}
            onClick={() => setConfirmarCierre(true)}
            sx={{ flex: "0 0 auto", textTransform: "none" }}
          >
            Cerrar solicitud
          </Button>
        )}
      </Stack>

      <Box sx={{ minHeight: 0, overflowY: "auto", p: { xs: 2, md: 2.5 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
            gap: 2,
            p: 2,
            bgcolor: "#f7f8f9",
            border: "1px solid rgba(21,33,47,.07)",
            borderRadius: 2.5,
          }}
        >
          <Dato
            icono={<PersonRoundedIcon sx={{ fontSize: 19 }} />}
            etiqueta="Nombre"
            valor={solicitud.nombre}
          />
          <Dato
            icono={<EmailRoundedIcon sx={{ fontSize: 19 }} />}
            etiqueta="Correo electrónico"
            valor={solicitud.correo}
          />
          <Dato
            icono={<PhoneRoundedIcon sx={{ fontSize: 19 }} />}
            etiqueta="Teléfono"
            valor={solicitud.telefono || "No proporcionado"}
          />
          <Dato
            icono={<ReceiptLongRoundedIcon sx={{ fontSize: 19 }} />}
            etiqueta="RFC"
            valor={solicitud.rfc || "No proporcionado"}
          />
        </Box>

        <Divider sx={{ my: 2.5 }} />

        <Typography
          sx={{
            mb: 1,
            color: "var(--azul-timbox)",
            fontFamily: "var(--fuente-regular)",
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          Mensaje
        </Typography>
        <Typography
          sx={{
            minHeight: 120,
            p: 2,
            whiteSpace: "pre-wrap",
            overflowWrap: "anywhere",
            color: "rgba(21,33,47,.78)",
            bgcolor: "#f7f8f9",
            border: "1px solid rgba(21,33,47,.07)",
            borderRadius: 2.5,
            fontFamily: "var(--fuente-regular)",
            fontSize: 14,
            lineHeight: 1.65,
          }}
        >
          {solicitud.mensaje || "La solicitud no contiene un mensaje."}
        </Typography>

        {solicitud.respuestas.length > 0 && (
          <>
            <Divider sx={{ my: 2.5 }} />
            <Typography
              sx={{
                mb: 1,
                color: "var(--azul-timbox)",
                fontFamily: "var(--fuente-regular)",
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              Respuestas registradas
            </Typography>
            <Stack spacing={1}>
              {solicitud.respuestas.map((respuestaActual) => (
                <Box
                  key={respuestaActual.id}
                  sx={{
                    p: 1.6,
                    bgcolor: "rgba(21,33,47,.035)",
                    border: "1px solid rgba(21,33,47,.08)",
                    borderRadius: 2,
                  }}
                >
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    sx={{
                      mb: 0.7,
                      justifyContent: "space-between",
                      gap: 0.4,
                    }}
                  >
                    <Typography
                      sx={{
                        color: "var(--rojo-timbox)",
                        fontFamily: "var(--fuente-regular)",
                        fontSize: 11.5,
                        fontWeight: 700,
                      }}
                    >
                      {respuestaActual.nombreUsuario}
                    </Typography>
                    <Typography
                      sx={{
                        color: "rgba(21,33,47,.45)",
                        fontFamily: "var(--fuente-regular)",
                        fontSize: 10.5,
                      }}
                    >
                      {fechaCompleta(respuestaActual.fechaAtencion)}
                    </Typography>
                  </Stack>
                  <Typography
                    sx={{
                      whiteSpace: "pre-wrap",
                      overflowWrap: "anywhere",
                      color: "rgba(21,33,47,.76)",
                      fontFamily: "var(--fuente-regular)",
                      fontSize: 13.5,
                      lineHeight: 1.55,
                    }}
                  >
                    {respuestaActual.detalles}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </>
        )}

        <Divider sx={{ my: 2.5 }} />

        {solicitud.estadoAtencion === "cerrada" ? (
          <Box
            sx={{
              p: 1.5,
              color: "#1b6e4b",
              bgcolor: "rgba(38,154,106,.1)",
              borderRadius: 1.5,
              fontFamily: "var(--fuente-regular)",
              fontSize: 13,
            }}
          >
            Esta solicitud está cerrada y se conserva para consulta.
          </Box>
        ) : (
          <Box
            component="form"
            onSubmit={(evento) => {
              evento.preventDefault();
              void guardarRespuesta();
            }}
          >
            <Typography
              sx={{
                mb: 1,
                color: "var(--azul-timbox)",
                fontFamily: "var(--fuente-regular)",
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              Registrar respuesta
            </Typography>
            <TextField
              fullWidth
              multiline
              minRows={4}
              maxRows={8}
              value={respuesta}
              placeholder="Escribe la respuesta para esta solicitud..."
              onChange={(evento) => {
                setRespuesta(evento.target.value);
              }}
              slotProps={{
                htmlInput: {
                  maxLength: 5000,
                  "aria-label": "Respuesta para la solicitud",
                },
              }}
            />

            <Stack
              direction={{ xs: "column", sm: "row" }}
              sx={{
                mt: 1.25,
                alignItems: { sm: "center" },
                justifyContent: "space-between",
                gap: 1,
              }}
            >
              <Typography
                sx={{
                  color: "rgba(21,33,47,.52)",
                  fontFamily: "var(--fuente-regular)",
                  fontSize: 11.5,
                }}
              >
                Se guardará en la base de datos y se enviará al correo registrado.
              </Typography>
              <Button
                type="submit"
                variant="contained"
                startIcon={
                  guardando ? (
                    <CircularProgress size={16} color="inherit" />
                  ) : (
                    <SendRoundedIcon />
                  )
                }
                disabled={guardando || !respuesta.trim()}
                sx={{
                  flex: "0 0 auto",
                  bgcolor: "var(--rojo-timbox)",
                  textTransform: "none",
                  "&:hover": { bgcolor: "#c73520" },
                }}
              >
                Enviar respuesta
              </Button>
            </Stack>
          </Box>
        )}
      </Box>
      <ModalConfirmacion
        abierto={confirmarCierre}
        titulo="Cerrar solicitud"
        descripcion={`¿Seguro que quieres cerrar la solicitud de ${solicitud.nombre}? Una vez cerrada, ya no podrás registrar nuevas respuestas.`}
        textoConfirmar="Cerrar solicitud"
        cargando={cerrando}
        onCancelar={() => {
          if (!cerrando) {
            setConfirmarCierre(false);
          }
        }}
        onConfirmar={() => {
          void cerrar();
        }}
      />
    </Stack>
  );
}
