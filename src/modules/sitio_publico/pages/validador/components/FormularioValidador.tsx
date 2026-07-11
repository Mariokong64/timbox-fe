import { useRef, useState, type ChangeEvent, type DragEvent } from "react";
import { Alert, Box, Button, Link, Typography } from "@mui/material";
import { AlertasServicio } from "../../../components/AlertasServicio";
import { CaptchaVerificacion, type CaptchaVerificacionHandle } from "../../../components/CaptchaVerificacion";
import { enviarSolicitudValidacionComprobante } from "../servicio/enviarSolicitudValidador";
import {
  normalizarResultadoValidador,
  obtenerMensajeError,
  validarArchivoXml,
  validarCaptcha,
  type ResultadoValidador,
} from "../servicio/validadorServicio";
import { IconoArchivoXml } from "./IconoArchivoXml";
import { ResultadoValidadorVista } from "./ResultadoValidadorVista";

export function FormularioValidador() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const captchaRef = useRef<CaptchaVerificacionHandle | null>(null);
  const [archivo, setArchivo] = useState<File | null>(null);
  const [captchaToken, setCaptchaToken] = useState("");
  const [arrastrando, setArrastrando] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [mensajeError, setMensajeError] = useState("");
  const [resultado, setResultado] = useState<ResultadoValidador | null>(null);

  const seleccionarArchivo = (nuevoArchivo: File | null) => {
    setMensajeError("");
    setResultado(null);
    setArchivo(nuevoArchivo);
  };

  const manejarInput = (event: ChangeEvent<HTMLInputElement>) => {
    seleccionarArchivo(event.target.files?.[0] ?? null);
  };

  const manejarDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setArrastrando(false);
    seleccionarArchivo(event.dataTransfer.files?.[0] ?? null);
  };

  const validarComprobante = async () => {
    const errorArchivo = validarArchivoXml(archivo);
    const errorCaptcha = validarCaptcha(captchaToken);

    if (errorArchivo || errorCaptcha) {
      setMensajeError(errorArchivo ?? errorCaptcha ?? "");
      return;
    }

    setCargando(true);
    setMensajeError("");
    setResultado(null);

    try {
      const respuesta = await enviarSolicitudValidacionComprobante({ archivo: archivo as File, captchaToken });
      const nuevoResultado = normalizarResultadoValidador(respuesta);
      setResultado(nuevoResultado);
    } catch (error) {
      setMensajeError(obtenerMensajeError(error));
    } finally {
      setCargando(false);
      captchaRef.current?.reiniciar();
    }
  };

  return (
    <>
      <AlertasServicio
        abierta={cargando}
        tipo="loading"
        titulo="Validando Comprobante"
        descripcion="Iniciando Validación"
      />

      <Box
        sx={{
          width: { xs: "92vw", md: 496 },
          mx: "auto",
          bgcolor: "var(--blanco-timbox)",
          px: { xs: 4, md: 5 },
          py: { xs: 5, md: 5 },
          textAlign: "center",
        }}
      >
        <Box
          onDragOver={(event) => {
            event.preventDefault();
            setArrastrando(true);
          }}
          onDragLeave={() => setArrastrando(false)}
          onDrop={manejarDrop}
          sx={{
            py: 1,
            outline: arrastrando ? "1px dashed var(--rojo-timbox)" : "1px dashed transparent",
            outlineOffset: 12,
            transition: "outline-color 180ms ease",
          }}
        >
          <IconoArchivoXml />

          <Typography
            sx={{
              color: "var(--azul-timbox)",
              fontFamily: "var(--fuente-ligera)",
              fontSize: { xs: 18, md: 20 },
              mb: 1.5,
            }}
          >
            Arrastra y suelta tu archivo CFDI
          </Typography>

          {archivo && (
            <Typography
              sx={{
                display: "inline-block",
                bgcolor: "var(--fondo-timbox)",
                color: "var(--azul-timbox)",
                fontFamily: "var(--fuente-regular)",
                fontSize: 15,
                mb: 1,
                px: 2,
                py: 1.3,
                maxWidth: "100%",
                wordBreak: "break-word",
              }}
            >
              {archivo.name}
            </Typography>
          )}
        </Box>

        <CaptchaVerificacion ref={captchaRef} value={captchaToken} onChange={setCaptchaToken} onError={setMensajeError} />

        <input ref={inputRef} type="file" accept=".xml,text/xml,application/xml" hidden onChange={manejarInput} />

        {!archivo && (
          <Button
            type="button"
            onClick={() => inputRef.current?.click()}
            sx={{
              mt: 0.5,
              mb: 2,
              px: 2.5,
              py: 1.1,
              borderRadius: 0,
              bgcolor: "var(--fondo-timbox)",
              color: "var(--azul-timbox)",
              fontFamily: "var(--fuente-regular)",
              fontSize: 16,
              textTransform: "none",
              "&:hover": {
                bgcolor: "var(--rojo-timbox)",
                color: "var(--blanco-timbox)",
              },
            }}
          >
            Cargar XML
          </Button>
        )}

        <Box>
          <Link
            component="button"
            type="button"
            onClick={validarComprobante}
            disabled={cargando}
            underline="none"
            sx={{
              border: archivo ? "2px solid var(--azul-timbox)" : 0,
              borderRadius: archivo ? "3px" : 0,
              bgcolor: "transparent",
              color: "#20ce00",
              cursor: cargando ? "default" : "pointer",
              fontFamily: "var(--fuente-regular)",
              fontSize: 16,
              px: archivo ? 0.7 : 0,
              opacity: cargando ? 0.6 : 1,
              "&:hover": {
                textDecoration: cargando ? "none" : "underline",
              },
            }}
          >
            {cargando ? "Validando..." : "Validar comprobante"}
          </Link>
        </Box>

        {mensajeError && (
          <Alert severity="error" sx={{ mt: 3, textAlign: "left" }}>
            {mensajeError}
          </Alert>
        )}
      </Box>

      {resultado && <ResultadoValidadorVista resultado={resultado} />}
    </>
  );
}
