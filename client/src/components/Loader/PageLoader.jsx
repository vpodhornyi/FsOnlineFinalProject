import React from "react"
import cx from "classnames"

import css from "./styles.module.scss"
import PropTypes from "prop-types";

const PageLoader = ({ loaded = true, ...res }) => {
  return (
    loaded && (
      <div {...res} className={cx("app-loader", css['app-loader'])}>

      </div>
    )
  )
};

PageLoader.propTypes = {
  loaded: PropTypes.bool,
}

export default PageLoader;
