import React, {useContext, useState, useRef, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {styled} from "@mui/material/styles";
import {Avatar, Box, TextField, Typography} from "@mui/material";
import PropTypes from "prop-types";

import {BackgroundContext} from "../../../utils/context";
import {ModalPage, CustomIconButton, FollowButton, IconByName, CircularLoader} from "../../../components";
import {getChatsData} from '@redux/chat/selector';
import {editGroupChat} from '@redux/chat/action';
import Fab from "@mui/material/Fab";

const GroupEditPage = () => {
  const {background} = useContext(BackgroundContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {selectedChat: chat} = useSelector(getChatsData);
  const [name, setName] = useState(chat.title);
  const [disabled, setDisabled] = useState(true);
  const [imageUrl, setImageUrl] = useState('');
  const [loader, setLoader] = useState(false);
  const inputFileRef = useRef();

  useEffect(() => {
    setImageUrl(chat?.avatarImgUrl);
  }, [])

  const onChangeLogin = e => {
    setName(() => e.target.value);
    const text = e.target.value.trim();
    setDisabled(text === chat.title || text === '');
  }

  const handleFileUploader = (event) => {
    if (event.target.files[0]) {
      setImageUrl(URL.createObjectURL(event.target.files[0]));
      setDisabled(false);
    }
  }

  const save = async () => {
    setLoader(true);
    await dispatch(editGroupChat());
    setLoader(false);
    navigate(background?.pathname || PATH.ROOT);
  }

  return (
    <BoxWrapper>
      <Box className='EditHeader'>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={() => navigate(background?.pathname || PATH.ROOT)}>
          <CustomIconButton name='Close'/>
          <Typography sx={{ml: 2}} fontWeight='fontWeightBold' fontSize='1.5rem' variant='h2'>Edit</Typography>
        </Box>
        <Box onClick={save}>
          <FollowButton name='Save' disabled={disabled}/>
        </Box>
      </Box>
      <Box className='AddPhoto'>
        {loader && <CircularLoader/>}
        <Avatar sx={{width: '6rem', height: '6rem'}} src={imageUrl}/>
        <Fab className='AddPhotoButton' onClick={() => inputFileRef.current.click()}>
          <input
            ref={inputFileRef}
            type="file"
            multiple
            hidden
            id="file-upload"
            onChange={handleFileUploader}
          />
          <IconByName iconStyle={{fontSize: '1.3rem'}} iconName='AddAPhotoOutlined'/>
        </Fab>
      </Box>
      <Box className='GroupNameFieldWrapper'>
        <TextField
          color='primary'
          sx={{width: '100%'}}
          onChange={e => onChangeLogin(e)}
          value={name}
          id="email"
          label="Group name"
          variant="outlined"/>
      </Box>
    </BoxWrapper>
  );
}

const Foo = () => <ModalPage element={<GroupEditPage/>}/>;

const BoxWrapper = styled(Box)(({theme}) => ({
  maxWidth: '80vw',
  minWidth: '600px',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#ffffff',
  borderRadius: '16px',

  '& > .EditHeader': {
    width: '100%',
    padding: '0 15px 0 5px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  '& > .AddPhoto': {
    position: 'relative',
    borderTop: '1px solid rgb(239, 243, 244)',
    padding: '19px 15px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '& .AddPhotoButton': {
      position: 'absolute',
      textTransform: 'none',
      boxShadow: 'none',
      color: 'rgb(255, 255, 255)',
      backgroundColor: 'rgba(15, 20, 25, 0.75)',
      height: '3rem',
      width: '3rem',

      '&:active': {
        boxShadow: 'none',
      },

      '&:hover': {
        backgroundColor: 'rgba(39, 44, 48, 0.75)',
      },

      '& .MuiTouchRipple-root': {
        display: 'none'
      },
    }
  },

  '& > .GroupNameFieldWrapper': {
    width: '100%',
    padding: '11px 15px',
  }

}));

export default Foo;
