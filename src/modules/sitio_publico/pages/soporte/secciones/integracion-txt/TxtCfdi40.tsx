/* eslint-disable no-irregular-whitespace */
import { atributosCfdi40, glosarioCfdi40 } from "./datosCfdi40";
import { cfdi40Completo, cfdi40Minimo, estructuraCfdi40 } from "./ejemplos";
import { PaginaGlosarioTxt } from "./PaginaGlosarioTxt";

export function TxtCfdi40() {
  return (
    <PaginaGlosarioTxt
      titulo="TXT CFDI 4.0"
      activo="/layout-cfdi-4-0/"
      introduccion={<p>A partir del <b>01 de enero de 2022 </b>se implementó una nueva versión de CFDI, la 4.0, que tendrá un periodo de convivencia con la versión anterior, CFDI 3.3 hasta el <strong>31 de diciembre 2022</strong>. A posterior de esa fecha, solamente será válida la versión<b> CFDI 4.0</b></p>}
      glosario={glosarioCfdi40}
      atributos={atributosCfdi40}
      estructura={estructuraCfdi40}
      ejemploMinimo={cfdi40Minimo}
      ejemploCompleto={cfdi40Completo}
    />
  );
}
