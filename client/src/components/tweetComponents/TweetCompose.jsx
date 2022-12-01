import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import PropTypes from "prop-types";
import {IconByName, TweetForm} from "../.";

import {ModalPage} from '../.';
import IconButton from "@mui/material/IconButton";
import {PATH} from "../../utils/constants";
import {BackgroundContext} from "../../utils/context";


const TweetCompose = () => {
  const {background} = useContext(BackgroundContext);
  const navigate = useNavigate();

  return (
    <ModalPage
      styles={{alignItems: 'start'}}
      element={
        <BoxWrapper>
          <IconButton className='Close' aria-label="close" onClick={() => navigate(background?.pathname || PATH.ROOT)}>
            <IconByName iconName='Close'/>
          </IconButton>
          <TweetForm/>
        </BoxWrapper>
      }/>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  height: '100%',
  backgroundColor: theme.palette.common.white,
  padding: '40px 0',
  position: 'relative',

  [theme.breakpoints.up('sm')]: {
    width: '600px',
    borderRadius: 16,
    marginTop: 80,
  },

  '& .Close': {
    position: 'absolute',
    top: 5,
    left: 5,
  },
}));

TweetCompose.propTypes = {
  item: PropTypes.object,
}
export default TweetCompose;
