import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Alert, Box } from "@mui/material";

declare global {
  interface Window {
    grecaptcha?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          theme?: "light" | "dark";
          size?: "normal" | "compact";
          callback: (token: string) => void;
          "expired-callback": () => void;
          "error-callback": () => void;
        }
      ) => number;
      getResponse: (widgetId?: number) => string;
      reset: (widgetId?: number) => void;
    };
  }
}

interface CaptchaVerificacionProps {
  value: string;
  onChange: (token: string) => void;
  onError?: (mensaje: string) => void;
  siteKey?: string;
  theme?: "light" | "dark";
  size?: "normal" | "compact";
}

export interface CaptchaVerificacionHandle {
  obtenerToken: () => string;
  reiniciar: () => void;
}

const RECAPTCHA_SCRIPT_ID = "google-recaptcha-script";
const RECAPTCHA_SCRIPT_SRC = "https://www.google.com/recaptcha/api.js?render=explicit";
const MENSAJE_ERROR = "No se pudo cargar reCAPTCHA. Revisa tu conexion e intenta de nuevo.";

let cargaRecaptcha: Promise<void> | null = null;

function cargarScriptRecaptcha() {
  if (window.grecaptcha?.render) {
    return Promise.resolve();
  }

  if (cargaRecaptcha) {
    return cargaRecaptcha;
  }

  cargaRecaptcha = new Promise((resolve, reject) => {
    let script = document.getElementById(RECAPTCHA_SCRIPT_ID) as HTMLScriptElement | null;

    const resolverCarga = () => {
      if (window.grecaptcha?.render) {
        resolve();
        return;
      }

      reject(new Error(MENSAJE_ERROR));
    };

    const resolverError = () => reject(new Error(MENSAJE_ERROR));

    if (!script) {
      script = document.createElement("script");
      script.id = RECAPTCHA_SCRIPT_ID;
      script.src = RECAPTCHA_SCRIPT_SRC;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

    script.addEventListener("load", resolverCarga, { once: true });
    script.addEventListener("error", resolverError, { once: true });
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
    },
    ref
  ) {
  const contenedorRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<number | null>(null);
  const [scriptListo, setScriptListo] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  useEffect(() => {
    if (!siteKey) {
      return;
    }

    let montado = true;
    setMensajeError("");

    cargarScriptRecaptcha()
      .then(() => {
        if (montado) {
          setScriptListo(true);
        }
      })
      .catch(() => {
        if (montado) {
          setMensajeError(MENSAJE_ERROR);
          onError?.(MENSAJE_ERROR);
        }
      });

    return () => {
      montado = false;
    };
  }, [onError, siteKey]);

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
      callback: onChange,
      "expired-callback": () => onChange(""),
      "error-callback": () => {
        onChange("");
        setMensajeError(MENSAJE_ERROR);
        onError?.(MENSAJE_ERROR);
      },
    });
  }, [onChange, onError, scriptListo, siteKey, size, theme]);

  useImperativeHandle(ref, () => ({
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
  }), [onChange, value]);

  if (siteKey) {
    return (
      <Box sx={{ display: "grid", justifyContent: "center", justifyItems: "center", minHeight: 78, my: 2 }}>
        <Box ref={contenedorRef} />
        {mensajeError && !onError && (
          <Alert severity="error" sx={{ mt: 1.5, textAlign: "left" }}>
            {mensajeError}
          </Alert>
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
