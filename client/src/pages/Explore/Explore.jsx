import React from 'react';
import {ColumnWrapper, PrimaryColumn, PrimaryHeader, SitebarColumn, StickyHeader} from "../../components";
import ExploreHeader from "./Header";

const Explore = () => {
  return (
      <ColumnWrapper>
        <PrimaryColumn>
          <PrimaryHeader pageElement={<ExploreHeader/>}/>
        </PrimaryColumn>

        <SitebarColumn>
          <StickyHeader>
          </StickyHeader>
          Terms of Service
          Privacy Policy
          Cookie Policy
        </SitebarColumn>
      </ColumnWrapper>
  );
};

export default Explore;
