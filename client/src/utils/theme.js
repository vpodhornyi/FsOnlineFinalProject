import {blue, yellow, pink, purple, orange, green, grey, blueGrey, red} from '@mui/material/colors';
import { alpha } from "@mui/material/styles";

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
        alpha: alpha('#ffffff', 0.35)
      },
      border: {
        main: grey[200],
      },
      text: {
        main: grey[900],
        secondary: '#ffffff',
        third: grey[800],
      },
      action: {
        main: grey[500],
      },
      logo: {
        main: blue[500]
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
        alpha: alpha(blueGrey[900], 0.35)
      },
      border: {
        main: blueGrey[700],
      },
      text: {
        main: blueGrey[50],
        secondary: grey[900],
        third: blueGrey[200],
      },
      action: {
        main: grey[400],
      },
      logo: {
        main: blueGrey[50],
      },
    },
    typography: {
      h2: {
        fontSize: '2.2rem',
        color: blueGrey[50],
        secondary: grey[900],
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
        1: grey[900],
        2: grey[800],
        3: grey[700],
        4: grey[600],
        5: grey[500],
        6: grey[400],
        7: grey[300],
        8: grey[200],
        9: grey[100],
        custom: grey,
        alpha: alpha(grey[900], 0.35)
      },
      border: {
        main: grey[800],
      },
      text: {
        main: grey[50],
        secondary: grey[900],
        third: grey[100],
      },
      action: {
        main: grey[300],
      },
      logo: {
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
      third: blue[800],
      light: blue[300],
      custom: blue,
      alpha: alpha(blue[300], 0.2),
    },
  },
  yellow: {
    primary: {
      main: yellow[600],
      secondary: yellow[700],
      light: yellow[400],
      custom: yellow,
      alpha: alpha(yellow[300], 0.2),
    },
  },
  pink: {
    primary: {
      main: pink[500],
      secondary: pink[600],
      light: pink[300],
      custom: pink,
      alpha: alpha(pink[300], 0.2),
    },
  },
  purple: {
    primary: {
      main: purple[500],
      secondary: purple[600],
      light: purple[300],
      custom: purple,
      alpha: alpha(purple[300], 0.2),
    },
  },
  orange: {
    primary: {
      main: orange[500],
      secondary: orange[600],
      light: orange[300],
      custom: orange,
      alpha: alpha(orange[300], 0.2),
    },
  },
  green: {
    primary: {
      main: green[500],
      secondary: green[600],
      light: green[300],
      custom: green,
      alpha: alpha(green[300], 0.2),
    },
  },
}
export const themeStyles = (background = 'default', color = 'blue') => {
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
        defaultText: grey[900],
        dimText: blueGrey[50],
        lightsOutText: grey[50],
      },
      background: {
        paper: '#ffffff',
        default: '#000000',
      },
      redAccent: {
        main: 'rgb(244, 33, 46)',
        secondary: 'rgb(220, 30, 41)',
        third: alpha(red[900], 0.2),
        light: alpha(red[300], 0.2),
        custom: red,
      },
      blackAccent: {
        main: 'rgb(15, 20, 25)',
        secondary: 'rgb(39, 40, 48)',
      },
      greyAccent: {
        main: 'rgb(83, 100, 113)',
        third: grey,
      },
      text: {
        main: '#ffffff'
      },
      action: {
        active: '#0f1419'
      },
      ...COLOR[color],
      ...BACKGROUND[background].palette,
    },
    typography: {
      fontFamily: "TwitterChirp, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif",
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
      ...BACKGROUND[background].typography,
    },
  });
}
export const setFontSize = size => {
  document.getElementsByTagName("html")[0].style.fontSize = `${size}px`;
}
export const setBackgroundColor = v => {
  document.getElementsByTagName("body")[0].style.backgroundColor = v;
}
