import { certificadoPemRetenciones } from "../retenciones/constantes";

const comprobanteBase64 = "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPGNmZGk6Q29tcHJvYmFudGUgeG1sbnM6Y2ZkaT0iaHR0cDovL3d3dy5zYXQuZ29iLm14L2NmZC8zIiB4bWxuczp4c2k9Imh0dHA6Ly93d3cudzMub3JnLzIwMDEvWE1MU2NoZW1hLWluc3RhbmNlIiBDZXJ0aWZpY2Fkbz0iTUlJRitUQ0NBK0dnQXdJQkFnSVVNekF3TURFd01EQXdNREF6TURBd01qTTNNRGd3RFFZSktvWklodmNOQVFFTEJRQXdnZ0ZtTVNBd0hnWURWUVFEREJkQkxrTXVJRElnWkdVZ2NISjFaV0poY3lnME1EazJLVEV2TUMwR0ExVUVDZ3dtVTJWeWRtbGphVzhnWkdVZ1FXUnRhVzVwYzNSeVlXTnB3N051SUZSeWFXSjFkR0Z5YVdFeE9EQTJCZ05WQkFzTUwwRmtiV2x1YVhOMGNtRmphY096YmlCa1pTQlRaV2QxY21sa1lXUWdaR1VnYkdFZ1NXNW1iM0p0WVdOcHc3TnVNU2t3SndZSktvWklodmNOQVFrQkZocGhjMmx6Ym1WMFFIQnlkV1ZpWVhNdWMyRjBMbWR2WWk1dGVERW1NQ1FHQTFVRUNRd2RRWFl1SUVocFpHRnNaMjhnTnpjc0lFTnZiQzRnUjNWbGNuSmxjbTh4RGpBTUJnTlZCQkVNQlRBMk16QXdNUXN3Q1FZRFZRUUdFd0pOV0RFWk1CY0dBMVVFQ0F3UVJHbHpkSEpwZEc4Z1JtVmtaWEpoYkRFU01CQUdBMVVFQnd3SlEyOTViMkZqdzZGdU1SVXdFd1lEVlFRdEV3eFRRVlE1TnpBM01ERk9Uak14SVRBZkJna3Foa2lHOXcwQkNRSU1FbEpsYzNCdmJuTmhZbXhsT2lCQlEwUk5RVEFlRncweE56QTFNVGd3TXpVME5UWmFGdzB5TVRBMU1UZ3dNelUwTlRaYU1JSGxNU2t3SndZRFZRUURFeUJCUTBORlRTQlRSVkpXU1VOSlQxTWdSVTFRVWtWVFFWSkpRVXhGVXlCVFF6RXBNQ2NHQTFVRUtSTWdRVU5EUlUwZ1UwVlNWa2xEU1U5VElFVk5VRkpGVTBGU1NVRk1SVk1nVTBNeEtUQW5CZ05WQkFvVElFRkRRMFZOSUZORlVsWkpRMGxQVXlCRlRWQlNSVk5CVWtsQlRFVlRJRk5ETVNVd0l3WURWUVF0RXh4QlFVRXdNVEF4TURGQlFVRWdMeUJJUlVkVU56WXhNREF6TkZNeU1SNHdIQVlEVlFRRkV4VWdMeUJJUlVkVU56WXhNREF6VFVSR1VrNU9NRGt4R3pBWkJnTlZCQXNVRWtOVFJEQXhYMEZCUVRBeE1ERXdNVUZCUVRDQ0FTSXdEUVlKS29aSWh2Y05BUUVCQlFBRGdnRVBBRENDQVFvQ2dnRUJBSmRVY3NISUVJZ3dpdnZBYW50R25ZVklPMys3eVRkRDF0a0tvcGJMK3RLU2pSRm8xRXJQZEdKeFAzZ3hUNU8rQUNJRFFYTitIUzl1TVdEWW5hVVJhbFNJRjlDT0ZDZGgvT0gyUG4rVW1rTjRjdWxyMkRhbkt6dFZJTzhpZFhNNmM5YUhuNWhPbzdoRHhYTUMzdU91R1YzRlM0T2JreFRWKzlOc3ZPQVYybE1lMjdTSHJTQjBEaHVMdXJVYlp3WG0rL3I0ZHR6M2IydUxnQmMrRGl5OTVQRytNSXU3b05LTTg5YUJOR2NqVEp3KzlrK1d6SmlQZDNacFFnSWVkWUJEKzhRV3hsWUNneGhudGEzazl5bGdYS1lYQ1lrMGswcWF1dkJKMWpTUlZmNUJqaklVYk9zdGFRcDU5bmtnSGg0NWM5Z253SlJWNjE4TlcwZk1lRHp1S1IwQ0F3RUFBYU1kTUJzd0RBWURWUjBUQVFIL0JBSXdBREFMQmdOVkhROEVCQU1DQnNBd0RRWUpLb1pJaHZjTkFRRUxCUUFEZ2dJQkFCS2owRENOTDFsaDQ0eStPY1dGclQyaWNuS0Y3V3lTT1ZpaHgwb1IrSFByV0tCTVh4bzlLdHJvZG5CMXRnSXg4ZitYanF5cGhoYncranVEU2VEcmI5OVBoQzQrRTZKZVhPa2RRY0p0NTBLeW9kbDlVUnBDVldOV2pVYjNGL3lwYThvVGNmZi9lTWZ0UVpUN01RMUxxaHQreG0zUWhWb3hUSUFTY2UwampzbkJUR0QySlE0dVQzb0NlbThibW9NWFYvZms5YUozdjArWklMNDJNcFk0UE9HVWEvaVRhYXdrbEtSQUwxWGo5SWRJUjA2Uks2OFJTNnhyR2s2andiRFRFS3hKcG1aM1NQTHRsc21QVVRPMWtyYVRQSW85RkNtVS96WmtXR3BkOFpFQUFGdytaZkkrYmRYQmZ2ZER3YU0yaU1HVFFaVFRFZ1U1S0tUSXZrQW5IbzlPNDVTcVNKd3FWOU5MZlBBeENvNWVSUjJPR2liZDlqaEhlODF6VXNwNUdkRTFtWmlTcUpVODJIM2N1NkJpRStEM1liWmVabmpyTlN4QmdLVElmOHcrS05ZUE00YVdudVVNbDBtTGd0T3hUVVhpOU1LblVjY3EzR1pMQTdieDdabjIxMXlQUnFFalNBcXliVU1WSU9obzZhcXprZmMzV0xaNkxuR1UraHlIdVpVZlB3Ym5DbGI3b0ZGejFQbHZHT3BORHNVYjBxUDQyUUNHQmlUVXNlR3VnQXpxT1A2RVlwVlBDNzNnRm91cm1kQlFnZmF5YUV2aTN4ak5hbkZrUGxXMVhFWU5yWUpCNHlOanBoRnJ2V3dUWTg2dkwybzhnWk4wVXRtYzVmbm9CVGZNOXIyelZLbUVpNkZVZUoxaWFEYVZOdjQ3dGU5aVMxYWk0VjR2Qlk4ciIgRmVjaGE9IjIwMTktMDMtMjlUMTI6MTQ6MTQiIEZvcm1hUGFnbz0iMDEiIEx1Z2FyRXhwZWRpY2lvbj0iMDYzMDAiIE1ldG9kb1BhZ289IlBVRSIgTW9uZWRhPSJNWE4iIE5vQ2VydGlmaWNhZG89IjMwMDAxMDAwMDAwMzAwMDIzNzA4IiBTZWxsbz0iWHRpR3htK2FMQnpaMDlOb1NSN2JsaDRUVjNGSEFDQ2JvU1U3WkJ5NllSRzNEUFpyUm54N1VkYzlXUEpKVGFIZEx3SWF4UkZHWFZub0VSQUNIMEVHQ3gyOUh4MTNKTkNMNUpxZ2JCM1B0czlyS1UrUnhFSFFWZ3pLNTduYUVtSzF1aXJhYzRUSThvMFBYMGN5ZS9BK1JDQVNkZEEvU0tsN0h5OEI5QXQ3d3BtMStyRTd5Mkw5bFlNMUV3dFAwL09jN3VPTVQva2tzVWlHd20vV1VWUjYyRlROTEpaUFkvSk43QytrRWhOSUxneUtFK2M0em8rck80S1AyZlpDT3ZZV0xmcTV6VGNhaHQ3b3FnbjArckhXMVpmUURYb1NhU3VCTy9TYTVBbE9sVGJpV1daanVpcmpUZHV6Wmx4Rzc2bW44RGc2NXhuMUtJMG5hR2RGcGZYWG53PT0iIFN1YlRvdGFsPSIxNTEwLjAwIiBUaXBvQ2FtYmlvPSIxIiBUaXBvRGVDb21wcm9iYW50ZT0iSSIgVG90YWw9IjE3NTEuNjAiIFZlcnNpb249IjMuMyIgeHNpOnNjaGVtYUxvY2F0aW9uPSJodHRwOi8vd3d3LnNhdC5nb2IubXgvY2ZkLzMgaHR0cDovL3d3dy5zYXQuZ29iLm14L3NpdGlvX2ludGVybmV0L2NmZC8zL2NmZHYzMy54c2QiPgogIDxjZmRpOkVtaXNvciBOb21icmU9IlNFTlRJRU5UIFNBIERFIENWIiBSZWdpbWVuRmlzY2FsPSI2MDEiIFJmYz0iQUFBMDEwMTAxQUFBIi8+CiAgPGNmZGk6UmVjZXB0b3IgTm9tYnJlPSJJVCBTVyBEZXZlbG9wbWVudCBTb2x1dGlvbnMgZGUgTWV4aWNvIFMgZGUgUkwgZGUgQ1YiIFJmYz0iSUFEMTIxMjE0QjM0IiBVc29DRkRJPSJQMDEiLz4KICA8Y2ZkaTpDb25jZXB0b3M+CiAgICA8Y2ZkaTpDb25jZXB0byBDYW50aWRhZD0iNSIgQ2xhdmVQcm9kU2Vydj0iMTAxMjIxMDAiIENsYXZlVW5pZGFkPSJNNzQiIERlc2NyaXBjaW9uPSJwcnVlYmEgQ2F0YWxvZ29zIE51ZXZvcyIgSW1wb3J0ZT0iMTI1MC4wMCIgVW5pZGFkPSJLaWxvIiBWYWxvclVuaXRhcmlvPSIyNTAuMDAiPgogICAgICA8Y2ZkaTpJbXB1ZXN0b3M+CiAgICAgICAgPGNmZGk6VHJhc2xhZG9zPgogICAgICAgICAgPGNmZGk6VHJhc2xhZG8gQmFzZT0iMTI1MC4wMCIgSW1wb3J0ZT0iMjAwLjAwIiBJbXB1ZXN0bz0iMDAyIiBUYXNhT0N1b3RhPSIwLjE2MDAwMCIgVGlwb0ZhY3Rvcj0iVGFzYSIvPgogICAgICAgIDwvY2ZkaTpUcmFzbGFkb3M+CiAgICAgIDwvY2ZkaTpJbXB1ZXN0b3M+CiAgICA8L2NmZGk6Q29uY2VwdG8+CiAgICA8Y2ZkaTpDb25jZXB0byBDYW50aWRhZD0iMSIgQ2xhdmVQcm9kU2Vydj0iMjQxMTE1MDAiIENsYXZlVW5pZGFkPSJLR00iIERlc2NyaXBjaW9uPSJ0cmFzbHVjaWRhIDkweDkwIGNtLiBjYWwuIDIwMCIgSW1wb3J0ZT0iMjIuMDAiIFVuaWRhZD0ia2ciIFZhbG9yVW5pdGFyaW89IjIyLjAwIj4KICAgICAgPGNmZGk6SW1wdWVzdG9zPgogICAgICAgIDxjZmRpOlRyYXNsYWRvcz4KICAgICAgICAgIDxjZmRpOlRyYXNsYWRvIEJhc2U9IjIyLjAwIiBJbXBvcnRlPSIzLjUyIiBJbXB1ZXN0bz0iMDAyIiBUYXNhT0N1b3RhPSIwLjE2MDAwMCIgVGlwb0ZhY3Rvcj0iVGFzYSIvPgogICAgICAgIDwvY2ZkaTpUcmFzbGFkb3M+CiAgICAgIDwvY2ZkaTpJbXB1ZXN0b3M+CiAgICA8L2NmZGk6Q29uY2VwdG8+CiAgICA8Y2ZkaTpDb25jZXB0byBDYW50aWRhZD0iMTAiIENsYXZlUHJvZFNlcnY9IjEzMTAxNzEyIiBDbGF2ZVVuaWRhZD0iS0dNIiBEZXNjcmlwY2lvbj0iUE9MSUVUSUxFTk8gREUgQkFKQSBERU5TSURBRCIgSW1wb3J0ZT0iMjM4LjAwIiBVbmlkYWQ9IktHIiBWYWxvclVuaXRhcmlvPSIyMy44MCI+CiAgICAgIDxjZmRpOkltcHVlc3Rvcz4KICAgICAgICA8Y2ZkaTpUcmFzbGFkb3M+CiAgICAgICAgICA8Y2ZkaTpUcmFzbGFkbyBCYXNlPSIyMzguMDAiIEltcG9ydGU9IjM4LjA4IiBJbXB1ZXN0bz0iMDAyIiBUYXNhT0N1b3RhPSIwLjE2MDAwMCIgVGlwb0ZhY3Rvcj0iVGFzYSIvPgogICAgICAgIDwvY2ZkaTpUcmFzbGFkb3M+CiAgICAgIDwvY2ZkaTpJbXB1ZXN0b3M+CiAgICA8L2NmZGk6Q29uY2VwdG8+CiAgPC9jZmRpOkNvbmNlcHRvcz4KICA8Y2ZkaTpJbXB1ZXN0b3MgVG90YWxJbXB1ZXN0b3NUcmFzbGFkYWRvcz0iMjQxLjYwIj4KICAgIDxjZmRpOlRyYXNsYWRvcz4KICAgICAgPGNmZGk6VHJhc2xhZG8gSW1wb3J0ZT0iMjQxLjYwIiBJbXB1ZXN0bz0iMDAyIiBUYXNhT0N1b3RhPSIwLjE2MDAwMCIgVGlwb0ZhY3Rvcj0iVGFzYSIvPgogICAgPC9jZmRpOlRyYXNsYWRvcz4KICA8L2NmZGk6SW1wdWVzdG9zPgogIDxjZmRpOkNvbXBsZW1lbnRvPgogICAgPHRmZDpUaW1icmVGaXNjYWxEaWdpdGFsIHhtbG5zOnRmZD0iaHR0cDovL3d3dy5zYXQuZ29iLm14L1RpbWJyZUZpc2NhbERpZ2l0YWwiIHhzaTpzY2hlbWFMb2NhdGlvbj0iaHR0cDovL3d3dy5zYXQuZ29iLm14L1RpbWJyZUZpc2NhbERpZ2l0YWwgaHR0cDovL3d3dy5zYXQuZ29iLm14L3NpdGlvX2ludGVybmV0L2NmZC9UaW1icmVGaXNjYWxEaWdpdGFsL1RpbWJyZUZpc2NhbERpZ2l0YWx2MTEueHNkIiBWZXJzaW9uPSIxLjEiIFVVSUQ9IjNBQzdBNEE1LUZFODYtNENDOC04MjA2LTlCQkEzQzZCRUE5RSIgRmVjaGFUaW1icmFkbz0iMjAxOS0wMy0yOVQxMzoxNDoxNiIgUmZjUHJvdkNlcnRpZj0iSUFEMTIxMjE0QjM0IiBTZWxsb0NGRD0iWHRpR3htK2FMQnpaMDlOb1NSN2JsaDRUVjNGSEFDQ2JvU1U3WkJ5NllSRzNEUFpyUm54N1VkYzlXUEpKVGFIZEx3SWF4UkZHWFZub0VSQUNIMEVHQ3gyOUh4MTNKTkNMNUpxZ2JCM1B0czlyS1UrUnhFSFFWZ3pLNTduYUVtSzF1aXJhYzRUSThvMFBYMGN5ZS9BK1JDQVNkZEEvU0tsN0h5OEI5QXQ3d3BtMStyRTd5Mkw5bFlNMUV3dFAwL09jN3VPTVQva2tzVWlHd20vV1VWUjYyRlROTEpaUFkvSk43QytrRWhOSUxneUtFK2M0em8rck80S1AyZlpDT3ZZV0xmcTV6VGNhaHQ3b3FnbjArckhXMVpmUURYb1NhU3VCTy9TYTVBbE9sVGJpV1daanVpcmpUZHV6Wmx4Rzc2bW44RGc2NXhuMUtJMG5hR2RGcGZYWG53PT0iIE5vQ2VydGlmaWNhZG9TQVQ9IjIwMDAxMDAwMDAwMzAwMDIyMzIzIiBTZWxsb1NBVD0iVCs5RkhLNEczRHE2bmxrZENkU0EyY1EzYkxZaHp3UXowWC9HeE1PNVVRV1pnWE1abGd2QmlocVZnSjFYaklHKzVsMmZwN08zZVVWQ20wMS90YmdmSHI5QlNLY3NlbjdjSTZOMnN3VzZ5TUJFaGNwRVZGZHdvc2NpL2VwUEF5VlVUcituYk9OaDhKTFRrUUt6REFZRmZzSSs4ZG5DZFBUTmZMU0ZCeTJVZUh3RHNCOWpaQTVqc2c4Nlpld3ZGQkFJYTVnMzVkbXdMSDBZQ0dtK1U3WC9XRlU2N3dyblE1TEhhbnJXRDQ0UG9FYWJudWRSU0hTTWwxY0cvcGZwL2Mrc2h2VUs2MTJSa0J2TjFGdG1jMXhrU25EaklEcjIrWjR6citrYytTektFaHBIR1Zlb0o5Z3JMaUxyYzRianZob2ZkZ3JrdWdLRFh6ZXRMTlRZWjdDK05RPT0iLz4KICA8L2NmZGk6Q29tcGxlbWVudG8+CjwvY2ZkaTpDb21wcm9iYW50ZT4=";

