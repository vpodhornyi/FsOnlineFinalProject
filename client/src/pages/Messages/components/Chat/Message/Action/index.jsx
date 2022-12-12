import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import CustomIconButton from "@components/buttons/CustomIconButton";
import More from "./More";

const Index = () => {
  const dispatch = useDispatch();

  return (
    <BoxWrapper className='Actions'>
      <Box>
        <CustomIconButton color='greyAccent' name='FavoriteBorderOutlined' title='React' size='small' iconSize='small'/>
      </Box>
      <More/>
    </BoxWrapper>);
}

const BoxWrapper = styled(Box)(({theme}) => ({
  display: 'flex',
  opacity: 0,
}));

export default Index;
