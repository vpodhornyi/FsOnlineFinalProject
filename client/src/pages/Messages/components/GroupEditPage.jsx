import React, {useContext, useState, useRef, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {styled} from "@mui/material/styles";
import {Avatar, Box, TextField, Typography, Fab} from "@mui/material";
import PropTypes from "prop-types";

import {BackgroundContext} from "../../../utils/context";
import {ModalPage, CustomIconButton, FollowButton, IconByName, CircularLoader} from "../../../components";
import {getChatsData} from '@redux/chat/selector';
import {editGroupChat} from '@redux/chat/action';
import {PATH} from '@utils/constants';

const GroupEditPage = () => {
  const {background} = useContext(BackgroundContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {selectedChat: chat} = useSelector(getChatsData);
  const [name, setName] = useState(chat.title);
  const [disabled, setDisabled] = useState(true);
  const [imageUrl, setImageUrl] = useState('');
  const [loader, setLoader] = useState(false);
  const [file, setFile] = useState(null);
  const inputFileRef = useRef();

  useEffect(() => {
    setImageUrl(chat?.avatarImgUrl);
  }, [])

  const onChangeName = e => {
    setName(() => e.target.value);
    const text = e.target.value.trim();
    setDisabled(text === chat.title || text === '');
  }

  const handleFileUploader = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file));
      setFile(file);
      setDisabled(false);
    }
  }

  const save = async () => {
    if (!disabled) {
      setLoader(true);
      const formData = new FormData();
      formData.append('uploadFile', file);
      formData.append('name', name);
      formData.append('chatId', chat.id);
      await dispatch(editGroupChat(formData));
      setLoader(false);
      navigate(background?.pathname || PATH.ROOT);
    }
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
          <CustomIconButton name='Close' color='text'/>
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
          onChange={e => onChangeName(e)}
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
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.main,
  height: '100%',

  [theme.breakpoints.up('sm')]: {
    width: 600,
    maxWidth: '80vw',
    minWidth: '600px',
    borderRadius: '16px',
  },

  '& > .EditHeader': {
    width: '100%',
    padding: '0 15px 0 5px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  '& > .AddPhoto': {
    position: 'relative',
    borderTop: `1px solid ${theme.palette.border.main}`,
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

    '& .MuiInputBase-input': {
      color: theme.palette.text.main,
    }
  }
}));

export default Foo;
