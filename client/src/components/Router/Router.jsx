import React from "react";
import {Routes, Route} from "react-router-dom";
import PropTypes from "prop-types";

const Router = ({authorized, routes}) => {
  const voo = routes?.map(({path, page: Page}) => (
    <Route key={path} path={path} element={<Page/>}/>))

  return (
    <Routes>
      {voo}
    </Routes>);
}

Router.propTypes = {
  authorized: PropTypes.bool,
  routes: PropTypes.array,
}

export default Router;
