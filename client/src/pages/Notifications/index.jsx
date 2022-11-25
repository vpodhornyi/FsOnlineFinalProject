import React from 'react';
import {ColumnWrapper, PrimaryColumn, SitebarColumn} from "../../components";

const Index = () => {
  return (
    <ColumnWrapper>
      <PrimaryColumn>Notifications primary column</PrimaryColumn>
      <SitebarColumn>Notifications sitebar column</SitebarColumn>
    </ColumnWrapper>
  );
};

export default Index;
