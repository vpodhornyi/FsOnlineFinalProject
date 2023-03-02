import React from 'react';
import {ColumnWrapper, PrimaryColumn, SitebarColumn, StickyHeader, PrimaryHeader} from "../../components";
import {useSelector} from "react-redux";
import {getPersonalData} from "../../redux/user/selector";
import {Searchbar} from "../../components/Searchbar";
import PageHeader from "../../components/PageHeader/PageHeader";

const Lists = () => {
    const authUser = useSelector(getPersonalData);

    return (
        <ColumnWrapper>
            <PrimaryColumn>
                <PrimaryHeader pageElement={<PageHeader subtitle={`@${authUser?.userTag}`} page={"Lists"}/>} isBack={true}/>
            </PrimaryColumn>

            <SitebarColumn>
                <StickyHeader>
                    <Searchbar/>
                </StickyHeader>
            </SitebarColumn>
        </ColumnWrapper>
    );
};

export default Lists;
