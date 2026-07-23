import imagenDudasTres from "../../assets/Componente-32.png";
import imagenDudasDos from "../../assets/Componente-34.png";
import imagenDudasUno from "../../assets/Componente-35.png";
import imagenDudasCuatro from "../../assets/Componente-36.png";

export const menuRetenciones = [
  { texto: "Timbrar Retenciones", to: "/timbrar-retenciones/" },
  { texto: "Cancelar Retenciones", to: "/cancelar-retenciones/" },
  { texto: "Cancelar Masivo Retenciones", to: "/cancelar-masivo-retenciones/" },
  { texto: "Consultar Acuse de Cancelación", to: "/consultar-acuse-cancelacion/" },
];

export const imagenesDudasRetenciones = {
  uno: imagenDudasUno,
  dos: imagenDudasDos,
  tres: imagenDudasTres,
  cuatro: imagenDudasCuatro,
};

export const urlRetenciones = {
  pruebas: "https://staging.ws.timbox.com.mx/retencion/wsdl",
  produccion: "https://sistema.timbox.com.mx/retencion/wsdl",
};

export const certificadoPemRetenciones = `MIIFljCCA36gAwIBAgIUMzAwMDEwMDAwMDA0MDAwMDIzMzIwDQYJKoZIhvcNAQEL
BQAwggErMQ8wDQYDVQQDDAZBQyBVQVQxLjAsBgNVBAoMJVNFUlZJQ0lPIERFIEFE
TUlOSVNUUkFDSU9OIFRSSUJVVEFSSUExGjAYBgNVBAsMEVNBVC1JRVMgQXV0aG9y
aXR5MSgwJgYJKoZIhvcNAQkBFhlvc2Nhci5tYXJ0aW5lekBzYXQuZ29iLm14MR0w
GwYDVQQJDBQzcmEgY2VycmFkYSBkZSBjYWRpejEOMAwGA1UEEQwFMDYzNzAxCzAJ
BgNVBAYTAk1YMRkwFwYDVQQIDBBDSVVEQUQgREUgTUVYSUNPMREwDwYDVQQHDAhD
T1lPQUNBTjERMA8GA1UELRMIMi41LjQuNDUxJTAjBgkqhkiG9w0BCQITFnJlc3Bv
bnNhYmxlOiBBQ0RNQS1TQVQwHhcNMTkwNTI5MTg0NDU3WhcNMjMwNTI5MTg0NDU3
WjCBvTEgMB4GA1UEAxMXQ0VDSUxJQSBNSVJBTkRBIFNBTkNIRVoxIDAeBgNVBCkT
F0NFQ0lMSUEgTUlSQU5EQSBTQU5DSEVaMSAwHgYDVQQKExdDRUNJTElBIE1JUkFO
REEgU0FOQ0hFWjEWMBQGA1UELRMNTUlTQzQ5MTIxNEI4NjEbMBkGA1UEBRMSTUlT
QzQ5MTIxNE1DQ1JOQzAxMSAwHgYDVQQLExdDRUNJTElBIE1JUkFOREEgU0FOQ0hF
WjCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAJzAzSn5OeWoVfKCzpTu
dveHSAxa/cUNaooOUjrPJhWRsKKtYArZ67CDYZSbqbjIBwb3Dv6Agr1NHHbYT+h6
57rJOC3Zhmm4d4a05UoizZTDAtY5c3XAKpdKuJ2oggZuSR9H7mSQ1P3WfT5v3TRg
6xgEQwmMdb7v3C0AK1PTOKtjhjmne9NqhzrEHe3nfiWqX6Jn8Xt+lrPAz9k40BOW
JiPy9gMthAHPXgXYUMsmfFVYubcNXVIX+iElehL6j5Ain4/S+FBqqp0RvuEF6VfZ
iI5SuXlH69Rw7BwUcFjgv9hOmRc+vYeaasoqLmfF5Suk+6oEThvh2AO24yiq+1m3
scUCAwEAAaMdMBswDAYDVR0TAQH/BAIwADALBgNVHQ8EBAMCBsAwDQYJKoZIhvcN
AQELBQADggIBAJU0OG2EeLQWVVijpaOBFTyG3+KYCy+hJYyo6/hcUUCRFBAiNTb8
9tylUkRKpJ9p8digYLkeemmhOkP5UNnwpiy0nfgKDlNHX3BWWBC2X6vcHXF9fOMf
1CxYaDMhpqzHI+rNe+7E9GX+Y55Butk1RXGNbrprDkF4HKpc8rj1CtlyvmUjJJ9i
WCOyap8/k5NWn1LZA9WdB6JoA5DIX2M4GCkh67bHeNteog8W8DEtYAekkI7Ufe74
EI5e3NB3xLO2EZrmula5WEOpEGuvLdi9pqiYzSSabFB/xf1papyZYvKkWWiw6OOE
o5V2Z2EXd/sDAMWQhyJygHjUh2ajXQFfKI577omUQf346dlhJXi7PMk2N/26lvtJ
T5hYLyrbk5K9XiYBfJKkIedn9eoCZIxMH59J8ka2Q23rLnil1rw4l8kVZ9wAhGaz
eK4Nfzm38B81j6q38Gi7x5GaparrOr+bA5Brr2/e5mH8YGQXUPRNK4ag/N+KggnO
H/fHZBH0mKSJZoLhsizGXahcazzuEjqENXF/C+0QG8vuimEtyyCFzx4JzzB5G1i+
ZEhGMH7nkRSUf/8Rq8fN2u0SNYE5JEB4ipFaer2JGlRrzSMP5iNkCH2wxWphrMHR
WqVqx97PpM45nE0JcukvObw72TaKFhohQ2U6yMb/fqqP5p7C1Z5af38H`;

