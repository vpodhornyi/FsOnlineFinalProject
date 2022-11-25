import React from 'react';
import {ColumnWrapper, PrimaryColumn, SitebarColumn} from "../../components";

const UserProfile = () => {
  return (
    <ColumnWrapper>
      <PrimaryColumn>UserProfile primary column</PrimaryColumn>
      <SitebarColumn>UserProfile sitebar column</SitebarColumn>
    </ColumnWrapper>
  );
};

export default UserProfile;
