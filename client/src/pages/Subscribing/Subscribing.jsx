import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import {Link, useLocation, useParams} from "react-router-dom";
import {styled} from "@mui/system";
import {useSelector} from "react-redux";
import ProfilePreview from "../../components/ProfilePreview/ProfilePreview";
import noFollowers from "../../assets/img/no_followers.png"
import {CircularProgress, Typography} from "@mui/material";
import {getUsers} from "../../services/userApi";
import Container from "@mui/material/Container";
import {getPersonalData} from "../../redux/user/selector";
import {PATH} from "../../utils/constants";
import {ColumnWrapper, PrimaryColumn, PrimaryHeader, SitebarColumn, StickyHeader} from "../../components";
import Header from "../Lists/Header";

const Subscribing = () => {
  const {user_tag} = useParams();
  const path = useLocation().pathname;

  const authUser = useSelector(getPersonalData);

  const [userFollowers, setUserFollowers] = useState(null);
  const [userFollowings, setUserFollowings] = useState(null);
  const [name, setName] = useState("");


  useEffect(() => {
    getUsers().then(users => {
      setUserFollowers(users?.filter(user => user.followings.includes(user_tag)))
      setUserFollowings(users?.filter(user => user.followers.includes(user_tag)));
      setName(users?.filter(user => user.userTag === user_tag)[0]?.name)
    });
  }, [authUser]);


  const StyledLink = styled(props => (<Link {...props}/>))(() => ({
    "&:hover": {
      backgroundColor: "rgba(15, 20, 25, 0.1)",
      transition: "0.2s"
    },
    "&": {
      color: "black",
      cursor: "pointer",
      fontSize: "16px",
      width: "100%",
      textAlign: "center",
      padding: "15px 0",
      fontFamily: "Arial, sans-serif",
      textDecoration: "none"
    }
  }))

  if (userFollowers === null || userFollowings === null) {
    return <Container sx={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
      <CircularProgress disableShrink/>
    </Container>
  }

  return (
      <ColumnWrapper>
        <PrimaryColumn>
          <PrimaryHeader pageElement={<Header user={`@${user_tag}`} page={name || `@${user_tag}`}/>} isBack={true}/>
          <Box sx={{width: "100%"}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider', display: "flex", justifyContent: "space-around"}}>
              <StyledLink sx={{borderBottom: path.includes("followers") ? "2px solid black" : "none"}}
                          to={`${PATH.USER_PAGE.followers(user_tag)}`}>
                Followers
              </StyledLink>

              <StyledLink sx={{borderBottom: path.includes("followings") ? "2px solid black" : "none"}}
                          to={`${PATH.USER_PAGE.followings(user_tag)}`}>
                Followings
              </StyledLink>
            </Box>

            {
                path.includes("followers") &&
                <>
                  {userFollowers?.length > 0 ? userFollowers?.map(u => (
                          <ProfilePreview
                              key={u.id}
                              userTag={u.userTag}
                              username={u.name}
                              id={u.id}
                              avatar={u.avatarImgUrl}
                              descr={u.bio}
                              followers={u.followers}
                              followings={u.followings}
                          />
                      )) :
                      <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        maxWidth: "70%",
                        margin: "0 auto"
                      }}>
                        <img src={noFollowers} alt="No followers image."/>
                        <Typography sx={{margin: "15px 0 10px 0", fontWeight: "bold"}} variant={"h4"}>Looking for
                          followers?</Typography>
                        <Typography variant={"subtitle2"}>When someone follows this account, they’ll show up here.
                          Tweeting and interacting with others helps boost followers.</Typography>
                      </Box>
                  }
                </>

            }
            {
                path.includes("followings") &&
                <>
                  {userFollowings.length > 0 ? userFollowings?.map(u => (
                          <ProfilePreview
                              key={u.id}
                              userTag={u.userTag}
                              username={u.name}
                              id={u.id}
                              avatar={u.avatarImgUrl}
                              descr={u.bio}
                              followers={u.followers}
                              followings={u.followings}
                          />

                      )) :
                      <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        maxWidth: "70%",
                        margin: "0 auto"
                      }}>
                        <Typography sx={{margin: "15px 0 10px 0", fontWeight: "bold"}} variant={"h4"}>Be in the
                          know</Typography>
                        <Typography variant={"subtitle2"}>Following accounts is an easy way to curate your timeline and
                          know what’s happening with the topics and people you’re interested in.</Typography>
                      </Box>
                  }
                </>
            }
          </Box>

        </PrimaryColumn>
        <SitebarColumn>
          <StickyHeader>
            HEADER Lists sitebar column
          </StickyHeader>
          BODY Lists sitebar column
        </SitebarColumn>
      </ColumnWrapper>
  );
};

export default Subscribing;