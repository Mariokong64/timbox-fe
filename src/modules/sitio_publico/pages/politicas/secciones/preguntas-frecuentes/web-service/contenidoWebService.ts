import type { BloquePreguntaFrecuente } from "../tiposPreguntasFrecuentes";

export const contenidoWebService: BloquePreguntaFrecuente[] = [
  {
    tipo: "pregunta",
    texto: "1. ¿Qué sistemas se pueden integrar al web Service?",
  },
  {
    tipo: "respuesta",
    contenido: [
      "Cualquier sistema que pueda hacer peticiones al protocolo SOAP, nuestro servicio se ofrece por medio de este protocolo y lo único que se necesita para realizar una petición de timbrado es un usuario, password y un XML sellado convertido al formato Base64.",
    ],
  },
  {
    tipo: "pregunta",
    texto: "2. ¿Cuál es el tiempo del proceso de timbrado?",
  },
  {
    tipo: "respuesta",
    contenido: [
      "El tiempo en que tarda el proceso de timbrado es de 1 segundo en promedio esto puede variar de acuerdo al tipo de complemento que se timbra (Si tiene nómina o comercio exterior tardará un poco más por las validaciones adicionales que se aplican).",
    ],
  },
  {
    tipo: "pregunta",
    texto: "3. ¿Qué complemento de CFDI soporta el Web Service?",
  },
  {
    tipo: "respuesta",
    contenido: ["Todos los complementos requeridos por el SAT."],
  },
  {
    tipo: "pregunta",
    texto: "4. ¿Cuál es la disponibilidad de timbrado?",
  },
  {
    tipo: "respuesta",
    contenido: ["-La disponibilidad es de 99.3%"],
  },
  {
    tipo: "respuesta",
    contenido: [
      "-Donde el 0.7% de tiempo no disponible puede ser usado para realizar mantenimientos programados, esto no sucede muy a menudo por lo que el porcentaje de disponibilidad por lo regular es mayor.",
    ],
  },
  {
    tipo: "pregunta",
    texto: "5. ¿Cuánto es el tiempo que tarda en reflejarse los comprobantes en el SAT?",
  },
  {
    tipo: "respuesta",
    contenido: [
      "Tarda un aproximado de 1 a 3 minutos en verse reflejado en el SAT.",
    ],
  },
  {
    tipo: "pregunta",
    texto: "6. ¿Cuál es el tamaño máximo del XML que soporta el método de timbrar_cfdi?",
  },
  {
    tipo: "respuesta",
    contenido: [
      "El tamaño máximo es de 10 MB contemplando la construcción de la petición (esto es todo el envelope). Si el tamaño del XML es mayor a esto, se puede utilizar el método de Timbrar_zip, la documentación se puede consultar en Timbrar_zip",
    ],
  },
  {
    tipo: "pregunta",
    texto: "7. ¿Cuál es el tamaño o longitud del Id_external para el método de timbrar_referencia?",
  },
  {
    tipo: "respuesta",
    contenido: ["Hasta el momento se permite un máximo de 30 caracteres"],
  },
  {
    tipo: "pregunta",
    texto: "8. ¿Qué es y cómo funciona la Clave de Confirmación ?",
  },
  {
    tipo: "respuesta",
    contenido: [
      "Es para expedir comprobantes con importes o tipo de cambio fuera del rango establecido o en ambos casos. La clave de confirmación solo es proporcionada por el SAT o el PAC.",
    ],
  },
  {
    tipo: "respuesta",
    contenido: [
      "Proceso de generar la Clave de Confirmación AppGratuito El cliente debe de ponerse en contacto con el equipo para poder generar la clave, en el cual solicitaremos los siguientes 3 datos, “Nombre, RFC y Correo Electrónico”.",
    ],
  },
  {
    tipo: "respuesta",
    contenido: [
      "Proceso de generar la Clave de Confirmación en el Dashboard Para que un cliente en el dashboard pueda generar su clave de confirmación debe de considerar los datos del Nombre de su cliente, RFC y Correo Electrónico para en ese correo le llegue la clave de confirmación y puedan emitir la factura.",
    ],
  },
];
