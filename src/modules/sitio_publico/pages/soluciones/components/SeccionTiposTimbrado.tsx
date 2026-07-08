import { Box } from "@mui/material";
import { TarjetaSolucion } from "./TarjetaSolucion";

const soluciones = [
  {
    numero: 1,
    titulo: "Timbrado",
    subtitulo: "por Web Service",
    descripcion:
      "Servicio Web para el timbrado y cancelación de CFDI’s, Retenciones y sus complementos. El web service está basado en el protocolo SOAP y solo requerimos el XML construido y sellado en base al anexo 20 del SAT, para validarlo y certificarlo; se puede integrar a cualquier sistema o plataforma web sin ningún problema, durante el procesamiento de los datos nos aseguramos que su información estará protegida con un alto de nivel de seguridad y confidencialidad basados en el estándar de calidad de ISO27001.",
    mostrarRegistro: true,
  },
  {
    numero: 2,
    titulo: "Timbrado",
    subtitulo: "por TXT",
    descripcion:
      "Servicio de timbrado y cancelación de CFDI’s por medio de archivos de texto. El Timbrado por TXT está diseñado para desarrolladores o sistemas ERP, puntos de venta, etc; que desean timbrar comprobantes fiscales sin necesidad de realizar la construcción y sellado del XML; este proceso será realizado por nuestra aplicación y al usuario le entregará el XML timbrado y la representación impresa en PDF. El uso de este servicio será por medio de la descarga de una aplicación de Windows (por el momento solo funciona en estas plataformas) y solo soporta los complementos de Recepción de Pagos y de Recibo de Nómina.",
    mostrarRegistro: true,
  },
  {
    numero: 3,
    titulo: "Timbrado",
    subtitulo: "por archivo tipo XLSX (Excel)",
    descripcion:
      "Servicio de timbrado y cancelación de CFDI´s, por medio de archivos trabajados en la plataforma Microsoft Excel. El timbrado por este tipo de archivos XLSX está diseñado para desarrolladores, sistemas ERP u otro tipo de operación que tengas su información bajo este tipo de archivos, que desean timbrar comprobantes fiscales sin necesidad de realizar la construcción y el sellado del XML; este proceso será realizado por nuestra solución y le entregará como resultado el XML timbrado y la representación impresa en PDF. El uso de este servicio será por medio de la descarga de una aplicación de Windows (por el momento solo funciona en esta plataforma) y solo soporta los complementos de recepción de Pagos y recibo de Nómina.",
  },
  {
    numero: 4,
    titulo: "Timbrado",
    subtitulo: "por APIREST",
    descripcion:
      "Intégrese rápido y fácilmente utilizando nuestra APIREST, disminuya el tiempo y el código necesario para el consumo de los métodos de timbrado y cancelación de CFDI´s, Timbox le ofrece una plataforma estable, sencilla y segura, para integración a nuestros servicios de Timbrado de Facturación Electrónica.",
  },
];

export function SeccionTiposTimbrado() {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: "var(--fondo-timbox)",
        color: "var(--azul-timbox)",
        px: { xs: "8vw", md: "4vw" },
        py: { xs: 8, md: 13 },
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
          columnGap: { xs: 0, md: 6 },
          rowGap: { xs: 8, md: 12 },
        }}
      >
        {soluciones.map((solucion) => (
          <TarjetaSolucion key={solucion.numero} {...solucion} />
        ))}
      </Box>
    </Box>
  );
}
