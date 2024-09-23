import { createTheme } from '@mui/material/styles';

const Tema = createTheme({
    cssVariables: {
        colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    palette: {
        primary: {
            main: '#fff',
            light: '#fff',
            dark: '#fff',
            contrastText: '#fff',
        },
        secondary: {
            main: '#fff',
            light: '#fff',
            dark: '#fff',
            contrastText: '#fff',
        },
        background: {
            default: '#f5f5f5',
            paper: '#8b0000',
        },
        text: {
            primary: '#000',
            secondary: '#fff',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
    }
});

export default Tema;
