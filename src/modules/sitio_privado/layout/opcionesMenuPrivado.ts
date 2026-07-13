import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";

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
];
