import { BloqueContenidoSoporte } from "../../components/BloqueContenidoSoporte";
import { LayoutDocumentacionSoporte } from "../../components/LayoutDocumentacionSoporte";
import { TablaSoporte } from "../../components/TablaSoporte";

const rutaRfcsPruebas = "/rfcs-ambiente-de-pruebas-sat/";

const menuRfcsPruebas = [
  { texto: "RFC's Ambiente de Pruebas SAT", to: rutaRfcsPruebas },
];

const columnasRfcs = ["#", "RFC", "Nombre", "Obligaciones", "Retención", "Régimen"];

const personasFisicas = [
  ["1", "CACX7605101P8", "XOCHILT CASAS CHAVEZ", "2", "0", "621"],
  ["2", "FUNK671228PH6", "KARLA FUENTE NOLASCO", "1", "0", "621, 605"],
  ["3", "IAÑL750210963", "LUIS IAN ÑUZCO", "1", "0", "608"],
  ["4", "JUFA7608212V6", "ADRIANA JUAREZ FERNANDEZ", "3", "0", "614"],
  ["5", "KAHO641101B39", "OSCAR KALA HAAK", "1", "0", "612"],
  ["6", "KICR630120NX3", "RODRIGO KITIA CASTRO", "1", "0", "622"],
  ["7", "MISC491214B86", "CECILIA MIRANDA SANCHEZ", "1", "0", "612"],
  ["8", "RAQÑ7701212M3", "ÑEVES RAMIREZ QUEZADA", "1", "0", "605"],
  ["9", "WATM640917J45", "MARIA WATEMBER TORRES", "1", "2", "622, 626"],
  ["10", "WERX631016S30", "XAIME WEIR ROJO", "1", "0", "608"],
  ["11", "XAMA620210DQ5", "ALBA XKARAJAM MENDEZ", "1", "0", "612"],
  ["12", "XIQB891116QE4", "BERENICE XIMO QUEZADA", "4", "0", "606"],
  ["13", "XOJI740919U48", "INGRID XODAR JIMENEZ", "1", "1", "612, 626"],
];

const personasMorales = [
  ["1", "EKU9003173C9", "ESCUELA KEMPER URGATE", "1", "0", "601"],
  ["2", "EWE1709045U0", "ESCUELA WILSON ESQUIVEL", "1", "0", "622"],
  ["3", "HAÑ930228SM9", "HERMANOS ANZURES ÑARVAEZ", "1", "0", "601"],
  ["4", "H&E951128469", "HERRERIA & ELECTRICOS", "2", "0", "601"],
  ["5", "IIA040805DZ4", "INDISTRIA ILUMINADORA DE ALMACENES", "2", "0", "601"],
  ["6", "IVD920810GU2", "INNOVACION VALOR Y DESARROLLO", "1", "1", "601, 626"],
  ["7", "IXS7607092R5", "INTERNACIONAL XIMBO Y SABORES", "1", "0", "603"],
  ["8", "JES900109Q90", "JIMENEZ ESTRADA SALAS", "3", "2", "601, 626"],
  ["9", "KIJ0906199R1", "KERNEL INDUSTIA JUGUETERA", "1", "0", "603"],
  ["10", "L&O950913MSA", "LUCES & OBRAS", "1", "0", "603"],
  ["11", "OÑO120726RX3", "ORGANICOS ÑAVEZ OSORIO", "1", "0", "601"],
  ["12", "S&S051221SE2", "S & SOFTWARE", "1", "0", "624"],
  ["13", "URE180429TM6", "UNIVERSIDAD ROBOTICA ESPAÑOLA", "1", "0", "603"],
  ["14", "XIA190128J61", "XENON INDUSTRIAL ARTICLES", "2", "0", "624"],
  ["15", "ZUÑ920208KL4", "ZAPATERIA URTADO ÑERI", "1", "0", "601"],
];

const urlCertificados = "http://omawww.sat.gob.mx/tramitesyservicios/Paginas/documentos/Certificados_de_Prueba.zip";

export function RfcsAmbientePruebasSat() {
  return (
    <LayoutDocumentacionSoporte
      categoria="RFC's Ambiente de Pruebas SAT"
      titulo="RFC’s Ambiente de Pruebas SAT"
      menu={menuRfcsPruebas}
      activo={rutaRfcsPruebas}
    >
      <BloqueContenidoSoporte>
        <p>El Servicio de Administración Tributaria (SAT), pone a disposición de los contribuyentes los diferentes RFC’s y Certificado de Sello Digital (CSD), para que puedan realizar pruebas en sus sistemas de facturación.</p>
        <p>Cada RFC de prueba contiene el CSD correspondiente al RFC de prueba que se utilizan de la misma forma en que se emite una factura para una persona real, ya sea física o moral, cada CSD incluye los archivos .key y .cer, así como la contraseña, para que puedan ser usados en el proceso de timbrado de una factura.</p>
        <p>Cada RFC de prueba cuentan con diferentes tipo de obligaciones así como nombres personalizados para cada uno.</p>
        <p>Validez Obligaciones:</p>
        <ol>
          <li>Habilitado para facturar (IVA exento, tasa 0% y 16%).</li>
          <li>Habilitado para facturar (IVA exento, tasa 0%, 8% y 16%) Zona Fronteriza Norte.</li>
          <li>Habilitado para facturar (IVA exento, tasa 0%, 8% y 16%) Zona Fronteriza Sur.</li>
          <li>Habilitado para facturar (IVA exento, tasa 0%, 8% y 16%) Zona Fronteriza Norte y Sur.</li>
        </ol>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Personas Físicas">
        <TablaSoporte columnas={columnasRfcs} filas={personasFisicas} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Personas Morales">
        <TablaSoporte columnas={columnasRfcs} filas={personasMorales} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Descarga los certificados en el siguiente enlace">
        <p><a href={urlCertificados}>{urlCertificados}</a></p>
      </BloqueContenidoSoporte>
    </LayoutDocumentacionSoporte>
  );
}
