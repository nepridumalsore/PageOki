import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#1976d2", // синий акцент
        },
        secondary: {
            main: "#9c27b0", // фиолетовый акцент
        },
        background: {
            default: "#f5f5f5",
            paper: "#ffffff",
        },
    },
    typography: {
        fontFamily: "Roboto, Arial, sans-serif",
    },
});

export default theme;
