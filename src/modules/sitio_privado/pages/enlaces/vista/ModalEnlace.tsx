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
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  crearEdicion,
  validarEdicion,
  type EdicionEnlace,
  type EnlaceAdministrable,
  type ErroresEnlace,
} from "../servicio/enlacesServicio";

interface Props {
  enlace: EnlaceAdministrable;
  guardando: boolean;
  onCerrar: () => void;
  onGuardar: (edicion: EdicionEnlace) => Promise<void>;
}

export function ModalEnlace({ enlace, guardando, onCerrar, onGuardar }: Props) {
  const [edicion, setEdicion] = useState<EdicionEnlace>(() => crearEdicion(enlace));
  const [errores, setErrores] = useState<ErroresEnlace>({});

  const enviar = async () => {
    const nuevosErrores = validarEdicion(edicion);
    setErrores(nuevosErrores);

    if (Object.values(nuevosErrores).some(Boolean)) {
      return;
    }

    await onGuardar(edicion);
  };

  return (
    <Dialog open onClose={guardando ? undefined : onCerrar} fullWidth maxWidth="md">
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "var(--azul-timbox)",
          color: "white",
        }}
      >
        <Box>
          <Typography sx={{ fontFamily: "var(--fuente-regular)", fontSize: 20, fontWeight: 800 }}>
            Editar enlace
          </Typography>
          <Typography sx={{ fontSize: 13, opacity: 0.8 }}>{enlace.clave}</Typography>
        </Box>
        <IconButton onClick={onCerrar} disabled={guardando} sx={{ color: "white" }}>
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: "28px !important" }}>
        <Box sx={{ display: "grid", gap: 2.2 }}>
          <TextField
            label="URL"
            value={edicion.url}
            onChange={(event) =>
              setEdicion((actual) => ({ ...actual, url: event.target.value }))
            }
            error={Boolean(errores.url)}
            helperText={errores.url}
            fullWidth
          />

          <FormControlLabel
            control={
              <Switch
                checked={edicion.activo}
                onChange={(_, activo) => setEdicion((actual) => ({ ...actual, activo }))}
                sx={{ "& .MuiSwitch-switchBase.Mui-checked": { color: "var(--rojo-timbox)" } }}
              />
            }
            label="Disponible para el sitio público"
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
