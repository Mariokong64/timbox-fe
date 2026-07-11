import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Box, Button, TextField } from "@mui/material";
import { AlertasServicio, type TipoAlertaServicio } from "../../../components/AlertasServicio";
import { CaptchaVerificacion, type CaptchaVerificacionHandle } from "../../../components/CaptchaVerificacion";
import { enviarSolicitudContacto } from "../servicio/enviarSolicitudContacto";
import {
  contactoInicial,
  hayErroresContacto,
  obtenerMensajeErrorContacto,
  validarCampoContacto,
  validarFormularioContacto,
  type ContactoFormularioValores,
  type ErroresContacto,
} from "../servicio/contactoServicio";

const estiloCampo = {
  "& .MuiInputBase-root": {
    color: "var(--texto-blanco-medio)",
    fontFamily: "var(--fuente-regular)",
    fontSize: 16,
    minHeight: 34,
    alignItems: "flex-end",
  },
  "& .MuiInputBase-input": {
    py: 0.75,
  },
  "& .MuiInputBase-input:-webkit-autofill": {
    WebkitBoxShadow: "0 0 0 100px var(--azul-timbox) inset",
    WebkitTextFillColor: "var(--blanco-timbox)",
    caretColor: "var(--blanco-timbox)",
    transition: "background-color 9999s ease-out 0s",
  },
  "& textarea.MuiInputBase-input": {
    lineHeight: 1.35,
    resize: "none",
  },
  "& .MuiInput-underline::before": {
    borderBottomColor: "var(--texto-blanco-medio)",
  },
  "& .MuiInput-underline:hover::before": {
    borderBottomColor: "var(--texto-blanco-fuerte)",
  },
  "& .MuiInput-underline::after": {
    borderBottomColor: "var(--blanco-timbox)",
  },
  "& .MuiFormHelperText-root": {
    mx: 0,
    fontFamily: "var(--fuente-regular)",
  },
};

type CampoContactoProps = {
  id: string;
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  multiline?: boolean;
  minRows?: number;
  maxRows?: number;
};

function CampoContacto({
  id,
  label,
  value,
  onChange,
  error,
  multiline = false,
  minRows,
  maxRows,
}: CampoContactoProps) {
  return (
    <Box>
      <Box
        component="label"
        htmlFor={id}
        sx={{
          display: "block",
          mb: 0.25,
          color: error ? "#ff8f8f" : "var(--texto-blanco-medio)",
          fontFamily: "var(--fuente-regular)",
          fontSize: 16,
          lineHeight: 1.2,
        }}
      >
        {label}
      </Box>

      <TextField
        id={id}
        variant="standard"
        value={value}
        onChange={onChange}
        error={Boolean(error)}
        helperText={error}
        fullWidth
        multiline={multiline}
        minRows={minRows}
        maxRows={maxRows}
        sx={estiloCampo}
      />
    </Box>
  );
}

