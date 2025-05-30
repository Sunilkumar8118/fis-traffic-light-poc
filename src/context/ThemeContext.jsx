import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { createContext, useContext, useMemo, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext)

export const ThemeContextProvider = ({children }) =>{
    const getInitialMode = () => {
        return localStorage.getItem('appTheme') || 'light';
      };
    const [mode, setMode] = useState(getInitialMode)

    const toggleTheme = () =>{
        setMode(prev => (prev === 'light' ? 'dark': 'light'));
    };

    useEffect(() => {
        localStorage.setItem('appTheme', mode);
      }, [mode]);

    const theme = useMemo( () =>
        createTheme({
            palette: {
                mode,
            },
        }), [mode])

    return(
        <ThemeContext.Provider value={{mode, toggleTheme}}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children }
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};