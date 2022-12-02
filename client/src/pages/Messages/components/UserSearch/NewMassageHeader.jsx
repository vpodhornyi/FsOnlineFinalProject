import React, {useContext} from "react";
import {useSelector} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box, Typography} from "@mui/material";
import CustomIconButton from "@components/buttons/CustomIconButton";
import CustomFabButton from "@components/buttons/CustomFabButton";
import {getMessageSearchData} from '@redux/message/search/selector';
import {useNavigate} from "react-router-dom";
import {BackgroundContext} from "../../../../utils/context";
import {PATH} from "../../../../utils/constants";

const Index = () => {
  const {background} = useContext(BackgroundContext);
  const navigate = useNavigate();
  const {isEmptyGrabbedUsers} = useSelector(getMessageSearchData);


  return (
    <BoxWrapper>
      <Box className='Title'>
        <Box onClick={() => navigate(background?.pathname || PATH.ROOT)}>
          <CustomIconButton name='Close'/>
        </Box>
        <Typography variant='h2'>New message</Typography>
      </Box>
      <Box
        onClick={() => next()}
        className={isEmptyGrabbedUsers && 'NextButtonWrapper'}>
        <CustomFabButton name='Next' disabled={isEmptyGrabbedUsers}/>
      </Box>
    </BoxWrapper>);
}

const styles = ({theme}) => ({
  marginBottom: 20,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 5,
  boxSizing: 'border-box',

  '& > .Title': {
    display: 'flex',
    alignItems: 'center',

    '& > .MuiTypography-root': {
      marginLeft: '15px',
      fontWeight: 600,
      fontSize: '1.5rem'
    }
  },

  '& .NextButtonWrapper .CustomFabButton': {
    backgroundColor: '#aaaaaa !important',
  },

  '& .CustomFabButton': {
    backgroundColor: '#000000',
    color: '#DBE7F0',
    height: '2.2rem',

    '&:hover': {
      backgroundColor: '#000000',
    },
  }

});

const BoxWrapper = styled(Box)(styles);

export default Index;