export const ejemploPeticionValidar = `<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:WashOut">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:validar_cfdi soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
         <username xsi:type="xsd:string">AAA010101000</username>
         <password xsi:type="xsd:string">h6584D56fVdBbSmmnB</password>
         <validar xsi:type="urn:comprobante">
            <!--Zero or more repetitions:-->
            <Comprobante xsi:type="urn:Comprobante">
               <external_id xsi:type="xsd:string">002</external_id>
               <sxml xsi:type="xsd:string">${comprobanteBase64}</sxml>
            </Comprobante>
         </validar>
      </urn:validar_cfdi>
   </soapenv:Body>
</soapenv:Envelope>`;

export const certificadoExitoso = "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";
const selloExitoso = "XtiGxm+aLBzZ09NoSR7blh4TV3FHACCboSU7ZBy6YRG3DPZrRnx7Udc9WPJJTaHdLwIaxRFGXVnoERACH0EGCx29Hx13JNCL5JqgbB3Pts9rKU+RxEHQVgzK57naEmK1uirac4TI8o0PX0cye/A+RCASddA/SKl7Hy8B9At7wpm1+rE7y2L9lYM1EwtP0/Oc7uOMT/kksUiGwm/WUVR62FTNLJZPY/JN7C+kEhNILgyKE+c4zo+rO4KP2fZCOvYWLfq5zTcaht7oqgn0+rHW1ZfQDXoSaSuBO/Sa5AlOlTbiWWZjuirjTduzZlxG76mn8Dg65xn1KI0naGdFpfXXnw==";

