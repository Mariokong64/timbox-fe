import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Alert, Box, Button, CircularProgress, Typography } from "@mui/material";

declare global {
  interface Window {
    __timboxRecaptchaLista?: () => void;
    grecaptcha?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          theme?: "light" | "dark";
          size?: RecaptchaSize;
          badge?: "bottomright" | "bottomleft" | "inline";
          callback: (token: string) => void;
          "expired-callback": () => void;
          "error-callback": () => void;
        }
      ) => number;
      execute: (widgetId?: number) => void;
      getResponse: (widgetId?: number) => string;
      reset: (widgetId?: number) => void;
    };
  }
}

type RecaptchaSize = "normal" | "compact" | "invisible";

interface CaptchaVerificacionProps {
  value: string;
  onChange: (token: string) => void;
  onError?: (mensaje: string) => void;
  siteKey?: string;
  theme?: "light" | "dark";
  size?: RecaptchaSize;
  badge?: "bottomright" | "bottomleft" | "inline";
}

export interface CaptchaVerificacionHandle {
  ejecutar: () => Promise<string>;
  obtenerToken: () => string;
  reiniciar: () => void;
}

const RECAPTCHA_SCRIPT_ID = "google-recaptcha-script";
const RECAPTCHA_CALLBACK = "__timboxRecaptchaLista";
const RECAPTCHA_SCRIPT_SRC =
  `https://www.google.com/recaptcha/api.js?onload=${RECAPTCHA_CALLBACK}&render=explicit&hl=es`;
const RECAPTCHA_TIMEOUT_MS = 15000;
const MENSAJE_ERROR = "No se pudo cargar reCAPTCHA. Revisa tu conexion e intenta de nuevo.";

let cargaRecaptcha: Promise<void> | null = null;

function cargarScriptRecaptcha() {
  if (window.grecaptcha?.render) {
    return Promise.resolve();
  }

  if (cargaRecaptcha) {
    return cargaRecaptcha;
  }

  cargaRecaptcha = new Promise<void>((resolve, reject) => {
    let script = document.getElementById(RECAPTCHA_SCRIPT_ID) as HTMLScriptElement | null;
    let finalizado = false;

    const limpiarEscuchas = () => {
      window.clearInterval(intervaloId);
      window.clearTimeout(timeoutId);

      script?.removeEventListener("load", comprobarDisponibilidad);
      script?.removeEventListener("error", resolverError);
    };

    const finalizar = (error?: Error) => {
      if (finalizado) {
        return;
      }

      finalizado = true;
      limpiarEscuchas();

      if (!error) {
        resolve();
        return;
      }

      if (!window.grecaptcha?.render) {
        script?.remove();
      }

      reject(error);
    };

    function comprobarDisponibilidad() {
      if (window.grecaptcha?.render) {
        finalizar();
      }
    }

    function resolverError() {
      finalizar(new Error(MENSAJE_ERROR));
    }

    window.__timboxRecaptchaLista = comprobarDisponibilidad;

    if (!script) {
      script = document.createElement("script");
      script.id = RECAPTCHA_SCRIPT_ID;
      script.src = RECAPTCHA_SCRIPT_SRC;
      script.async = true;
      script.defer = true;
    }

    script.addEventListener("load", comprobarDisponibilidad);
    script.addEventListener("error", resolverError, { once: true });

    const intervaloId = window.setInterval(comprobarDisponibilidad, 100);
    const timeoutId = window.setTimeout(resolverError, RECAPTCHA_TIMEOUT_MS);

    if (!script.isConnected) {
      document.head.appendChild(script);
    }

    comprobarDisponibilidad();
  }).catch((error) => {
    cargaRecaptcha = null;
    throw error;
  });

  return cargaRecaptcha;
}

