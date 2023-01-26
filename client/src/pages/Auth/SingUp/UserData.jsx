import React, {useContext, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Typography, TextField, Stack, Box} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import {styled} from "@mui/material/styles";

import {Container, ButtonWrapper} from "../components";
import {CustomFabButton} from "../../../components";
import {BackgroundContext} from "../../../utils/context";
import {runSingUpSecondStep} from "@redux/auth/action";
import {ACTIONS} from '@redux/auth/action';

const UserData = () => {
  const newUser = useSelector(state => state.auth.newUser)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {background} = useContext(BackgroundContext);
  const [name, setName] = useState(newUser.name);
  const [email, setEmail] = useState(newUser.email);
  const [birthDate, setBirthDate] = useState(newUser.birthDate);
  const [password, setPassword] = useState(newUser.password);
  const [showPassword, setShowPassword] = useState(false);

  const onChangeLogin = e => {
    setName(() => e.target.value);
  };
  const onChangeEmail = e => {
    setEmail(() => e.target.value);
  };
  const onChangeDate = e => {
    setBirthDate(() => e.target.value);
  };

  const onChangePassword = e => {
    setPassword(() => e.target.value);
  };

  const submit = () => {
    dispatch(
        runSingUpSecondStep({
          name,
          email,
          password,
          birthDate,
          navigate,
          background
        })
    );
  };

  const handleClickShowPassword = () => setShowPassword(show => !show);

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  return (
      <Container sx={{justifyContent: "space-between", height: "100%"}}>
        <Box>
          <Typography className='StepTitle' variant='h1'>
            Create your account
          </Typography>
          <Stack spacing={5}>
            <TextField
                value={name}
                onChange={e => onChangeLogin(e)}
                sx={{width: "100%"}}
                label='Name'
                variant='outlined'
            />
            <TextField
                value={email}
                onChange={e => onChangeEmail(e)}
                sx={{width: "100%"}}
                label='Email'
                variant='outlined'
            />
            <FormControl sx={{m: 1, width: "100%"}} variant='outlined'>
              <InputLabel htmlFor='outlined-adornment-password'>
                Password
              </InputLabel>
              <OutlinedInput
                  id='standard-adornment-password'
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => onChangePassword(e)}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                      </IconButton>
                    </InputAdornment>
                  }
              />
            </FormControl>
            <DateWrapper>
              <Typography className='title' variant='body1'>
                Date of birth
              </Typography>
              <Typography className='article' variant='body1'>
                This will not be shown publicly. Confirm your own age, even if
                this account is for a business, a pet, or something else.
              </Typography>
              <TextField
                  value={birthDate}
                  onChange={e => onChangeDate(e)}
                  label='Birthday'
                  type='date'
                  sx={{width: "100%"}}
                  InputLabelProps={{
                    shrink: true
                  }}
              />
            </DateWrapper>
          </Stack>
        </Box>
        <ButtonWrapperStyled>
          <CustomFabButton
              className='NextStepBtn'
              disabled={
                  name === "" || email === "" || password === "" || birthDate === ""
              }
              onClick={() => submit()}
              name='Next'
          />
        </ButtonWrapperStyled>
      </Container>
  );
};

const DateWrapper = styled(Box)(({theme}) => ({
  "& .title": {
    marginBottom: 5,
    fontSize: "1rem",
    fontWeight: theme.typography.fontWeightBold
  },

  "& .article": {
    marginBottom: 20,
    fontSize: "0.9rem"
  }
}));

const ButtonWrapperStyled = styled(ButtonWrapper)(({theme}) => ({
  marginBottom: 20,

  "& .MuiFab-root": {
    height: "3rem"
  },

  "& .MuiFab-root.Mui-disabled": {
    backgroundColor: "#878a8c"
  }
}));

export default UserData;
