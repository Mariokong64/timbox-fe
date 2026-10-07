import { useCallback, useEffect, useState, type ReactNode } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ContactMailRoundedIcon from "@mui/icons-material/ContactMailRounded";
import FactCheckRoundedIcon from "@mui/icons-material/FactCheckRounded";
import HourglassTopRoundedIcon from "@mui/icons-material/HourglassTopRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { AlertasServicio } from "../../../../../shared/components/AlertasServicio";
import {
  obtenerMensajeErrorDashboard,
  obtenerResumenDashboard,
  type MetricaDashboard,
  type ResumenDashboard,
  type SerieDiariaDashboard,
} from "../servicio/dashboardServicio";

type IconoTarjeta = typeof ContactMailRoundedIcon;

interface TarjetaIndicadorProps {
  titulo: string;
  valor: number;
  descripcion: string;
  color: string;
  icono: IconoTarjeta;
}

const formatoNumero = new Intl.NumberFormat("es-MX");

const coloresGraficas = ["var(--rojo-timbox)", "var(--azul-timbox)", "#2f8f6b", "#d59b2d", "#6b7685"];

function formatearNumero(valor: number): string {
  return formatoNumero.format(valor);
}

function calcularPorcentaje(valor: number, total: number): number {
  if (!total) {
    return 0;
  }

  return Math.round((valor / total) * 100);
}

function obtenerEtiquetaDia(valor: string): string {
  const partes = valor.split("-");

  if (partes.length !== 3) {
    return valor;
  }

  return `${partes[2]}/${partes[1]}`;
}

function obtenerFondoSuave(color: string): string {
  if (color === "var(--rojo-timbox)") {
    return "rgba(220, 62, 38, 0.1)";
  }

  if (color === "var(--azul-timbox)") {
    return "rgba(21, 33, 47, 0.1)";
  }

  return `${color}1f`;
}

function TarjetaIndicador({ titulo, valor, descripcion, color, icono: Icono }: TarjetaIndicadorProps) {
  return (
    <Box
      sx={{
        minHeight: 148,
        border: "1px solid #dce1e7",
        borderRadius: "8px",
        bgcolor: "var(--blanco-timbox)",
        p: 2.2,
        display: "grid",
        gridTemplateColumns: "1fr 52px",
        gap: 1.5,
        boxShadow: "0 14px 34px rgba(21, 33, 47, 0.06)",
      }}
    >
      <Box>
        <Typography sx={{ color: "#6b7685", fontFamily: "var(--fuente-regular)", fontSize: 14, fontWeight: 700 }}>
          {titulo}
        </Typography>
        <Typography sx={{ color, fontFamily: "var(--fuente-regular)", fontSize: { xs: 34, md: 40 }, fontWeight: 900, lineHeight: 1.05, mt: 1 }}>
          {formatearNumero(valor)}
        </Typography>
        <Typography sx={{ color: "#7b8794", fontFamily: "var(--fuente-regular)", fontSize: 13.5, lineHeight: 1.35, mt: 1 }}>
          {descripcion}
        </Typography>
      </Box>

      <Box
        sx={{
          width: 52,
          height: 52,
          borderRadius: "8px",
          bgcolor: obtenerFondoSuave(color),
          color,
          display: "grid",
          placeItems: "center",
        }}
      >
        <Icono sx={{ fontSize: 29 }} />
      </Box>
    </Box>
  );
}

function Panel({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <Box
      sx={{
        border: "1px solid #dce1e7",
        borderRadius: "8px",
        bgcolor: "var(--blanco-timbox)",
        p: { xs: 2, md: 2.4 },
        minWidth: 0,
        boxShadow: "0 14px 34px rgba(21, 33, 47, 0.05)",
      }}
    >
      <Typography sx={{ fontFamily: "var(--fuente-regular)", fontSize: 18, fontWeight: 800, color: "var(--azul-timbox)" }}>
        {titulo}
      </Typography>
      {children}
    </Box>
  );
}

