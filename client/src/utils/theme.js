import {blue, yellow, pink, purple, orange, green, grey, blueGrey} from '@mui/material/colors';

export const BACKGROUND = {
  default: {
    title: 'Default',
    textColor: '#000000',
    background: {
      main: '#ffffff',
      1: grey[100],
      custom: grey,
    },
    border: {
      main: grey[200],
    },
  },
  dim: {
    title: 'Dim',
    textColor: '#ffffff',
    background: {
      main: blueGrey[900],
      1: blueGrey[800],
      custom: blueGrey,
    },
    border: {
      main: blueGrey[700],
    },
  },
  lights_out: {
    title: 'Lights out',
    textColor: '#ffffff',
    background: {
      main: '#000000',
      1: grey[900],
      custom: grey,
    },
    border: {
      main: grey[800],
    },
  },
}
export const COLOR = {
  blue: {
    primary: {
      main: blue[500],
      secondary: blue[600],
      light: blue[300],
      custom: blue,
      contrastText: '#ffffff'
    },
  },
  yellow: {
    primary: {
      main: yellow[600],
      secondary: yellow[700],
      light: yellow[400],
      custom: yellow,
      contrastText: '#ffffff'
    },
  },
  pink: {
    primary: {
      main: pink[500],
      secondary: pink[600],
      light: pink[300],
      custom: pink,
      contrastText: '#ffffff'
    },
  },
  purple: {
    primary: {
      main: purple[500],
      secondary: purple[600],
      light: purple[300],
      custom: purple,
      contrastText: '#ffffff'
    },
  },
  orange: {
    primary: {
      main: orange[500],
      secondary: orange[600],
      light: orange[300],
      custom: orange,
      contrastText: '#ffffff'
    },
  },
  green: {
    primary: {
      main: green[500],
      secondary: green[600],
      light: green[300],
      custom: green,
      contrastText: '#ffffff'
    },
  },
}
export const themeStyles = (background, color) => {
  return ({
    breakpoints: {
      values: {
        xs: 500,
        sm: 710,
        md: 1020,
        lg: 1110,
        xl: 1295,
      },
    },
    palette: {
      common: {
        black: '#1976d2',
        white: '#ffffff',
      },
      background: {
        paper: '#ffffff',
        default: '#000000',
      },
      primary: {
        main: 'rgb(29, 155, 240)',
        secondary: 'rgb(26, 140, 216)',
        third: 'rgba(29, 155, 240, 0.1)',
        light: 'rgb(142, 205, 248)',
        contrastText: '#ffffff'
      },
      neutral: {
        main: '#ffd400',
      },
      border: {
        lightGrey: 'rgb(239, 243, 244)',
      },
      orangeAccent: {
        main: '#ff7a00',
      },
      greenAccent: {
        main: 'rgb(0, 186, 124)',
        secondary: 'rgba(0, 186, 124, 0.1)',
      },
      redAccent: {
        main: 'rgb(244, 33, 46)',
        secondary: 'rgb(220, 30, 41)',
        third: 'rgba(244, 33, 46, 0.1)',
      },
      blackAccent: {
        main: 'rgb(15, 20, 25)',
        secondary: 'rgb(39, 40, 48)',
      },
      greyAccent: {
        main: 'rgb(83, 100, 113)',
      },
      text: {
        primary: '#000000'
      },
      action: {
        active: '#0f1419'
      },
      ...COLOR[color],
      ...BACKGROUND[background],
    },
    typography: {
      fontFamily: "TwitterChirp, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif",
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
      h1: {
        fontSize: '4rem',
      },
      h2: {
        fontSize: '2.2rem',
      },
      body1: {
        fontSize: '1rem',
      },
      body2: {
        fontSize: '0.95rem',
        color: 'rgb(83, 100, 113)'
      },
      body3: {
        fontSize: '0.8rem',
        color: 'rgb(83, 100, 113)',
      },
    },
  });
}
