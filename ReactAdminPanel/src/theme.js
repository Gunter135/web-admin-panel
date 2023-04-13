import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";


export const tokens=(mode)=>({
    ...(mode === 'dark'
    ? {
        grey: {
            100: "#e0e0e0",
            200: "#c2c2c2",
            300: "#a3a3a3",
            400: "#858585",
            500: "#666666",
            600: "#525252",
            700: "#3d3d3d",
            800: "#292929",
            900: "#141414"
        },
        primary: {
            100: "#d4d5d6",
            200: "#a9abae",
            300: "#7e8085",
            400: "#20232a",
            500: "#101215",
            600: "#101215",
            700: "#08090a",
            800: "#08090a",
            900: "#08090a"
        },
        greenAccent: {
            100: "#d9f4e0",
            200: "#b3e9c0",
            300: "#8cdea1",
            400: "#66d381",
            500: "#40c862",
            600: "#33a04e",
            700: "#26783b",
            800: "#1a5027",
            900: "#0d2814"
        },
        redAccent: {
            100: "#f8dcdb",
            200: "#f1b9b7",
            300: "#e99592",
            400: "#e2726e",
            500: "#db4f4a",
            600: "#af3f3b",
            700: "#832f2c",
            800: "#58201e",
            900: "#2c100f"
        },
        blueAccent: {
            100: "#e0e3ed",
            200: "#c0c7db",
            300: "#a1aac8",
            400: "#818eb6",
            500: "#6272a4",
            600: "#4e5b83",
            700: "#3b4462",
            800: "#272e42",
            900: "#141721"
        }
    } : {
        grey: {
            900: "#e0e0e0",
            800: "#c2c2c2",
            700: "#a3a3a3",
            600: "#858585",
            500: "#666666",
            400: "#525252",
            300: "#3d3d3d",
            200: "#292929",
            100: "#141414"
        },
        primary: {
            900: "#d4d5d6",
            800: "#a9abae",
            700: "#7e8085",
            600: "#20232a",
            500: "#101215",
            400: "#d4d5d6",
            300: "#08090a",
            200: "#08090a",
            100: "#08090a"
        },
        greenAccent: {
            900: "#d9f4e0",
            800: "#b3e9c0",
            700: "#8cdea1",
            600: "#66d381",
            500: "#40c862",
            400: "#33a04e",
            300: "#26783b",
            200: "#1a5027",
            100: "#0d2814"
        },
        redAccent: {
            100: "#f8dcdb",
            200: "#f1b9b7",
            300: "#e99592",
            400: "#e2726e",
            500: "#db4f4a",
            600: "#af3f3b",
            700: "#832f2c",
            800: "#58201e",
            900: "#2c100f"
        },
        blueAccent: {
            900: "#e0e3ed",
            800: "#c0c7db",
            700: "#a1aac8",
            600: "#818eb6",
            500: "#6272a4",
            400: "#4e5b83",
            300: "#3b4462",
            200: "#272e42",
            100: "#141721"
        }

    }
    )
})

// prev base color codes
// #666666
// #141b2d
// #4cceac
// #db4f4a
// #6870fa
// New base color codes
// #282c34
// #ff79c6
// #40c862






//mui theme settings, is needed to use what we defined in the upper section

export const themeSettings=(mode)=>{
    const colors = tokens(mode)

    return {
        palette:{
            mode: mode,
            ...(mode==='dark'
            ? {
                primary:{
                    main: colors.primary[500],
                },
                secondary:{
                    main: colors.greenAccent[500],
                },
                neutral:{
                    dark: colors.grey[700],
                    main: colors.grey[500],
                    light: colors.grey[100]
                },
                white:{
                    main: "#FFFFFF",
                },
                red:{
                    main: colors.redAccent[500],
                    contrastText: colors.grey[900]
                },
                green:{
                    main: colors.greenAccent[500],
                    contrastText: colors.grey[900]
                },
                background:{
                    default: colors.primary[500]
                }
            } : {
                primary:{
                    main: colors.primary[100],
                },
                secondary:{
                    main: colors.greenAccent[500],
                },
                neutral:{
                    dark: colors.grey[700],
                    main: colors.grey[500],
                    light: colors.grey[100]
                },
                red:{
                    main: colors.redAccent[500],
                    contrastText: colors.grey[900]
                },
                green:{
                    main: colors.greenAccent[500],
                    contrastText: colors.grey[900]
                },
                background:{
                    default: "#eeeeee",
                }
            })
        },
        typography:{
            fontFamily : ["Roboto", "sans-serif"].join(","),
            fontSize: 12,
            h1:{
                fontFamily : ["Roboto", "sans-serif"].join(","),
                fontSize: 40,
            },
            h2:{
                fontFamily : ["Roboto", "sans-serif"].join(","),
                fontSize: 32,
            },
            h3:{
                fontFamily : ["Roboto", "sans-serif"].join(","),
                fontSize: 24,
            },
            h4:{
                fontFamily : ["Roboto", "sans-serif"].join(","),
                fontSize: 20,
            },
            h5:{
                fontFamily : ["Roboto", "sans-serif"].join(","),
                fontSize: 16,
            },
            h6:{
                fontFamily : ["Roboto", "sans-serif"].join(","),
                fontSize: 14,
            },
        }
    }
}

// React Context for the color mode

export const ColorModeContext = createContext({
    toggleColorMode: () => {},
  });

  
export const useMode = () =>{
    const [mode,setMode] = useState('dark');

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () =>
            setMode((prev) => (prev === 'light' ? 'dark': 'light')),
        }),[]
    );

    const theme = useMemo(()=> createTheme(themeSettings(mode)), [mode]);
    return [theme,colorMode];
}