import {Box, Link, Typography} from '@mui/material';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import {Link as RouterLink} from 'react-router-dom';
import iconoTimbox from '../../../shared/assets/icono_timbox.svg';
import {columnasFooter} from '../constants/navegacionPublica';
import { abrirURLPorClave, clavesURL } from './urls/servicio/urlsServicio';

export function FooterPublico() {
    return (
        <Box component="footer" sx={{bgcolor: 'var(--blanco-timbox)'}}>
            <Box
                sx={{
                    width: 'min(1480px, 95vw)',
                    mx: 'auto',
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: '220px repeat(3, minmax(0, 1fr))'
                    },
                    columnGap: {xs: 2, sm: 12},
                    rowGap: {xs: 2, sm: 0},
                    py: {xs: 5, md: 3},
                    alignItems: 'center'
                }}
            >
                <Box
                    component={RouterLink}
                    to="/login"
                    aria-label="Ir al panel administrativo"
                    sx={{
                        mx: {xs: 'auto', sm: 0},
                        mb: {xs: 2, sm: 0},
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 1,
                        color: 'var(--texto-footer-claro)',
                        textDecoration: 'none',
                        transition: 'transform 180ms ease',
                        '&:hover': {
                            transform: 'translateY(-1px)'
                        }
                    }}
                >
                    <Box component="img" src={iconoTimbox} alt="" sx={{width: 32, display: 'block'}} />
                    <Typography
                        component="span"
                        sx={{
                            fontFamily: 'var(--fuente-regular)',
                            fontSize: 17,
                            color: 'inherit'
                        }}
                    >
                        Panel Administrativo
                    </Typography>
                </Box>

                {columnasFooter.map((columna, indice) => (
                    <Box component="ul" key={indice} sx={{listStyle: 'none', p: 0, m: 0, textAlign: {xs: 'center', sm: 'left'}}}>
                        {columna.map((enlace) => {
                            const claveURL = enlace.claveURL;

                            return (
                                <Box component="li" key={enlace.texto} sx={{py: 1}}>
                                    <Link
                                        href={claveURL ? '/404' : enlace.url}
                                        target={claveURL ? '_blank' : undefined}
                                        rel={claveURL ? 'noopener noreferrer' : undefined}
                                        onClick={claveURL ? (evento) => {
                                            evento.preventDefault();
                                            abrirURLPorClave(claveURL);
                                        } : undefined}
                                        underline="hover"
                                        color="inherit"
                                        sx={{
                                            fontFamily: 'var(--fuente-regular)',
                                            fontSize: 17,
                                            color: 'var(--texto-footer-claro)',
                                            transition: 'color 180ms ease',
                                            '&:hover': {
                                                color: 'var(--azul-timbox)'
                                            }
                                        }}
                                    >
                                        {enlace.texto}
                                    </Link>
                                </Box>
                            );
                        })}
                    </Box>
                ))}
            </Box>

            <Box
                sx={{
                    bgcolor: 'var(--azul-timbox)',
                    color: 'var(--texto-blanco-medio)',
                    minHeight: 100,
                    px: {xs: 3, md: '11vw'},
                    py: 2.5,
                    display: 'grid',
                    gridTemplateColumns: {xs: '1fr', md: '1fr 1fr auto'},
                    alignItems: 'center',
                    gap: {xs: 2, md: 5},
                    textAlign: {xs: 'center', md: 'left'}
                }}
            >
                <Typography sx={{fontFamily: 'var(--fuente-regular)', fontSize: 17}}>@ Timbox 2021</Typography>

                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: {xs: 1.5, md: 8},
                        justifyContent: {xs: 'center', md: 'flex-end'}
                    }}
                >
                    <Link
                        href="tel:8007880195"
                        color="inherit"
                        underline="hover"
                        sx={{
                            fontFamily: 'var(--fuente-regular)',
                            fontSize: 16,
                            color: 'var(--texto-blanco-medio)',
                            transition: 'color 180ms ease',
                            '&:hover': {
                                color: 'var(--blanco-timbox)'
                            }
                        }}
                    >
                        800 788 0195
                    </Link>
                    <Link
                        href="tel:4424547840"
                        color="inherit"
                        underline="hover"
                        sx={{
                            fontFamily: 'var(--fuente-regular)',
                            fontSize: 16,
                            color: 'var(--texto-blanco-medio)',
                            transition: 'color 180ms ease',
                            '&:hover': {
                                color: 'var(--blanco-timbox)'
                            }
                        }}
                    >
                        442 454 7840
                    </Link>

                    <Link
                        href="/soporte"
                        color="inherit"
                        underline="hover"
                        sx={{
                            fontFamily: 'var(--fuente-regular)',
                            fontSize: 16,
                            color: 'var(--texto-blanco-medio)',
                            transition: 'color 180ms ease',
                            '&:hover': {
                                color: 'var(--blanco-timbox)'
                            }
                        }}
                    >
                        soporte@timbox.com.mx
                    </Link>
                </Box>

                <Box sx={{display: {xs: 'none', md: 'flex'}, gap: 2}}>
                    <Link
                        href="/404"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(evento) => {
                            evento.preventDefault();
                            abrirURLPorClave(clavesURL.facebook);
                        }}
                        aria-label="Facebook de Timbox"
                        sx={{
                            color: 'var(--texto-blanco-medio)',
                            display: 'inline-flex',
                            transition: 'color 180ms ease, transform 180ms ease',
                            '&:hover': {
                                color: 'var(--blanco-timbox)',
                                transform: 'translateY(-1px)'
                            }
                        }}
                    >
                        <FacebookRoundedIcon sx={{fontSize: 22}} />
                    </Link>

                    <Link
                        href="/404"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(evento) => {
                            evento.preventDefault();
                            abrirURLPorClave(clavesURL.linkedin);
                        }}
                        aria-label="LinkedIn de Timbox"
                        sx={{
                            color: 'var(--texto-blanco-medio)',
                            display: 'inline-flex',
                            transition: 'color 180ms ease, transform 180ms ease',
                            '&:hover': {
                                color: 'var(--blanco-timbox)',
                                transform: 'translateY(-1px)'
                            }
                        }}
                    >
                        <LinkedInIcon sx={{fontSize: 23}} />
                    </Link>
                </Box>
            </Box>
        </Box>
    );
}
