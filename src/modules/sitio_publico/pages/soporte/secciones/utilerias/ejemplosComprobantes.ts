type DatosCfdiRecuperado = {
  fecha: string;
  sello: string;
  uuid: string;
  fechaTimbrado: string;
  selloSat: string;
};

const certificado = "MIIFljCCA36gAwIBAgIUMzAwMDEwMDAwMDA0MDAwMDIzMzIwDQYJKoZIhvcNAQELBQAwggErMQ8wDQYDVQQDDAZBQyBVQVQxLjAsBgNVBAoMJVNFUlZJQ0lPIERFIEFETUlOSVNUUkFDSU9OIFRSSUJVVEFSSUExGjAYBgNVBAsMEVNBVC1JRVMgQXV0aG9yaXR5MSgwJgYJKoZIhvcNAQkBFhlvc2Nhci5tYXJ0aW5lekBzYXQuZ29iLm14MR0wGwYDVQQJDBQzcmEgY2VycmFkYSBkZSBjYWRpejEOMAwGA1UEEQwFMDYzNzAxCzAJBgNVBAYTAk1YMRkwFwYDVQQIDBBDSVVEQUQgREUgTUVYSUNPMREwDwYDVQQHDAhDT1lPQUNBTjERMA8GA1UELRMIMi41LjQuNDUxJTAjBgkqhkiG9w0BCQITFnJlc3BvbnNhYmxlOiBBQ0RNQS1TQVQwHhcNMTkwNTI5MTg0NDU3WhcNMjMwNTI5MTg0NDU3WjCBvTEgMB4GA1UEAxMXQ0VDSUxJQSBNSVJBTkRBIFNBTkNIRVoxIDAeBgNVBCkTF0NFQ0lMSUEgTUlSQU5EQSBTQU5DSEVaMSAwHgYDVQQKExdDRUNJTElBIE1JUkFOREEgU0FOQ0hFWjEWMBQGA1UELRMNTUlTQzQ5MTIxNEI4NjEbMBkGA1UEBRMSTUlTQzQ5MTIxNE1DQ1JOQzAxMSAwHgYDVQQLExdDRUNJTElBIE1JUkFOREEgU0FOQ0hFWjCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAJzAzSn5OeWoVfKCzpTudveHSAxa/cUNaooOUjrPJhWRsKKtYArZ67CDYZSbqbjIBwb3Dv6Agr1NHHbYT+h657rJOC3Zhmm4d4a05UoizZTDAtY5c3XAKpdKuJ2oggZuSR9H7mSQ1P3WfT5v3TRg6xgEQwmMdb7v3C0AK1PTOKtjhjmne9NqhzrEHe3nfiWqX6Jn8Xt+lrPAz9k40BOWJiPy9gMthAHPXgXYUMsmfFVYubcNXVIX+iElehL6j5Ain4/S+FBqqp0RvuEF6VfZiI5SuXlH69Rw7BwUcFjgv9hOmRc+vYeaasoqLmfF5Suk+6oEThvh2AO24yiq+1m3scUCAwEAAaMdMBswDAYDVR0TAQH/BAIwADALBgNVHQ8EBAMCBsAwDQYJKoZIhvcNAQELBQADggIBAJU0OG2EeLQWVVijpaOBFTyG3+KYCy+hJYyo6/hcUUCRFBAiNTb89tylUkRKpJ9p8digYLkeemmhOkP5UNnwpiy0nfgKDlNHX3BWWBC2X6vcHXF9fOMf1CxYaDMhpqzHI+rNe+7E9GX+Y55Butk1RXGNbrprDkF4HKpc8rj1CtlyvmUjJJ9iWCOyap8/k5NWn1LZA9WdB6JoA5DIX2M4GCkh67bHeNteog8W8DEtYAekkI7Ufe74EI5e3NB3xLO2EZrmula5WEOpEGuvLdi9pqiYzSSabFB/xf1papyZYvKkWWiw6OOEo5V2Z2EXd/sDAMWQhyJygHjUh2ajXQFfKI577omUQf346dlhJXi7PMk2N/26lvtJT5hYLyrbk5K9XiYBfJKkIedn9eoCZIxMH59J8ka2Q23rLnil1rw4l8kVZ9wAhGazeK4Nfzm38B81j6q38Gi7x5GaparrOr+bA5Brr2/e5mH8YGQXUPRNK4ag/N+KggnOH/fHZBH0mKSJZoLhsizGXahcazzuEjqENXF/C+0QG8vuimEtyyCFzx4JzzB5G1i+ZEhGMH7nkRSUf/8Rq8fN2u0SNYE5JEB4ipFaer2JGlRrzSMP5iNkCH2wxWphrMHRWqVqx97PpM45nE0JcukvObw72TaKFhohQ2U6yMb/fqqP5p7C1Z5af38H";

