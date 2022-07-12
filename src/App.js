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
import PrivateMemberRoute from "./PrivateMemberRoute";
import Purchase from "./pages/member/purchase/Purchase";
import MemberRoutes from "./pages/member/MemberRoutes";
import ShopRegisterPage from "./pages/public/shop-register/ShopRegsiterPage";

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
                <PrivateMemberRoute path='/user'>
                    <MemberRoutes/>
                </PrivateMemberRoute>
                <Route path='/login' component={Login}/>
                <Route path='/verification' component={VerificationPage}/>
                <Route path='/register' component={Register}/>
                <Route path='/shop/register' component={ShopRegisterPage}/>

                <Route path='/' component={Home}/>
            </Switch>
        </>
    );
}

export default App;
