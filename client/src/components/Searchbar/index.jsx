import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import SearchTextField from "../SearchTextField";
import {Search, Cancel} from "@mui/icons-material";
import {useDebouncedCallback} from "use-debounce";
import {useDispatch, useSelector} from "react-redux";
import {searchUser} from "../../redux/chat/action";
import {styled} from "@mui/material/styles";
import {Box, LinearProgress} from "@mui/material";
import FoundUser from "../../pages/Search/components/FoundUser";
import PropTypes from "prop-types";
import {ACTIONS} from "@redux/search/action";
import {getFoundUsers} from "@redux/search/selector";

export const Searchbar = ({isExplore}) => {
    const dispatch = useDispatch();
    const search = useSelector(getFoundUsers);
    const [text, setText] = useState(search.searchValue);
    const [foundedUsers, setFoundedUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const showClearSearch = text.length > 0;
    const showUsers = foundedUsers.length > 0;
    const debounced = useDebouncedCallback(async text => {
        if (text.trim() !== '') {
            setLoading(true);
            const users = await dispatch(searchUser({text}));
            setFoundedUsers(users);
            setLoading(false);
        } else {
            setFoundedUsers([]);
        }
    }, 500);
    const handleClickSearch = (event) => {
        event.preventDefault();
        dispatch(ACTIONS.setFoundUsers(foundedUsers));
        dispatch(ACTIONS.addSearchValue(text));
        navigate("/searchPage");
    };

    const handleClearSearch = () => {
        setText('');
        setFoundedUsers([]);
        dispatch(ACTIONS.clearSearch());
    }

    const onInputChange = (e) => {
        setText(() => e.target.value);
        setShowModal(false);
        debounced(e.target.value);
    }

    const onInputFocus = () => {
        setShowModal(true);
    }
    return (
        <>
            <BoxWrapper>
                <form onSubmit={handleClickSearch} style={{width: '100%'}}>
                    <SearchTextField onFocus={onInputFocus} variant="outlined" margin="normal"
                                     placeholder="Search Twitter"
                                     fullWidth value={text}
                                     onChange={onInputChange}
                                     InputProps={{
                                         startAdornment: <Search className='SearchIcon' style={{marginRight: '10px'}}/>,
                                         endAdornment: showClearSearch &&
                                             <Cancel className='CancelButton' onClick={handleClearSearch}/>,
                                     }}
                    />
                </form>
                <Box sx={{height: 2}}>
                    {loading && <LinearProgress color='primary' sx={{height: 2}}/>}
                </Box>
                {
                    showUsers && !isExplore &&
                        <Box className='FoundUsersBox'>
                            {
                                foundedUsers.map(user => <FoundUser key={user?.key} user={user} onClick={() => navigate(`/${user.userTag}`)}/>)
                            }
                    </Box>
                }
            </BoxWrapper>
        </>
    );
};

const BoxWrapper = styled(Box)(({theme}) => ({
    width: '100%',
    height: '60%',

    '& .FoundUsersBox': {
        top: "60px",
        zIndex: 2,
        position: "absolute",
        width: '100%',
        display: 'block',
        background: theme.palette.background.main,
        borderRadius: '8px',
        boxShadow: 'rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px',
    },

    '& .CancelButton': {
        cursor: 'pointer',
    },
    '& .SearchIcon': {
        fill: theme.palette.grey[600],
    },
    [theme.breakpoints.up('sm')]: {
        borderRadius: '16px',
        minHeight: '100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    }
}));

Searchbar.propTypes = {
    isExplore: PropTypes.bool
}