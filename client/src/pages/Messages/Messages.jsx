import React from "react";
import {Outlet} from 'react-router-dom';

import {SectionNavigation, SectionDetails} from '../../components';
import NavigationHeader from './components/NavigationHeader';
import Navigation from './components/Navigation/Navigation';

const Messages = () => {

  return (
    <>
      <SectionNavigation>
        <NavigationHeader/>
        <Navigation/>
      </SectionNavigation>
      <SectionDetails>
        <Outlet/>
      </SectionDetails>
    </>
  );
}

export default Messages;
