import React from "react";
import {useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box, Chip, Typography} from "@mui/material";
import CustomIconButton from "@components/buttons/CustomIconButton";
import {closeDialog} from "@redux/dialog/action";

const Index = () => {
  const BoxWrapper = styled(Box)(styles);
  const dispatch = useDispatch();

  return (
    <BoxWrapper>
      <Box className='Title'>
        <Box onClick={() => dispatch(closeDialog())}>
          <CustomIconButton name='Close'/>
        </Box>
        <Typography variant='h2'>New message</Typography>
      </Box>
      <Box>
        <Chip label="Next"/>
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
  }

});

export default Index;
