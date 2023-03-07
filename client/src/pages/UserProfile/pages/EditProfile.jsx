import React, {useContext, useEffect, useRef, useState} from 'react';

import {useDispatch, useSelector} from "react-redux";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import DateOfBirth from "../../Auth/components/DateOfBirth";
import {ThemeButtonDark} from "./styledComponents";
import UserBackground from "../components/UserBackground";
import UserIcon from "../components/UserIcon";
import LinkedCameraOutlinedIcon from '@mui/icons-material/LinkedCameraOutlined';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import {getCustomizationTheme, getPersonalData} from "../../../redux/user/selector";
import {getAuthUser} from "../../../redux/user/action";
import {uploadImage, uploadTypes} from "../../../utils/uploadImage";
import {Backdrop, CircularProgress} from "@mui/material";
import {updateUser} from "../../../services/userApi";
import {useNavigate} from "react-router-dom";
import {BackgroundContext} from "../../../utils/context";
import {ModalPage} from "../../../components";
import {PATH} from "../../../utils/constants";
import {styled} from "@mui/material/styles";
import {BACKGROUND, COLOR} from "../../../utils/theme";

const EditProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {background} = useContext(BackgroundContext);
    const {backgroundColor, color} = useSelector(getCustomizationTheme);

    const themeTextColor = BACKGROUND[backgroundColor]?.palette.textColor;
    const headerFileUpload = useRef(null);
    const avatarFileUpload = useRef(null);
    const handleHeaderFileClick = () => headerFileUpload.current.click();
    const handleAvatarFileClick = () => avatarFileUpload.current.click();
    const authUser = useSelector(getPersonalData);

    const initialState = {
        name: authUser?.name || "",
        bio: authUser?.bio ||"",
        location: authUser?.location || "",
        headerFile: "",
        headerLocalUrl: authUser?.headerImgUrl || "",
        avatarFile: "",
        avatarLocalUrl: "",
        month: authUser.birthDate ? authUser.birthDate.substring(5, 7) : "",
        day: authUser.birthDate ? authUser.birthDate.substring(8, 10) : "",
        year: authUser.birthDate ? authUser.birthDate.substring(0, 4) : ""
    }

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState(initialState.name);
    const [bio, setBio] = useState(initialState.bio);
    const [location, setLocation] = useState(initialState.location);
    const [headerFile, setHeaderFile] = useState(initialState.headerFile);
    const [headerLocalUrl, setHeaderLocalUrl] = useState(initialState.headerLocalUrl);
    const [avatarFile, setAvatarFile] = useState(initialState.avatarFile);
    const [avatarLocalUrl, setAvatarLocalUrl] = useState(initialState.avatarLocalUrl);
    const [month, setMonth] = useState(initialState.month);
    const [day, setDay] = useState(initialState.day);
    const [year, setYear] = useState(initialState.year);

    const currentState = {
        name,
        bio,
        location,
        headerFile,
        headerLocalUrl,
        avatarFile,
        avatarLocalUrl,
        month,
        day,
        year
    }

    const handleMonthChange = e => setMonth(e.target.value);
    const handleDayChange = e => setDay(e.target.value);
    const handleYearChange = e => setYear(e.target.value);
    const handleNameChange = e => setName(e.target.value);
    const handleBioChange = e => setBio(e.target.value);
    const handleLocationChange = e => setLocation(e.target.value);

    const handleSaveClick = async () => {
        setLoading(true);

        if (headerFile instanceof Object) {
            await uploadImage(headerFile, authUser.id, uploadTypes.UPDATE_PROFILE_HEADER)
        }

        if (avatarFile instanceof Object) {
            await uploadImage(avatarFile, authUser.id, uploadTypes.UPDATE_PROFILE_AVATAR)
        }

        await updateUser(
            authUser?.id,
            {
                name,
                bio,
                location,
                birth: `${year}-${month}-${day}`
            }
        );

        if (authUser?.headerImgUrl !== null && authUser.headerImgUrl.length > 0 && headerFile === "" && headerLocalUrl.length == 0) {
            await updateUser(authUser?.id, {headerImgUrl: ""});
        }
        dispatch(getAuthUser());
    }

    useEffect(() => {
        setLoading(false);
    }, [authUser]);

    const handleRemoveHeader = () => {
        setHeaderLocalUrl("");
        setHeaderFile("");
    }

    const handleHeaderChange = e => {
        e.preventDefault();

        const reader = new FileReader();
        const file = e.target.files[0];

        reader.onloadend = () => {
            setHeaderFile(file);
            setHeaderLocalUrl(reader.result);
        }

        reader.readAsDataURL(file);
    }

    const handleAvatarChange = e => {
        e.preventDefault();

        const reader = new FileReader();
        const file = e.target.files[0];

        reader.onloadend = () => {
            setAvatarFile(file);
            setAvatarLocalUrl(reader.result);
        }

        reader.readAsDataURL(file);
    }

    if (loading) {
        return (
            <Backdrop
                sx={{ color: '#fff', width: "100vw", zIndex: 100 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }

    const inputStyles = {
        '& .MuiOutlinedInput-root': {
            color: themeTextColor,
            '& fieldset': {
                borderColor: themeTextColor,
                color: themeTextColor
            },
            '&:hover fieldset': {
                borderColor: COLOR[color]?.primary.main,
            },
        },
        "& .MuiFormHelperText-root": {
            color: themeTextColor
        }
    }

    return (
        <ModalPage
            element={
                <BoxWrapper>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <IconButton aria-label="close"
                                    onClick={() => navigate(background?.pathname || PATH.ROOT)}>
                            <CloseIcon sx={{color: themeTextColor}}/>
                        </IconButton>

                        <DialogTitle sx={{padding: "15px 0 15px 40px", color: themeTextColor}}>Edit profile</DialogTitle>

                        <Box sx={{padding: "5px"}}>
                            <ThemeButtonDark
                            disabled={
                                name.length < 3 ||
                                name.length > 50 ||
                                location.length > 30 ||
                                bio.length > 160 ||
                                (JSON.stringify(initialState) === JSON.stringify(currentState))
                            }
                            onClick={() => {
                                handleSaveClick()
                                navigate(-1)
                            }}>Save</ThemeButtonDark>
                        </Box>
                    </Box>
                    <Box sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}>
                        <DialogContent sx={{padding: 0}}>
                            <UserBackground imageUrl={headerLocalUrl} styles={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "200px"
                            }}
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    style={{display: 'none'}}
                                    ref={headerFileUpload}
                                    onChange={handleHeaderChange}
                                />
                                <Tooltip sx={{backgroundColor: "rgba(63, 67, 71, 0.75)"}} title="Add photo">
                                    <IconButton
                                        onClick={handleHeaderFileClick}
                                    >
                                        <LinkedCameraOutlinedIcon sx={{color: "white"}}/>
                                    </IconButton>
                                </Tooltip>
                                {
                                    headerLocalUrl ?
                                        <Tooltip sx={{backgroundColor: "rgba(63, 67, 71, 0.75)"}} title="Remove photo">
                                            <IconButton onClick={handleRemoveHeader}>
                                                <CancelOutlinedIcon sx={{color: "white"}}/>
                                            </IconButton>
                                        </Tooltip> : <></>
                                }
                            </UserBackground>
                            <Box sx={{padding: "0 10px", margin: "-8% 0 0 0", display: "inline-block"}}>
                                <UserIcon src={avatarLocalUrl || authUser?.avatarImgUrl} width={85} height={85} iconLetter={""}>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        style={{display: 'none'}}
                                        ref={avatarFileUpload}
                                        onChange={handleAvatarChange}
                                    />
                                    <Tooltip sx={{backgroundColor: "rgba(63, 67, 71, 0.75)"}} title="Add photo">
                                        <IconButton onClick={handleAvatarFileClick}>
                                            <LinkedCameraOutlinedIcon sx={{color: "white"}}/>
                                        </IconButton>
                                    </Tooltip>
                                </UserIcon>
                            </Box>

                            <Grid sx={{padding: "20px"}}>
                                <Grid item xs={12} sx={{padding: '10px 0'}}>
                                    <TextField
                                        sx={inputStyles}
                                        error={name.length < 3 || name.length > 50}
                                        helperText={(name.length < 3 || name.length > 50) ? `${name.length} / 50. Name must includes from 3 to 50 symbols!` : `${name.length} / 50`}
                                        value={name}
                                        fullWidth
                                        id="name"
                                        label="Name"
                                        variant="outlined"
                                        onChange={handleNameChange}
                                    />
                                </Grid>
                                <Grid item sx={{padding: '10px 0'}}>
                                    <TextField
                                        sx={inputStyles}
                                        error={bio.length > 160}
                                        helperText={bio.length > 160 ? `${bio.length} / 160. Bio must includes max to 160 symbols!` : `${bio.length} / 160`}
                                        value={bio}
                                        id="bio"
                                        fullWidth
                                        label="Bio"
                                        variant="outlined"
                                        onChange={handleBioChange}
                                    />
                                </Grid>
                                <Grid item sx={{padding: '10px 0'}}>
                                    <TextField
                                        sx={inputStyles}
                                        error={location.length > 30}
                                        helperText={location.length > 30 ? `${location.length} / 30. Location must includes max to 30 symbols!` : `${location.length} / 30`}
                                        value={location}
                                        id="location"
                                        fullWidth
                                        label="Location"
                                        variant="outlined"
                                        onChange={handleLocationChange}
                                    />
                                </Grid>
                                <DateOfBirth
                                    month={month}
                                    setMonth={handleMonthChange}
                                    day={day}
                                    setDay={handleDayChange}
                                    year={year}
                                    setYear={handleYearChange}
                                />
                            </Grid>
                        </DialogContent>
                    </Box>
                </BoxWrapper>

            }
        />
    );
};

const BoxWrapper = styled(Box)(({theme}) => ({
    width: '100%',
    height: '90%',
    backgroundColor: theme.palette.background.main,
    padding: '0 0',
    position: 'relative',
    zIndex: "10",

    [theme.breakpoints.up('sm')]: {
        width: '600px',
        borderRadius: 16,
    },
}));

export default EditProfile;