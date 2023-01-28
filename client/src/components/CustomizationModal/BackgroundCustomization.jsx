import React from "react";
import {RadioGroup} from "@mui/material";
import {styled} from "@mui/material/styles";
import PropTypes from "prop-types";

import BackgroundButton from './BackgroundButton';
import {getRandomKey} from '@utils';
import {BACKGROUND} from "@utils/theme";

const background = (() => Object.keys(BACKGROUND).map(key => {
  const v = BACKGROUND[key];
  return {
    title: v.palette.title,
    value: key,
    color: v.palette.background.main,
    textColor: v.palette.textColor,
  }
}))();

const BackgroundCustomization = ({handleChange, activeValue}) => {
  return <RadioGroupWrapper value={activeValue} onChange={handleChange}>
    {
      background.map((v, i) => {
        return <BackgroundButton
          key={i + getRandomKey()}
          backgroundColor={v.color}
          value={v.value}
          color={v.textColor}
          activeColor={activeValue}
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

  '& .defaultClass .MuiTypography-root': {
    color: theme.palette.common.defaultText
  },
  '& .dimClass .MuiTypography-root': {
    color: theme.palette.common.dimText
  },
  '& .lights_outClass .MuiTypography-root': {
    color: theme.palette.common.lightsOutText
  },
}));

BackgroundCustomization.propTypes = {
  handleChange: PropTypes.func,
  activeValue: PropTypes.string,
}

export default BackgroundCustomization;