export const ejemploRespuestaExitosaValidar = `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:tns="urn:WashOut">
   <soap:Body>
      <tns:validar_cfdi_response>
         <validar_cfdi_result xsi:type="tns:validar_cfdi_result">
            <resultados xsi:type="xsd:string"><![CDATA[<?xml version="1.0"?>
<comprobante>
  <external_id>2</external_id>
  <consulta_sat>CodigoEstatus:S - Comprobante obtenido satisfactoriamente. Estado:Vigente.</consulta_sat>
  <informacion_cfdi>
    <fecha_emision>
      <value>2019-03-29T12:14:14</value>
      <valido>true</valido>
    </fecha_emision>
    <rfc_emisor>
      <value>AAA010101AAA</value>
      <valido>true</valido>
    </rfc_emisor>
    <rfc_receptor>
      <value>IAD121214B34</value>
      <valido>true</valido>
    </rfc_receptor>
    <uso_cfdi>
      <value>P01</value>
      <valido>true</valido>
    </uso_cfdi>
    <total>
      <value>1751.60</value>
      <valido>true</valido>
    </total>
    <forma_pago>
      <value>01</value>
      <valido>true</valido>
    </forma_pago>
    <metodo_pago>
      <value>PUE</value>
      <valido>true</valido>
    </metodo_pago>
    <no_certificado>
      <value>30001000000300023708</value>
      <valido>true</valido>
    </no_certificado>
    <certificado>
      <value>${certificadoExitoso}</value>
      <valido>true</valido>
    </certificado>
    <sello>
      <value>${selloExitoso}</value>
      <valido>true</valido>
    </sello>
    <validez_certificado>
      <value>Desde: 2017-05-18 03:54:56 UTCHasta:2021-05-18 03:54:56 UTC </value>
      <valido>true</valido>
    </validez_certificado>
    <TFD>
      <UUID>3AC7A4A5-FE86-4CC8-8206-9BBA3C6BEA9E</UUID>
      <NoCertificadoSAT>20001000000300022323</NoCertificadoSAT>
      <FechaTimbrado>2019-03-29T13:14:16</FechaTimbrado>
      <RfcProvCertif>IAD121214B34</RfcProvCertif>
    </TFD>
  </informacion_cfdi>
  <estatus_validacion>
    <code>200</code>
    <message>Comprobante con UUID: 3AC7A4A5-FE86-4CC8-8206-9BBA3C6BEA9E Valido, en forma y sintaxis</message>
  </estatus_validacion>
</comprobante>]]></resultados>
         </validar_cfdi_result>
      </tns:validar_cfdi_response>
   </soap:Body>
</soap:Envelope>`;

