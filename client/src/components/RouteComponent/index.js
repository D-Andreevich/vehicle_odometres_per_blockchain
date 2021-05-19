import React from "react";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import ShowAccount from "../ShowAccount";
import SendTransaction from "../SendTransaction";
import Search from "../Search";
import {Route, Switch} from "react-router-dom";
import Home from "../Home";


const RouteComponent = (props) => {
    return (
        <>
            <ToastContainer/>
            <Switch>
                <Route exact path="/my-account" component={ShowAccount}/>
                <Route exact path="/create-transaction" component={SendTransaction}/>
                <Route exact path="/search" component={Search}/>
                <Route exact path="/" component={Home}/>
            </Switch>
        </>
    )
};

export default RouteComponent