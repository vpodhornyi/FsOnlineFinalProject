import React, {useState} from "react";
import {Drawer} from "@mui/material";
import PropTypes from "prop-types";

const CustomDrawer = ({type, element: Element}) => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(!open);
  }

  return (
    <Drawer anchor={type}
            open={open}
            onClose={toggleDrawer()}>
      <Element toggleDrawer={toggleDrawer}/>
    </Drawer>);
}

CustomDrawer.propTypes = {
  type: PropTypes.string,
  element: PropTypes.object,
}
export default CustomDrawer;
