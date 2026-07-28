import { Box } from "@mui/material";
import imagenDudasDos from "../../assets/Componente-34.webp";
import imagenDudasUno from "../../assets/Componente-35.webp";
import { BloqueCodigoSoporte } from "../../components/BloqueCodigoSoporte";
import { BloqueContenidoSoporte } from "../../components/BloqueContenidoSoporte";
import { ContactoDudasSoporte } from "../../components/ContactoDudasSoporte";
import { LayoutDocumentacionPublica } from "../../../../components/LayoutDocumentacionPublica";
import { TablaSoporte } from "../../components/TablaSoporte";
import { ejemploPeticionValidar, ejemploRespuestaErrorValidar, ejemploRespuestaExitosaValidar } from "./ejemplos";

const menuServiciosValidacion = [
  { texto: "Validar CFDI", to: "/validar-cfdi/" },
];

const enlacePruebas = "https://staging.ws.timbox.com.mx/valida_cfdi/wsdl";
const enlaceProduccion = "https://sistema.timbox.com.mx/valida_cfdi/wsdl";

const detalleEstatusValidacion = (
  <Box sx={{ "& p": { my: 1 } }}>
    Nodo en el que se representará el resultado de la validación, ya sea válido o inválido según la estructura del XML.
    <p>En caso que el comprobante sea válido mostrará</p>
    <p>• Code: 200</p>
    <p>•Mensaje: Comprobante con UUID: 1C912A4C-6CA3-4DA7-BEC1-A6D1FAAA79C2 válido, en forma y sintaxis.</p>
    <p>En caso que el comprobante sea inválido:</p>
    <p>•Code: Mostrará el código de acuerdo a la matriz de errores del SAT.</p>
    <p>•Mensaje: Mostrará el mensaje de acuerdo a la matriz de errores del SAT</p>
  </Box>
);

const detalleMatriz = (descripcion: string, enlace: string, textoEnlace: string) => (
  <Box sx={{ "& p": { my: 1 } }}>
    {descripcion}
    <p>Descargar Matriz de Errores de:</p>
    <p><a href={enlace}>{textoEnlace}</a></p>
  </Box>
);

