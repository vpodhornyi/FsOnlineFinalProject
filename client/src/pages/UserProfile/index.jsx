import React from 'react';
import {Outlet} from "react-router-dom";
import {PrimaryColumn, SidebarColumn} from "../../components";

const Notifications = () => {
    return (
      <>
        <PrimaryColumn>
          Profile
          <Outlet/>
        </PrimaryColumn>
        <SidebarColumn>
          SidebarColumn Profile
        </SidebarColumn>
      </>
    );
};

export default Notifications;
