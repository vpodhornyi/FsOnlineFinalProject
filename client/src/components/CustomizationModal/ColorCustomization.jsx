import React from "react";
import {styled} from "@mui/material/styles";
import {RadioGroup} from "@mui/material";
import PropTypes from "prop-types";

import {getRandomKey} from '@utils';
import ColorDot from './ColorDot';
import {COLOR} from "@utils/theme";


const colors = (() => Object.keys(COLOR).map(key => {
  const v = COLOR[key];
  return {
    value: key,
    color: v.primary.main,
  }
}))();

const ColorCustomization = ({handleChange, activeValue}) => {
  return <RadioGroupWrapper value={activeValue} onChange={handleChange}>
    {
      colors.map((v, i) => {
        return <ColorDot
          key={i + getRandomKey()}
          backgroundColor={v.color}
          value={v.value}/>
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

ColorCustomization.propTypes = {
  handleChange: PropTypes.func,
  activeValue: PropTypes.string,
}
export default ColorCustomization;
