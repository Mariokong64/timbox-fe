import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  MenuItem,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  crearFormulario,
  validarFormulario,
  type ErroresRecurso,
  type RecursoAdministrable,
  type RecursoFormulario,
  type SeccionAdministrable,
  type TipoRecurso,
} from "../servicio/contenidosServicio";

interface Props {
  abierto: boolean;
  tipo: TipoRecurso;
  secciones: SeccionAdministrable[];
  seccionInicial: string;
  recurso: RecursoAdministrable | null;
  guardando: boolean;
  onCerrar: () => void;
  onGuardar: (formulario: RecursoFormulario) => Promise<void>;
}

export function ModalRecursoContenido({
  abierto,
  tipo,
  secciones,
  seccionInicial,
  recurso,
  guardando,
  onCerrar,
  onGuardar,
}: Props) {
  const [formulario, setFormulario] = useState<RecursoFormulario>(() =>
    crearFormulario(tipo, seccionInicial || secciones[0]?.id || "", recurso)
  );
  const [errores, setErrores] = useState<ErroresRecurso>({});

  const enviar = async () => {
    const nuevosErrores = validarFormulario(tipo, formulario);
    setErrores(nuevosErrores);

    if (Object.values(nuevosErrores).some(Boolean)) {
      return;
    }

    await onGuardar(formulario);
  };

  const valor = tipo === "contenido" ? formulario.contenido ?? "" : formulario.url ?? "";

  return (
    <Dialog open={abierto} onClose={guardando ? undefined : onCerrar} fullWidth maxWidth="md">
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "var(--azul-timbox)",
          color: "white",
        }}
      >
        <Typography sx={{ fontFamily: "var(--fuente-regular)", fontSize: 20, fontWeight: 800 }}>
          {recurso ? "Editar" : "Crear"} {tipo === "contenido" ? "contenido" : "enlace"}
        </Typography>
        <IconButton onClick={onCerrar} disabled={guardando} sx={{ color: "white" }}>
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2.2, pt: 0.5 }}>
          <TextField
            select
            label="Sección"
            value={formulario.seccionId}
            onChange={(event) =>
              setFormulario((actual) => ({ ...actual, seccionId: event.target.value }))
            }
            error={Boolean(errores.seccionId)}
            helperText={errores.seccionId}
            fullWidth
          >
            {secciones.map((seccion) => (
              <MenuItem key={seccion.id} value={seccion.id}>
                {seccion.nombre}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Clave técnica"
            value={formulario.clave}
            onChange={(event) =>
              setFormulario((actual) => ({ ...actual, clave: event.target.value.toLowerCase() }))
            }
            error={Boolean(errores.clave)}
            helperText={errores.clave || "Ejemplo: empresa.titulo_principal"}
            fullWidth
          />

          <TextField
            label={tipo === "contenido" ? "Texto administrable" : "URL"}
            value={valor}
            onChange={(event) =>
              setFormulario((actual) => ({
                ...actual,
                [tipo === "contenido" ? "contenido" : "url"]: event.target.value,
              }))
            }
            error={Boolean(errores.valor)}
            helperText={errores.valor}
            multiline={tipo === "contenido"}
            minRows={tipo === "contenido" ? 7 : undefined}
            fullWidth
            sx={{ gridColumn: "1 / -1" }}
          />

          <FormControlLabel
            control={
              <Switch
                checked={formulario.activo}
                onChange={(_, activo) => setFormulario((actual) => ({ ...actual, activo }))}
                sx={{ "& .MuiSwitch-switchBase.Mui-checked": { color: "var(--rojo-timbox)" } }}
              />
            }
            label="Disponible para el sitio público"
            sx={{ gridColumn: "1 / -1" }}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button onClick={onCerrar} disabled={guardando} sx={{ color: "var(--azul-timbox)", textTransform: "none" }}>
          Cancelar
        </Button>
        <Button
          onClick={() => void enviar()}
          disabled={guardando}
          sx={{
            minWidth: 120,
            bgcolor: "var(--rojo-timbox)",
            color: "white",
            textTransform: "none",
            "&:hover": { bgcolor: "#f04a32" },
          }}
        >
          {guardando ? "Guardando..." : "Guardar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
