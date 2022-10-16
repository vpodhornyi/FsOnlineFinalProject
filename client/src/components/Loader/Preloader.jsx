import React from "react"
import cx from "classnames"


import css from "./styles.module.scss"

const Preloader = ({ loaded }) => {
  return (
    <div
      className={cx("app-loader", css.loader, {
        [css.loaderHide]: loaded,
      })}
    >

    </div>
  )
}

export default Preloader
