import { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Link, List, ListItem, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { opcionesMenuPublico } from "../constants/navegacionPublica";

const contactoMenu = {
  ventas: "contacto@timbox.com.mx",
  soporte: "soporte@timbox.com.mx",
  telefonos: ["800 788 0195", "442 454 7840"],
  horario: ["Lunes - Viernes", "9:30 - 19:00", "CST"],
};

type MenuLateralPublicoProps = {
  abierto: boolean;
  onAbrir: () => void;
  onCerrar: () => void;
};

export function MenuLateralPublico({ abierto, onAbrir, onCerrar }: MenuLateralPublicoProps) {
  const anchoContenedor = "min(1600px, 90vw)";
  const anchoContenido = { xs: "100%", md: "75%" };
  const margenIzquierdoContenido = { xs: 0, md: "25%" };
  const puntosAbrir = [1, 2, 3];
  const puntosCerrar = [1, 2, 3, 4];

  useEffect(() => {
    if (!abierto) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [abierto]);

  return (
    <>
      {!abierto && (
        <Box
          component="button"
          type="button"
          onClick={onAbrir}
          aria-label="Abrir menú principal"
          sx={{
            position: { xs: "absolute", md: "fixed" },
            top: { xs: 58, md: 0 },
            right: 0,
            zIndex: 60,
            width: { xs: 70, md: 105 },
            height: { xs: 70, md: 222 },
            border: 0,
            bgcolor: { xs: "var(--transparente)", md: "var(--azul-timbox)" },
            color: "var(--blanco-timbox)",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 0,
          }}
        >
          <Typography
            sx={{
              display: { xs: "none", md: "block" },
              mt: { md: 6 },
              fontFamily: "var(--fuente-regular)",
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: "4px",
              textTransform: "uppercase",
            }}
          >
            Menú
          </Typography>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              alignItems: "center",
              gap: "7px",
              mt: 9,
            }}
          >
            {puntosAbrir.map((punto) => (
              <Box
                key={punto}
                sx={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  bgcolor: "var(--texto-blanco-medio)",
                }}
              />
            ))}
          </Box>

          <MoreVertIcon
            sx={{
              display: { xs: "block", md: "none" },
              color: "var(--texto-blanco-medio)",
              fontSize: 38,
            }}
          />
        </Box>
      )}

      <Box
        aria-hidden={!abierto}
        sx={{
          position: "fixed",
          inset: 0,
          zIndex: 100,
          bgcolor: "var(--azul-timbox)",
          color: "var(--blanco-timbox)",
          overflowY: "auto",
          overflowX: "hidden",
          opacity: abierto ? 1 : 0,
          visibility: abierto ? "visible" : "hidden",
          transform: abierto ? "translateX(0)" : "translateX(100%)",
          transition: "opacity .35s ease, transform .35s ease, visibility .35s",
        }}
      >
        {abierto && (
          <Box
            component="button"
            type="button"
            onClick={onCerrar}
            aria-label="Cerrar menú principal"
            sx={{
              position: "fixed",
              top: 0,
              right: 0,
              zIndex: 130,
              width: { xs: 70, md: 105 },
              height: { xs: 70, md: 222 },
              border: 0,
              bgcolor: "var(--azul-timbox)",
              color: "var(--blanco-timbox)",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 0,
            }}
          >
            <Typography
              sx={{
                display: { xs: "none", md: "block" },
                mt: { md: 6 },
                fontFamily: "var(--fuente-regular)",
                fontSize: 15,
                fontWeight: 700,
                letterSpacing: "4px",
                textTransform: "uppercase",
              }}
            >
              Cerrar
            </Typography>

            <Box
              sx={{
                display: { xs: "none", md: "grid" },
                gridTemplateColumns: "repeat(2, 5px)",
                gap: "7px",
                mt: 9,
              }}
            >
              {puntosCerrar.map((punto) => (
                <Box
                  key={punto}
                  sx={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    bgcolor: "var(--blanco-timbox)",
                  }}
                />
              ))}
            </Box>

            <CloseIcon
              sx={{
                display: { xs: "block", md: "none" },
                fontSize: 34,
                mt: 2,
              }}
            />
          </Box>
        )}

        <Box
          component="section"
          sx={{
            width: anchoContenedor,
            mx: "auto",
            pt: { xs: 14, md: 18 },
            pb: 8,
          }}
        >
          <Box
            sx={{
              width: anchoContenido,
              ml: margenIzquierdoContenido,
            }}
          >
            <List
              disablePadding
              sx={{
                minHeight: { xs: "auto", md: 330 },
              }}
            >
              {opcionesMenuPublico.map((opcion) => (
                <ListItem key={opcion.ruta} disablePadding sx={{ py: 0.25 }}>
                  <Link
                    component={RouterLink}
                    to={opcion.ruta}
                    onClick={onCerrar}
                    underline="none"
                    sx={{
                      color: "var(--texto-blanco-tenue)",
                      fontFamily: "var(--fuente-ligera)",
                      fontSize: { xs: 32, md: 36 },
                      lineHeight: 1.18,
                      fontWeight: 300,
                      "&:hover": {
                        color: "var(--blanco-timbox)",
                      },
                    }}
                  >
                    {opcion.texto}
                  </Link>
                </ListItem>
              ))}
            </List>

            <Box
              sx={{
                mt: { xs: 5, md: 4 },
                pt: { xs: 4, md: 7 },
                borderTop: "1px solid var(--borde-blanco-tenue)",
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "1.3fr .75fr .7fr",
                },
                gap: { xs: 4, md: 8 },
                color: "var(--texto-blanco-medio)",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    mb: 2,
                    color: "var(--blanco-timbox)",
                    fontFamily: "var(--fuente-regular)",
                    fontSize: 18,
                    fontWeight: 600,
                  }}
                >
                  Contacto general
                </Typography>

                <Typography
                  sx={{
                    fontFamily: "var(--fuente-regular)",
                    fontSize: 17,
                    color: "var(--texto-blanco-tenue)",
                    lineHeight: 1.7,
                  }}
                >
                  Ventas: {contactoMenu.ventas}
                  <br />
                  Soporte Técnico: {contactoMenu.soporte}
                </Typography>
              </Box>

              <Box>
                <Typography
                  sx={{
                    mb: 2,
                    color: "var(--blanco-timbox)",
                    fontFamily: "var(--fuente-regular)",
                    fontSize: 18,
                    fontWeight: 600,
                  }}
                >
                  Tel.
                </Typography>

                <Typography
                  sx={{
                    fontFamily: "var(--fuente-regular)",
                    fontSize: 18,
                    color: "var(--texto-blanco-tenue)",
                    lineHeight: 1.8,
                  }}
                >
                  {contactoMenu.telefonos.map((telefono) => (
                    <Box key={telefono} component="span" sx={{ display: "block" }}>
                      {telefono}
                    </Box>
                  ))}
                </Typography>
              </Box>

              <Box>
                <Typography
                  sx={{
                    mb: 2,
                    color: "var(--blanco-timbox)",
                    fontFamily: "var(--fuente-regular)",
                    fontSize: 18,
                    fontWeight: 600,
                  }}
                >
                  Horarios
                </Typography>

                <Typography
                  sx={{
                    fontFamily: "var(--fuente-regular)",
                    fontSize: 15,
                    color: "var(--texto-blanco-tenue)",
                    lineHeight: 1.6,
                  }}
                >
                  {contactoMenu.horario.map((texto) => (
                    <Box key={texto} component="span" sx={{ display: "block" }}>
                      {texto}
                    </Box>
                  ))}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
