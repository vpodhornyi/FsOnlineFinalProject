import React, {useEffect, useRef, useState} from 'react';

import {closeDialog} from "../../../redux/dialog/action";
import {useDispatch, useSelector} from "react-redux";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import DateOfBirth from "../../Auth/components/DateOfBirth";
import {StyledDarkButton} from "../../../components/StyledComponents/styledComponents";
import UserBackground from "./UserBackground";
import UserIcon from "./UserIcon";
import LinkedCameraOutlinedIcon from '@mui/icons-material/LinkedCameraOutlined';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import {getPersonalData} from "../../../redux/auth/selector";
import {getAuthUser} from "../../../redux/auth/action";
import {uploadImage} from "../../../utils/uploadImage";
import {Backdrop, CircularProgress} from "@mui/material";
import {updateUser} from "../../../services/userApi";

const EditForm = () => {
    const dispatch = useDispatch();

    const headerFileUpload = useRef(null);
    const avatarFileUpload = useRef(null);
    const handleHeaderFileClick = () => headerFileUpload.current.click();
    const handleAvatarFileClick = () => avatarFileUpload.current.click();
    const authUser = useSelector(getPersonalData);

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState(authUser?.name || "");
    const [bio, setBio] = useState(authUser?.bio ||"");
    const [location, setLocation] = useState(authUser?.location || "");
    const [headerFile, setHeaderFile] = useState("");
    const [headerLocalUrl, setHeaderLocalUrl] = useState(authUser?.headerImgUrl || "");
    const [avatarFile, setAvatarFile] = useState("");
    const [avatarLocalUrl, setAvatarLocalUrl] = useState("");
    const [month, setMonth] = useState(authUser.birthDate ? authUser.birthDate.substring(3, 5) : "");
    const [day, setDay] = useState(authUser.birthDate ? authUser.birthDate.substring(0, 2) : "");
    const [year, setYear] = useState(authUser.birthDate ? authUser.birthDate.substring(6, 10) : "");

    const handleMonthChange = e => setMonth(e.target.value);
    const handleDayChange = e => setDay(e.target.value);
    const handleYearChange = e => setYear(e.target.value);
    const handleNameChange = e => setName(e.target.value);
    const handleBioChange = e => setBio(e.target.value);
    const handleLocationChange = e => setLocation(e.target.value);

    const handleSaveClick = async () => {
        setLoading(true);

        if (headerFile instanceof Object) {
            await uploadImage(headerFile, authUser.id, "UPDATE_PROFILE_HEADER")
        }

        if (avatarFile instanceof Object) {
            await uploadImage(avatarFile, authUser.id, "UPDATE_PROFILE_AVATAR")
        }

        await updateUser(
            authUser?.id,
            {
                name,
                bio,
                location,
                birth: `${day}.${month}.${year}`
            }
        );

        if (authUser?.headerImgUrl !== null && authUser.headerImgUrl.length > 0 && headerFile === "") {
            await updateUser(authUser?.id, {headerImgUrl: ""});
        }

        dispatch(getAuthUser(authUser?.id));
        dispatch(closeDialog());
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

    return (
        <div>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <IconButton aria-label="close" sx={{
                    position: 'absolute',
                    top: "13px",
                    left: "5px",
                }}
                            onClick={() => dispatch(closeDialog())}>
                    <CloseIcon/>
                </IconButton>

                <DialogTitle sx={{padding: "15px 0 15px 40px"}}>Edit profile</DialogTitle>

                <Box sx={{padding: "5px"}}>
                    <StyledDarkButton onClick={handleSaveClick}>Save</StyledDarkButton>
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

                    <Grid sx={{padding: "20px", width: "500px"}}>
                        <Grid item xs={12} sx={{padding: '10px 0'}}>
                            <TextField
                                value={name}
                                sx={{width: '100%'}}
                                id="name"
                                label="Name"
                                variant="outlined"
                                onChange={handleNameChange}
                            />
                        </Grid>
                        <Grid item sx={{padding: '10px 0'}}>
                            <TextField
                                value={bio}
                                id="bio"
                                sx={{width: '100%'}}
                                label="Bio"
                                variant="outlined"
                                onChange={handleBioChange}
                            />
                        </Grid>
                        <Grid item sx={{padding: '10px 0'}}>
                            <TextField
                                value={location}
                                id="location"
                                sx={{width: '100%'}}
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
        </div>
    );
};

export default EditForm;