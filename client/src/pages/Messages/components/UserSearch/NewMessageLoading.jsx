import React from "react";
import {useSelector} from "react-redux";
import {styled} from "@mui/material/styles";
import LinearProgress from '@mui/material/LinearProgress';
import {getMessageSearchData} from '@redux/message/search/selector';

const NewMessageLoading = () => {
  const {isSearchUserLoading} = useSelector(getMessageSearchData);

  return (isSearchUserLoading ? <LinearProgressWrapper/> : <></>);
}

const styles = ({theme}) => ({
  height: 2,
});

const LinearProgressWrapper = styled(LinearProgress)(styles);

export default NewMessageLoading;
