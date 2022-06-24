import './App.css';
import {Route, Switch} from 'react-router-dom'
import Dashboard from "./pages/dashboard/dashboard/Dashboard";
import Home from "./pages/public/main/Home";
import Login from "./pages/public/login/Login";
//react slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Register from "./pages/public/register/Register";
import PrivateRoutes from "./PrivateRoutes";
import VerificationPage from "./pages/public/verification/VerificationPage";
import {useEffect} from "react";
import userService from './service/user.service';
import {authAction} from "./actions/auth.action";

function App() {

    useEffect(async () => {
        await authAction.getUserDetail();
    })


    return (
        <>
            <Switch>
                {/*<PrivateRoutes path='/dashboard' component={Dashboard}/>*/}
                <PrivateRoutes path='/dashboard'>
                    <Dashboard/>
                </PrivateRoutes>
                <Route path='/login' component={Login}/>
                <Route path='/verification' component={VerificationPage}/>
                <Route path='/register' component={Register}/>
                <Route path='/' component={Home}/>
            </Switch>
        </>
    );
}

export default App;
