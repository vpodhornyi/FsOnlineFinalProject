import React from 'react';
import {ColumnWrapper, PrimaryColumn, SitebarColumn, StickyHeader} from "../../components";

const UserProfile = () => {
  return (
    <ColumnWrapper>
      <PrimaryColumn>
        <StickyHeader>
          HEADER UserProfile primary column
        </StickyHeader>
        BODY UserProfile primary column
      </PrimaryColumn>

      <SitebarColumn>
        <StickyHeader>
          HEADER UserProfile sitebar column
        </StickyHeader>
        BODY UserProfile sitebar column
      </SitebarColumn>
    </ColumnWrapper>
  );
};

export default UserProfile;
