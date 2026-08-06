import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ContactMailRoundedIcon from "@mui/icons-material/ContactMailRounded";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";

export interface OpcionMenuPrivado {
  texto: string;
  ruta: string;
  icono: typeof DashboardRoundedIcon;
}

export const opcionesMenuPrivado: OpcionMenuPrivado[] = [
  {
    texto: "Dashboard",
    ruta: "/privado",
    icono: DashboardRoundedIcon,
  },
  {
    texto: "Enlaces",
    ruta: "/privado/enlaces",
    icono: LinkRoundedIcon,
  },
  {
    texto: "Solicitudes",
    ruta: "/privado/solicitudes",
    icono: ContactMailRoundedIcon,
  },
  {
    texto: "Usuarios",
    ruta: "/privado/usuarios",
    icono: PeopleAltRoundedIcon,
  },
];
