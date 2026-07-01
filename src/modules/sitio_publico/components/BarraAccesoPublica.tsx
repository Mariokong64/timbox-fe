import {Box, Link} from '@mui/material';
import {Link as RouterLink} from 'react-router-dom';
import {enlacesExternos} from '../constants/navegacionPublica';
import {LogoTimboxClaro} from './LogoTimboxClaro';

export function BarraAccesoPublica() {
    return (
        <Box
            component="header"
            sx={{
                position: 'absolute',
                inset: '0 0 auto',
                zIndex: 120,
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
                <Box component={RouterLink} to="/" aria-label="Ir al inicio" sx={{display: 'inline-flex', textDecoration: 'none'}}>
                    <Box sx={{display: {xs: 'block', md: 'none'}, mt: 1}}>
                        <LogoTimboxClaro ancho={220} />
                    </Box>
                    <Box sx={{display: {xs: 'none', md: 'block'}, mt: 1}}>
                        <LogoTimboxClaro ancho={200} />
                    </Box>
                </Box>
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
                        backgroundColor: 'var(--blanco-timbox)'
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
                            backgroundColor: 'var(--borde-blanco-marcado)',
                            transform: 'translateX(-50%)'
                        }}
                    />

                    {[
                        {texto: 'Regístrate', url: enlacesExternos.registro},
                        {texto: 'Inicio de sesión', url: enlacesExternos.inicioSesion}
                    ].map((enlace) => (
                        <Link
                            key={enlace.texto}
                            href={enlace.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            underline="none"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%',
                                color: 'var(--texto-blanco-fuerte)',
                                textAlign: 'center',
                                fontFamily: 'var(--fuente-regular)',
                                fontSize: 16,
                                fontWeight: 500,
                                lineHeight: 1,
                                zIndex: 1,
                                '&:hover': {
                                    color: 'var(--blanco-timbox)'
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
                        backgroundColor: 'var(--blanco-timbox)'
                    }}
                />
            </Box>
        </Box>
    );
}
