import React from 'react';
import {ColumnWrapper, PrimaryColumn, SitebarColumn, StickyHeader} from "../../components";

const Notifications = () => {
  return (
    <ColumnWrapper>
      <PrimaryColumn>
        <StickyHeader>
          HEADER Notifications primary column
        </StickyHeader>
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
