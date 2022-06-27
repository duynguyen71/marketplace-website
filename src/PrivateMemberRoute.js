import React, {useEffect, useState} from 'react';
import {Redirect, Route, useHistory, useLocation} from "react-router-dom";
import {authAction} from "./actions/auth.action";
import {useSelector} from "react-redux";
import {applicationAction} from "./actions/applicationAction";

const PrivateMemberRoute = ({children, ...rest}) => {

    const history = useHistory();
    const {user} = useSelector(state => state.authenticateReducer, () => true);
    const location = useLocation();

    return (
        <Route {...rest}
               render={() => {
                   console.log('user state', user);
                   if (user) {
                       // const pathName = location.pathname;
                       // console.log('current user path name', pathName);
                       return children;
                   } else {
                       const pathName = location.pathname;
                       applicationAction.setRedirectUrl(pathName);
                       console.log('current user path name', pathName);
                       return <Redirect to="/login"/>;
                   }
               }}
        />
    );
};

export default PrivateMemberRoute;