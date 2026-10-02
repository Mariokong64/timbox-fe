import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ContactMailRoundedIcon from "@mui/icons-material/ContactMailRounded";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";

export interface OpcionMenuPrivado {
  clave: string;
  texto: string;
  ruta: string;
  icono: typeof DashboardRoundedIcon;
}

export const opcionesMenuPrivado: OpcionMenuPrivado[] = [
  {
    clave: "DASHBOARD",
    texto: "Dashboard",
    ruta: "/privado",
    icono: DashboardRoundedIcon,
  },
  {
    clave: "ENLACES",
    texto: "Enlaces",
    ruta: "/privado/enlaces",
    icono: LinkRoundedIcon,
  },
  {
    clave: "SOLICITUDES",
    texto: "Solicitudes",
    ruta: "/privado/solicitudes",
    icono: ContactMailRoundedIcon,
  },
  {
    clave: "USUARIOS",
    texto: "Usuarios",
    ruta: "/privado/usuarios",
    icono: PeopleAltRoundedIcon,
  },
];