export function crearCfdiRecuperado({ fecha, sello, uuid, fechaTimbrado, selloSat }: DatosCfdiRecuperado) {
  return `<cfdi:Comprobante xmlns:cfdi="http://www.sat.gob.mx/cfd/3" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" Certificado="${certificado}" Fecha="${fecha}" FormaPago="01" LugarExpedicion="06300" MetodoPago="PUE" Moneda="MXN" NoCertificado="30001000000400002332" Sello="${sello}" SubTotal="1510.00" TipoCambio="1" TipoDeComprobante="I" Total="1751.60" Version="3.3" xsi:schemaLocation="http://www.sat.gob.mx/cfd/3 http://www.sat.gob.mx/sitio_internet/cfd/3/cfdv33.xsd">
  <cfdi:Emisor Nombre="CECILIA MIRANDA SANCHEZ" RegimenFiscal="605" Rfc="MISC491214B86"/>
  <cfdi:Receptor Nombre="IT SW Development Solutions de Mexico S de RL de CV" Rfc="IAD121214B34" UsoCFDI="P01"/>
  <cfdi:Conceptos>
    <cfdi:Concepto Cantidad="5" ClaveProdServ="10122100" ClaveUnidad="M74" Descripcion="prueba Catalogos Nuevos" Importe="1250.00" Unidad="Kilo" ValorUnitario="250.00">
      <cfdi:Impuestos>
        <cfdi:Traslados>
          <cfdi:Traslado Base="1250.00" Importe="200.00" Impuesto="002" TasaOCuota="0.160000" TipoFactor="Tasa"/>
        </cfdi:Traslados>
      </cfdi:Impuestos>
    </cfdi:Concepto>
    <cfdi:Concepto Cantidad="1" ClaveProdServ="24111500" ClaveUnidad="KGM" Descripcion="traslucida 90x90 cm. cal. 200" Importe="22.00" Unidad="kg" ValorUnitario="22.00">
      <cfdi:Impuestos>
        <cfdi:Traslados>
          <cfdi:Traslado Base="22.00" Importe="3.52" Impuesto="002" TasaOCuota="0.160000" TipoFactor="Tasa"/>
        </cfdi:Traslados>
      </cfdi:Impuestos>
    </cfdi:Concepto>
    <cfdi:Concepto Cantidad="10" ClaveProdServ="13101712" ClaveUnidad="KGM" Descripcion="POLIETILENO DE BAJA DENSIDAD" Importe="238.00" Unidad="KG" ValorUnitario="23.80">
      <cfdi:Impuestos>
        <cfdi:Traslados>
          <cfdi:Traslado Base="238.00" Importe="38.08" Impuesto="002" TasaOCuota="0.160000" TipoFactor="Tasa"/>
        </cfdi:Traslados>
      </cfdi:Impuestos>
    </cfdi:Concepto>
  </cfdi:Conceptos>
  <cfdi:Impuestos TotalImpuestosTrasladados="241.60">
    <cfdi:Traslados>
      <cfdi:Traslado Importe="241.60" Impuesto="002" TasaOCuota="0.160000" TipoFactor="Tasa"/>
    </cfdi:Traslados>
  </cfdi:Impuestos>
  <cfdi:Complemento>
    <tfd:TimbreFiscalDigital xmlns:tfd="http://www.sat.gob.mx/TimbreFiscalDigital" xsi:schemaLocation="http://www.sat.gob.mx/TimbreFiscalDigital http://www.sat.gob.mx/sitio_internet/cfd/TimbreFiscalDigital/TimbreFiscalDigitalv11.xsd" Version="1.1" UUID="${uuid}" FechaTimbrado="${fechaTimbrado}" RfcProvCertif="IAD121214B34" SelloCFD="${sello}" NoCertificadoSAT="20001000000300022323" SelloSAT="${selloSat}"/>
  </cfdi:Complemento>
</cfdi:Comprobante>`;
}
