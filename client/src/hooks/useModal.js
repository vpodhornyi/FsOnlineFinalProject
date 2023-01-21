import {useState} from "react";

export const useModal = () => {
  const [modal, setModal] = useState({isShowing: false, element: null});

  const toggleModal = (element = null, open = false) => {
    setModal({
      isShowing: open,
      element: element,
    });
  }

  return {
    modal,
    toggleModal,
  }
};
