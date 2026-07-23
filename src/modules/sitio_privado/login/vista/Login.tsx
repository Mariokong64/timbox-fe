import { useCallback, useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import rubikTimbox from "../../../../shared/assets/rubik_timbox.webp";
import { AlertasServicio, type TipoAlertaServicio } from "../../../../shared/components/AlertasServicio";
import { LogoTimboxConLetras } from "../../../../shared/components/LogoTimboxConLetras";
import {
  CaptchaVerificacion,
  type CaptchaVerificacionHandle,
} from "../../../sitio_publico/components/CaptchaVerificacion";
import {
  formularioLoginValido,
  iniciarSesion,
  obtenerMensajeErrorLogin,
  obtenerSesionGuardada,
  validarCampoLogin,
  validarFormularioLogin,
  type ErroresLogin,
  type FormularioLogin,
} from "../servicio/autenticacionServicio";

interface EstadoNavegacionLogin {
  from?: {
    pathname?: string;
  };
}

interface AlertaLogin {
  abierta: boolean;
  tipo: TipoAlertaServicio;
  titulo: string;
  descripcion?: string;
}

const formularioInicial: FormularioLogin = {
  usuario: "",
  contrasena: "",
};

const alertaInicial: AlertaLogin = {
  abierta: false,
  tipo: "info",
  titulo: "",
};

const estilosCampo = {
  "& .MuiInputBase-root": {
    color: "var(--blanco-timbox)",
    fontFamily: "var(--fuente-ligera)",
    fontSize: 15,
  },
  "& .MuiInputBase-input": {
    py: 0.7,
    textTransform: "none",
  },
  "& .MuiInputBase-input:-webkit-autofill": {
    WebkitBoxShadow: "0 0 0 100px var(--azul-timbox) inset",
    WebkitTextFillColor: "var(--blanco-timbox)",
    caretColor: "var(--blanco-timbox)",
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: "rgba(255, 255, 255, 0.28)",
  },
  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
    borderBottomColor: "rgba(255, 255, 255, 0.6)",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "var(--rojo-timbox)",
  },
  "& .MuiFormHelperText-root": {
    minHeight: 20,
    ml: 0,
    color: "rgba(255, 255, 255, 0.72)",
    fontFamily: "var(--fuente-ligera)",
  },
};

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const estadoNavegacion = location.state as EstadoNavegacionLogin | null;
  const destino = estadoNavegacion?.from?.pathname ?? "/privado";
  const [formulario, setFormulario] = useState<FormularioLogin>(formularioInicial);
  const [errores, setErrores] = useState<ErroresLogin>({});
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [alerta, setAlerta] = useState<AlertaLogin>(alertaInicial);
  const [captchaToken, setCaptchaToken] = useState("");
  const [mensajeCaptcha, setMensajeCaptcha] = useState("");
  const captchaRef = useRef<CaptchaVerificacionHandle | null>(null);
  const captchaCompacto = useMediaQuery("(max-width:400px)");

  const formularioTieneDatos = useMemo(
    () => Boolean(formulario.usuario.trim() || formulario.contrasena.trim()),
    [formulario]
  );

  useEffect(() => {
    if (obtenerSesionGuardada()) {
      navigate(destino, { replace: true });
    }
  }, [destino, navigate]);

  const actualizarCaptcha = useCallback((token: string) => {
    setCaptchaToken(token);

    if (token) {
      setMensajeCaptcha("");
    }
  }, []);

  const actualizarCampo =
    (campo: keyof FormularioLogin) => (event: ChangeEvent<HTMLInputElement>) => {
      const valor = event.target.value;

      setFormulario((actual) => ({
        ...actual,
        [campo]: valor,
      }));

      setErrores((actual) => ({
        ...actual,
        [campo]: validarCampoLogin(campo, valor),
      }));
    };

  const enviarFormulario = async () => {
    const nuevosErrores = validarFormularioLogin(formulario);
    setErrores(nuevosErrores);

    if (!formularioLoginValido(nuevosErrores)) {
      setAlerta({
        abierta: true,
        tipo: "error",
        titulo: "Revisa tus datos",
        descripcion: "Ingresa usuario y contraseña para continuar.",
      });
      return;
    }

    if (!captchaToken) {
      setMensajeCaptcha("Confirma que no eres un robot antes de continuar.");
      setAlerta({
        abierta: true,
        tipo: "error",
        titulo: "Falta la verificación",
        descripcion: "Completa el captcha para iniciar sesión.",
      });
      return;
    }

    setCargando(true);
    setAlerta({
      abierta: true,
      tipo: "loading",
      titulo: "Iniciando sesión",
      descripcion: "Validando tus credenciales.",
    });

    try {
      await iniciarSesion({
        ...formulario,
        captchaToken,
      });
      setAlerta({
        abierta: true,
        tipo: "success",
        titulo: "Bienvenido",
        descripcion: "Acceso autorizado correctamente.",
      });
      navigate(destino, { replace: true });
    } catch (error) {
      captchaRef.current?.reiniciar();
      setAlerta({
        abierta: true,
        tipo: "error",
        titulo: "No se pudo iniciar sesión",
        descripcion: obtenerMensajeErrorLogin(error),
      });
    } finally {
      setCargando(false);
    }
  };

  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "530px minmax(0, 1fr)" },
        bgcolor: "var(--azul-timbox)",
      }}
    >
      <AlertasServicio
        abierta={alerta.abierta}
        tipo={alerta.tipo}
        titulo={alerta.titulo}
        descripcion={alerta.descripcion}
        onCerrar={() => setAlerta(alertaInicial)}
      />

      <Box
        sx={{
          minHeight: { xs: "100vh", md: "auto" },
          px: { xs: 4, sm: 7 },
          py: { xs: 5, md: 3.6 },
          display: "grid",
          gridTemplateRows: "auto 1fr",
          color: "var(--blanco-timbox)",
        }}
      >
        <LogoTimboxConLetras ancho={220} variante="claro" to="/" sx={{ justifySelf: { xs: "center", sm: "start" } }} />

        <Box
          component="form"
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            void enviarFormulario();
          }}
          sx={{
            alignSelf: "center",
            width: "100%",
            maxWidth: 370,
            mx: "auto",
            display: "grid",
            gap: 2.1,
          }}
        >
          <Box>
            <Typography
              component="label"
              htmlFor="usuario-login"
              sx={{
                display: "block",
                mb: 1,
                textAlign: "center",
                color: "var(--blanco-timbox)",
                fontFamily: "var(--fuente-ligera)",
                fontSize: 22,
              }}
            >
              Usuario
            </Typography>
            <TextField
              id="usuario-login"
              value={formulario.usuario}
              onChange={actualizarCampo("usuario")}
              variant="standard"
              fullWidth
              error={Boolean(errores.usuario)}
              helperText={formularioTieneDatos ? errores.usuario : ""}
              autoComplete="username"
              sx={estilosCampo}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end" sx={{ color: "var(--rojo-timbox)" }}>
                      *
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>

          <Box>
            <Typography
              component="label"
              htmlFor="contrasena-login"
              sx={{
                display: "block",
                mb: 1,
                textAlign: "center",
                color: "var(--blanco-timbox)",
                fontFamily: "var(--fuente-ligera)",
                fontSize: 22,
              }}
            >
              Contraseña
            </Typography>
            <TextField
              id="contrasena-login"
              value={formulario.contrasena}
              onChange={actualizarCampo("contrasena")}
              variant="standard"
              type={mostrarContrasena ? "text" : "password"}
              fullWidth
              error={Boolean(errores.contrasena)}
              helperText={formularioTieneDatos ? errores.contrasena : ""}
              autoComplete="current-password"
              sx={estilosCampo}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        type="button"
                        aria-label={mostrarContrasena ? "Ocultar contraseña" : "Mostrar contraseña"}
                        onClick={() => setMostrarContrasena((actual) => !actual)}
                        edge="end"
                        sx={{ color: "rgba(255, 255, 255, 0.62)", p: 0.4 }}
                      >
                        {mostrarContrasena ? (
                          <VisibilityOffOutlinedIcon sx={{ fontSize: 22 }} />
                        ) : (
                          <VisibilityOutlinedIcon sx={{ fontSize: 22 }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>

          <Box>
            <CaptchaVerificacion
              ref={captchaRef}
              value={captchaToken}
              onChange={actualizarCaptcha}
              onError={setMensajeCaptcha}
              size={captchaCompacto ? "compact" : "normal"}
              theme="dark"
            />

            {mensajeCaptcha && (
              <Alert
                severity="error"
                sx={{
                  mt: -1,
                  fontFamily: "var(--fuente-regular)",
                  fontSize: 13,
                  textAlign: "left",
                }}
              >
                {mensajeCaptcha}
              </Alert>
            )}
          </Box>

          <Button
            type="submit"
            disabled={cargando}
            sx={{
              justifySelf: "center",
              mt: 2.8,
              minWidth: 123,
              height: 36,
              borderRadius: 2,
              bgcolor: "var(--rojo-timbox)",
              color: "var(--blanco-timbox)",
              fontFamily: "var(--fuente-regular)",
              fontSize: 22,
              textTransform: "none",
              boxShadow: "none",
              opacity: cargando ? 0.72 : 1,
              "&:hover": {
                bgcolor: "#f04a32",
                boxShadow: "none",
              },
            }}
          >
            {cargando ? "Validando..." : "Acceder"}
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: { xs: "none", md: "block" },
          minHeight: "100vh",
          backgroundImage: `url(${rubikTimbox})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </Box>
  );
}
