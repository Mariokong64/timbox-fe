import { atributosNomina, glosarioNomina } from "./datosNomina";
import { estructuraNomina, nominaCompleta, nominaMinima } from "./ejemplos";
import { PaginaGlosarioTxt } from "./PaginaGlosarioTxt";

export function TxtNomina() {
  return (
    <PaginaGlosarioTxt
      titulo="TXT Nómina"
      activo="/layout-nomina/"
      glosario={glosarioNomina}
      atributos={atributosNomina}
      estructura={estructuraNomina}
      ejemploMinimo={nominaMinima}
      ejemploCompleto={nominaCompleta}
      esNomina
    />
  );
}
