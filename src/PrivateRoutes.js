import React, {useEffect, useState} from 'react';
import {Redirect, Route, useHistory} from "react-router-dom";
import {authAction} from "./actions/auth.action";

const PrivateRoutes = ({children, ...rest}) => {
    const history = useHistory();
    useEffect(async () => {
        try {

            await authAction.getUserDetail();
        } catch (e) {
            authAction.logout();
            history.push('/login')
            return;
        }
    }, []);

    return (
        <Route {...rest}

               render={() => {
                   if (localStorage.getItem('access_token')) {
                       return children;
                   } else {
                       console.log('redurec login')
                       // setDirectUrl('/admin');
                       return <Redirect to="/login"/>;
                   }
               }}
        />
    );
};

export default PrivateRoutes;