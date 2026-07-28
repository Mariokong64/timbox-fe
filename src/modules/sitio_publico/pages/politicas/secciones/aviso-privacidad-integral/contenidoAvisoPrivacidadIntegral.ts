export type ItemAvisoPrivacidadIntegral = {
  texto: string;
  etiqueta?: string;
};

export type BloqueAvisoPrivacidadIntegral =
  | {
      tipo: "titulo";
      texto: string;
    }
  | {
      tipo: "parrafo";
      texto: string;
    }
  | {
      tipo: "lista";
      items: ItemAvisoPrivacidadIntegral[];
    }
  | {
      tipo: "separador";
    };

export const tituloAvisoPrivacidadIntegral = "Aviso de privacidad integral";

export const contenidoAvisoPrivacidadIntegral: BloqueAvisoPrivacidadIntegral[] = [
  {
    tipo: "titulo",
    texto: "CONSIDERACIÓNES PREVIAS.",
  },
  {
    tipo: "parrafo",
    texto:
      "Este Aviso de Privacidad Integral aplica a toda la información personal de terceros (clientes, proveedores, empleados, visitantes, autorizados, partes relacionadas, usuarios, y cualquier persona mínimamente relacionada) recopilada por IT & SW DEVELOPMENT SOLUTIONS DE MEXICO S. DE R.L. DE C.V. autorizado legal para el uso y explotación de la marca denominada “TIMBOX INNOVACION FISCAL”. (en lo sucesivo y para fines del presente Aviso de Privacidad Integral, “TIMBOX”).",
  },
  {
    tipo: "parrafo",
    texto:
      "“TIMBOX” es una empresa totalmente comprometida con la seguridad de la información que recaba y es garante de la protección de los datos personales de cualquier titular de los mismos basado en los principios de licitud, consentimiento, información, calidad, finalidad, lealtad, proporcionalidad y responsabilidad establecidos en la “LEGISLACIÓN”.",
  },
  {
    tipo: "parrafo",
    texto:
      "En ese sentido y en cumplimiento por lo dispuesto por la “LEGISLACIÓN” es que se le hace de su conocimiento este Aviso de Privacidad Integral con el único objetivo de informarle sobre el tratamiento, resguardo, protección y manejo de los datos personales que hayan sido recabados, utilizados, almacenados, transmitidos y/o transferidos por “TIMBOX”, garantizando siempre el correcto acceso, protección y tratamiento de los mismos.",
  },
  {
    tipo: "separador",
  },
  {
    tipo: "titulo",
    texto: "FUNDAMENTO LEGAL.",
  },
  {
    tipo: "parrafo",
    texto:
      "El presente Aviso de Privacidad Integral tiene su fundamento legal aplicable en el Artículo 6° A Fracción II, III y VIII y 16 segundo párrafo de la Constitución Política de los Estados Unidos Mexicanos en concatenación con la Regla 2.7.2.8 Fracción VI de la Resolución Miscelánea Fiscal vigente, así como en los artículos 1, 2, 3, 4, 6, 7, 8, 9, 11, 12, 13 y demás aplicables de la Ley Federal de Protección de Datos Personales en Posesión de los Particulares, así como su Reglamento y demás normatividad que resulte aplicable (en lo sucesivo y para fines del presente Aviso de Privacidad Integral serán denominados por separado o en su conjunto cuando se refiere a este fundamento legal como “LEGISLACIÓN”).",
  },
  {
    tipo: "titulo",
    texto: "RESPONSABLE DE LOS DATOS PERSONALES.",
  },
  {
    tipo: "parrafo",
    texto:
      "IT & SW DEVELOPMENT SOLUTIONS DE MEXICO S. DE R.L. DE C.V. autorizado legal para el uso y explotación de la marca denominada “TIMBOX INNOVACION FISCAL”, para efectos del presente Aviso de Privacidad Integral, en nombre y representación de sus afiliadas, asociadas, subsidiarias, y terceros relacionados (a quienes en lo sucesivo se les denominará de igual manera “TIMBOX”), con domicilio el ubicado en Libramiento Sur-Poniente No. 730, San Isidro Juriquilla, Querétaro, Querétaro, C.P: 76226; En cumplimiento a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares y su Reglamento correspondiente se le informa que es responsable de recabar, proteger, resguardar y garantizar sus datos personales, del uso que se le dé a los mismos y de su protección cuando sean recabados a través de medios impresos, electrónicos, vía telefónica, audiovisual o cualquier otro medio permitido por la Ley aplicable (en lo sucesivo “Medio”).",
  },
  {
    tipo: "titulo",
    texto: "FINALIDAD DEL TRATAMIENTO DE DATOS PERSONALES.",
  },
  {
    tipo: "parrafo",
    texto:
      "“TIMBOX” tratará los datos personales del titular de manera confidencial con la finalidad de comprobar su identidad así como llevar a cabo las actividades y gestiones enfocadas al cumplimiento de las obligaciones originadas y derivadas de la relación jurídica o comercial que establezca con el titular en cumplimiento a las disposiciones legales que rigen la operación, gestión, y administración de los productos o servicios adquiridos a “TIMBOX”, así como el soporte, apoyo técnico, actualización y desarrollo de los mismos que de manera enunciativa mas no limitativa son el envío de facturas y confirmación de pagos, envío de comunicaciones periódicas con el titular relacionadas con los servicios prestados por “TIMBOX”, así como para la operación, mantenimiento y mejora de los servicios prestados al titular, aplicando también para el desarrollo de nuevos productos, software, hardware y/o prestación de servicios; informar sobre cambios en los productos y/o servicios, fines mercadotécnicos, publicitarios o de prospección comercial; administración de los sitios web de la marca y empresa de “TIMBOX”; perfiles de consumo; creación e implementación de procesos analíticos y estadísticos necesarios para el desarrollo de productos y/o servicios; encuestas de calidad y satisfacción del titular; ofrecer productos y/o servicios a través de cualquier medio de comunicación que esté al alcance de “TIMBOX”; análisis de consumo de productos y/o servicios; realizar estudios internos sobre hábitos de consumo; solicitar actualización de sus datos y/o documentos de identificación; monitorear cualquier llamada telefónica realizada con el titular; atender solicitudes de empleo y formatos con motivo de la pasada, presente o futura relación y/o relaciones laborales con “TIMBOX” a través de cualquier medio de comunicación; reclutamiento, selección y contratación de personal, evaluación del personal que labora para “TIMBOX” realizar investigaciones de antecedentes laborales; subcontratación de servicios con distintos proveedores, así como la facturación y cobro; elaborar informes estadísticos y financieros; actualizar los registros y programas de sistemas de titulares y proveedores; elaborar listados de exclusión con el objeto de registrar de manera gratuita la negativa de un titular al tratamiento de sus datos personales; dar cumplimiento a obligaciones contraídas con los titulares; y contactarlo para cualquier tema relacionado a los productos y/o servicios comercializados por “TIMBOX”.",
  },
  {
    tipo: "titulo",
    texto: "PRINCIPIOS DE PROTECCIÓN DE DATOS.",
  },
  {
    tipo: "parrafo",
    texto:
      "De conformidad con la “LEGISLACION”, “TIMBOX” debe cumplir con los principios de protección de datos, mismos que para mayor entendimiento y alcance de los mismos nos remitiremos como a continuación se indica:",
  },
  {
    tipo: "lista",
    items: [
      {
        etiqueta: "Licitud:",
        texto:
          "Licitud: El principio de licitud obliga a “TIMBOX” a que el tratamiento sea con apego y cumplimiento a lo dispuesto por la legislación mexicana y el derecho internacional",
      },
      {
        etiqueta: "Consentimiento:",
        texto:
          "Consentimiento: “TIMBOX” deberá obtener el consentimiento para el tratamiento de los datos personales. La obtención del consentimiento tácito o expreso deberá ser: I. Libre: sin que medie error, mala fe, violencia o dolo, que puedan afectar la manifestación de voluntad del titular; II. Específica: referida a una o varias finalidades determinadas que justifiquen el tratamiento, y III. Informada: que el titular tenga conocimiento del aviso de privacidad previo al tratamiento a que serán sometidos sus datos personales y las consecuencias de otorgar su consentimiento. El consentimiento expreso también deberá ser inequívoco, es decir, que existan elementos que de manera indubitable demuestren su otorgamiento. Salvo que la Ley exija el consentimiento expreso del titular, será válido el consentimiento tácito. En cualquier momento, el titular podrá revocar su consentimiento para el tratamiento de sus datos personales, para lo cual “TIMBOX” estableció un mecanismo al respecto el cual se detallará más adelante.",
      },
      {
        etiqueta: "Información:",
        texto:
          "Información: “TIMBOX” deberá dar a conocer al titular la información relativa a la existencia y características principales del tratamiento a que serán sometidos sus datos personales a través del presente Aviso de Privacidad Integral.",
      },
      {
        etiqueta: "Calidad:",
        texto:
          "Calidad: Se cumple con el principio de calidad cuando los datos personales tratados sean exactos, completos, pertinentes, correctos y actualizados según se requiera para el cumplimiento de la finalidad para la cual son tratados. Se presume que se cumple con la calidad en los datos personales cuando éstos son proporcionados directamente por el titular, y hasta que éste no manifieste y acredite lo contrario, o bien, el responsable cuente con evidencia objetiva que los contradiga.",
      },
      {
        etiqueta: "Finalidad:",
        texto:
          "Finalidad: Los datos personales sólo podrán ser tratados para el cumplimiento de la finalidad o finalidades establecidas en el aviso de privacidad.",
      },
      {
        etiqueta: "Lealtad:",
        texto:
          "Lealtad: El principio de lealtad establece la obligación de tratar los datos personales privilegiando la protección de los intereses del titular y la expectativa razonable de privacidad.",
      },
      {
        etiqueta: "Proporcionalidad:",
        texto:
          "Proporcionalidad: Sólo podrán ser objeto de tratamiento los datos personales que resulten necesarios, adecuados y relevantes en relación con las finalidades para las que se hayan obtenido.",
      },
      {
        etiqueta: "Responsabilidad:",
        texto:
          "Responsabilidad: “TIMBOX” tiene la obligación de velar y responder por el tratamiento de los datos personales que se encuentren bajo su custodia o posesión, o por aquéllos que haya comunicado a un encargado, ya sea que este último se encuentre o no en territorio mexicano. Para cumplir con esta obligación, “TIMBOX” podrá valerse de estándares, mejores prácticas internacionales, políticas corporativas, esquemas de autorregulación o cualquier otro mecanismo que determine adecuado para tales fines.",
      },
    ],
  },
  {
    tipo: "titulo",
    texto: "CONSENTIMIENTO PARA EL USO DE DATOS PERSONALES.",
  },
  {
    tipo: "parrafo",
    texto:
      "El tratamiento de los datos personales estará siempre sujeto a que el titular proporcione su consentimiento ya sea de manera expresa manifestando su voluntad de manera verbal, por medios electrónicos, ópticos, por cualquier otra tecnología o por signos inequívocos, o bien de manera tácita. Para efectos del presente aviso de privacidad, se entenderá como consentimiento tácito cuando habiéndose puesto a disposición del titular el aviso de privacidad, éste no manifieste oposición alguna.",
  },
  {
    tipo: "parrafo",
    texto:
      "Para ambos consentimientos, el titular de los datos personales cuenta con un plazo de 05 (cinco) días para manifestar su oposición al tratamiento de dichos datos, siguiendo el procedimiento descrito en el “Procedimiento para Revocar, Notificar el Uso Indebido del Tratamiento de sus Datos Personales y Ejercer los Derechos ARCO” del presente aviso de privacidad.",
  },
  {
    tipo: "parrafo",
    texto:
      "No será necesario el consentimiento para el tratamiento de los datos personales cuando: I. Esté previsto en una Ley; II. Los datos figuren en fuentes de acceso público; III. Los datos personales se sometan a un procedimiento previo de disociación; IV. Tenga el propósito de cumplir obligaciones derivadas de una relación jurídica entre el titular y el responsable; V. Exista una situación de emergencia que potencialmente pueda dañar a un individuo en su persona o en sus bienes; VI. Sean indispensables para la atención médica, la prevención, diagnóstico, la prestación de asistencia sanitaria, tratamientos médicos o la gestión de servicios sanitarios, mientras el titular no esté en condiciones de otorgar el consentimiento, en los términos que establece la Ley General de Salud y demás disposiciones jurídicas aplicables y que dicho tratamiento de datos se realice por una persona sujeta al secreto profesional u obligación equivalente, o VII. Se dicte resolución de autoridad competente.",
  },
  {
    tipo: "titulo",
    texto: "INFORMACIÓN A RECABAR.",
  },
  {
    tipo: "parrafo",
    texto:
      "Dependiendo la finalidad para las que usted nos otorgue los datos personales, le solicitaremos los siguientes dependiendo de la categoría en la que aplique:",
  },
  {
    tipo: "lista",
    items: [
      {
        etiqueta: "Para el caso de Clientes y Usuarios de las plataformas de “TIMBOX”:",
        texto:
          "Para el caso de Clientes y Usuarios de las plataformas de “TIMBOX”: Datos de identificación, datos de contacto, datos empresariales y laborales y datos patrimoniales que de manera enunciativa mas no limitativa comprenden Registro Federal de Contribuyentes (RFC), Nombre, Denominación o Razón social, Certificados CSD en formato PEM, Llave Privada del CSD formato PEM, Domicilio Fiscal, Facturas emitidas, Correo electrónico, Número Telefónico.",
      },
      {
        etiqueta: "Para el caso de Proveedores:",
        texto:
          "Para el caso de Proveedores: Datos de identificación, datos de contacto, datos empresariales y laborales y datos patrimoniales que de manera enunciativa mas no limitativa comprenden Registro Federal de Contribuyentes (RFC), Nombre, Denominación o Razón social, Domicilio Fiscal, Correo electrónico, Número Telefónico. Constancia de Situación Fiscal, Opinión de cumplimiento en materia fiscal, Caratula Bancaria y/o Datos Bancarios.",
      },
      {
        etiqueta: "Para el caso de trabajadores y solicitantes de empleo:",
        texto:
          "Para el caso de trabajadores y solicitantes de empleo: Datos de identificación, datos de contacto, datos empresariales y laborales y datos patrimoniales que de manera enunciativa mas no limitativa comprenden Registro Federal de Contribuyentes (RFC), Nombre, Domicilio Fiscal (comprobante de domicilio), Numero de Seguridad Social (NSS), Clave Única de Registro Poblacional (CURP), Correo electrónico, Número Telefónico, Nombre de beneficiarios, Estado Civil.",
      },
    ],
  },
  {
    tipo: "titulo",
    texto: "FORMA DE RECABAR LA INFORMACIÓN.",
  },
  {
    tipo: "parrafo",
    texto:
      "Para las finalidades señaladas en el presente Aviso de Privacidad Integral, podemos recabar sus datos personales de distintas formas siempre que Usted nos los proporcione directamente a través de cualquier Medio (datos de identificación, laborales o derivados de la relación laboral con “TIMBOX” académicos, laborales, de contacto y mercadológicos);",
  },
  {
    tipo: "parrafo",
    texto:
      "Cuando visite nuestro sitio de Internet o utilice nuestros servicios en línea (uso de cookies y web beacons, registro electrónico);",
  },
  {
    tipo: "parrafo",
    texto:
      "Cuando obtenemos información a través de otras fuentes que están permitidas por la Ley (directorios telefónicos, agencias de investigación de mercados, agencias de publicidad); y Cuando nos los proporcione a través de solicitudes de empleo, ya sean físicas o electrónicas con motivo de la relación(es) laborales con “TIMBOX”",
  },
  {
    tipo: "parrafo",
    texto:
      "“TIMBOX” tratará sus datos personales solo por el tiempo permitido por la LEGISLACION, razón por la cual la empresa eliminará su información trascurrido dicho plazo o cumplidas las finalidades previstas en el presenta Aviso de Privacidad Integral.",
  },
  {
    tipo: "titulo",
    texto: "TRANSFERENCIA DE DATOS.",
  },
  {
    tipo: "parrafo",
    texto:
      "Sus datos personales pueden ser transferidos y tratados por personas físicas y/o morales relacionadas a “TIMBOX” En este sentido, su información puede ser compartida con: a) aquellas sociedades que forman parte del grupo económico de “TIMBOX” DE C.V; b) con auditores externos (legales y contables); c) compañías de seguros con las que se tenga una relación jurídica; d) sociedades que operen junto con “TIMBOX” algún tipo de software y cualquier infraestructura de informática que sirva como plataforma para mantener actualizadas y protegidas sus bases de datos; e) empresas de mensajería, seguridad y transporte de valores, con el objeto de que asistan a “TIMBOX” en el desarrollo y desempeño de sus funciones; f) para defender a “TIMBOX” de cualquier controversia legal que pudiera surgir; g) empresas consultoras en materia de Recursos Humanos, ya sea que su asesoría y/o consultoría sea individual o de grupos; y h) instituciones públicas como I.M.S.S., INFONAVIT, FONACOT, SAT, SHCP o cualquier otra autoridad administrativa y/o jurisdiccional que la “LEGISLACION” contemple como obligatorio el proporcionar dicha información previo requerimiento de la misma.",
  },
  {
    tipo: "parrafo",
    texto:
      "En caso de no encontrarse en los supuestos de una o algunas de las transferencias de datos anteriormente descritas, dichas transferencias específicas no le serán aplicables.",
  },
  {
    tipo: "titulo",
    texto: "COOKIES DE SESIÓN.",
  },
  {
    tipo: "parrafo",
    texto:
      "“TIMBOX” utiliza Cookies en su sitio web. Las Cookies son archivos de texto que quedan almacenados en el disco duro de su ordenador cuando visita algunos sitios web.",
  },
  {
    tipo: "parrafo",
    texto:
      "“TIMBOX” únicamente utiliza cookies para las sesiones de nuestro aplicativo gratuito y dashboard, manifestando que no se recaban datos personales u otra información similar a través de este tipo de mecanismos.",
  },
  {
    tipo: "parrafo",
    texto:
      "El sitio web de “TIMBOX” puede incluir enlaces a sitios web de terceros, que, de accederse, ocasionará que se abandone el sitio web de “TIMBOX”, por lo cual “TIMBOX” no asume ninguna responsabilidad en relación con esos sitios web de terceros.",
  },
  {
    tipo: "parrafo",
    texto:
      "El sitio web de “TIMBOX” puede incluir enlaces a sitios que administran redes sociales, en cuyo caso usted acepta que, al proporcionar cualquier tipo de información o Datos en dichos sitios, ocasionará que los mismos puedan ser leídos, vistos, accedidos, retransmitidos y tratados por cualquier persona, y por lo tanto libera de cualquier responsabilidad a “TIMBOX”.",
  },
  {
    tipo: "titulo",
    texto: "MODIFICACIONES AL AVISO DE PRIVACIDAD",
  },
  {
    tipo: "parrafo",
    texto:
      "“TIMBOX” se reserva el derecho de efectuar en cualquier momento modificaciones o actualizaciones al presente aviso de privacidad, en atención a novedades legislativas o políticas internas. Dichas modificaciones estarán disponibles al público en el Departamento de Protección de Datos de la Empresa ubicado en el domicilio arriba señalado, así como en la página de internet www.timbox.com.mx; o en su defecto será informado a cualquier titular siempre que envíe un correo electrónico a la dirección privacidad@timbox.com.mx manifestando que le sea proporcionado el documento actualizado de nuestro Aviso de Privacidad Integral.",
  },
  {
    tipo: "titulo",
    texto: "DERECHOS ARCO",
  },
  {
    tipo: "parrafo",
    texto:
      "Los titulares de los derechos personales en posesión de la Empresa, en cualquier momento, podrá ejercer el derecho a ACCEDER a sus datos personales y a los detalles del tratamiento de los mismos, así como a RECTIFICARLOS en caso de ser inexactos o instruir a CANCELARLOS cuando considere que resulten ser excesivos o innecesarios para las finalidades que justificaron su obtención, u OPONERSE al tratamiento de los mismos. A los derechos descritos con anterioridad, se le denominaran Derechos ARCO.",
  },
  {
    tipo: "parrafo",
    texto:
      "La forma de ejercitar los Derechos ARCO será siguiendo el procedimiento descrito en el documento titulado “Procedimiento para Revocar, Notificar el Uso Indebido del Tratamiento de sus Datos Personales y Ejercer los Derechos ARCO” o en su caso en el presente de privacidad en el siguiente título.",
  },
  {
    tipo: "titulo",
    texto:
      "PROCEDIMIENTO PARA REVOCAR, NOTIFICAR EL USO INDEBIDO DEL TRATAMIENTO DE SUS DATOS PERSONALES Y EJERCER LOS DERECHOS ARCO",
  },
  {
    tipo: "parrafo",
    texto:
      "En caso de que desee: (i) Revocar su consentimiento para tratar sus datos personales para los fines adicionales descritos en el apartado “Finalidad del Tratamiento de Datos Personales” del presente aviso; y/o (ii) Notificar el uso del indebido del tratamiento de sus datos personales porque considera que la Empresa, o sus actuaciones o respuestas lesiona sus derechos de protección de datos, o presume que existe alguna violación a las disposiciones previstas en la Ley; y/o (iii) Ejercer los Derechos ARCO. Usted deberá presentar escrito libre dirigido al Departamento de Protección de Datos al domicilio mencionado con anterioridad o al correo electrónico arco@timbox.com.mx (según su preferencia) en un horario de 9:00 hrs (nueve horas) a 18:00 hrs (dieciocho horas) de lunes a viernes.",
  },
  {
    tipo: "parrafo",
    texto: "El escrito libre deberá contener al menos la siguiente información:",
  },
  {
    tipo: "lista",
    items: [
      {
        texto: "Nombre del titular, domicilio, teléfono y correo electrónico.",
      },
      {
        texto:
          "Copia de la identificación oficial del titular (INE, Pasaporte vigente y/o Cedula Profesional) y/o en su caso acreditar su personalidad con Acta Notariada donde se demuestre el poder otorgado o en su caso las facultades con las que se cuenta.",
      },
      {
        texto:
          "Descripción del objeto del escrito, los cuales pueden ser de manera enunciativa más no limitativa los siguientes:",
      },
      {
        texto:
          "a. Revocación del consentimiento para tratar sus datos personales; y/o b. Notificación del uso indebido del tratamiento de sus datos personales; y/o c. Ejercitar sus Derechos ARCO, con una descripción clara y precisa de los datos a Acceder, Rectificar, Cancelar o bien, Oponerse y las consideraciones aplicables. En caso de Rectificación de datos personales, deberá indicar la modificación exacta y anexar la documentación soporte; y",
      },
      {
        texto:
          "Cualquier otro elemento o documento que facilite la localización de sus datos personales, por ejemplo, a que persona y/o área y/o empresas de “TIMBOX” DE C.V fueron proporcionados.",
      },
    ],
  },
  {
    tipo: "parrafo",
    texto:
      "Asimismo, Usted puede dejar de recibir mensajes promocionales por teléfono fijo o teléfono móvil, dejar de recibir correo postal publicitario o dejar de recibir correos electrónicos con promociones siguiendo los pasos arriba descritos.",
  },
  {
    tipo: "parrafo",
    texto:
      "“TIMBOX” pone a su consideración, que cuando se trate de revocar su consentimiento, no en todos los casos se podrá atender la solicitud o concluir el uso de forma inmediata, ya que es posible, que por alguna obligación legal se requiera seguir tratando con sus datos personales; y/o para ciertos fines.",
  },
  {
    tipo: "parrafo",
    texto:
      "“TIMBOX” no está obligado a cancelar los datos personales cuando: I. Se refiera a las partes de un contrato privado, social o administrativo y sean necesarios para su desarrollo y cumplimiento; II. Deban ser tratados por disposición legal; III. Obstaculice actuaciones judiciales o administrativas vinculadas a obligaciones fiscales, la investigación y persecución de delitos o la actualización de sanciones administrativas; IV. Sean necesarios para proteger los intereses jurídicamente tutelados del titular; V. Sean necesarios para realizar una acción en función del interés público; VI. Sean necesarios para cumplir con una obligación legalmente adquirida por el titular,",
  },
  {
    tipo: "parrafo",
    texto:
      "Para todo lo no previsto en este título sobre el procedimiento, será aplicable el protocolo titulado “PROCEDIMIENTO PARA REVOCAR, NOTIFICAR EL USO INDEBIDO DEL TRATAMIENTO DE SUS DATOS PERSONALES Y EJERCER LOS DERECHOS ARCO”",
  },
  {
    tipo: "parrafo",
    texto:
      "Al revocar el consentimiento, implicará que la Empresa no podrá seguir prestándole el servicio solicitado.",
  },
  {
    tipo: "titulo",
    texto: "JURISDICCIÓN.",
  },
  {
    tipo: "parrafo",
    texto:
      "El presente Aviso de Privacidad Integral, así como el manejo en general de la información recabada que haga “TIMBOX”, se rige por la legislación vigente y aplicable en los Estados Unidos Mexicanos, por lo que cualquier controversia que se suscite con motivo de su aplicación deberá ventilarse ante los Órganos Jurisdiccionales competentes en la Ciudad de Querétaro, Querétaro.",
  },
  {
    tipo: "parrafo",
    texto: "Última modificación: 10 de junio de 2023.",
  },
];
