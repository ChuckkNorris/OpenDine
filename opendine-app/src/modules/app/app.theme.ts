import { createTheme } from "@mui/material";
import { orange } from "@mui/material/colors";

// Enables typed overrides of the default theme
declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

// Enabled typed overrides of default pallete colors
declare module '@mui/material/styles' {
  interface PaletteColor {
    darker?: string;
  }

  interface SimplePaletteColorOptions {
    darker?: string;
  }
}

const primary = {
  main: '#1976d2',
  light: '#42a5f5',
  dark: '#1565c0',
  contrastText: '#fff',
};

const secondary = {
  main: '#1976d2',
  light: '#42a5f5',
  dark: '#1565c0',
  contrastText: '#fff',
};

export const theme = createTheme({
  palette: {
    primary,
    secondary
  },
  status: {
    danger: orange[500],
  },
});

export default theme;
