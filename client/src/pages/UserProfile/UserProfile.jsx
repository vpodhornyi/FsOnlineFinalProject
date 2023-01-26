import React from 'react';
import {ColumnWrapper, PrimaryColumn, SitebarColumn, StickyHeader, PrimaryHeader} from "../../components";
import Header from "./Header";
const UserProfile = () => {
  return (
    <ColumnWrapper>
      <PrimaryColumn>
        <PrimaryHeader pageElement={Header} isBack={true}/>
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
