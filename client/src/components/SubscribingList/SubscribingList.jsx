import React from 'react';
import PropTypes from "prop-types";
import ProfilePreview from "../ProfilePreview/ProfilePreview";

const SubscribingList = ({peopleList}) => {
    return (
        <div>
            {
                peopleList.map(({id, username, userTag, avatarImgUrl, bio}) =>
                    <ProfilePreview
                        id={id}
                        username={username}
                        userTag={userTag}
                        avatar={avatarImgUrl}
                        descr={bio}
                    />
                )
            }
        </div>
    );
};

SubscribingList.propTypes = {
    peopleList: PropTypes.array
}

export default SubscribingList;