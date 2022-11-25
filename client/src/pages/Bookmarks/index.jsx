import React from 'react';
import {ColumnWrapper, PrimaryColumn, SitebarColumn} from "../../components";

const Index = () => {
  return (
    <ColumnWrapper>
      <PrimaryColumn>Bookmarks primary column</PrimaryColumn>
      <SitebarColumn>Bookmarks sitebar column</SitebarColumn>
    </ColumnWrapper>
  );
};

export default Index;
