import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import type { UsuarioListado } from "../servicio/usuariosServicio";

interface TablaUsuariosProps {
  usuarios: UsuarioListado[];
  cargando: boolean;
  onEditar: (usuario: UsuarioListado) => void;
  onEliminar: (usuario: UsuarioListado) => void;
}

function formatearFecha(valor?: string | null): string {
  if (!valor) {
    return "-";
  }

  const fecha = new Date(valor);

  if (Number.isNaN(fecha.getTime())) {
    return valor;
  }

  return fecha.toLocaleDateString("es-MX", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export function TablaUsuarios({ usuarios, cargando, onEditar, onEliminar }: TablaUsuariosProps) {
  if (cargando) {
    return (
      <Box sx={{ py: 6, textAlign: "center", color: "#637083" }}>
        <Typography sx={{ fontFamily: "var(--fuente-regular)" }}>Cargando usuarios...</Typography>
      </Box>
    );
  }

  if (usuarios.length === 0) {
    return (
      <Box sx={{ py: 6, textAlign: "center", color: "#637083" }}>
        <Typography sx={{ fontFamily: "var(--fuente-regular)" }}>Todavía no hay usuarios registrados.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <Table
        sx={{
          minWidth: 840,
          border: "1px solid #dce1e7",
          "& th": {
            bgcolor: "var(--azul-timbox)",
            color: "var(--blanco-timbox)",
            fontFamily: "var(--fuente-regular)",
            fontSize: 15,
            fontWeight: 700,
          },
          "& td": {
            color: "var(--azul-timbox)",
            fontFamily: "var(--fuente-regular)",
            fontSize: 14,
          },
          "& th, & td": {
            borderBottom: "1px solid #dce1e7",
          },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>Usuario</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Correo</TableCell>
            <TableCell>Registro</TableCell>
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usuarios.map((usuario) => (
            <TableRow key={usuario.id} hover>
              <TableCell>{usuario.usuario}</TableCell>
              <TableCell>{usuario.nombre}</TableCell>
              <TableCell>{usuario.correo}</TableCell>
              <TableCell>{formatearFecha(usuario.fechaRegistro)}</TableCell>
              <TableCell align="center">
                <Tooltip title="Editar usuario">
                  <IconButton
                    type="button"
                    aria-label={`Editar ${usuario.usuario}`}
                    onClick={() => onEditar(usuario)}
                    sx={{ color: "var(--azul-timbox)" }}
                  >
                    <EditRoundedIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Eliminar usuario">
                  <IconButton
                    type="button"
                    aria-label={`Eliminar ${usuario.usuario}`}
                    onClick={() => onEliminar(usuario)}
                    sx={{ color: "var(--rojo-timbox)" }}
                  >
                    <DeleteOutlineRoundedIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