const certificadoError = certificadoPemRetenciones.replace(/\n/g, "");
const selloError = "Wo6bLjPSIstphKqBRl2eYhE8KcmtZowNTNGhRWs0GHgyTEv/4AqjL5vQSu2qKoeUzhok2KreN/Iyq2JyT2vxFXNDKnV6a8YkJj8JGDg9azODbUaToWsOVNfrztvSTEHBAvaTBaIyAAxEBcSMXt243HmXmPauZ0TxZ2P/QslHqwucbJGqIYlHeeb+UOLDipbuHfwLQH1f6rJSmcFXtJreqO/9gZo8mEYXYYTCeFKYVcJOsncGY3DQuyc8cFvK3ckVhiOhdvwYaWLcAM9hqdL1I3gto+5eAcDA/stztG+QDiMU/WRbz3kLCPYpt+gN5PaW8JvKc2LWSlZi266jtxMBvw==";

export const ejemploRespuestaErrorValidar = `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:tns="urn:WashOut">
   <soap:Body>
      <tns:validar_cfdi_response>
         <validar_cfdi_result xsi:type="tns:validar_cfdi_result">
            <resultados xsi:type="xsd:string"><![CDATA[<comprobante>
  <external_id>60502</external_id>
  <consulta_sat>El comprobante no tiene nodo TFD, no se puede consultar con el SAT</consulta_sat>
  <informacion_cfdi>
    <fecha_emision>
      <value>2019-07-25T08:57:15</value>
      <valido>true</valido>
    </fecha_emision>
    <rfc_emisor>
      <value>MISC491214B86</value>
      <valido>true</valido>
    </rfc_emisor>
    <rfc_receptor>
      <value>IAD121214B34</value>
      <valido>true</valido>
    </rfc_receptor>
    <uso_cfdi>
      <value>P01</value>
      <valido>true</valido>
    </uso_cfdi>
    <total>
      <value>1751.61</value>
      <valido>false</valido>
    </total>
    <forma_pago>
      <value>01</value>
      <valido>true</valido>
    </forma_pago>
    <metodo_pago>
      <value>PUE</value>
      <valido>true</valido>
    </metodo_pago>
    <no_certificado>
      <value>30001000000400002333</value>
      <valido>true</valido>
    </no_certificado>
    <certificado>
      <value>${certificadoError}</value>
      <valido>false</valido>
    </certificado>
    <sello>
      <value>${selloError}</value>
      <valido>true</valido>
    </sello>
    <validez_certificado>
      <value>Desde: 2019-05-29 18:44:57 UTCHasta:2023-05-29 18:44:57 UTC </value>
      <valido>true</valido>
    </validez_certificado>
    <lco>
      <validez>2</validez>
      <estatus>A</estatus>
    </lco>
  </informacion_cfdi>
  <estatus_validacion>
    <error>
      <code>CFDI33105</code>
      <message>cfdi:Comprobante:Certificado - El número de certificado registrado en el archivo debe ser igual al registrado en el campo 'NoCertificado'</message>
    </error>
    <error>
      <code>CFDI33118</code>
      <message>cfdi:Comprobante:Total - El campo Total no corresponde con la suma del subtotal, menos los descuentos aplicables, más las contribuciones recibidas (impuestos trasladados - federales o locales, derechos, productos, aprovechamientos, aportaciones de seguridad social, contribuciones de mejoras) menos los impuestos retenidos.</message>
    </error>
    <error>
      <code>CFDI33119</code>
      <message>cfdi:Comprobante:Total - Cuando el valor del campo Total se encuentre fuera de los límites establecidos, debe existir el campo Confirmacion</message>
    </error>
    <error>
      <code>CFDI33126</code>
      <message>cfdi:Comprobante:Confirmacion - El campo Confirmacion no debe existir cuando los atributios TipoCambio y/o Total están dentro del rango permitido</message>
    </error>
  </estatus_validacion>
</comprobante>]]></resultados>
         </validar_cfdi_result>
      </tns:validar_cfdi_response>
   </soap:Body>
</soap:Envelope>`;
