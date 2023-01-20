import React from "react";
import {Outlet} from 'react-router-dom';

import {SectionNavigation, SectionDetails} from '../../components';
import Header from '../Header';
import Navigation from './components/Navigation/Navigation';
import MessagesHeader from './Header';
import PropTypes from "prop-types";

const Messages = ({user}) => {

  return (
    <>
      <SectionNavigation>
        <Header user={user} pageElement={MessagesHeader}/>
        <Navigation/>
      </SectionNavigation>
      <SectionDetails>
        <Outlet/>
      </SectionDetails>
    </>
  );
}

Messages.propTypes = {
  user: PropTypes.object,
}

export default Messages;
