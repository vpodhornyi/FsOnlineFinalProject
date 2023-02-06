import React from 'react';
import {ColumnWrapper, PrimaryColumn, SitebarColumn, StickyHeader, PrimaryHeader} from "../../components";
import Header from "./Header";
import {useParams} from "react-router-dom";

const Lists = () => {
    const {user_tag} = useParams();

    return (
        <ColumnWrapper>
            <PrimaryColumn>
                <PrimaryHeader pageElement={<Header user={`@${user_tag}`} page={"Lists"}/>} isBack={true}/>
                BODY Lists primary column
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

export default Lists;
