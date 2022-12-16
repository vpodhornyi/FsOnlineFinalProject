import React from "react";
import {ModalPage} from "../../index";
import {useLocation} from "react-router-dom";

const ModalImg = () => {
    const { state } = useLocation();
  return (
      <ModalPage element={<img src={state.url} alt="FULL_IMG"/>}/>
  );
};

export default ModalImg;
