import {Box, Link} from '@mui/material';
import {enlacesExternos} from '../constants/navegacionPublica';
import {LogoTimboxConLetras} from '../../../shared/components/LogoTimboxConLetras';

type BarraAccesoPublicaProps = {
  modo: "claro" | "oscuro";
  onLogoClick: () => void;
};

export function BarraAccesoPublica({ modo, onLogoClick }: BarraAccesoPublicaProps) {
  const usarHeaderOscuro = modo === "oscuro";

  const colorLink = usarHeaderOscuro
    ? "var(--texto-footer-claro)"
    : "var(--texto-blanco-fuerte)";

  const colorLinkHover = usarHeaderOscuro
    ? "var(--azul-timbox)"
    : "var(--blanco-timbox)";

  const colorLinea = usarHeaderOscuro
    ? "var(--borde-azul-medio)"
    : "var(--blanco-timbox)";


    return (
        <Box
            component="header"
            sx={{
                position: 'absolute',
                inset: '0 0 auto',
                zIndex: 160,
                display: 'grid',
                gridTemplateColumns: {xs: '1fr', md: '29% 62% 9%'},
                pointerEvents: 'none'
            }}
        >
            <Box
                sx={{
                    px: {xs: 3, sm: 5, md: '7vw'},
                    pt: {xs: 8.5, md: 2.75},
                    pointerEvents: 'auto'
                }}
            >
                <LogoTimboxConLetras
                    to="/"
                    onClick={onLogoClick}
                    ancho={220}
                    variante={modo}
                    sx={{display: {xs: 'inline-flex', md: 'none'}, mt: 1}}
                />
                <LogoTimboxConLetras
                    to="/"
                    onClick={onLogoClick}
                    ancho={200}
                    variante={modo}
                    sx={{display: {xs: 'none', md: 'inline-flex'}, mt: 1}}
                />
            </Box>

            <Box
                component="nav"
                aria-label="Accesos de usuario"
                sx={{
                    display: {xs: 'none', md: 'flex'},
                    flexDirection: 'column',
                    justifySelf: 'end',
                    width: 455,
                    mt: 4,
                    pointerEvents: 'auto'
                }}
            >
                {/* Línea superior */}
                <Box
                    sx={{
                        height: '1px',
                        width: '100%',
                        backgroundColor: colorLinea
                    }}
                />

                {/* Contenido */}
                <Box
                    sx={{
                        position: 'relative',
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        alignItems: 'center',
                        minHeight: 44
                    }}
                >
                    {/* Línea vertical central */}
                    <Box
                        sx={{
                            position: 'absolute',
                            left: '50%',
                            top: 8,
                            bottom: 8,
                            width: '1px',
                            backgroundColor: colorLinea,
                            transform: 'translateX(-50%)'
                        }}
                    />

                    {[
                        {texto: 'Regístrate', url: enlacesExternos.registro},
                        {texto: 'Inicio de sesión', url: enlacesExternos.inicioSesion}
                    ].map((enlace) => (
                        <Link
                            key={enlace.url}
                            href={enlace.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            underline="none"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%',
                                color: colorLink,
                                textAlign: 'center',
                                fontFamily: 'var(--fuente-regular)',
                                fontSize: 16,
                                fontWeight: 500,
                                lineHeight: 1,
                                zIndex: 1,
                                '&:hover': {
                                    color: colorLinkHover
                                }
                            }}
                        >
                            {enlace.texto}
                        </Link>
                    ))}
                </Box>

                {/* Línea inferior */}
                <Box
                    sx={{
                        height: '1px',
                        width: '100%',
                        backgroundColor: colorLinea
                    }}
                />
            </Box>
        </Box>
    );
}
