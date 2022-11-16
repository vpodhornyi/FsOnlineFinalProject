import React from "react";
import {useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import CustomIconButton from "@components/buttons/CustomIconButton";
import {closeChatInfo} from "@redux/message/action";

const SectionNavigation = () => {
  const StyledBox = styled(Box)(styles);
  const dispatch = useDispatch();

  return (
    <StyledBox>
      <Box onClick={() => dispatch(closeChatInfo())}>
        <CustomIconButton name='ArrowBackOutlined' title='Back'/>
      </Box>
      <Typography variant='h2'>Conversation info</Typography>
    </StyledBox>);
}

const styles = ({theme}) => ({
  boxSizing: 'border-box',
  padding: '10px 14px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',

  '& .MuiTypography-root': {
    fontSize: '1.3rem',
    marginLeft: 20,
    fontWeight: theme.typography.fontWeightBold
  }
});

export default SectionNavigation;
