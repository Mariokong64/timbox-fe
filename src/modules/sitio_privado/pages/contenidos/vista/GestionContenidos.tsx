import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import TextFieldsRoundedIcon from "@mui/icons-material/TextFieldsRounded";
import {
  cambiarActivo,
  eliminarRecurso,
  guardarRecurso,
  listarRecursos,
  listarSecciones,
  mensajeError,
  type RecursoAdministrable,
  type RecursoFormulario,
  type SeccionAdministrable,
  type TipoRecurso,
} from "../servicio/contenidosServicio";
import { ModalRecursoContenido } from "./ModalRecursoContenido";

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

export function GestionContenidos() {
  const [tipo, setTipo] = useState<TipoRecurso>("contenido");
  const [secciones, setSecciones] = useState<SeccionAdministrable[]>([]);
  const [recursos, setRecursos] = useState<RecursoAdministrable[]>([]);
  const [seccionId, setSeccionId] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [editando, setEditando] = useState<RecursoAdministrable | null>(null);
  const [porEliminar, setPorEliminar] = useState<RecursoAdministrable | null>(null);
  const [alerta, setAlerta] = useState<Alerta | null>(null);

  const cargar = useCallback(async () => {
    setCargando(true);

    try {
      const [nuevasSecciones, nuevosRecursos] = await Promise.all([
        listarSecciones(tipo),
        listarRecursos(tipo),
      ]);
      setSecciones(nuevasSecciones);
      setRecursos(nuevosRecursos);
    } catch (error) {
      setAlerta({ tipo: "error", mensaje: mensajeError(error) });
    } finally {
      setCargando(false);
    }
  }, [tipo]);

  useEffect(() => {
    let activo = true;

    void Promise.all([listarSecciones(tipo), listarRecursos(tipo)])
      .then(([nuevasSecciones, nuevosRecursos]) => {
        if (activo) {
          setSecciones(nuevasSecciones);
          setRecursos(nuevosRecursos);
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
  }, [tipo]);

  const cambiarTipo = (nuevoTipo: TipoRecurso) => {
    if (nuevoTipo === tipo) {
      return;
    }

    setSeccionId("");
    setBusqueda("");
    setEditando(null);
    setCargando(true);
    setTipo(nuevoTipo);
  };

  const visibles = useMemo(() => {
    const consulta = busqueda.trim().toLocaleLowerCase("es");

    return recursos.filter((recurso) => {
      const coincideSeccion = !seccionId || recurso.seccion.id === seccionId;
      const coincideBusqueda =
        !consulta ||
        recurso.clave.toLocaleLowerCase("es").includes(consulta) ||
        recurso.valor.toLocaleLowerCase("es").includes(consulta) ||
        recurso.seccion.nombre.toLocaleLowerCase("es").includes(consulta);

      return coincideSeccion && coincideBusqueda;
    });
  }, [busqueda, recursos, seccionId]);

  const abrirNuevo = () => {
    setEditando(null);
    setModalAbierto(true);
  };

  const guardar = async (formulario: RecursoFormulario) => {
    setGuardando(true);

    try {
      const mensaje = await guardarRecurso(tipo, formulario, editando);
      setAlerta({ tipo: "success", mensaje });
      setModalAbierto(false);
      setEditando(null);
      await cargar();
    } catch (error) {
      setAlerta({ tipo: "error", mensaje: mensajeError(error) });
    } finally {
      setGuardando(false);
    }
  };

  const alternarActivo = async (recurso: RecursoAdministrable) => {
    setGuardando(true);

    try {
      await cambiarActivo(tipo, recurso);
      setRecursos((actuales) =>
        actuales.map((item) =>
          item.id === recurso.id ? { ...item, activo: !item.activo } : item
        )
      );
      setAlerta({
        tipo: "success",
        mensaje: `${tipo === "contenido" ? "Contenido" : "Enlace"} ${
          recurso.activo ? "desactivado" : "activado"
        } correctamente.`,
      });
    } catch (error) {
      setAlerta({ tipo: "error", mensaje: mensajeError(error) });
    } finally {
      setGuardando(false);
    }
  };

  const confirmarEliminacion = async () => {
    if (!porEliminar) {
      return;
    }

    setGuardando(true);

    try {
      const mensaje = await eliminarRecurso(tipo, porEliminar.id);
      setAlerta({ tipo: "success", mensaje });
      setPorEliminar(null);
      await cargar();
    } catch (error) {
      setAlerta({ tipo: "error", mensaje: mensajeError(error) });
    } finally {
      setGuardando(false);
    }
  };

  const etiqueta = tipo === "contenido" ? "contenido" : "enlace";

  return (
    <Box sx={{ color: "var(--azul-timbox)" }}>
      <Snackbar
        open={Boolean(alerta)}
        autoHideDuration={4500}
        onClose={() => setAlerta(null)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={alerta?.tipo ?? "success"} onClose={() => setAlerta(null)} variant="filled">
          {alerta?.mensaje}
        </Alert>
      </Snackbar>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: { xs: "flex-start", md: "center" }, gap: 2, mb: 2.2, flexDirection: { xs: "column", md: "row" } }}>
        <Box>
          <Typography component="h1" sx={{ fontFamily: "var(--fuente-regular)", fontSize: 28, fontWeight: 800 }}>
            Gestión de contenidos
          </Typography>
          <Typography sx={{ color: "#6b7685", fontSize: 14 }}>
            Administra textos y enlaces sin modificar el código del sitio público.
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="Actualizar">
            <IconButton onClick={() => void cargar()} disabled={cargando || guardando} sx={{ color: "var(--azul-timbox)", border: "1px solid #dce1e7", borderRadius: "6px" }}>
              <RefreshRoundedIcon />
            </IconButton>
          </Tooltip>
          <Button
            startIcon={<AddRoundedIcon />}
            onClick={abrirNuevo}
            disabled={secciones.length === 0}
            sx={{ bgcolor: "var(--rojo-timbox)", color: "white", textTransform: "none", borderRadius: "6px", "&:hover": { bgcolor: "#f04a32" } }}
          >
            Nuevo {etiqueta}
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", mb: 1.8, borderRadius: "7px", overflow: "hidden", border: "1px solid #dce1e7" }}>
        {([
          ["contenido", "Textos del sitio", <TextFieldsRoundedIcon key="texto" />],
          ["url", "Enlaces URL", <LinkRoundedIcon key="url" />],
        ] as const).map(([valor, texto, icono]) => (
          <Button
            key={valor}
            startIcon={icono}
            onClick={() => cambiarTipo(valor)}
            sx={{
              py: 1.4,
              borderRadius: 0,
              bgcolor: tipo === valor ? "var(--azul-timbox)" : "#f3f4f6",
              color: tipo === valor ? "white" : "#66717f",
              fontWeight: 700,
              textTransform: "none",
              "&:hover": { bgcolor: tipo === valor ? "var(--azul-timbox)" : "#e9ebee" },
            }}
          >
            {texto}
          </Button>
        ))}
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
            <Typography color="#687485">Cargando {etiqueta}s...</Typography>
          </Box>
        ) : visibles.length === 0 ? (
          <Box sx={{ py: 8, textAlign: "center" }}>
            <Typography sx={{ fontWeight: 700 }}>No hay resultados en esta sección.</Typography>
            <Typography sx={{ color: "#6b7685", mt: 0.5 }}>Puedes crear un registro o cambiar los filtros.</Typography>
          </Box>
        ) : (
          <Box sx={{ overflowX: "auto", maxHeight: "calc(100vh - 365px)", overflowY: "auto" }}>
            <Table stickyHeader sx={{ minWidth: 900 }}>
              <TableHead>
                <TableRow sx={{ "& th": { bgcolor: "var(--azul-timbox)", color: "white", fontWeight: 800 } }}>
                  <TableCell>Clave</TableCell>
                  <TableCell>Sección</TableCell>
                  <TableCell>{tipo === "contenido" ? "Contenido" : "URL"}</TableCell>
                  <TableCell align="center">Activo</TableCell>
                  <TableCell>Actualización</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visibles.map((recurso) => (
                  <TableRow key={recurso.id} hover>
                    <TableCell sx={{ fontWeight: 700, maxWidth: 240, overflowWrap: "anywhere" }}>{recurso.clave}</TableCell>
                    <TableCell>{recurso.seccion.nombre}</TableCell>
                    <TableCell sx={{ maxWidth: 520 }}>
                      <Typography
                        component={tipo === "url" ? "a" : "span"}
                        {...(tipo === "url" ? { href: recurso.valor, target: "_blank", rel: "noreferrer" } : {})}
                        sx={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", color: tipo === "url" ? "#1769aa" : "inherit", overflowWrap: "anywhere" }}
                      >
                        {recurso.valor}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Switch checked={recurso.activo} disabled={guardando} onChange={() => void alternarActivo(recurso)} size="small" sx={{ "& .MuiSwitch-switchBase.Mui-checked": { color: "var(--rojo-timbox)" } }} />
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>{formatearFecha(recurso.fechaActualizacion)}</TableCell>
                    <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
                      <Tooltip title="Editar">
                        <IconButton onClick={() => { setEditando(recurso); setModalAbierto(true); }} sx={{ color: "var(--azul-timbox)" }}>
                          <EditRoundedIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Eliminar">
                        <IconButton onClick={() => setPorEliminar(recurso)} sx={{ color: "var(--rojo-timbox)" }}>
                          <DeleteOutlineRoundedIcon />
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

      {modalAbierto && (
        <ModalRecursoContenido
          abierto
          tipo={tipo}
          secciones={secciones}
          seccionInicial={seccionId}
          recurso={editando}
          guardando={guardando}
          onCerrar={() => { if (!guardando) { setModalAbierto(false); setEditando(null); } }}
          onGuardar={guardar}
        />
      )}

      <Dialog open={Boolean(porEliminar)} onClose={guardando ? undefined : () => setPorEliminar(null)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>Eliminar {etiqueta}</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Seguro que quieres eliminar <strong>{porEliminar?.clave}</strong>? Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={() => setPorEliminar(null)} disabled={guardando} sx={{ color: "var(--azul-timbox)", textTransform: "none" }}>Cancelar</Button>
          <Button onClick={() => void confirmarEliminacion()} disabled={guardando} sx={{ bgcolor: "var(--rojo-timbox)", color: "white", textTransform: "none", "&:hover": { bgcolor: "#f04a32" } }}>
            {guardando ? "Eliminando..." : "Eliminar"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
