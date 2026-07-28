import type { BloquePreguntaFrecuente } from "../tiposPreguntasFrecuentes";

export const contenidoFaqAplicativoGratuito: BloquePreguntaFrecuente[] = [
  {
    tipo: "pregunta",
    texto: "1. ¿Qué es un PAC?",
  },
  {
    tipo: "respuesta",
    contenido: [
      "Un Proveedor Autorizado de Certificación (PAC) es una Persona Moral que cuenta con la autorización del Servicio de Administración Tributaria (SAT) para la certificación, asignación de folios e incorporación del sello digital a los comprobantes digitales emitidos por los contribuyentes. En nuestro caso nuestro folio de autorización es el 0184.",
    ],
  },
  {
    tipo: "pregunta",
    texto: "2. ¿Qué necesito para facturar?",
  },
  {
    tipo: "respuesta",
    contenido: [
      "Contar con Firma Electrónica Avanzada (FIEL) vigente.",
      { tipo: "salto" },
      "Contar con el Certificado de Sello Digital (CSD).",
    ],
  },
  {
    tipo: "pregunta",
    texto: "3. ¿Qué es el Servicio Gratuito?",
  },
  {
    tipo: "respuesta",
    contenido: [
      "Como Proveedor Autorizado de Certificación de Comprobantes Fiscales Digitales por Internet (CFDI), tenemos la obligación de ofrecer un servicio de generación y timbrado de manera gratuita.",
    ],
  },
  {
    tipo: "pregunta",
    texto: "4. ¿En qué consiste este servicio?",
  },
  {
    tipo: "respuesta",
    contenido: [
      "Considerando que es un servicio gratuito, solo cuenta con las siguientes funciones: timbrado, cancelación y complemento de recepción de pagos, también cuenta con soporte telefónico, chat y vía correo electrónico. Se utiliza un formato estándar de la representación impresa por lo que no se puede personalizar.",
    ],
  },
  {
    tipo: "pregunta",
    texto: "5. ¿Puedo Consultar mis CFDI generados?",
  },
  {
    tipo: "respuesta",
    contenido: [
      "Si, para registrarse como usuario de la aplicación gratuita deberá ingresar a la siguiente dirección ",
      {
        tipo: "enlace",
        texto: "https://appgratis.timbox.com.mx/registro",
        href: "https://appgratis.timbox.com.mx/registro",
      },
      " en la cual se pedirán los datos del contribuyente como Razón Social, RFC, datos fiscales y un correo válido y contraseña. Con esos datos usted podrá consultar la su información guardada en nuestro servicio.",
    ],
  },
  {
    tipo: "pregunta",
    texto: "6. ¿Qué pasa con la información registrada en su sistema?",
  },
  {
    tipo: "respuesta",
    contenido: [
      "Es necesario leer y aceptar los Términos y Condiciones para poder continuar y utilizar el servicio. Este documento contiene el Aviso de Privacidad y los acuerdos de Nivel de Servicio y los Términos y Condiciones de nuestro servicio.",
    ],
  },
  {
    tipo: "pregunta",
    texto: "7. ¿Cuánto tiempo se respaldan mis CFDI?",
  },
  {
    tipo: "respuesta",
    contenido: [
      "Por cumplimiento con el SAT, tenemos la obligación de resguardar 3 meses sus CFDI generados. Sin embargo, sentimos un compromiso de respeto\u00a0 muy grande con la información y con nuestros clientes, debido a eso Timbox lo almacena por un periodo de 12 meses.",
    ],
  },
  {
    tipo: "pregunta",
    texto: "8. ¿Puedo generar un CFDI solamente con la FIEL?",
  },
  {
    tipo: "respuesta",
    contenido: [
      "No, solo a través del portal del SAT, nuestra aplicación gratuita requiere el uso de CSD.",
    ],
  },
  {
    tipo: "pregunta",
    texto: "9. ¿Cuantos RFC’S se pueden tener registrados en el aplicativo gratuito?",
  },
  {
    tipo: "respuesta",
    contenido: ["Se registra una cuenta por cada RFC emisor"],
  },
  {
    tipo: "pregunta",
    texto: "10. ¿Qué se necesita para abrir una cuenta?",
  },
  {
    tipo: "respuesta",
    contenido: ["Se requiere contar con lo siguiente:"],
  },
  {
    tipo: "lista",
    items: [
      "RFC Activo",
      "Razón Social",
      "Nombre",
      "Correo electrónico vigente",
    ],
  },
  {
    tipo: "pregunta",
    texto: "11. ¿Se puede cancelar?",
  },
  {
    tipo: "respuesta",
    contenido: [
      "Sí, es posible contar con el servicio de cancelación de las facturas timbradas en el aplicativo.",
    ],
  },
  {
    tipo: "pregunta",
    texto: "12. ¿Cuales facturas se pueden emitir?",
  },
  {
    tipo: "respuesta",
    contenido: [
      "Se pueden emitir facturas de tipo Traslado, Egreso, Ingreso, y complemento de pagos.",
    ],
  },
  {
    tipo: "pregunta",
    texto: "13. ¿Cuánto tiempo tengo para consultar mis facturas emitidas?",
  },
  {
    tipo: "respuesta",
    contenido: [
      "Por disposición oficial solo se pueden consultar los tres últimos meses.",
    ],
  },
  {
    tipo: "pregunta",
    texto: "14. ¿Después de algún tiempo tendrá costo el aplicativo?",
  },
  {
    tipo: "respuesta",
    contenido: ["No, este servicio es gratuito."],
  },
  {
    tipo: "pregunta",
    texto: "15.\u00a0 ¿Existe algún límite de timbres para la facturar?",
  },
  {
    tipo: "respuesta",
    contenido: ["No"],
  },
  {
    tipo: "pregunta",
    texto: "16. ¿Se puede cancelar en cualquier momento la cuenta?",
  },
  {
    tipo: "respuesta",
    contenido: ["Sí."],
  },
  {
    tipo: "pregunta",
    texto: "17. ¿Se cuenta con soporte técnico para el aplicativo gratuito?",
  },
  {
    tipo: "respuesta",
    contenido: [
      "Sí, se cuenta con un apartado donde se podrá enviar un correo con la solicitud y en breve se responderá la queja al correo que hayan solicitado la respuesta.",
    ],
  },
  {
    tipo: "pregunta",
    texto: "18. ¿Qué alcances tengo con una cuenta del aplicativo gratuito?",
  },
  {
    tipo: "respuesta",
    contenido: [
      "Se podrá facturar, cancelar, enviar el comprobante por correo y consultar el estatus de las facturas",
    ],
  },
  {
    tipo: "pregunta",
    texto: "19. ¿Cómo actualizar mis datos?",
  },
  {
    tipo: "respuesta",
    contenido: [
      "En el apartado de configuración se pueden actualizar los datos personales",
    ],
  },
];
