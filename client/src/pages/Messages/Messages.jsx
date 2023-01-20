import React from "react";
import {Outlet} from 'react-router-dom';

import {SectionNavigation, SectionDetails, PrimaryHeader} from '../../components';
import Navigation from './components/Navigation/Navigation';
import MessagesHeader from './Header';

const Messages = () => {

  return (
    <>
      <SectionNavigation>
        <PrimaryHeader pageElement={MessagesHeader}/>
        <Navigation/>
      </SectionNavigation>
      <SectionDetails>
        <Outlet/>
      </SectionDetails>
    </>
  );
}

export default Messages;
