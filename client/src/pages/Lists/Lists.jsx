import React from 'react';
import {ColumnWrapper, PrimaryColumn, SitebarColumn, StickyHeader, PrimaryHeader} from "../../components";
import Header from "./Header";
const Lists = () => {
  return (
    <ColumnWrapper>
      <PrimaryColumn>
        <PrimaryHeader pageElement={Header} isBack={true}/>
        BODY Lists primary column
      </PrimaryColumn>

      <SitebarColumn>
        <StickyHeader>
          HEADER Lists sitebar column
        </StickyHeader>
        BODY Lists sitebar column
      </SitebarColumn>
    </ColumnWrapper>
  );
};

export default Lists;