export const CaptchaVerificacion = forwardRef<CaptchaVerificacionHandle, CaptchaVerificacionProps>(
  function CaptchaVerificacion(
    {
      value,
      onChange,
      onError,
      siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string | undefined,
      theme = "light",
      size = "normal",
      badge = "bottomright",
    },
    ref
  ) {
  const contenedorRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<number | null>(null);
  const resolverEjecucionRef = useRef<((token: string) => void) | null>(null);
  const rechazarEjecucionRef = useRef<((error: Error) => void) | null>(null);
  const [scriptListo, setScriptListo] = useState(false);
  const [cargandoScript, setCargandoScript] = useState(Boolean(siteKey));
  const [mensajeError, setMensajeError] = useState("");
  const [intentoCarga, setIntentoCarga] = useState(0);

  useEffect(() => {
    if (!siteKey) {
      return;
    }

    let montado = true;
    setCargandoScript(true);
    setScriptListo(false);
    setMensajeError("");

    cargarScriptRecaptcha()
      .then(() => {
        if (montado) {
          setScriptListo(true);
          setCargandoScript(false);
        }
      })
      .catch(() => {
        if (montado) {
          setCargandoScript(false);
          setMensajeError(MENSAJE_ERROR);
          onError?.(MENSAJE_ERROR);
        }
      });

    return () => {
      montado = false;
    };
  }, [intentoCarga, onError, siteKey]);

  useEffect(() => {
    if (!siteKey || !scriptListo || !contenedorRef.current || !window.grecaptcha) {
      return;
    }

    if (widgetIdRef.current !== null) {
      return;
    }

    widgetIdRef.current = window.grecaptcha.render(contenedorRef.current, {
      sitekey: siteKey,
      theme,
      size,
      badge,
      callback: (token) => {
        onChange(token);
        resolverEjecucionRef.current?.(token);
        resolverEjecucionRef.current = null;
        rechazarEjecucionRef.current = null;
      },
      "expired-callback": () => {
        onChange("");
        rechazarEjecucionRef.current?.(new Error("El captcha expiro."));
        resolverEjecucionRef.current = null;
        rechazarEjecucionRef.current = null;
      },
      "error-callback": () => {
        onChange("");
        setMensajeError(MENSAJE_ERROR);
        onError?.(MENSAJE_ERROR);
        rechazarEjecucionRef.current?.(new Error(MENSAJE_ERROR));
        resolverEjecucionRef.current = null;
        rechazarEjecucionRef.current = null;
      },
    });
  }, [badge, onChange, onError, scriptListo, siteKey, size, theme]);

  useImperativeHandle(ref, () => ({
    ejecutar: () => new Promise((resolve, reject) => {
      if (widgetIdRef.current === null || !window.grecaptcha) {
        reject(new Error(MENSAJE_ERROR));
        return;
      }

      if (size !== "invisible") {
        const token = window.grecaptcha.getResponse(widgetIdRef.current);

        if (token) {
          resolve(token);
          return;
        }

        reject(new Error("Confirma el captcha antes de continuar."));
        return;
      }

      resolverEjecucionRef.current = resolve;
      rechazarEjecucionRef.current = reject;
      window.grecaptcha.execute(widgetIdRef.current);
    }),
    obtenerToken: () => {
      if (widgetIdRef.current === null || !window.grecaptcha) {
        return value;
      }

      return window.grecaptcha.getResponse(widgetIdRef.current);
    },
    reiniciar: () => {
      if (widgetIdRef.current !== null && window.grecaptcha) {
        window.grecaptcha.reset(widgetIdRef.current);
      }

      onChange("");
    },
  }), [onChange, size, value]);

  const reintentarCarga = () => {
    setMensajeError("");
    onError?.("");
    setIntentoCarga((actual) => actual + 1);
  };

  if (siteKey) {
    return (
      <Box sx={{ display: "grid", justifyContent: "center", justifyItems: "center", minHeight: size === "invisible" ? 0 : 78, my: size === "invisible" ? 0 : 2 }}>
        {cargandoScript && size !== "invisible" && (
          <Box
            role="status"
            sx={{
              minHeight: 78,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1.25,
              color: "text.secondary",
            }}
          >
            <CircularProgress size={20} color="inherit" />
            <Typography sx={{ fontSize: 14 }}>
              Cargando verificación...
            </Typography>
          </Box>
        )}

        <Box ref={contenedorRef} />

        {mensajeError && (
          <Box sx={{ display: "grid", justifyItems: "center", gap: 0.5 }}>
            {!onError && (
              <Alert severity="error" sx={{ mt: 1.5, textAlign: "left" }}>
                {mensajeError}
              </Alert>
            )}

            <Button
              type="button"
              size="small"
              onClick={reintentarCarga}
              sx={{ textTransform: "none" }}
            >
              Reintentar verificación
            </Button>
          </Box>
        )}
      </Box>
    );
  }

  return (
    <Alert severity="error" sx={{ my: 2, textAlign: "left" }}>
      Falta configurar VITE_RECAPTCHA_SITE_KEY.
    </Alert>
  );
  }
);
