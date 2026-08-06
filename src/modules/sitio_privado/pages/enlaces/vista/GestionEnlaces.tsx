import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Chip,
  CircularProgress,
  IconButton,
  InputAdornment,
  Snackbar,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import {
  cambiarActivo,
  guardarEnlace,
  listarEnlaces,
  listarSecciones,
  mensajeError,
  type EdicionEnlace,
  type EnlaceAdministrable,
  type SeccionAdministrable,
} from "../servicio/enlacesServicio";
import { ModalEnlace } from "./ModalEnlace";

interface Alerta {
  tipo: "success" | "error";
  mensaje: string;
}

function formatearFecha(valor: string): string {
  const fecha = new Date(valor);
  return Number.isNaN(fecha.getTime())
    ? "-"
    : fecha.toLocaleString("es-MX", { dateStyle: "medium", timeStyle: "short" });
}

export function GestionEnlaces() {
  const [secciones, setSecciones] = useState<SeccionAdministrable[]>([]);
  const [enlaces, setEnlaces] = useState<EnlaceAdministrable[]>([]);
  const [seccionId, setSeccionId] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [editando, setEditando] = useState<EnlaceAdministrable | null>(null);
  const [alerta, setAlerta] = useState<Alerta | null>(null);

  const cargar = useCallback(async () => {
    setCargando(true);

    try {
      const [nuevasSecciones, nuevosEnlaces] = await Promise.all([
        listarSecciones(),
        listarEnlaces(),
      ]);
      setSecciones(nuevasSecciones);
      setEnlaces(nuevosEnlaces);
    } catch (error) {
      setAlerta({ tipo: "error", mensaje: mensajeError(error) });
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    let activo = true;

    void Promise.all([listarSecciones(), listarEnlaces()])
      .then(([nuevasSecciones, nuevosEnlaces]) => {
        if (activo) {
          setSecciones(nuevasSecciones);
          setEnlaces(nuevosEnlaces);
        }
      })
      .catch((error: unknown) => {
        if (activo) {
          setAlerta({ tipo: "error", mensaje: mensajeError(error) });
        }
      })
      .finally(() => {
        if (activo) {
          setCargando(false);
        }
      });

    return () => {
      activo = false;
    };
  }, []);

  const visibles = useMemo(() => {
    const consulta = busqueda.trim().toLocaleLowerCase("es");

    return enlaces.filter((enlace) => {
      const coincideSeccion = !seccionId || enlace.seccion.id === seccionId;
      const coincideBusqueda =
        !consulta ||
        enlace.clave.toLocaleLowerCase("es").includes(consulta) ||
        enlace.url.toLocaleLowerCase("es").includes(consulta) ||
        enlace.seccion.nombre.toLocaleLowerCase("es").includes(consulta);

      return coincideSeccion && coincideBusqueda;
    });
  }, [busqueda, enlaces, seccionId]);

  const guardar = async (edicion: EdicionEnlace) => {
    if (!editando) {
      return;
    }

    setGuardando(true);

    try {
      const { enlace, mensaje } = await guardarEnlace(editando.id, edicion);
      setEnlaces((actuales) =>
        actuales.map((item) => (item.id === enlace.id ? enlace : item))
      );
      setAlerta({ tipo: "success", mensaje });
      setEditando(null);
    } catch (error) {
      setAlerta({ tipo: "error", mensaje: mensajeError(error) });
    } finally {
      setGuardando(false);
    }
  };

  const alternarActivo = async (enlace: EnlaceAdministrable) => {
    setGuardando(true);

    try {
      const enlaceActualizado = await cambiarActivo(enlace);
      setEnlaces((actuales) =>
        actuales.map((item) =>
          item.id === enlaceActualizado.id ? enlaceActualizado : item
        )
      );
      setAlerta({
        tipo: "success",
        mensaje: `Enlace ${enlace.activo ? "desactivado" : "activado"} correctamente.`,
      });
    } catch (error) {
      setAlerta({ tipo: "error", mensaje: mensajeError(error) });
    } finally {
      setGuardando(false);
    }
  };

  return (
    <Box sx={{ color: "var(--azul-timbox)" }}>
      <Snackbar
        open={Boolean(alerta)}
        autoHideDuration={4500}
        onClose={() => setAlerta(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity={alerta?.tipo ?? "success"} onClose={() => setAlerta(null)} variant="filled">
          {alerta?.mensaje}
        </Alert>
      </Snackbar>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: { xs: "flex-start", md: "center" }, gap: 2, mb: 2.2, flexDirection: { xs: "column", md: "row" } }}>
        <Box>
          <Typography component="h1" sx={{ fontFamily: "var(--fuente-regular)", fontSize: 28, fontWeight: 800 }}>
            Gestión de enlaces
          </Typography>
          <Typography sx={{ color: "#6b7685", fontSize: 14 }}>
            Actualiza las URL publicadas y controla cuáles están activas.
          </Typography>
        </Box>
        <Tooltip title="Actualizar">
          <IconButton onClick={() => void cargar()} disabled={cargando || guardando} sx={{ color: "var(--azul-timbox)", border: "1px solid #dce1e7", borderRadius: "6px" }}>
            <RefreshRoundedIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 1, mb: 1.8 }}>
        <Chip label="Todas" onClick={() => setSeccionId("")} variant={seccionId ? "outlined" : "filled"} sx={!seccionId ? { bgcolor: "#ffe8e3", color: "var(--rojo-timbox)", fontWeight: 700 } : undefined} />
        {secciones.map((seccion) => (
          <Chip
            key={seccion.id}
            label={seccion.nombre}
            onClick={() => setSeccionId(seccion.id)}
            variant={seccionId === seccion.id ? "filled" : "outlined"}
            sx={seccionId === seccion.id ? { bgcolor: "#ffe8e3", color: "var(--rojo-timbox)", fontWeight: 700 } : undefined}
          />
        ))}
        <Typography sx={{ fontWeight: 800, ml: { sm: 1 } }}>
          {visibles.length} {visibles.length === 1 ? "registro" : "registros"}
        </Typography>
        <TextField
          size="small"
          placeholder="Buscar en estos resultados..."
          value={busqueda}
          onChange={(event) => setBusqueda(event.target.value)}
          sx={{ ml: { sm: "auto" }, width: { xs: "100%", sm: 340 }, "& .MuiOutlinedInput-root": { borderRadius: "20px" } }}
          slotProps={{ input: { startAdornment: <InputAdornment position="start"><SearchRoundedIcon /></InputAdornment> } }}
        />
      </Box>

      <Box sx={{ border: "1px solid #dce1e7", borderRadius: "8px", overflow: "hidden", bgcolor: "white" }}>
        {cargando ? (
          <Box sx={{ py: 8, display: "grid", placeItems: "center", gap: 1.5 }}>
            <CircularProgress size={30} sx={{ color: "var(--rojo-timbox)" }} />
            <Typography color="#687485">Cargando enlaces...</Typography>
          </Box>
        ) : visibles.length === 0 ? (
          <Box sx={{ py: 8, textAlign: "center" }}>
            <Typography sx={{ fontWeight: 700 }}>No hay resultados en esta sección.</Typography>
            <Typography sx={{ color: "#6b7685", mt: 0.5 }}>Prueba con otros filtros de búsqueda.</Typography>
          </Box>
        ) : (
          <Box sx={{ overflowX: "auto", maxHeight: "calc(100vh - 300px)", overflowY: "auto" }}>
            <Table stickyHeader sx={{ minWidth: 900 }}>
              <TableHead>
                <TableRow sx={{ "& th": { bgcolor: "var(--azul-timbox)", color: "white", fontWeight: 800 } }}>
                  <TableCell>Clave</TableCell>
                  <TableCell>Sección</TableCell>
                  <TableCell>URL</TableCell>
                  <TableCell align="center">Activo</TableCell>
                  <TableCell>Última Actualización</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visibles.map((enlace) => (
                  <TableRow key={enlace.id} hover>
                    <TableCell sx={{ fontWeight: 700, maxWidth: 240, overflowWrap: "anywhere" }}>{enlace.clave}</TableCell>
                    <TableCell>{enlace.seccion.nombre}</TableCell>
                    <TableCell sx={{ maxWidth: 520 }}>
                      <Typography
                        component="a"
                        href={enlace.url}
                        target="_blank"
                        rel="noreferrer"
                        sx={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", color: "#1769aa", overflowWrap: "anywhere" }}
                      >
                        {enlace.url}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Switch checked={enlace.activo} disabled={guardando} onChange={() => void alternarActivo(enlace)} size="small" sx={{ "& .MuiSwitch-switchBase.Mui-checked": { color: "var(--rojo-timbox)" } }} />
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>{formatearFecha(enlace.fechaActualizacion)}</TableCell>
                    <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
                      <Tooltip title="Editar URL y estado">
                        <IconButton onClick={() => setEditando(enlace)} sx={{ color: "var(--azul-timbox)" }}>
                          <EditRoundedIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        )}
      </Box>

      {editando && (
        <ModalEnlace
          enlace={editando}
          guardando={guardando}
          onCerrar={() => { if (!guardando) setEditando(null); }}
          onGuardar={guardar}
        />
      )}
    </Box>
  );
}
