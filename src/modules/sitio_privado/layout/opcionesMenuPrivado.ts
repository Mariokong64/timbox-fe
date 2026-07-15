import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import ContactMailRoundedIcon from "@mui/icons-material/ContactMailRounded";
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
    texto: "Contenidos",
    ruta: "/privado/contenidos",
    icono: ArticleRoundedIcon,
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
