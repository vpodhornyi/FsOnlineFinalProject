import React from "react";
import cx from "classnames";


import css from "./styles.module.scss";
import PropTypes from "prop-types";

const Preloader = ({ loaded }) => {
  return (
    <div
      className={cx("app-loader", css.loader, {
        [css['loader-hide']]: loaded,
      })}
    >

    </div>
  )
};

Preloader.propTypes = {
  loaded: PropTypes.bool,
}

export default Preloader;
