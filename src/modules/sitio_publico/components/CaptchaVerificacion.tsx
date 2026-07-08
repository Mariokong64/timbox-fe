import { useEffect, useRef, useState } from "react";
import { Box, Checkbox, Typography } from "@mui/material";

declare global {
  interface Window {
    grecaptcha?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback": () => void;
        }
      ) => number;
      reset: (widgetId?: number) => void;
    };
  }
}

interface CaptchaVerificacionProps {
  value: string;
  onChange: (token: string) => void;
}

const RECAPTCHA_SCRIPT_ID = "google-recaptcha-script";

export function CaptchaVerificacion({ value, onChange }: CaptchaVerificacionProps) {
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string | undefined;
  const contenedorRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<number | null>(null);
  const [scriptListo, setScriptListo] = useState(false);

  useEffect(() => {
    if (!siteKey) {
      return;
    }

    if (window.grecaptcha) {
      setScriptListo(true);
      return;
    }

    let script = document.getElementById(RECAPTCHA_SCRIPT_ID) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement("script");
      script.id = RECAPTCHA_SCRIPT_ID;
      script.src = "https://www.google.com/recaptcha/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

    const manejarCarga = () => setScriptListo(true);
    script.addEventListener("load", manejarCarga);

    return () => {
      script?.removeEventListener("load", manejarCarga);
    };
  }, [siteKey]);

  useEffect(() => {
    if (!siteKey || !scriptListo || !contenedorRef.current || !window.grecaptcha) {
      return;
    }

    if (widgetIdRef.current !== null) {
      return;
    }

    widgetIdRef.current = window.grecaptcha.render(contenedorRef.current, {
      sitekey: siteKey,
      callback: onChange,
      "expired-callback": () => onChange(""),
    });
  }, [onChange, scriptListo, siteKey]);

  if (siteKey) {
    return <Box ref={contenedorRef} sx={{ display: "table", mx: "auto", minHeight: 78 }} />;
  }

  return (
    <Box
      sx={{
        width: 302,
        minHeight: 76,
        mx: "auto",
        my: 2,
        border: "1px solid #d5d5d5",
        bgcolor: "#fafafa",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 1.5,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Checkbox checked={Boolean(value)} onChange={(event) => onChange(event.target.checked ? "dev-captcha" : "")} />
        <Typography sx={{ fontFamily: "var(--fuente-regular)", fontSize: 14, color: "#222" }}>
          No soy un robot
        </Typography>
      </Box>

      <Box sx={{ textAlign: "center", color: "#777" }}>
        <Typography sx={{ fontFamily: "var(--fuente-regular)", fontSize: 18, lineHeight: 1 }}>
          ↻
        </Typography>
        <Typography sx={{ fontFamily: "var(--fuente-regular)", fontSize: 10 }}>
          reCAPTCHA
        </Typography>
      </Box>
    </Box>
  );
}
