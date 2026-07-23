/* eslint-disable no-irregular-whitespace */
import { certificadoExitoso } from "../servicios-validacion/ejemplos";

export const namespaceCfdi = `<cfdi:Comprobante
xmlns:cfdi="http://www.sat.gob.mx/cfd/4"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="
http://www.sat.gob.mx/cfd/4
http://www.sat.gob.mx/sitio_internet/cfd/4/cfdv40.xsd"
</cfdi:Comprobante>`;

export const namespaceRetenciones = `<retenciones:Retenciones
xmlns:retenciones="http://www.sat.gob.mx/esquemas/retencionpago/2"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="
http://www.sat.gob.mx/esquemas/retencionpago/2
http://www.sat.gob.mx/esquemas/retencionpago/2/retencionpagov2.xsd"
</retenciones:Retenciones>`;

export const comandoCertificado = `openssl x509 -in "CSD_INNOVACION_VALOR_Y_DESARROLLO_SA_DE_CV_IVD920810GU2_20190617_133410s.cer" -inform DER -out 'IVD920810GU2.cer.pem' -outform PEM`;

export const certificadoPem = `-----BEGIN CERTIFICATE-----
${certificadoExitoso.match(/.{1,64}/g)?.join("\n") ?? certificadoExitoso}
-----END CERTIFICATE-----`;

const inicioSegundaLineaCertificado = certificadoExitoso.indexOf("eDzuKR0");

export const certificadoAtributo = `Certificado="${certificadoExitoso.slice(0, inicioSegundaLineaCertificado)}
${certificadoExitoso.slice(inicioSegundaLineaCertificado)}"`;

export const comandoNoCertificado = `serial=openssl x509 -inform DER -in "CSD_INNOVACION_VALOR_Y_DESARROLLO_SA_DE_CV_IVD920810GU2_20190617_133410s.cer" -noout -serial`;

export const salidaNoCertificado = `Output 33 30 30 30 31 30 30 30 30 30 30 33 30 30 30 32 33 37 30 38
 
        3  0  0  0  1  0  0  0  0  0  0  3  0  0  0  2  3  7  0  8`;

export const numeroCertificado = `NoCertificado="30001000000300023708"`;

export const cadenaOriginal33 = `||3.3|2018-11-27T12:37:40|01|30001000000300023708|6260.00|MXN|1|7261.60|I|PUE|06300|AAA010101AAA|SENTIENT SA DE CV|601|IAD121214B34|IT SW Development Solutions de Mexico S de RL de CV|P01|10122100|6|M74|Kilo|prueba Catalogos Nuevos|1000.00|6000.00|6000.00|002|Tasa|0.160000|960.00|24111500|1|KGM|kg|traslucida 90x90 cm. cal. 200|22.00|22.00|22.00|002|Tasa|0.160000|3.52|13101712|10|KGM|KG|POLIETILENO DE BAJA DENSIDAD|23.80|238.00|238.00|002|Tasa|0.160000|38.08|002|Tasa|0.160000|1001.60|1001.60||`;

export const sello33 = `Sello="Vve+KIMdhPjSiPoA+oFPOI1+DHhbIZpAfjHDjdvuDpN9ga4g76DS90JDlY1mwXAOSOwTlA3YUSwFSt23piTUz9fd+e79xhEzLis6Tiarir0EwADu5tHtZezVMzkD4q4hf+qnpFwx9/F8pUd8eU0T6+fvchQyDE8JhTsTAVdKeD7UGjEwr8lbQ0QVVqXf0i3LWLkkrw0IGt4+NKMgp2WcmDmMkcf+fLYBFJmtrb2KQEgG6nc3IG5Bjik2t34BtYrGWfH9FQR9weBitJRMLfq4Lsmv++j9HlehnCdTlHAzEHpUCvSRw8HPQhhMNBg3zYMAWgM9FpPaUuTKFlkjHJbT4w=="`;

export const cadenaOriginal40 = `||4.0|VG|11814|2022-05-30T11:58:16|01|30001000000400002438|2572.95|MXN|1|2725.59|I|01|PUE|52080|IVD920810GU2|INNOVACION VALOR Y DESARROLLO SA|601|XAXX010101000|PUBLICO EN GENERAL|52080|616|S01|10191509|PU03180194|12.000000|KGM|PRESTO 5 KILO (PRODUCTOS SANIDAD URBANA)|159.0000|1908.00|02|1908.00|002|Tasa|0.080000|152.64|10191509|FM03130005|1.000000|H87|QUICK FUME 500 PASTILLAS (FUMIGANTE)|664.9500|664.95|02|664.95|002|Tasa|0.000000|0.00|1908.00|002|Tasa|0.080000|152.64|664.95|002|Tasa|0.000000|0.00|152.64||`;

export const sello40 = `ZLT7Y591WNw7f0hpWXDc1rAxs3K8K7QWh+yhnD1IUMkJegBhVBTBVJHDApLcFkNHj4e9XPu4YdNCvgPskSmY/MI8oueE9+Q3HbkbOwSAGe/SoHwcOQP/O4asuLel07yE3yo8KiZyqfpc0gGb4xCS3E3YGoAZcuOuz/2PUevr4iagI3lwy0qRnCQC7oFJa5kkeVJpZxsY/sPTCb6iCeGTyZr+Y/DoUQAtbndPsNWtAitjZr04HGkCxEPr793oz3ekGhw0qhk6Uao70814u4/dwH2z/GhfCksYW8iDayHF9m9ZZY35wHEanivm1vTKFCXoacG4uJKepmN2kvvC4KrvOw==`;

export const comandosSello33 = {
  certificado: comandoCertificado,
  llave: "openssl pkcs8 -inform DER -in 'CSD01_AAA010101AAA.key' -passin pass:12345678a -out 'CSD01_AAA010101AAA.key.pem'",
  digest: "openssl dgst -sha256 -sign 'CSD01_AAA010101AAA.key.pem' -out 'digest.txt' 'cadena_original.txt'",
  sello: "openssl enc -in 'digest.txt' -out 'sello.txt' -base64 -A -K 'CSD01_AAA010101AAA.key.pem'",
};

export const comandosSello40 = {
  certificado: comandoCertificado,
  llave: `openssl pkcs8 -inform DER -in "CSD_INNOVACION_VALOR_Y_DESARROLLO_SA_DE_CV_IVD920810GU2_20190617_133410.key" -passin pass:12345678a -out 'IVD920810GU2.key.pem'`,
  digest: "openssl dgst -sha256 -sign 'IVD920810GU2.key.pem' -out 'digest.txt' 'cadena_original.txt'",
  sello: "openssl enc -in 'digest.txt' -out 'sello.txt' -base64 -A -K 'IVD920810GU2.key.pem'",
};
