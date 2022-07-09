import React, {useEffect, useState} from 'react';
import {Redirect, Route, useHistory} from "react-router-dom";
import {authAction} from "./actions/auth.action";
import {applicationAction} from "./actions/applicationAction";
import {useSelector} from "react-redux";
import authenticateReducer from "./reducers/authentication.reducer";

const PrivateRoutes = ({children, ...rest}) => {
    const history = useHistory();

    const {user} = useSelector(state => state.authenticateReducer, () => true);
    useEffect(async () => {
        await authAction.getUserDetail();
        console.log(user);

    }, []);
    const hasSellerRole = () => {
        for (let i = 0; i < user.roles.length; i++) {
            const role = user.roles[i];
            if (role.name === 'ROLE_SELLER') {
                return true;
            }
        }
        return false;
    }
    return (
        <Route {...rest}
               render={() => {
                   if (user != null) {
                       if (hasSellerRole()) {
                           return children;
                       }
                   } else {
                       applicationAction.setRedirectUrl('/dashboard');
                       return <Redirect to="/login"/>;
                   }
               }}
        />
    );
};

export default PrivateRoutes;