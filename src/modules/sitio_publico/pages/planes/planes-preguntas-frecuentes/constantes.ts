import type { ItemMenuDocumentacion } from "../../../components/LayoutDocumentacionPublica";
import imagenDudasPlanes from "../../soporte/assets/Componente-33.webp";

export const rutaTimbresBajoDemanda = "/planes/preguntas-frecuentes";
export const rutaTimbresPrepago = "/planes/preguntas-frecuentes/timbres-prepago";
export const imagenPreguntasFrecuentesPlanes = imagenDudasPlanes;

export const menuPreguntasFrecuentesPlanes: ItemMenuDocumentacion[] = [
  {
    texto: "Timbres Bajo demanda",
    to: rutaTimbresBajoDemanda,
  },
  {
    texto: "Timbres Pre pago",
    to: rutaTimbresPrepago,
  },
];
