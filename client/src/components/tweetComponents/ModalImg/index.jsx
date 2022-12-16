import React from "react";
import Dialog from "@mui/material/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { getModalState } from "../../../redux/modal/selector";
import PropTypes from "prop-types";
import { closeModal } from "../../../redux/modal/action";
import {ModalPage} from "../../index";
import {useLocation, useNavigate, useNavigation, useParams} from "react-router-dom";

const ModalImg = () => {
    const { state } = useLocation();
  return (
      <ModalPage element={<img src={state.url} alt="FULL_IMG"/>}/>
  );
};

export default ModalImg;
