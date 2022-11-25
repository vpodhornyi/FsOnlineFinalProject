import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import CustomIconButton from "@components/buttons/CustomIconButton";
import {ACTIONS as MESSAGE_ACTIONS} from "@redux/message/action";
import { getMessageData} from "@redux/message/selector";
import {StickyHeader} from '../../../../components';
import {useNavigate} from "react-router-dom";

const SectionNavigation = () => {
  const navigate = useNavigate();
  const {activeId} = useSelector(getMessageData);

  return (
    <StyledStickyHeader>
      <Box onClick={() => navigate(-1)}>
        <CustomIconButton name='ArrowBackOutlined' title='Back'/>
      </Box>
      <Typography variant='h2'>Conversation info</Typography>
    </StyledStickyHeader>);
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

const StyledStickyHeader = styled(StickyHeader)(styles);

export default SectionNavigation;
