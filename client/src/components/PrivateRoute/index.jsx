import React from "react"
import {Redirect, Route} from "react-router-dom"
import {useSelector} from "react-redux"

const PrivateRoute = ({isPublic, isAdminRoute, ...route}) => {
  const {authorized, user: {isAdmin}} = useSelector((state) => state.auth)

  // if (isAdminRoute) {
  //   return isAdmin ? <Route {...route} /> : <Redirect to="/"/>
  // }

  // if (isPublic) {
  //   return <Route {...route} />
  // }


  // return authorized ? <Route {...route} /> : <Redirect to="/"/>
  return <Route {...route} />
}

export default PrivateRoute
