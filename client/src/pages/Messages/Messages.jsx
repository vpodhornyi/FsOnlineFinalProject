import React from "react";
import {Outlet} from 'react-router-dom';

import {SectionNavigation, SectionDetails} from '../../components';
import {NavigationHeader} from './components';
import ChatsList from './components/Navigation/ChatsList';

const Messages = () => {

  return (
    <>
      <SectionNavigation>
        <NavigationHeader/>
        <ChatsList/>
      </SectionNavigation>
      <SectionDetails>
        <Outlet/>
      </SectionDetails>
    </>
  );
}

export default Messages;
