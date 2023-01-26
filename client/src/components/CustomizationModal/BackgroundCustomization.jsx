import React, {useContext} from "react";
import {useState} from "react";
import {RadioGroup} from "@mui/material";
import {styled} from "@mui/material/styles";

import {ThemeContext} from "../../utils/themeContext";
import BackgroundButton from './BackgroundButton';
import {getRandomKey} from '@utils';

const COLORS = [
  {
    title: 'Default',
    value: 'default',
    color: 'rgba(255,255,255,1.00)',
    textColor: '#000000',
  },
  {
    title: 'Dim',
    value: 'dim',
    color: 'rgba(21, 32, 43)',
    textColor: '#ffffff',
  },
  {
    title: 'Lights out',
    value: 'lights_out',
    color: 'rgba(0, 0, 0)',
    textColor: '#ffffff',
  },
];
const defaultColorValue = 'default';

const BackgroundCustomization = () => {
  const {color, backgroundColor, setBackgroundColor} = useContext(ThemeContext);
  const [active, setActive] = useState('default');

  const handleColorChange = (e, v) => {
    setActive(v)
  }

  return <RadioGroupWrapper defaultValue={defaultColorValue} onChange={handleColorChange}>
    {
      COLORS.map((v, i) => {
        return <BackgroundButton
          key={i + getRandomKey()}
          backgroundColor={v.color}
          value={v.value}
          color={v.textColor}
          activeColor={active}
          title={v.title}/>;
      })
    }
  </RadioGroupWrapper>
}

const RadioGroupWrapper = styled(RadioGroup)(({theme}) => ({
  display: "flex",
  flexDirection: "column",
  marginTop: "3px",
  padding: 8,

  [theme.breakpoints.up('sm')]: {
    width: '100%',
    flexDirection: "row",
    justifyContent: "space-between",
  },

  '& .ActiveBackground': {
    borderColor: theme.palette.primary.main,
  },
}));

export default BackgroundCustomization;
