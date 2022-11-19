import React from "react";
import {useSelector} from "react-redux";
import {styled} from "@mui/material/styles";
import LinearProgress from '@mui/material/LinearProgress';
import {getMessageData} from '@redux/message/selector';

const NewMessageLoading = () => {
  const {searchUserLoading} = useSelector(getMessageData);

  return (searchUserLoading ? <LinearProgressWrapper/> : <></>);
}

const styles = ({theme}) => ({
  height: 2,
});

const LinearProgressWrapper = styled(LinearProgress)(styles);

export default NewMessageLoading;
