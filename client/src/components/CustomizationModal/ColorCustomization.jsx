import React, {useContext} from "react";
import {useState} from "react";
import {styled} from "@mui/material/styles";
import {RadioGroup} from "@mui/material";

import {ThemeContext} from "../../utils/themeContext";
import {getRandomKey} from '@utils';
import ColorDot from './ColorDot';


const COLORS = [
  {
    value: 'blue',
    color: 'rgb(29, 155, 240)',
  },
  {
    value: 'yellow',
    color: 'rgb(255, 212, 0)',
  },
  {
    value: 'pink',
    color: 'rgb(249, 24, 128)',
  },
  {
    value: 'purple',
    color: 'rgb(120, 86, 255)',
  },
  {
    value: 'orange',
    color: 'rgb(255, 122, 0)',
  },
  {
    value: 'green',
    color: 'rgb(0, 186, 124)',
  },
];

export default function ColorCustomization() {
  const {color, setColor} = useContext(ThemeContext);
  const [active, setActive] = useState();
  const handleColorChange = (newColor) => {
    setColor(newColor);
  }
  return <RadioGroupWrapper defaultValue='blue'>
    {
      COLORS.map((v, i) => {
        return <ColorDot key={i + getRandomKey()} backgroundColor={v.color} value={v.value}/>
      })
    }
  </RadioGroupWrapper>
}

const RadioGroupWrapper = styled(RadioGroup)(({theme}) => ({
  width: '100%',
  flexDirection: "row",
  display: "flex",
  justifyContent: "space-around",
  flexWrap: 'wrap',
  padding: "10px 0",
  marginBottom: '12px',

  [theme.breakpoints.up('sm')]: {
    flexWrap: 'nowrap',
  }
}));
