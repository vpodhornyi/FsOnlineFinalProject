import React from 'react';
import {ColumnWrapper, PrimaryColumn, SitebarColumn, StickyHeader, PrimaryHeader} from "../../components";
import Header from "./Header";
import {useSelector} from "react-redux";
import {getPersonalData} from "@redux/auth/selector";
import {Searchbar} from "../../components/Searchbar";

const Lists = () => {
  const authUser = useSelector(getPersonalData);

  return (
      <ColumnWrapper>
        <PrimaryColumn>
          <PrimaryHeader pageElement={<Header user={`@${authUser?.userTag}`} page={"Lists"}/>} isBack={true}/>
        </PrimaryColumn>

        <SitebarColumn>
          <StickyHeader>
            <Searchbar/>
          </StickyHeader>
        </SitebarColumn>
      </ColumnWrapper>
  );
};

export default Lists;
