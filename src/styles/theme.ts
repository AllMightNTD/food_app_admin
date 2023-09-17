import { createTheme } from '@mui/material';

const defaultTheme = createTheme({
    palette: {
        primary: {
            main: '#146BD2',
            light: '#59C3FF',
        },
        background: {
            default: '#FAFAFA',
        },
        success: {
            main: '#219653',
        },
        warning: {
            main: '#FC8059',
        },
    },

    typography: {
        fontFamily: ['Roboto', 'sans-serif'].join(', '),
        h1: {
            fontSize: '60px',
            lineHeight: '68px',
        },
        h2: {
            fontSize: '48px',
            lineHeight: '56px',
        },
        h3: {
            fontSize: '36px',
            lineHeight: '40px',
        },
        h4: {
            fontSize: '30px',
            lineHeight: '36px',
        },
        h5: {
            fontSize: '24px',
            lineHeight: '30px',
        },
        h6: {
            fontSize: '20px',
            lineHeight: '28px',
        },
        subtitle1: {
            fontSize: '18px',
            lineHeight: '26px',
        },
        body1: {
            fontSize: '16px',
            lineHeight: '22px',
        },
        body2: {
            fontSize: '14px',
            lineHeight: '20px',
        },
        caption: {
            fontSize: '12px',
            lineHeight: '18px',
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                '@global': {
                    body: {
                        margin: 0,
                        padding: 0,
                        // Thêm các kiểu CSS tùy chỉnh cho body tại đây nếu cần
                    },
                },
            },
        },
    },
});

export { defaultTheme };
