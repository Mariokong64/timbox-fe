import { Box, Link, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import iconoTimbox from "../../../shared/assets/icono_timbox.svg";
import { columnasFooter } from "../constants/navegacionPublica";

export function FooterPublico() {
  return (
    <Box component="footer" sx={{ bgcolor: "var(--blanco-timbox)" }}>
      <Box
        sx={{
          width: "min(1120px, 86vw)",
          mx: "auto",
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "130px repeat(3, minmax(0, 1fr))",
          },
          gap: { xs: 2, sm: 5 },
          py: { xs: 5, md: 4 },
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src={iconoTimbox}
          alt=""
          sx={{ width: 32, mx: { xs: "auto", sm: 0 }, mb: { xs: 2, sm: 0 } }}
        />

        {columnasFooter.map((columna, indice) => (
          <Box
            component="ul"
            key={indice}
            sx={{ listStyle: "none", p: 0, m: 0, textAlign: { xs: "center", sm: "left" } }}
          >
            {columna.map((enlace) => (
              <Box component="li" key={enlace.texto} sx={{ py: 0.8 }}>
                <Link
                  href={enlace.url}
                  underline="hover"
                  color="inherit"
                  sx={{
                    fontFamily: "var(--fuente-regular)",
                    fontSize: 13,
                    color: "var(--texto-footer-claro)",
                  }}
                >
                  {enlace.texto}
                </Link>
              </Box>
            ))}
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          bgcolor: "var(--azul-timbox)",
          color: "var(--texto-blanco-medio)",
          minHeight: 100,
          px: { xs: 3, md: "11vw" },
          py: 2.5,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr auto" },
          alignItems: "center",
          gap: { xs: 2, md: 5 },
          textAlign: { xs: "center", md: "left" },
        }}
      >
        <Typography sx={{ fontFamily: "var(--fuente-regular)", fontSize: 13 }}>
          @ Timbox 2021
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: { xs: 1.5, md: 2.5 },
            justifyContent: { xs: "center", md: "flex-end" },
          }}
        >
          <Link href="tel:8007880195" color="inherit" underline="hover">
            800 788 0195
          </Link>
          <Link href="tel:4424547840" color="inherit" underline="hover">
            442 454 7840
          </Link>
          <Link href="mailto:soporte@timbox.com.mx" color="inherit" underline="hover">
            soporte@timbox.com.mx
          </Link>
        </Box>

        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1.5 }}>
          <FacebookIcon sx={{ fontSize: 17 }} />
          <LinkedInIcon sx={{ fontSize: 17 }} />
        </Box>
      </Box>
    </Box>
  );
}
