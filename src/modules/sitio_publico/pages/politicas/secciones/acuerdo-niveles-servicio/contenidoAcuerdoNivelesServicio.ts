export type FragmentoAcuerdoNivelesServicio =
  | string
  | {
      texto: string;
      href: string;
    };

export type BloqueAcuerdoNivelesServicio =
  | {
      tipo: "titulo";
      texto: string;
    }
  | {
      tipo: "parrafo";
      contenido: FragmentoAcuerdoNivelesServicio[];
    }
  | {
      tipo: "separador";
    };

export const tituloAcuerdoNivelesServicio = "Acuerdo Niveles de Servicios";

export const contenidoAcuerdoNivelesServicio: BloqueAcuerdoNivelesServicio[] = [
  {
    tipo: "parrafo",
    contenido: [
      "Acuerdo de niveles de servicio entre IT & SW Development Solutions de México S de RL de CV, Proveedor Autorizado de Certificación con número de autorización 0184, en adelante “Timbox” y quien contrata y/o usa nuestros servicios y aplicaciones de ahora en adelante el “Usuario”. Los timbres no cuentan con vigencia.",
    ],
  },
  {
    tipo: "parrafo",
    contenido: [
      "Nosotros no modificaremos los términos del acuerdo de los niveles de servicio durante su suscripción o periodo de consumo, sin embargo, si usted renueva un plan con nosotros, la versión de este acuerdo de niveles de servicio que esté vigente en la fecha de la renovación se aplicará en los términos de su renovación. Avisaremos al Usuario sobre las modificaciones adversas al material de este acuerdo de niveles de servicio. La vigencia de los timbres es de 2 años.",
    ],
  },
  {
    tipo: "separador",
  },
  {
    tipo: "titulo",
    texto: "1. Descripción de los Servicios",
  },
  {
    tipo: "titulo",
    texto: "1.1. Aplicativo gratuito de emisión de CFDI",
  },
  {
    tipo: "parrafo",
    contenido: [
      "Funcionalidades básicas para la captura y el procesamiento ágil, eficaz y eficiente de los CFDI de manera individual. Sin addendas, ni complementos (salvo el “sello fiscal digital”).",
    ],
  },
  {
    tipo: "parrafo",
    contenido: [
      "Carga de los certificados de sello digital (CSD) del contribuyente, para el sellado de los comprobantes.",
    ],
  },
  {
    tipo: "parrafo",
    contenido: ["Precargar los datos fiscales del contribuyente emisor."],
  },
  {
    tipo: "parrafo",
    contenido: [
      "Genera el documento para su respectiva validación y certificación, cumpliendo con todos los requisitos expresados en el Anexo 20.",
    ],
  },
  {
    tipo: "parrafo",
    contenido: ["Validación y certificación (timbrado) del documento."],
  },
  {
    tipo: "parrafo",
    contenido: [
      "Entrega al contribuyente emisor del comprobante certificado o acuse de rechazo. Permitir al emisor del comprobante consultar, guardar o imprimir los comprobantes durante los 3 meses seguidos a partir de la certificación del comprobante.",
    ],
  },
  {
    tipo: "parrafo",
    contenido: [
      "Envia copia del CFDI al SAT de manera inmediata una vez realizada la certificación del comprobante.",
    ],
  },
  {
    tipo: "titulo",
    texto: "1.2. Servicio Web de Timbrado y Cancelación de CFDI y Retenciones",
  },
  {
    tipo: "parrafo",
    contenido: [
      "Validación y Timbrado en línea de comprobantes sellados a través de un web service SOAP de acuerdo a los lineamientos del Anexo 20 del SAT.",
    ],
  },
  {
    tipo: "parrafo",
    contenido: [
      "La respuesta del timbrado solo regresa el XML timbrado en caso de éxito en caso contrario mostrará un código y el mensaje de error.",
    ],
  },
  {
    tipo: "parrafo",
    contenido: [
      "Cancelación de CFDI’s, permitiendo de 1 hasta 500 UUID’s por petición de un mismo Emisor.",
    ],
  },
  {
    tipo: "parrafo",
    contenido: [
      "Cancelación de CFDI’s que ampara retenciones e información de pagos, permitiendo de 1 hasta 500 UUID’s de un mismo Emisor.",
    ],
  },
  {
    tipo: "parrafo",
    contenido: ["En ambos casos se obtiene el acuse de la cancelación."],
  },
  {
    tipo: "parrafo",
    contenido: [
      "Respaldo de los comprobantes durante los 3 meses seguidos a partir de la certificación.",
    ],
  },
  {
    tipo: "parrafo",
    contenido: [
      "Plataforma de consulta de timbrado en tiempo real desde www.dashboard.timbox.com.mx",
    ],
  },
  {
    tipo: "parrafo",
    contenido: ["Repositorios con ejemplos de código de integración."],
  },
  {
    tipo: "parrafo",
    contenido: ["DLL de integración en ambientes Windows."],
  },
  {
    tipo: "parrafo",
    contenido: [
      "Nota: Es importante mencionar que los servicios de cancelación, Timbox solo funciona como puente entre su petición de cancelación y el SAT. Por lo que cualquier detalle como intermitencia, saturación o falla no compromete un tiempo de solución por parte de Timbox.",
    ],
  },
  {
    tipo: "titulo",
    texto: "1.3. Servicio de Validación de CFDI",
  },
  {
    tipo: "parrafo",
    contenido: [
      "Servicio Web para la validación de comprobantes de acuerdo a los lineamientos del anexo 20 del SAT.",
    ],
  },
  {
    tipo: "parrafo",
    contenido: [
      "El servicio provee información del comprobante validado en cuanto a estructura y contenido.",
    ],
  },
  {
    tipo: "parrafo",
    contenido: [
      "Muestra el estatus del comprobante en los servicios del SAT. Puede ser usado para comprobantes emitidos desde cualquier proveedor.",
    ],
  },
  {
    tipo: "titulo",
    texto: "1.4. Aplicaciones desarrolladas",
  },
  {
    tipo: "parrafo",
    contenido: [
      "Las características de cada desarrollo serán exclusivas dependiente el requerimiento y definición del alcance de cada proyecto.",
    ],
  },
  {
    tipo: "titulo",
    texto: "2. Disponibilidad",
  },
  {
    tipo: "parrafo",
    contenido: [
      "El Servicio de timbrado, así como los servicios ofrecidos por Timbox, estarán disponibles las 24 horas por 7 días de la semana, los 365 días del año. Con una disponibilidad del 99.3% por ciento, donde el .07 por ciento es el periodo de tiempo máximo en que los servicios podrían no estar disponibles por causas no planeadas e imputables por Timbox.",
    ],
  },
  {
    tipo: "parrafo",
    contenido: [
      "Las ventanas de mantenimiento que podrá planear Timbox, podrán ser trimestrales, con un máximo de 8 horas para el mantenimiento y mejora de la infraestructura y servicios. El Usuario será notificado mediante correo electrónico, por lo menos 7 días con anticipación.",
    ],
  },
  {
    tipo: "titulo",
    texto: "4. Atención a Usuarios",
  },
  {
    tipo: "titulo",
    texto: "4.1. Procedimiento de Atención a Soporte Técnico",
  },
  {
    tipo: "parrafo",
    contenido: [
      "El Usuario puede solicitar el Soporte Técnico y/o reportar algún problema, por los siguientes medios:",
    ],
  },
  {
    tipo: "parrafo",
    contenido: [
      "Correo electrónico: ",
      {
        texto: "soporte@timbox.com.mx",
        href: "mailto:soporte@timbox.com.mx",
      },
    ],
  },
  {
    tipo: "parrafo",
    contenido: [
      "Chat en línea ",
      {
        texto: "https://www.timbox.com.mx/",
        href: "https://www.timbox.com.mx/",
      },
    ],
  },
  {
    tipo: "parrafo",
    contenido: [
      "Teléfono: ",
      {
        texto: "800-788-01-95",
        href: "tel:8007880195",
      },
    ],
  },
  {
    tipo: "parrafo",
    contenido: [
      "El agente de soporte técnico recibirá el caso y le entregará al Usuario el número de Ticket correspondiente. En el mismo se le asignará el nivel de prioridad en función de la severidad caso.",
    ],
  },
  {
    tipo: "parrafo",
    contenido: [
      "El agente de soporte técnico contactará al Usuario para notificarle la resolución del caso o bien las acciones correspondientes que deberán realizarse por parte del Usuario para su solución.",
    ],
  },
  {
    tipo: "parrafo",
    contenido: [
      "El Usuario contará con 72 horas para responder o darle seguimiento su caso. En caso de no responder se tomará como Resuelto.",
    ],
  },
  {
    tipo: "parrafo",
    contenido: [
      "Timbox garantiza un tiempo de respuesta no mayor a 2 horas en cualquier incidente de gran impacto y un lapso no mayor a 8 horas para consultas técnicas y/o uso de los servicios. Así mismo, por teléfono garantiza una atención inmediata tomando como base la disponibilidad de las personas dedicadas a la atención telefónica y en los horarios establecidos.",
    ],
  },
  {
    tipo: "parrafo",
    contenido: [
      "El Usuario está en total acuerdo que los servicios que ofrece Timbox no incluye:",
    ],
  },
  {
    tipo: "parrafo",
    contenido: ["Atención de Incidencias por fallas de Hardware del Usuario."],
  },
  {
    tipo: "parrafo",
    contenido: [
      "Atención de Incidencias por fallas en los servicios de red y telecomunicaciones por el Usuario.",
    ],
  },
  {
    tipo: "parrafo",
    contenido: [
      "Atención de incidencias sobre aplicativos, software y cualquier utilería del Usuario.",
    ],
  },
  {
    tipo: "parrafo",
    contenido: ["Personalización de procesos o aplicaciones."],
  },
  {
    tipo: "titulo",
    texto: "4.2. Horarios de Atención",
  },
  {
    tipo: "parrafo",
    contenido: [
      "Los horarios de atención al Usuario establecidos por Timbox son:",
    ],
  },
  {
    tipo: "parrafo",
    contenido: ["Lunes a Viernes de 9:30 a.m a 19:00 p.m (CST)."],
  },
  {
    tipo: "parrafo",
    contenido: [
      "Excepto los días festivos obligatorios según el calendario aplicable en los Estados Unidos Mexicanos.",
    ],
  },
  {
    tipo: "parrafo",
    contenido: [
      "Sábados. Solamente se realizan guardias y se atenderá al Usuario por correo electrónico al igual que los días festivos Obligatorios.",
    ],
  },
  {
    tipo: "parrafo",
    contenido: [
      "Nota: Las posibles fallas que podrían causar algún problema a los Servicios, son las que estén relacionadas con la infraestructura que da soporte a estos, mismas que serán remediadas de acuerdo a los planes de emergencia establecidos para estas fallas.",
    ],
  },
  {
    tipo: "titulo",
    texto: "4.3. Responsabilidad del Usuario",
  },
  {
    tipo: "parrafo",
    contenido: [
      "Comunicación a través de los medios mencionados anteriormente para poder solicitar ayuda del equipo de soporte técnico de los servicios ofrecidos por timbox.",
    ],
  },
  {
    tipo: "parrafo",
    contenido: [
      "Proporcionar RFC, Nombre Completo, Teléfono y Correo Electrónico al solicitar soporte.",
    ],
  },
  {
    tipo: "parrafo",
    contenido: [
      "Proporcionar la siguiente información referente al caso reportado: Servicio consumido y URL utilizado.",
    ],
  },
  {
    tipo: "parrafo",
    contenido: [
      "Captura de pantalla donde se muestre el mensaje de error reportado Archivo de la petición (Request) SOAP utilizados en caso de consumir un Web Service.",
    ],
  },
  {
    tipo: "parrafo",
    contenido: [
      "Archivo de la respuesta (Response) SOAP devuelto en caso de consumir un Web Service.",
    ],
  },
  {
    tipo: "parrafo",
    contenido: ["Archivo Log generado por el sistema de cliente."],
  },
  {
    tipo: "parrafo",
    contenido: ["XML con el cual se presenta el error."],
  },
  {
    tipo: "parrafo",
    contenido: [
      "El cliente es el único responsable de la información que aporte para la resolución de su caso.",
    ],
  },
  {
    tipo: "parrafo",
    contenido: [
      "No se en entregaran contraseñas por medios de servicio de soporte telefónico o por chat, en su lugar le será enviado un correo electrónico.",
    ],
  },
  {
    tipo: "titulo",
    texto: "4.4. Responsabilidad Timbox",
  },
  {
    tipo: "parrafo",
    contenido: [
      "Brindar el seguimiento oportuno a todos los casos reportados por los Usuarios.",
    ],
  },
  {
    tipo: "parrafo",
    contenido: [
      "Cumplir con los tiempos de respuesta asociados a la prioridad asignada en cada caso.",
    ],
  },
  {
    tipo: "parrafo",
    contenido: [
      "Mantener actualizada la documentación en nuestra página www.timbox.com.mx",
    ],
  },
  {
    tipo: "parrafo",
    contenido: [
      "Aplicar mejoras continuas a todos los servicios para que el uso de nuestros servicios sea el mejor.",
    ],
  },
  {
    tipo: "parrafo",
    contenido: ["Última modificación: 6 de enero de 2026"],
  },
];
