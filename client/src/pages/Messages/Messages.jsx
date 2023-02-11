import React from "react";
import {Outlet} from 'react-router-dom';

import {SectionNavigation, SectionDetails} from '../../components';
import Navigation from './components/Navigation/Navigation';
import PropTypes from "prop-types";

const Messages = ({isMiddle}) => {

  return isMiddle ?
    <>
      <SectionNavigation>
        <Navigation/>
      </SectionNavigation>
      <SectionDetails>
        <Outlet/>
      </SectionDetails>
    </> :
    <SectionNavigation>
      <Outlet/>
    </SectionNavigation>
}

Messages.propTypes = {
  isMiddle: PropTypes.bool,
}

export default Messages;
