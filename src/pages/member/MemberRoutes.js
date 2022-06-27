import React from 'react';
import {Route, Switch, useLocation} from "react-router-dom";
import Purchase from "./purchase/Purchase";

const MemberRoutes = () => {

    return (
        <>
            <Switch>
                <Route
                    exact
                    path={"/user/purchase"}
                    component={(props) => <Purchase {...props} />}
                />
            </Switch>
        </>
    );
};

export default MemberRoutes;