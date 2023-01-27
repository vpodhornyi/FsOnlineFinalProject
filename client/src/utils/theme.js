import {blue, yellow, pink, purple, orange, green, grey, blueGrey} from '@mui/material/colors';

export const BACKGROUND = {
  default: {
    palette:  {
      title: 'Default',
      textColor: '#000000',
      background: {
        main: '#ffffff',
        1: grey[100],
        2: grey[200],
        3: grey[300],
        4: grey[400],
        5: grey[500],
        6: grey[600],
        7: grey[700],
        8: grey[800],
        9: grey[900],
        custom: grey,
      },
      border: {
        main: grey[200],
      },
      text: {
        main: grey[900],
      },
    },
    typography: {
      h2: {
        fontSize: '2.2rem',
        color: grey[900],
      },
      body1: {
        fontSize: '1rem',
        color: grey[900],
      },
      body2: {
        fontSize: '0.95rem',
        color: grey[700],
      },
      body3: {
        fontSize: '0.8rem',
        color: grey[700],
      },
    }
  },
  dim: {
    palette: {
      title: 'Dim',
      textColor: '#ffffff',
      background: {
        main: blueGrey[900],
        1: blueGrey[800],
        2: blueGrey[700],
        3: blueGrey[600],
        4: blueGrey[500],
        5: blueGrey[400],
        6: blueGrey[300],
        7: blueGrey[200],
        8: blueGrey[100],
        9: blueGrey[50],
        custom: blueGrey,
      },
      border: {
        main: blueGrey[700],
      },
      text: {
        main: blueGrey[50],
      },
    },
    typography: {
      h2: {
        fontSize: '2.2rem',
        color: blueGrey[50],
      },
      body1: {
        fontSize: '1rem',
        color: blueGrey[50],
      },
      body2: {
        fontSize: '0.95rem',
        color: blueGrey[300],
      },
      body3: {
        fontSize: '0.8rem',
        color: blueGrey[300],
      },
    }
  },
  lights_out: {
    palette: {
      title: 'Lights out',
      textColor: '#ffffff',
      background: {
        main: '#000000',
        1: grey[800],
        2: grey[700],
        3: grey[600],
        4: grey[500],
        5: grey[400],
        6: grey[300],
        7: grey[200],
        8: grey[100],
        9: grey[50],
        custom: grey,
      },
      border: {
        main: grey[800],
      },
      text: {
        main: grey[50],
      },
    },
    typography: {
      h2: {
        fontSize: '2.2rem',
        color: grey[50],
      },
      body1: {
        fontSize: '1rem',
        color: grey[50],
      },
      body2: {
        fontSize: '0.95rem',
        color: grey[300],
      },
      body3: {
        fontSize: '0.8rem',
        color: grey[300],
      },
    }
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
        black: '#000000',
        textWhite: '#ffffff',
        textBlack: grey[900],
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
        contrastText: '#ffffff',
        text: '#ffffff'
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
        main: '#ffffff'
      },
      action: {
        active: '#0f1419'
      },
      ...COLOR[color],
      ...BACKGROUND[background]?.palette,
    },
    typography: {
      fontFamily: "TwitterChirp, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif",
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
      ...BACKGROUND[background]?.typography,
    },
  });
}
