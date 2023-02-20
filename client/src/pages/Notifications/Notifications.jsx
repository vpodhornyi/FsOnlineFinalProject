import React from 'react';
import {ColumnWrapper, PrimaryColumn, PrimaryHeader, SitebarColumn, StickyHeader} from "../../components";
import {Searchbar} from "../../components/Searchbar";
import PageHeader from "../../components/PageHeader/PageHeader";

const Notifications = () => {
    return (
        <ColumnWrapper>
            <PrimaryColumn>
                <PrimaryHeader pageElement={<PageHeader page={"Notifications"}/>}/>
            </PrimaryColumn>
            <SitebarColumn>
                <StickyHeader>
                    <Searchbar/>
                </StickyHeader>
            </SitebarColumn>
        </ColumnWrapper>
    );
};

export default Notifications;