export const llavePemRetenciones = `MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCcwM0p+TnlqFXy
gs6U7nb3h0gMWv3FDWqKDlI6zyYVkbCirWAK2euwg2GUm6m4yAcG9w7+gIK9TRx2
2E/oeue6yTgt2YZpuHeGtOVKIs2UwwLWOXN1wCqXSridqIIGbkkfR+5kkNT91n0+
b900YOsYBEMJjHW+79wtACtT0zirY4Y5p3vTaoc6xB3t534lql+iZ/F7fpazwM/Z
ONATliYj8vYDLYQBz14F2FDLJnxVWLm3DV1SF/ohJXoS+o+QIp+P0vhQaqqdEb7h
BelX2YiOUrl5R+vUcOwcFHBY4L/YTpkXPr2HmmrKKi5nxeUrpPuqBE4b4dgDtuMo
qvtZt7HFAgMBAAECggEAWsi/CgQxp/Sqcl2Xz2GcvRc4fw9j0fBHN9W7ghve7rcG
GfFXonE7s2sj5LGSxlXy2/HSWUuMbJ5wUdRN01L7So6nXsaQtkID15yE/z7Q2ctn
pTJ40EWPZTf9XDHvvFG7P8alJtFKygijWLno3yESh0JQoQMcXo0Ec3uZnF7Ef12j
5nOHas2f9VB6aqzSaMOLXH7ZgyTwon7KaFwAfhH8Pdo4cDvGYxxeNXkk61ve23eZ
OZhc5x7GNAPYUGftKbiA3bNPBArBgoEjcl5q0yyBjaxoF7IzwauA23E6UnVTJ80v
BtUKZuTPCpS5N64bfgdc/EpCkqUyegt9lpt+YVG7AQKBgQD1ENmACuiJQVawTVV1
7dBztT+1jinT6wOUfOnPftbukMpin2jHnI2+Bnxccl7kHQvdBCub7l2pu21He47M
AaCJCa61QIY2BumCw47+XK+ZD59EnxKxMrHK7kCsv8GPDi6b/uoY01K1U/XrQTXh
MbJKArMv5qnNfuVRCg1DkaHE8QKBgQCjvz2+SIOlaSSWeoI+B6CXWSM6wOhjqVAf
0jdBXqNcDQ7nVKHO1FXuVLlPsWYo8AjzyM4EaGybUzmxVdWXI4bYgyVWFhzNomoh
YfNctlGkpD3z5NlX9Vu5LwANECB5hCrJukhjAwJOit8QsqrBxRrKcwKsAFenBt6F
4latM1MqFQKBgQCxVrUeDEbD9E1IHV5HjYV4BeQJfMvV985KaK5FohLk5lAeWB7Z
u/dyWH0r5PO3/TD1iiwIldCfn+rvfIEULeU+5YvQy9WTSSM3pk5W0Tmc+IoXfUlo
gzfXktuoZscpv2iJKEm9F0dVwmFGEZVs1aqgFh4W/sNH2pkVMMHycHNw8QKBgHcp
vDgWs18TxiGQI+oaSN77amzeZ//m/j06ESYMRhu+EQN+Dobi9WoM1BLPycWu8QTg
NDT2/VqH1WtdSKPFoeM8hVZBn1JyiIOksaLdt0p2j/NGrniZQNfiAUqAWvGzoiPN
4dHUJcCcxTp0m1mKJDYCPoaHdUJC+Hs8PNGskTAFAoGBAKqSqHW9v7Xp8IMsD0+j
KFKtyYVpvpgXWEcnFkr7YMlT3IddmF8MksifUnafMrfHD3sYTEkDjCHvQr8L6T5d
LIJz64Ohlo/kd/Sv7GkuuAAhDjNb/IXkRGfJCedEFpdUj4pDBwFhV9iDWlVG1AlV
nhLDLnHC0PZAjoWl1z2zIQ11`;

export const sangrarPem = (pem: string) => pem.split("\n").map((linea) => `    ${linea}`).join("\n");

export const codigosFolioRetenciones = [
  ["1201", "UUID Cancelado"],
  ["1202", "UUID Previamente cancelado"],
  ["1203", "UUID No encontrado o no corresponde en el emisor"],
  ["1205", "UUID No existe"],
];

export const erroresCancelacionRetenciones = [
  ["CRE001", "Los datos de autentificación enviados son incorrectos"],
  ["CRE002", "Se han agotado la cantidad de timbres"],
  ["CRE201", "Hay más de un UUID, favor de hacer la solicitud a este servicio: “Cancelar_retencion_masivo”"],
  ["CRE202", "Hay un solo UUID, favor de hacer la solicitud a este servicio: “Cancelar_retencion”"],
  ["CRE203", "Parámetro inválido."],
  ["CRE204", "Parámetro llave_pem inválido"],
  ["CRE205", "Parámetro cer_pem inválido"],
  ["CRE206", "Hay más de 10,000 UUID’s en una sola petición."],
  ["CRE301", "XML mal formado, el UUID recibido no tiene una estructura válida."],
  ["CRE303", "La estructura de RFC no es válida."],
  ["CRE305", "El certificado no corresponde al emisor."],
  ["CRE306", "El certificado ha caducado."],
  ["CRE307", "El certificado utilizado es de tipo FIEL. No es un CSD."],
  ["CRE308", "El certificado no se encuentra en la lista LCO del SAT."],
  ["CRE309", "El certificado no fue expedido por el SAT."],
  ["CRE999", "Error de comunicación con el servicio de cancelación."],
];