function BarrasHorizontales({ datos, total }: { datos: MetricaDashboard[]; total: number }) {
  if (!datos.length) {
    return <Typography sx={{ color: "#7b8794", fontSize: 14 }}>Sin datos disponibles.</Typography>;
  }

  return (
    <Box sx={{ display: "grid", gap: 1.6 }}>
      {datos.map((item, indice) => {
        const porcentaje = calcularPorcentaje(item.valor, total);
        const color = coloresGraficas[indice % coloresGraficas.length];

        return (
          <Box key={item.etiqueta}>
            <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1.5, mb: 0.6 }}>
              <Typography sx={{ color: "var(--azul-timbox)", fontFamily: "var(--fuente-regular)", fontSize: 14, fontWeight: 700 }}>
                {item.etiqueta}
              </Typography>
              <Typography sx={{ color: "#6b7685", fontFamily: "var(--fuente-regular)", fontSize: 13 }}>
                {formatearNumero(item.valor)} · {porcentaje}%
              </Typography>
            </Box>
            <Box sx={{ height: 9, borderRadius: 999, bgcolor: "#edf1f5", overflow: "hidden" }}>
              <Box sx={{ width: `${porcentaje}%`, minWidth: item.valor ? 8 : 0, height: "100%", borderRadius: 999, bgcolor: color }} />
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

function SerieBarras({ datos, color }: { datos: SerieDiariaDashboard[]; color: string }) {
  const maximo = Math.max(...datos.map((item) => item.total), 1);

  if (!datos.length) {
    return <Typography sx={{ color: "#7b8794", fontSize: 14 }}>Sin actividad reciente.</Typography>;
  }

  return (
    <Box sx={{ minHeight: 190, display: "grid", gridTemplateColumns: `repeat(${datos.length}, minmax(16px, 1fr))`, gap: 1, alignItems: "end" }}>
      {datos.map((item) => {
        const alto = Math.max(8, (item.total / maximo) * 150);

        return (
          <Box key={item.fecha} sx={{ display: "grid", alignItems: "end", gap: 0.8, minWidth: 0 }}>
            <Typography sx={{ color: "#6b7685", fontFamily: "var(--fuente-regular)", fontSize: 11, textAlign: "center", minHeight: 14 }}>
              {item.total || ""}
            </Typography>
            <Box
              title={`${obtenerEtiquetaDia(item.fecha)}: ${item.total}`}
              sx={{
                height: alto,
                minHeight: 8,
                borderRadius: "6px 6px 2px 2px",
                bgcolor: item.total ? color : "#e5e9ee",
                transition: "height 180ms ease",
              }}
            />
            <Typography sx={{ color: "#8a95a1", fontFamily: "var(--fuente-regular)", fontSize: 10.5, textAlign: "center", whiteSpace: "nowrap" }}>
              {obtenerEtiquetaDia(item.fecha)}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}

export function DashboardPrivado() {
  const [resumen, setResumen] = useState<ResumenDashboard | null>(null);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({ abierta: false, titulo: "", descripcion: "" });

  const cargarDashboard = useCallback(async () => {
    setCargando(true);
    try {
      const datos = await obtenerResumenDashboard();
      setResumen(datos);
    } catch (error) {
      setAlerta({
        abierta: true,
        titulo: "No se pudo cargar el dashboard",
        descripcion: obtenerMensajeErrorDashboard(error),
      });
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    let componenteActivo = true;
    const cargar = async () => {
      setCargando(true);
      try {
        const datos = await obtenerResumenDashboard();
        if (componenteActivo) {
          setResumen(datos);
        }
      } catch (error) {
        if (componenteActivo) {
          setAlerta({
            abierta: true,
            titulo: "No se pudo cargar el dashboard",
            descripcion: obtenerMensajeErrorDashboard(error),
          });
        }
      } finally {
        if (componenteActivo) {
          setCargando(false);
        }
      }
    };

    void cargar();

    return () => {
      componenteActivo = false;
    };
  }, []);

  const contacto = resumen?.contacto;
  const validador = resumen?.validador;
  const porcentajeAtendidas = calcularPorcentaje(contacto?.atendidas ?? 0, contacto?.total ?? 0);
  const porcentajeVigentes = calcularPorcentaje(validador?.vigentes ?? 0, validador?.total ?? 0);
  const tarjetasContacto = [
    {
      titulo: "Total de solicitudes",
      valor: contacto?.total ?? 0,
      descripcion: `${porcentajeAtendidas}% atendidas hasta ahora`,
      color: "var(--azul-timbox)",
      icono: ContactMailRoundedIcon,
    },
    {
      titulo: "Atendidas",
      valor: contacto?.atendidas ?? 0,
      descripcion: `${contacto?.pendientes ?? 0} siguen pendientes`,
      color: "var(--rojo-timbox)",
      icono: CheckCircleRoundedIcon,
    },
  ];
  const tarjetasValidador = [
    {
      titulo: "Validaciones realizadas",
      valor: validador?.total ?? 0,
      descripcion: `${porcentajeVigentes}% resultaron vigentes`,
      color: "#2f8f6b",
      icono: FactCheckRoundedIcon,
    },
    {
      titulo: "Con incidencias CFDI",
      valor: (validador?.cancelados ?? 0) + (validador?.noEncontrados ?? 0) + (validador?.errores ?? 0),
      descripcion: "Cancelados, no encontrados o con error",
      color: "#d59b2d",
      icono: WarningAmberRoundedIcon,
    },
  ];

  return (
    <Box sx={{ color: "var(--azul-timbox)", fontFamily: "var(--fuente-regular)" }}>
      <AlertasServicio
        abierta={alerta.abierta}
        tipo="error"
        titulo={alerta.titulo}
        descripcion={alerta.descripcion}
        onCerrar={() => setAlerta({ abierta: false, titulo: "", descripcion: "" })}
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
          <Typography component="h1" sx={{ fontFamily: "var(--fuente-regular)", fontSize: 28, fontWeight: 900 }}>
            Dashboard
          </Typography>
        </Box>

        <Button
          type="button"
          onClick={() => void cargarDashboard()}
          disabled={cargando}
          startIcon={cargando ? <CircularProgress size={16} sx={{ color: "inherit" }} /> : <RefreshRoundedIcon />}
          sx={{
            minWidth: 132,
            height: 40,
            borderRadius: "6px",
            bgcolor: "var(--azul-timbox)",
            color: "var(--blanco-timbox)",
            fontFamily: "var(--fuente-regular)",
            textTransform: "none",
            "&:hover": {
              bgcolor: "#203348",
            },
            "&.Mui-disabled": {
              bgcolor: "#c8d0d9",
              color: "var(--blanco-timbox)",
            },
          }}
        >
          Actualizar
        </Button>
      </Box>

      {cargando && !resumen ? (
        <Box sx={{ minHeight: 440, display: "grid", placeItems: "center" }}>
          <CircularProgress sx={{ color: "var(--rojo-timbox)" }} />
        </Box>
      ) : (
        <>
          <Box component="section" aria-labelledby="seccion-contacto" sx={{ mb: 4 }}>
            <Typography id="seccion-contacto" component="h2" sx={{ fontFamily: "var(--fuente-regular)", color: "var(--rojo-timbox)", fontSize: 22, fontWeight: 800, mb: 2 }}>
              Solicitudes de contacto
            </Typography>

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" }, gap: 2, mb: 2.4 }}>
              {tarjetasContacto.map((tarjeta) => (
                <TarjetaIndicador key={tarjeta.titulo} {...tarjeta} />
              ))}
            </Box>

            <Box sx={{ mb: 2.4 }}>
              <Panel titulo="Solicitudes en los últimos 14 días">
                <SerieBarras datos={contacto?.porDia ?? []} color="var(--rojo-timbox)" />
              </Panel>
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" }, gap: 2.4 }}>
              <Panel titulo="Origen de solicitudes">
                <BarrasHorizontales datos={contacto?.porOrigen ?? []} total={contacto?.total ?? 0} />
              </Panel>

              <Panel titulo="Solicitudes por estatus">
                <BarrasHorizontales datos={contacto?.porEstatus ?? []} total={contacto?.total ?? 0} />
              </Panel>
            </Box>
          </Box>

          <Box component="section" aria-labelledby="seccion-validador" sx={{ borderTop: "1px solid #dce1e7", pt: 3.5 }}>
            <Typography id="seccion-validador" component="h2" sx={{ fontFamily: "var(--fuente-regular)", color: "var(--rojo-timbox)", fontSize: 22, fontWeight: 800, mb: 2 }}>
              Validador de comprobantes fiscales
            </Typography>

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" }, gap: 2, mb: 2.4 }}>
              {tarjetasValidador.map((tarjeta) => (
                <TarjetaIndicador key={tarjeta.titulo} {...tarjeta} />
              ))}
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", xl: "1fr 1fr" }, gap: 2.4 }}>
              <Panel titulo="Uso del validador en los últimos 14 días">
                <SerieBarras datos={validador?.porDia ?? []} color="var(--azul-timbox)" />
              </Panel>

              <Panel titulo="Resultados del validador">
                <BarrasHorizontales datos={validador?.porResultado ?? []} total={validador?.total ?? 0} />
                <Box sx={{ mt: 2.4, display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" }, gap: 1.2 }}>
                  {[
                    { etiqueta: "Vigentes", valor: validador?.vigentes ?? 0, icono: CheckCircleRoundedIcon, color: "#2f8f6b" },
                    { etiqueta: "No encontrados", valor: validador?.noEncontrados ?? 0, icono: HourglassTopRoundedIcon, color: "var(--azul-timbox)" },
                    { etiqueta: "Errores", valor: validador?.errores ?? 0, icono: WarningAmberRoundedIcon, color: "#d59b2d" },
                  ].map((item) => {
                    const Icono = item.icono;

                    return (
                      <Box key={item.etiqueta} sx={{ border: "1px solid #edf1f5", borderRadius: "8px", p: 1.4, display: "grid", gridTemplateColumns: "32px 1fr", gap: 1, alignItems: "center" }}>
                        <Icono sx={{ color: item.color, fontSize: 26 }} />
                        <Box>
                          <Typography sx={{ color: "#6b7685", fontFamily: "var(--fuente-regular)", fontSize: 12.5 }}>
                            {item.etiqueta}
                          </Typography>
                          <Typography sx={{ color: "var(--azul-timbox)", fontFamily: "var(--fuente-regular)", fontSize: 22, fontWeight: 900, lineHeight: 1 }}>
                            {formatearNumero(item.valor)}
                          </Typography>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Panel>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}
