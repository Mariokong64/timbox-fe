export type FragmentoAvisoPrivacidad =
  | string
  | {
      texto: string;
      href?: string;
      negrita?: boolean;
    };

export type ItemListaAvisoPrivacidad = {
  contenido: FragmentoAvisoPrivacidad[];
  subitems?: ItemListaAvisoPrivacidad[];
};

export type BloqueAvisoPrivacidad =
  | {
      tipo: "titulo";
      texto: string;
    }
  | {
      tipo: "parrafo";
      contenido: FragmentoAvisoPrivacidad[];
    }
  | {
      tipo: "lista";
      items: ItemListaAvisoPrivacidad[];
    };

export const tituloAvisoPrivacidad = "Aviso de Privacidad";

export const contenidoAvisoPrivacidad: BloqueAvisoPrivacidad[] = [
  {
    tipo: "titulo",
    texto: "1. Vigente desde: 05 / 2015",
  },
  {
    tipo: "parrafo",
    contenido: [
      "En TIMBOX buscamos brindar mayor competitividad a nuestros clientes a través de nuestros servicios por lo que resulta primordial garantizar que la información recibida este siempre íntegra y confidencial. Dada la naturaleza de nuestro negocio, es esencial para TIMBOX el alcanzar, mantener y mejorar la seguridad de la información de una manera continúa. De esta seguridad depende el que podamos mantener una ventaja competitiva, una rentabilidad constante y una imagen comercial positiva que brinde una total confianza a nuestros clientes y nos permita alcanzar el resto de los objetivos de nuestro negocio.",
    ],
  },
  {
    tipo: "titulo",
    texto: "2. Responsable",
  },
  {
    tipo: "parrafo",
    contenido: [
      "En cumplimiento a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares IT & SW Development Solutions de México S de RL de CV, en adelante “TIMBOX”. Le informa que TIMBOX es responsable de sus datos personales. El “Usuario” podrá contactar a TIMBOX en cualquier momento a través de nuestro correo electrónico contacto@timbox.com.mx o directamente en Calle 5 de Mayo #34 Colonia Centro .C.P.76000. Querétaro, Qro . Nuestra línea telefónica es 800-788-0195.",
    ],
  },
  {
    tipo: "parrafo",
    contenido: [
      "Protegemos y salvaguardamos sus datos personales para evitar el daño, pérdida, destrucción, robo, extravío, alteración, así como el tratamiento no autorizado de sus datos personales.",
    ],
  },
  {
    tipo: "titulo",
    texto: "3. Datos Personales",
  },
  {
    tipo: "parrafo",
    contenido: [
      "La información deberá ser siempre veraz y completa. El usuario responderá en todo momento por los datos proporcionados y en ningún caso TIMBOX será responsable de la veracidad de los mismos.",
    ],
  },
  {
    tipo: "parrafo",
    contenido: [
      "La información solicitada al usuario en el sitio web es:\u00a0",
      {
        texto: "www.timbox.com.mx",
        href: "http://www.timbox.com.mx/",
      },
      "\u00a0y en los servicios que de este se deriven son:",
    ],
  },
  {
    tipo: "lista",
    items: [
      { contenido: ["Nombre completo"] },
      { contenido: ["Teléfonos de contacto"] },
      { contenido: ["Dirección Postal"] },
      { contenido: ["Correo Electrónico"] },
      { contenido: ["Datos de Facturación"] },
      { contenido: ["Datos de Tarjeta de Crédito o Débito"] },
    ],
  },
  {
    tipo: "parrafo",
    contenido: [
      "Sus datos personales serán tratados con base a en los principios de licitud, consentimiento, información, calidad, finalidad, lealtad, proporcionalidad y responsabilidad en términos de la Legislación. Se mantendrá la confidencialidad de sus datos personales estableciendo y manteniendo de forma efectiva las medidas de seguridad administrativas, técnicas y físicas, para evitar su daño, pérdida, alteración, destrucción, uso, acceso o divulgación indebida.",
    ],
  },
  {
    tipo: "titulo",
    texto: "4. Transferencia de Datos",
  },
  {
    tipo: "parrafo",
    contenido: [
      "El titular de los datos personales, autoriza a TIMBOX, a transferir los datos proporcionados por él a terceros (ya sea persona física o moral), que con motivo de la relación comercial con TIMBOX lo requieran para el cumplimiento del negocio; El titular de los datos personales, entiende y acepta que en ningún momento se podrán transferir datos sensibles ni patrimoniales. En el caso de no estar de acuerdo con la transmisión aquí mencionada, el titular deberá ponerse en contacto al correo electrónico: contacto@timbox.com.mx, o en nuestra\u00a0línea telefónica 800-788-0195, en un plazo no mayor a 5 (cinco) días hábiles a partir de la publicación del presente aviso ya que de lo contrario y transcurrido dicho término, acepta y autoriza a TIMBOX a la transferencia de los mismos.",
    ],
  },
  {
    tipo: "titulo",
    texto: "4.1. Objetivo",
  },
  {
    tipo: "parrafo",
    contenido: [
      "Conforme a esta política se deberán establecer los procedimientos necesarios para proteger la información de amenazas a la seguridad y minimizar el impacto de los incidentes de seguridad que pudieran ocurrir en la generación y envío de comprobantes fiscales digitales por internet a través de los “SERVICIOS”.",
    ],
  },
  {
    tipo: "titulo",
    texto: "4.2. Declaratoria",
  },
  {
    tipo: "lista",
    items: [
      {
        contenido: [
          "TIMBOX, a través de sus “SERVICIOS”, conserva información de carácter sensible tanto para nuestro negocio como para terceros, por lo que es política de la organización garantizar la seguridad de la información en base a estos 3 criterios:",
        ],
        subitems: [
          {
            contenido: [
              { texto: "Confidencialidad", negrita: true },
              ". Se asegura que está protegida del acceso a personas no autorizadas.",
            ],
          },
          {
            contenido: [
              { texto: "Integridad", negrita: true },
              ". La información se mantiene como debe, sin modificaciones inapropiadas.",
            ],
          },
          {
            contenido: [
              { texto: "Disponibilidad", negrita: true },
              ". Los usuarios tienen acceso a la información y a los activos asociados cuando lo requieran.",
            ],
          },
        ],
      },
      {
        contenido: [
          "Es un compromiso de la Dirección de TIMBOX establecer y mantener los más altos estándares en lo que a seguridad de la información se refiere ya sea propia o de terceras personas como nuestros clientes o proveedores.",
        ],
      },
      {
        contenido: [
          "El personal de TIMBOX está debidamente capacitado en materia de seguridad de la información por lo que puede cumplir con lo establecido en esta política y los requerimientos de seguridad de acuerdo a sus funciones específicas.",
        ],
      },
      {
        contenido: [
          "Todo el personal de TIMBOX y de terceros tienen como obligación los siguientes lineamientos de seguridad:",
        ],
        subitems: [
          {
            contenido: [
              "Es responsable de guardar absoluta reserva de la información de los comprobantes fiscales digitales a través de internet de los clientes.",
            ],
          },
          {
            contenido: [
              "Garantiza que no prestará o compartirá ningún ID de usuario ni contraseña del sistema.",
            ],
          },
          {
            contenido: [
              "Respeta los niveles de acceso y de seguridad proporcionados por TIMBOX.",
            ],
          },
          {
            contenido: [
              "Está continuamente capacitado para desempeñar satisfactoriamente sus responsabilidades.",
            ],
          },
        ],
      },
      {
        contenido: [
          "La dirección de TIMBOX es quien evalúa el riesgo y determina de qué manera se atiende de acuerdo con las cuatro opciones descritas en esta misma política.",
        ],
      },
    ],
  },
  {
    tipo: "titulo",
    texto: "5. Cambios es los Avisos de Privacidad",
  },
  {
    tipo: "parrafo",
    contenido: [
      "Nos reservamos el derecho de efectuar en cualquier momento modificaciones o actualizaciones al presente aviso de privacidad, para la atención de novedades legislativas o jurisprudenciales, políticas internas, nuevos requerimientos para la prestación u ofrecimiento de nuestros servicios o productos y prácticas del mercado. Estas modificaciones estarán disponibles al público a través de nuestra página de Internet www.timbox.com.mx, sección aviso de privacidad.",
    ],
  },
  {
    tipo: "titulo",
    texto: "6. Aceptación de los Términos",
  },
  {
    tipo: "parrafo",
    contenido: [
      "Esta declaración de Privacidad está sujeta a los términos y condiciones del sitio web de TIMBOX antes descrito, lo cual constituye un acuerdo legal entre el usuario y TIMBOX. Si el usuario utiliza los servicios del sitio de TIMBOX, significa que ha leído, entendido y acordado los términos antes expuestos.",
    ],
  },
  {
    tipo: "titulo",
    texto: "7. Autoridad",
  },
  {
    tipo: "parrafo",
    contenido: [
      "Si el Usuario considera que han sido vulnerados sus derechos respecto de la protección de datos personales, tiene el derecho de acudir a la autoridad correspondiente para defender su ejercicio. La autoridad es la Secretaría de Anticorrupción y Buen Gobierno, su sitio web es: ",
      {
        texto: "www.gob.mx/buengobierno",
        href: "https://www.gob.mx/buengobierno",
      },
      ".",
    ],
  },
  {
    tipo: "parrafo",
    contenido: ["Última modificación: 6 de enero de 2026"],
  },
];
