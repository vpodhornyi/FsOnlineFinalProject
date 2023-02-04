import React, {useContext} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import PropTypes from "prop-types";
import {IconByName} from "../../index";

import {ModalPage} from '../../index';
import IconButton from "@mui/material/IconButton";
import {PATH} from "../../../utils/constants";
import {BackgroundContext} from "../../../utils/context";
import Button from "@mui/material/Button";
import {deleteTweet} from "../../../redux/tweet/action";
import {useDispatch, useSelector} from "react-redux";
import {getPersonalData} from "../../../redux/user/selector";


const DeleteTweet = () => {
  const {background} = useContext(BackgroundContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {id}=useParams();
  const personData = useSelector(getPersonalData);
  return (
    <ModalPage
      styles={{alignItems: 'start'}}
      element={
        <BoxWrapper>
          <IconButton
            className='Close'
            aria-label="close"
            onClick={() => navigate(background?.pathname || PATH.ROOT)}>
            <IconByName iconName='Close'/>
          </IconButton>
          <Box sx={{ padding: "20px" }}>
            <Box sx={{ textAlign: "center" }}>Delete tweet?</Box>
            <Button onClick={() => {
               dispatch(deleteTweet(personData.id, +id));
               navigate(-1);
            }}>yes</Button>
            <Button onClick={() => navigate(background?.pathname || PATH.ROOT)}>no</Button>
          </Box>
        </BoxWrapper>
      }/>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  width: '100%',
  height: '100%',
  backgroundColor: theme.palette.common.textWhite,
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

DeleteTweet.propTypes = {
  item: PropTypes.object,
}
export default DeleteTweet;
