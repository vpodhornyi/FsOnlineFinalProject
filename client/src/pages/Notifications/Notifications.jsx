import React from 'react';
import {ColumnWrapper, PrimaryColumn, PrimaryHeader, SitebarColumn, StickyHeader} from "../../components";
import NotificationHeader from "./Header";

const Notifications = () => {
  return (
    <ColumnWrapper>
      <PrimaryColumn>
        <PrimaryHeader pageElement={NotificationHeader}/>
        BODY Notifications primary column
      </PrimaryColumn>
      <SitebarColumn>
        <StickyHeader>
          HEADER Notifications sitebar column
        </StickyHeader>
        BODY Notifications sitebar column
      </SitebarColumn>
    </ColumnWrapper>
  );
};

export default Notifications;