export function ValidarCfdi() {
  return (
    <LayoutDocumentacionPublica categoria="Servicios de validación" titulo="Método Validar_CFDI" menu={menuServiciosValidacion} activo="/validar-cfdi/">
      <BloqueContenidoSoporte titulo="Enlaces al servicio">
        <p>Pruebas: <a href={enlacePruebas}>{enlacePruebas}</a></p>
        <p>Producción: <a href={enlaceProduccion}>{enlaceProduccion}</a></p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Consumo de créditos">
        <p>Por cada XML a validar: <strong>1 crédito.</strong> (ya sea el comprobante este válido o no, se descontará un crédito por la validación del xml).</p>
      </BloqueContenidoSoporte>

      <ContactoDudasSoporte imagen={imagenDudasUno} />

      <BloqueContenidoSoporte titulo="Petición al servicio">
        <p>El servicio de “validar_cfdi” se utiliza para realizar la validación de comprobantes fiscales por internet contra el anexo 20 del SAT; además de validar el estatus ante el SAT, para saber si esta vigente o cancelado. Es requerido el usuario y contraseña para utilizar el servicio.</p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Parámetros de la petición">
        <TablaSoporte columnas={["Nombre", "Descripción", "Requerido"]} filas={[
          ["username", "Usuario del web service", "Sí"],
          ["password", "Contraseña del web service", "Sí"],
          ["comprobante", "Nodo que contiene la información de los comprobantes a validar. Se puede enviar como máximo hasta 10 comprobantes por petición.", "Sí"],
        ]} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Parámetros del nodo comprobante">
        <TablaSoporte columnas={["Nombre", "Descripción", "Requerido"]} filas={[
          ["external_id", "Id único para identificar los comprobantes que se envíen a validar. Sólo soporta hasta 30 carácteres numéricos.", "Sí"],
          ["sxml", "El xml del comprobante convertido a una cadena en base64.", "Sí"],
        ]} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Ejemplo de petición al servicio">
        <BloqueCodigoSoporte codigo={ejemploPeticionValidar} />
      </BloqueContenidoSoporte>

      <ContactoDudasSoporte imagen={imagenDudasDos} />

      <BloqueContenidoSoporte titulo="Respuesta del servicio">
        <p>La respuesta del servicio de validar cfdi se encontrará en el nodo “resultados”, que contendrá 3 nodos principales, mostrando información del estatus del CFDI ante el SAT, la información general del comprobante y el resultado de la validación.</p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Parámetros de respuesta">
        <TablaSoporte columnas={["Nombre", "Descripción"]} filas={[
          ["external_id", "Nodo en el que se mostrará el id asignado al comprobante a validar y con esto saber que respuesta le corresponde a cada comprobante, como en los casos que se envía más de un comprobante por petición."],
          ["consulta_sat", "Nodo donde se muestra el estatus del comprobante ante el SAT, mostrará si se encuentra Vigente, Cancelado o en Proceso."],
          ["informacion_cfdi", "Nodo que contiene la información principal del comprobante, como son el RFC emisor, RFC receptor,fecha de timbrado, total, etc.)"],
          ["estatus_validacion", detalleEstatusValidacion],
        ]} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Ejemplo de respuesta exitosa del servicio">
        <BloqueCodigoSoporte codigo={ejemploRespuestaExitosaValidar} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Ejemplo de respuesta con error del servicio">
        <BloqueCodigoSoporte codigo={ejemploRespuestaErrorValidar} />
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Códigos de error a nivel petición">
        <p>En la siguiente sección se listan los códigos de error que puede regresar el servicio de validación a nivel petición:</p>
        <TablaSoporte columnas={["Código", "Descripción"]} filas={[
          ["VAL101", "Los datos de autentificación enviados son incorrectos."],
          ["*VAL102", "Su plan ha caducado, favor de contratar un nuevo plan."],
          ["*VAL103", "Se han agotado la cantidad de timbres, favor de contratar un nuevo plan."],
          ["VAL104", "External ID inválido, el atributo debe ser un valor numérico y no mayor a 30 dígitos"],
          ["VAL105", "El valor del parámetro ‘external_id’ es requerido"],
          ["VAL106", "Ya existe un registro de validación con la referencia ‘external_id’ en la base de datos"],
          ["VAL301", "El XML recibido no contiene una estructura válida."],
          ["VAL303", "El XML recibido contiene un carácter UNICODE inválido."],
          ["VAL304", "El parámetro ‘sxml’ debe de contener un valor válido."],
          ["VAL305", "La codificación del XML no está en UTF-8"],
          ["VAL306", "No se puede mandar más de 10 comprobantes a validar por petición."],
          ["VAL307", "Comprobante inválido, alguna etiqueta del XML contiene error de sintaxis."],
          ["VAL308", "El XML recibido no contiene la declaración del namespace ‘xmlns:xsi’ de CFDI conforme al Anexo 20."],
          ["VAL309", "El XML recibido no contiene la declaración del namespace ‘xmlns:xsi’ o de alguno de los complementos del CFDI conforme al Anexo 20"],
          ["VAL310", "El XML recibido no contiene la declaración del ‘xsi:schemaLocation’ del CFDI conforme al Anexo 20."],
          ["VAL999", "Error de comunicación con el servicio de timbrado"],
        ]} />
        <p>* VAL102 y VAL103.- Estos códigos de error solo aplican para el plan Pre-pago.</p>
      </BloqueContenidoSoporte>

      <BloqueContenidoSoporte titulo="Matrices de error del SAT">
        <p>Los códigos de error de las matrices de validación del CFDI y de cada complemento del SAT los puedes encontrar a continuación.</p>
        <TablaSoporte columnas={["Código", "Descripción"]} filas={[
          ["CFDI33101 – CFDI33196", detalleMatriz("Matriz de validaciones para el Comprobante Fiscal Digital por Internet versión 3.3", "http://omawww.sat.gob.mx/tramitesyservicios/Paginas/anexo_20_version3-3.htm", "CFDI")],
          ["CCE145 – CCE218", detalleMatriz("Matriz de validaciones para complemento Comercio Exterior 1.1", "https://www.sat.gob.mx/consultas/61165/comprobante-de-comercio-exterior", "Comercio Exterior")],
          ["ECC121 – ECC125", detalleMatriz("Matriz de validaciones para complemento Estado de Cuenta de Combustibles de Monederos Electrónicos 1.2.", "https://www.sat.gob.mx/consulta/21885/genera-tus-facturas-electronicas-con-el-complemento-para-el-estado-de-cuenta-de-combustibles-para-monederos-electronicos", "Estado de cuenta de combustibles de Moneda Electrónicos.")],
          ["GCEH101 – GCEH133", detalleMatriz("Matriz de validaciones para el complemento de Gastos del Consorcio derivados de la Ejecución de un Contrato de Exploración o Extracción de Hidrocarburos 1.0.", "https://www.sat.gob.mx/consulta/50282/conoce-los-complementos-para-consorcios-en-materia-de-hidrocarburos", "Gastos – Hidrocarburos")],
          ["IEEH101 – IEEH105", detalleMatriz("Matriz de validaciones para complemento de Ingresos atribuibles a los Integrantes de un Consorcio derivados de la Contraprestación de un Contrato de Exploración o Extracción de Hidrocarburos 1.0", "https://www.sat.gob.mx/consulta/50282/conoce-los-complementos-para-consorcios-en-materia-de-hidrocarburos", "Ingresos – Hidrocarburos")],
          ["INE180 – INE188", detalleMatriz("Matriz de validaciones para el CFDI versión 3.3 con complemento INE 1.1", "https://www.sat.gob.mx/consulta/09695/genera-tus-facturas-con-el-complemento-del-ine-version-1.1", "INE")],
          ["NOM132 – NOM225", detalleMatriz("Matriz de validaciones para complemento Nómina 1.2", "http://omawww.sat.gob.mx/tramitesyservicios/Paginas/complemento_nomina.htm", "Nómina")],
          ["CRP101 – CRP239", detalleMatriz("Matriz de validaciones del Complemento para Recepción de Pagos", "http://omawww.sat.gob.mx/tramitesyservicios/Paginas/recepcion_de_pagos.htm", "Recepción de Pagos")],
        ]} />
      </BloqueContenidoSoporte>
    </LayoutDocumentacionPublica>
  );
}
