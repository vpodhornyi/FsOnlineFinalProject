import Box from "@mui/material/Box";
import React, { forwardRef } from "react";
import {Link, List, ListItem, ListItemIcon, ListItemText, Tooltip, Typography,} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import {ICONS} from "./tweetData";
import PropTypes from "prop-types";
import {MoreIcon, RetweetIcon} from "../../../media/icons";
import Reply from "../Reply";
import {
    AvatarDecorate,
    AvatarWrapper,
    Content,
    IconBlue,
    PostInfo,
    TweetContainer,
    UserAvatar,
    UserName,
} from "./style";
import { useDispatch, useSelector } from "react-redux";
import ImageListContainer from "../../imageList/ImageListContainer";
import {changeActionsTweet, changeBookmark,} from "../../../redux/tweet/action";
import {useLocation, useNavigate} from "react-router-dom";
import {PATH} from "../../../utils/constants";
import {getPersonalData} from "../../../redux/user/selector";
const Tweet = forwardRef((props, ref) => {
    const dispatch = useDispatch();
    const {tweetInfo, styles}=props;
    const {id, body, images, actions, replyCounter, retweetFollowedName} = tweetInfo;
    const {name, avatarImgUrl, userTag, created_at} = tweetInfo.user;
    const user = useSelector(getPersonalData);
    const navigate = useNavigate();
    const location = useLocation();
    const changeAction = (action) => dispatch(
        changeActionsTweet({actionType: action, tweetId: id})
    );
    const actionsObj = {
        "LIKE": {
            counter: 0, color: "#f91880", handler: () => changeAction("LIKE"),
            userBol: false
        },
        "RETWEET": {
            counter: 0, color: "#00ba7c", handler: () => changeAction("RETWEET"),
            userBol: false
        },
        "BOOKMARK": {
            counter: 0, color: "#1d9bf0", handler: () => changeAction("BOOKMARK"),
            userBol: false
        },
        "REPLY": {
            color: "#1d9bf0", handler: () => navigate(PATH.TWEET.ROOT + `/reply/${id}`, {
                state: {background: location},
            }),
            userBol: false
        }
    }
    actions?.forEach(
        (action) => {
            actionsObj[action.actionType].counter += 1
            if (user.id === action.user.id) {
                actionsObj[action.actionType].userBol = true;
            }
        }
    );

    return (
        <>
            <TweetContainer
                ref={ref}
                sx={styles}
                onClick={() => {
                    navigate(PATH.HOME.tweetPage(id));
                }}
            >
                {retweetFollowedName!==""&&<Typography sx={{
                    display: "flex",
                    alignItems: "center",
                }}><RetweetIcon sx={{
                    width: "16px",
                    height: "16px",
                    display: "inline-block",
                    marginRight: "5px"
                }}></RetweetIcon>{retweetFollowedName}</Typography>}
                <Content>
                    <Box sx={{display: "flex"}}>
                        <AvatarWrapper>
                            <UserAvatar alt={name} src={avatarImgUrl}></UserAvatar>
                            <AvatarDecorate variant={"span"}></AvatarDecorate>
                        </AvatarWrapper>
                        <Box>
                            <Box sx={{marginLeft: 0.688}}>
                                <PostInfo>
                                    <UserName variant="h2" underline={"hover"}>
                                        {name}
                                    </UserName>
                                    <VerifiedIcon
                                        sx={{w: 18, h: 18, color: "#1d9bf0", margin: "0 0.125"}}
                                    />
                                    <Typography variant="h4" sx={{font: "inherit"}}>
                                        {userTag}
                                    </Typography>
                                    <Link
                                        variant="h4"
                                        sx={{font: "inherit", color: "inherit"}}
                                        underline={"hover"}
                                    >
                                        {created_at}
                                    </Link>
                                </PostInfo>
                                <Typography
                                    sx={{
                                        wordWrap: "break-word",
                                        maxWidth: "480px",
                                        display: "block",
                                    }}
                                    variant="p"
                                >
                                    {body}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>{" "}
                    <IconBlue>
                        <Tooltip title={"Delete"}>
                            <MoreIcon
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(PATH.TWEET.ROOT + `/${id}`, {
                                        state: {background: location},
                                    });
                                }}
                                sx={{padding: 1}}
                            />
                        </Tooltip>{" "}
                    </IconBlue>
                </Content>
                {images.length > 0 && <ImageListContainer photos={images}/>}
                <List
                    component="ul"
                    disablePadding
                    sx={{display: "flex", justifyContent: "space-around"}}
                >
                    {ICONS?.map((itemData, index) => {
                        const currentActive = actionsObj[itemData.tooltip.toUpperCase()]
                        const mediaStyle = {
                            ["@media (max-width:700px)"]: {
                                p: 0,
                            },
                        };
                        const chooseIconHandler = (e) => {
                            e.stopPropagation();
                            currentActive.handler();
                        };
                        const activeColor = currentActive.userBol && currentActive.color
                        return (
                            <ListItem
                                key={index}
                                sx={{
                                    ...mediaStyle,
                                    ...itemData.itemClassName,
                                    color: activeColor,
                                    "& span": {
                                        color: activeColor,
                                    },
                                    "& svg": {
                                        color: activeColor,
                                    },
                                }}
                            >
                                <Tooltip sx={mediaStyle} title={itemData.tooltip}>
                                    <ListItemIcon onClick={chooseIconHandler}>
                                        {itemData.icon}
                                    </ListItemIcon>
                                </Tooltip>{" "}
                                <ListItemText
                                    primary={itemData.tooltip === "Reply" ? replyCounter : currentActive.counter}/>
                            </ListItem>
                        );
                    })}
                </List>
            </TweetContainer>
        </>
    );
});
Tweet.propTypes = {
  tweetInfo: PropTypes.object,
  styles: PropTypes.any,
};
Tweet.displayName = 'Tweet';
export default Tweet;