export function FormularioContacto() {
  const captchaRef = useRef<CaptchaVerificacionHandle | null>(null);
  const [valores, setValores] = useState<ContactoFormularioValores>(contactoInicial);
  const [errores, setErrores] = useState<ErroresContacto>({});
  const [captchaToken, setCaptchaToken] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [alerta, setAlerta] = useState<{
    abierta: boolean;
    tipo: TipoAlertaServicio;
    titulo: string;
    descripcion?: string;
  }>({
    abierta: false,
    tipo: "info",
    titulo: "",
  });

  const cerrarAlerta = () => {
    setAlerta((actual) => ({ ...actual, abierta: false }));
  };

  const cambiarCampo =
    (campo: keyof ContactoFormularioValores) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const valor = event.target.value;

      setValores((actual) => {
        setErrores((erroresActuales) => ({
          ...erroresActuales,
          [campo]: validarCampoContacto(campo, valor, actual),
        }));

        return { ...actual, [campo]: valor };
      });
      cerrarAlerta();
    };

  const enviar = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nuevosErrores = validarFormularioContacto(valores);
    setErrores(nuevosErrores);

    if (hayErroresContacto(nuevosErrores)) {
      setAlerta({
        abierta: true,
        tipo: "error",
        titulo: "Revisa el formulario",
        descripcion: "Corrige los campos marcados antes de enviar.",
      });
      return;
    }

    setEnviando(true);
    cerrarAlerta();

    try {
      const tokenCaptcha = await captchaRef.current?.ejecutar();

      if (!tokenCaptcha) {
        throw new Error("No se pudo confirmar el captcha.");
      }

      await enviarSolicitudContacto({ valores, captchaToken: tokenCaptcha });
      setAlerta({
        abierta: true,
        tipo: "success",
        titulo: "Mensaje enviado",
        descripcion: "Tu solicitud de contacto se registro correctamente.",
      });
      setValores(contactoInicial);
      setErrores({});
    } catch (error) {
      setAlerta({
        abierta: true,
        tipo: "error",
        titulo: "No se pudo enviar",
        descripcion: obtenerMensajeErrorContacto(error),
      });
    } finally {
      setEnviando(false);
      captchaRef.current?.reiniciar();
      setCaptchaToken("");
    }
  };

  return (
    <>
      <AlertasServicio
        abierta={enviando || alerta.abierta}
        tipo={enviando ? "loading" : alerta.tipo}
        titulo={enviando ? "Enviando contacto" : alerta.titulo}
        descripcion={enviando ? "Procesando formulario" : alerta.descripcion}
        onCerrar={enviando ? undefined : cerrarAlerta}
      />

      <Box
        component="form"
        noValidate
        onSubmit={enviar}
        sx={{
          width: "100%",
          maxWidth: 835,
          display: "grid",
          gap: { xs: 3.2, md: 3.4 },
        }}
      >
        <CampoContacto
          id="contacto-nombre"
          label="Nombre"
          value={valores.nombre}
          onChange={cambiarCampo("nombre")}
          error={errores.nombre}
        />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: { xs: 3, md: 2.5 },
          }}
        >
          <CampoContacto
            id="contacto-correo"
            label="Correo"
            value={valores.correo}
            onChange={cambiarCampo("correo")}
            error={errores.correo}
          />

          <CampoContacto
            id="contacto-telefono"
            label="Telefono"
            value={valores.telefono}
            onChange={cambiarCampo("telefono")}
            error={errores.telefono}
          />
        </Box>

        <CampoContacto
          id="contacto-rfc"
          label="RFC"
          value={valores.rfc}
          onChange={cambiarCampo("rfc")}
          error={errores.rfc}
        />

        <CampoContacto
          id="contacto-mensaje"
          label="Mensaje"
          value={valores.mensaje}
          onChange={cambiarCampo("mensaje")}
          error={errores.mensaje}
          multiline
          minRows={1}
          maxRows={5}
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 0.5 }}>
          <Button
            type="submit"
            disabled={enviando}
            variant="outlined"
            sx={{
              minWidth: 124,
              borderRadius: "4px",
              borderColor: "var(--borde-blanco-marcado)",
              color: "var(--blanco-timbox)",
              fontFamily: "var(--fuente-regular)",
              fontSize: 16,
              textTransform: "none",
              py: 1,
              "&:hover": {
                borderColor: "var(--blanco-timbox)",
                bgcolor: "rgba(255, 255, 255, 0.08)",
              },
            }}
          >
            Enviar
          </Button>
        </Box>

        <CaptchaVerificacion
          ref={captchaRef}
          value={captchaToken}
          onChange={setCaptchaToken}
          onError={(mensaje) => {
            setAlerta({
              abierta: true,
              tipo: "error",
              titulo: "Captcha no disponible",
              descripcion: mensaje,
            });
          }}
          size="invisible"
        />
      </Box>
    </>
  );
}
