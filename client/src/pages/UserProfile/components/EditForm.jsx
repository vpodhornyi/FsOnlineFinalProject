import React, {useRef, useState} from 'react';

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
import axios from "axios";
import {getPersonalData} from "../../../redux/auth/selector";

const EditForm = () => {
    const dispatch = useDispatch();

    const backgroundFileUpload = useRef(null);
    const iconFileUpload = useRef(null);
    const handleBackgroundClick = e => backgroundFileUpload.current.click();
    const handleIconClick = e => iconFileUpload.current.click();
    const authUser = useSelector(getPersonalData);

    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [location, setLocation] = useState("");
    const [backgroundFile, setBackgroundFile] = useState("");
    const [backgroundPreviewUrl, setBackgroundPreviewUrl] = useState("");
    const [iconFile, setIconFile] = useState("");
    const [iconUrl, setIconUrl] = useState("");
    const [month, setMonth] = useState("");
    const [day, setDay] = useState(0);
    const [year, setYear] = useState(0);

    const handleMonthChange = e => setMonth(e.target.value);
    const handleDayChange = e => setDay(+e.target.value);
    const handleYearChange = e => setYear(+e.target.value);
    const handleNameChange = e => setName(e.target.value);
    const handleBioChange = e => setBio(e.target.value);
    const handleLocationChange = e => setLocation(e.target.value);

    const handleSaveClick = async () => {
        if (backgroundFile instanceof Object) {
            const formData = new FormData();
            formData.append("upload", backgroundFile);
            formData.append("userId", String(authUser.id));
            formData.append("uploadType", "UPDATE_PROFILE_HEADER");
            await axios.post(`${process.env.REACT_APP_DEV_API_URL}cloud/image`, formData);
        }

        if (iconFile instanceof Object) {
            const formData = new FormData();
            formData.append("upload", iconFile);
            formData.append("userId", String(authUser.id));
            formData.append("uploadType", "UPDATE_PROFILE_AVATAR");
            await axios.post(`${process.env.REACT_APP_DEV_API_URL}cloud/image`, formData);
        }

        await axios.put(`${process.env.REACT_APP_DEV_API_URL}users/${authUser?.id}`, {
            name,
            bio,
            location,
            birth: `${day}.${month}.${year}`,
        });

        dispatch(closeDialog());
    }

    const handleRemoveBackground = e => {
        setBackgroundPreviewUrl("");
        setBackgroundFile("");
    }

    const handleBackgroundChange = e => {
        e.preventDefault();

        const reader = new FileReader();
        const file = e.target.files[0];

        reader.onloadend = () => {
            setBackgroundFile(file);
            setBackgroundPreviewUrl(reader.result);
        }

        reader.readAsDataURL(file);
    }

    const handleIconChange = e => {
        e.preventDefault();

        const reader = new FileReader();
        const file = e.target.files[0];

        reader.onloadend = () => {
            setIconFile(file);
            setIconUrl(reader.result);
        }

        reader.readAsDataURL(file);
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
                    <UserBackground imageUrl={backgroundPreviewUrl} styles={{
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
                            ref={backgroundFileUpload}
                            onChange={handleBackgroundChange}
                        />
                        <Tooltip sx={{backgroundColor: "rgba(63, 67, 71, 0.75)"}} title="Add photo">
                            <IconButton
                                onClick={handleBackgroundClick}
                            >
                                <LinkedCameraOutlinedIcon sx={{color: "white"}}/>
                            </IconButton>
                        </Tooltip>
                        {
                            backgroundPreviewUrl ?
                                <Tooltip sx={{backgroundColor: "rgba(63, 67, 71, 0.75)"}} title="Remove photo">
                                    <IconButton onClick={handleRemoveBackground}>
                                        <CancelOutlinedIcon sx={{color: "white"}}/>
                                    </IconButton>
                                </Tooltip> : <></>
                        }
                    </UserBackground>
                    <Box sx={{padding: "0 10px", margin: "-8% 0 0 0", display: "inline-block"}}>
                        <UserIcon src={iconUrl ? iconUrl : ""} width={85} height={85} iconLetter={""}>
                            <input
                                type="file"
                                accept="image/*"
                                style={{display: 'none'}}
                                ref={iconFileUpload}
                                onChange={handleIconChange}
                            />
                            <Tooltip sx={{backgroundColor: "rgba(63, 67, 71, 0.75)"}} title="Add photo">
                                <IconButton onClick={handleIconClick}>
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