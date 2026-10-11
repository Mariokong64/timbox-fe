import { useState } from "react";
import {
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
} from "@mui/material";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import type { UsuarioListado } from "../servicio/usuariosServicio";
import { TablaPrivada } from "../../../components/TablaPrivada";

interface TablaUsuariosProps {
  usuarios: UsuarioListado[];
  cargando: boolean;
  puedeEditar: boolean;
  puedeEliminar: boolean;
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

export function TablaUsuarios({ usuarios, cargando, puedeEditar, puedeEliminar, onEditar, onEliminar }: TablaUsuariosProps) {
  const mostrarAcciones = puedeEditar || puedeEliminar;
  const [busqueda, setBusqueda] = useState("");
  const consulta = busqueda.trim().toLocaleLowerCase("es");
  const visibles = usuarios.filter((usuario) =>
    !consulta || [usuario.usuario, usuario.nombre, usuario.correo, formatearFecha(usuario.fechaRegistro)]
      .some((valor) => valor.toLocaleLowerCase("es").includes(consulta))
  );

  return (
    <TablaPrivada
      busqueda={busqueda}
      onCambiarBusqueda={setBusqueda}
      columnas={[
        { id: "usuario", titulo: "Usuario" },
        { id: "nombre", titulo: "Nombre" },
        { id: "correo", titulo: "Correo" },
        { id: "registro", titulo: "Registro" },
        ...(mostrarAcciones ? [{ id: "acciones", titulo: "Acciones", align: "center" as const }] : []),
      ]}
      anchoMinimo={mostrarAcciones ? 840 : 740}
      cargando={cargando}
      vacia={visibles.length === 0}
      mensajeCargando="Cargando usuarios..."
      mensajeVacio={consulta ? "No hay usuarios que coincidan con la búsqueda." : "Todavía no hay usuarios registrados."}
      filas={visibles.map((usuario) => (
        <TableRow key={usuario.id} hover>
          <TableCell>{usuario.usuario}</TableCell>
          <TableCell>{usuario.nombre}</TableCell>
          <TableCell>{usuario.correo}</TableCell>
          <TableCell>{formatearFecha(usuario.fechaRegistro)}</TableCell>
          {mostrarAcciones && (
            <TableCell align="center">
              {puedeEditar && (
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
              )}
              {puedeEliminar && (
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
              )}
            </TableCell>
          )}
        </TableRow>
      ))}
    />
  );
}
