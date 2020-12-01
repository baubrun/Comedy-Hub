import {
    createMuiTheme
} from "@material-ui/core/styles";
export const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#E09721",
            light: "#ffc855",
            dark: "#a96900",
            contrastText: "#fff",
        },
        secondary: {
            main: "#391300",
            light: "#663a2b",
            dark: "#ff604f",
        },
        error: {
            main: "#ff0000",
            // contrastText: "#fff",

        }
    },
});