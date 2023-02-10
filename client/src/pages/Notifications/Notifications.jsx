import React from 'react';
import {ColumnWrapper, PrimaryColumn, PrimaryHeader, SitebarColumn, StickyHeader} from "../../components";
import NotificationHeader from "./Header";
import {Searchbar} from "../../components/Searchbar";

const Notifications = () => {
  return (
      <ColumnWrapper>
        <PrimaryColumn>
          <PrimaryHeader pageElement={<NotificationHeader/>}/>
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
