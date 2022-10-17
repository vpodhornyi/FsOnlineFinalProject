import React from "react"
import cx from "classnames"

import css from "./styles.module.scss"

const PageLoader = ({ loaded = true, ...res }) => {
  return (
    loaded && (
      <div {...res} className={cx("app-loader", css.apploader)}>

      </div>
    )
  )
}

export default PageLoader
