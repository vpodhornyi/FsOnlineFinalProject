import {
  ColumnWrapper,
  PrimaryColumn,
  PrimaryHeader,
  SitebarColumn,
  StickyHeader,
} from "../../components";
import SearchHeader from "../Search/Header";
import React from "react";
import { useSelector } from "react-redux";
import { getFoundUsers } from "@redux/search/selector";
import { Box } from "@mui/material";
import FoundUser from "./components/FoundUser";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const search = useSelector(getFoundUsers);
  const navigate = useNavigate();
  return (
    <ColumnWrapper>
      <PrimaryColumn>
        <PrimaryHeader pageElement={<SearchHeader />} />
        <Box>
          {search.foundUsers.map((user) => (
            <FoundUser
              key={user?.key}
              user={user}
              onClick={() => navigate(`/${user.userTag}`)}
            />
          ))}
        </Box>
      </PrimaryColumn>

      <SitebarColumn>
        <StickyHeader>HEADER Search sidebar column</StickyHeader>
        BODY Explore sidebar column
      </SitebarColumn>
    </ColumnWrapper>
  );
};

export default Search;
