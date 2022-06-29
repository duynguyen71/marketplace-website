import React, {useEffect, useState} from 'react';
import {Redirect, Route, useHistory} from "react-router-dom";
import {authAction} from "./actions/auth.action";
import {applicationAction} from "./actions/applicationAction";

const PrivateRoutes = ({children, ...rest}) => {
    const history = useHistory();
    return (
        <Route {...rest}
               render={() => {
                   if (localStorage.getItem('access_token') && localStorage.getItem('user')) {
                       return children;
                   } else {
                       applicationAction.setRedirectUrl('/dashboard');
                       return <Redirect to="/login"/>;
                   }
               }}
        />
    );
};

export default PrivateRoutes;