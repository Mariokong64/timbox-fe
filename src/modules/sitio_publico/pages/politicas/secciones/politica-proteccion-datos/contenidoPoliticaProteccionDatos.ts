export type FragmentoPoliticaProteccionDatos =
  | string
  | {
      texto: string;
      negrita?: boolean;
    };

export type ItemPoliticaProteccionDatos = {
  contenido: FragmentoPoliticaProteccionDatos[];
};

export type BloquePoliticaProteccionDatos =
  | {
      tipo: "titulo";
      texto: string;
    }
  | {
      tipo: "parrafo";
      contenido: FragmentoPoliticaProteccionDatos[];
    }
  | {
      tipo: "lista";
      items: ItemPoliticaProteccionDatos[];
    };

export const tituloPoliticaProteccionDatos = "Política de protección de datos";
export const tituloIntroduccionPoliticaProteccionDatos = "Introducción";

export const contenidoPoliticaProteccionDatos: BloquePoliticaProteccionDatos[] = [
  {
    tipo: "parrafo",
    contenido: [
      "La privacidad y seguridad de los datos personales son de suma importancia para “TIMBOX”. Esta política establece los principios y procedimientos que debemos seguir para garantizar la protección de los datos personales que se nos confían.",
    ],
  },
  {
    tipo: "parrafo",
    contenido: [
      "Este Protocolo aplica a toda la información personal de terceros (clientes, proveedores, empleados, visitantes, autorizados, partes relacionadas, usuarios, y cualquier persona mínimamente relacionada) recopilada por IT & SW DEVELOPMENT SOLUTIONS DE MEXICO S. DE R.L. DE C.V. autorizado legal para el uso y explotación de la marca denominada “TIMBOX INNOVACION FISCAL”. (en lo sucesivo y para fines del presente Aviso de Privacidad Integral, “TIMBOX”).",
    ],
  },
  {
    tipo: "parrafo",
    contenido: [
      "“TIMBOX” es una empresa totalmente comprometida con la seguridad de la información que recaba y es garante de la protección de los datos personales de cualquier titular de los mismos basado en los principios de licitud, consentimiento, información, calidad, finalidad, lealtad, proporcionalidad y responsabilidad establecidos en la ley.",
    ],
  },
  {
    tipo: "titulo",
    texto: "Alcance.",
  },
  {
    tipo: "parrafo",
    contenido: [
      "Esta política se aplica a todos los empleados, contratistas, proveedores, terceros relacionados y cualquier otra persona que tenga acceso directa o indirectamente a los datos personales que recabe de “TIMBOX”.",
    ],
  },
  {
    tipo: "titulo",
    texto: "Responsabilidades",
  },
  {
    tipo: "lista",
    items: [
      {
        contenido: [
          { texto: "Gerencia y Directivos:", negrita: true },
          " La alta gerencia tiene la responsabilidad de establecer una cultura de privacidad y seguridad de los datos personales, asegurando que se implementen medidas adecuadas para su protección.",
        ],
      },
      {
        contenido: [
          {
            texto: "Empleados, Contratistas y Terceros Relacionados:",
            negrita: true,
          },
          " Todos los clientes, empleados, contratistas y terceros relacionados tienen la responsabilidad de cumplir con esta política, así como con las leyes y regulaciones aplicables a la privacidad de los datos personales. Deben mantener la confidencialidad de los datos personales a los que tengan acceso y asegurarse de no divulgarlos sin la autorización correspondiente.",
        ],
      },
    ],
  },
  {
    tipo: "titulo",
    texto: "Recopilación y Uso de Datos Personales",
  },
  {
    tipo: "lista",
    items: [
      {
        contenido: [
          { texto: "Propósito de Recopilación:", negrita: true },
          " Solo recopilaremos y utilizaremos datos personales para fines legítimos y específicos, y siempre solicitaremos el consentimiento del titular de los datos cuando sea necesario.",
        ],
      },
      {
        contenido: [
          { texto: "Minimización de Datos:", negrita: true },
          " Recopilaremos solo la información personal necesaria para cumplir con el propósito establecido. Evitaremos la recopilación excesiva o innecesaria de datos personales.",
        ],
      },
      {
        contenido: [
          { texto: "Uso Legítimo:", negrita: true },
          " Utilizaremos los datos personales solo de acuerdo con los propósitos para los que fueron recopilados y según lo autorizado por el titular de los datos o requerido por la ley.",
        ],
      },
    ],
  },
  {
    tipo: "titulo",
    texto: "Retención y Eliminación de Datos Personales",
  },
  {
    tipo: "parrafo",
    contenido: [
      "Retendremos los datos personales solo durante el tiempo necesario para cumplir con los fines para los que se recopilaron, a menos que se requiera o permita una retención más prolongada según la ley. Una vez que los datos personales ya no sean necesarios, los eliminaremos de manera segura.",
    ],
  },
  {
    tipo: "titulo",
    texto: "Seguridad de los Datos Personales",
  },
  {
    tipo: "parrafo",
    contenido: [
      "“TIMBOX” proporciona los recursos necesarios para establecer y operar un Sistema de Gestión de Seguridad de la información que establece los lineamientos para asegurar la confidencialidad, integridad y disponibilidad de la información ubicada en los sistemas de información y software que procesen, almacenen y transmitan información relacionada al proceso CFDI así como a Sistemas de información, redes, sistemas operativos, software, activos tangibles y no tangibles y servicios en la nube que soportan las plataformas tecnológicas creadas y operadas por “TIMBOX”.",
    ],
  },
  {
    tipo: "parrafo",
    contenido: [
      "Los aspectos internos y externos relevantes de “TIMBOX”, se encuentran alineados con la estrategia de negocio, cumpliendo con normas nacionales e internacionales de seguridad cibernética como el ISO/IEC 27001:2013, la Matriz de controles del SAT, y con los requisitos de leyes o regulaciones aplicables.",
    ],
  },
  {
    tipo: "parrafo",
    contenido: [
      "Así mismo se manera general se establecen las siguientes medidas en razón de la clasificación y protección de datos objeto de la presente política:",
    ],
  },
  {
    tipo: "lista",
    items: [
      {
        contenido: [
          { texto: "Medidas Técnicas y Organizativas:", negrita: true },
          " Implementaremos medidas técnicas y organizativas adecuadas para proteger los datos personales contra el acceso no autorizado, la divulgación, la alteración o la destrucción accidental o ilícita.",
        ],
      },
      {
        contenido: [
          { texto: "Acceso Limitado:", negrita: true },
          " Limitaremos el acceso a los datos personales a aquellos empleados, contratistas o terceros relacionados que necesiten acceder a ellos para cumplir con sus responsabilidades laborales.",
        ],
      },
      {
        contenido: [
          { texto: "Transmisión Segura:", negrita: true },
          " Cuando sea necesario transferir datos personales a terceros, nos aseguraremos de que se tomen medidas apropiadas para proteger la confidencialidad y seguridad de los datos.",
        ],
      },
    ],
  },
  {
    tipo: "parrafo",
    contenido: [
      "Así mismo para la protección de datos personales de los Clientes, “TIMBOX” suscribe acuerdos contractuales con sus empleados, colaboradores, proveedores, prestadores de servicios y terceros relacionados que incluyen cláusulas de confidencialidad, de auditorías de servicios, seguridad de la información, de patente, marcas y derechos de autor, transferencias de derechos y obligaciones para la prestación del proceso de timbrado del Comprobante Fiscal Digital por Internet (CFDI)",
    ],
  },
  {
    tipo: "parrafo",
    contenido: [
      "El propósito de la presente Política es cumplir con los objetivos establecidos los cuales están enfocados a proteger la información por medio de la implementación de planes de tratamiento, que consideran la implementación, operación y mantenimiento de controles físicos, administrativos y técnicos de seguridad relacionados con las instalaciones, recursos humanos, sistemas o aplicaciones, equipo y medios móviles e infraestructura tecnológica.",
    ],
  },
  {
    tipo: "parrafo",
    contenido: [
      "Para el logro de estos objetivos “TIMBOX” se compromete a revisar y mejorar los controles y procesos del manejo de la Información mediante la actualización de la valoración de riesgos y de los planes de tratamiento de riesgos, el establecimiento de políticas para la mejora continua, la realización de auditorías internas y externas, revisiones por la dirección y la implementación de acciones de mejora, dentro de lo cual destacan las siguientes normativas aplicables.",
    ],
  },
  {
    tipo: "lista",
    items: [
      {
        contenido: [
          "Todo el personal de “TIMBOX” recibe entrenamiento respecto a su responsabilidad en el tratamiento de dichos datos y en las repercusiones tanto legales como laborales en las que puede incurrir de faltar al compromiso de confidencialidad de estos.",
        ],
      },
      {
        contenido: [
          "La información de datos personales es tratada internamente considerando: Su transmisión controlada entre las áreas funcionales, al permitir su distribución solo entre quienes la requieren; El control de la información digital mediante tecnologías de blindaje de antivirus y antimalware que de manera probada constituyan buenas prácticas en el mercado profesional; La destrucción o borrado de datos una vez que han cumplido su ciclo de vida en la prestación del servicio que nos fue solicitado o de conformidad con los plazos establecidos en la legislación aplicable.",
        ],
      },
      {
        contenido: [
          "Los datos que, por razón de procedimientos, se conserven las bases de datos en el extranjero serán protegidas con las medidas de seguridad razonables en virtud de su ubicación y recibirán el mismo tratamiento confidencial, control de accesos y gestión, que para cualquier otro dato personal con residencia local y bajo el alcance y mandato de la legislación mexicana.",
        ],
      },
      {
        contenido: [
          "Asi mismo no almacenamos las contraseñas de nuestros clientes en texto plano, en su lugar las almacenamos de manera cifrada garantizando mayor seguridad en la información.",
        ],
      },
      {
        contenido: [
          "Todos nuestros servicios expuestos para el consumo por parte de nuestros clientes, como servicios web, portales web o servicios FTP, cuentan con mecanismos de criptografía.",
        ],
      },
      {
        contenido: [
          "Nos aseguramos que la información de los comprobantes que emitimos y certificamos y los datos personales de nuestros clientes permanezcan cifrado durante su transmisión, procesamiento y almacenamiento.",
        ],
      },
      {
        contenido: [
          "Todos los sistemas de información que dan soporte a nuestros servicios de emisión y certificación de CFDI cuentan con una solución de protección contra código malicioso instalada y periódicamente actualizada.",
        ],
      },
      {
        contenido: [
          "Realizamos pruebas de seguridad a todos los sistemas de información relacionados con nuestros servicios de emisión y certificación de comprobantes fiscales por lo menos una vez cada 12 meses y en caso de ser necesario realizamos planes para atender los hallazgos detectados durante las pruebas.",
        ],
      },
    ],
  },
  {
    tipo: "parrafo",
    contenido: [
      "Es nuestra obligación proteger los datos personales que nos son confiados, resguardándo los frente a las amenazas de pérdida de información, ya sea por medios físicos o digital.",
    ],
  },
  {
    tipo: "titulo",
    texto: "Divulgación de Datos Personales a Terceros",
  },
  {
    tipo: "parrafo",
    contenido: [
      "No divulgaremos datos personales a terceros sin el consentimiento expreso del titular de los datos, a menos que esté permitido o requerido por la ley.",
    ],
  },
  {
    tipo: "titulo",
    texto: "Capacitación y Concienciación",
  },
  {
    tipo: "parrafo",
    contenido: [
      "Proporcionaremos capacitación regular a todos los empleados y contratistas sobre la importancia de la privacidad de los datos personales, así como sobre los procedimientos y mejores prácticas para protegerlos.",
    ],
  },
  {
    tipo: "titulo",
    texto: "Cumplimiento y Monitoreo",
  },
  {
    tipo: "lista",
    items: [
      {
        contenido: [
          { texto: "Evaluación Regular:", negrita: true },
          " Revisaremos y evaluaremos regularmente la efectividad de nuestras medidas de protección de datos para garantizar el cumplimiento de esta política.",
        ],
      },
      {
        contenido: [
          { texto: "Notificación de Incidentes:", negrita: true },
          " En caso de una violación de seguridad o una divulgación no autorizada de datos personales, notificaremos a los afectados y a las autoridades correspondientes de acuerdo con las leyes y regulaciones aplicables.",
        ],
      },
    ],
  },
  {
    tipo: "titulo",
    texto: "Modificaciones y Actualización de la Política.",
  },
  {
    tipo: "parrafo",
    contenido: [
      "“TIMBOX” se reserva el derecho de efectuar en cualquier momento modificaciones o actualizaciones a la presente Política, en atención a novedades legislativas o políticas internas. Dichas modificaciones estarán disponibles al público en el Departamento de Protección de Datos de la Empresa ubicado en el domicilio arriba señalado, así como en la página de internet www.timbox.com.mx; o en su defecto será informado a cualquier titular siempre que envíe un correo electrónico a la dirección privacidad@timbox.com.mx manifestando que le sea proporcionado el documento actualizado de nuestra Política de Clasificación y Seguridad de la Información.",
    ],
  },
  {
    tipo: "parrafo",
    contenido: [
      "Revisaremos y actualizaremos esta política periódicamente para reflejar los cambios en las leyes y regulaciones de privacidad de datos, así como para adaptarnos a las mejores prácticas de la industria.",
    ],
  },
  {
    tipo: "parrafo",
    contenido: ["Última Actualización: 1 de enero de 2023."],
  },
];
