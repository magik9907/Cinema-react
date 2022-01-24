import {
  createTheme,
  ThemeProvider as MaterialProvider,
} from '@mui/material/styles';

export const mainTheme = createTheme({
  spacing: 4,
  palette: {
    primary: {
      main: '#0C0CB5',
      light: '#1F1F96',
      dark: '#040451',
    },

    secondary: {
      main: '#040451',
      light: '#8F8F94',
      dark: '#35353C',
    },
    error: {
      main: '#BC0000',
      light: '#F53939',
      dark: '#F53939',
    },
    warning: {
      main: '#FF7C00',
      light: '#F59539',
      dark: '#F59539',
    },
    info: {
      main: '#F59539',
      light: '#5DAFAF',
      dark: '#008888',
    },
    success: {
      main: '#44D22E',
      light: '#84DD76',
      dark: '#19BB00',
    },
    text: {
      primary: '#010102',
      secondary: '#fff',
      disabled: '#101010b3',
    },
    action: {
    //   active: '#',
      disabled: '#101010b3',
    //   focus: '#',
    //   hover: '#',
    //   selected: '#',
      disabledBackground: '#101010b3',
    },
    background: { default: '#383737', paper: '#a1a1a1' },
    // divider: '#',
  },
});

type props = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: props) {
  return <MaterialProvider theme={mainTheme}>{children}</MaterialProvider>;
}
