import {useState} from "react";

export const useDrawer = () => {
  const [drawer, setDrawer] = useState(false);

  const toggleDrawer = () => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawer(!drawer);
  }

  return {
    drawer,
    toggleDrawer,
  }
};
