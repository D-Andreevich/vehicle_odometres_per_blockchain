import React from "react";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


import ShowAccount from "../ShowAccount";
import SendTransaction from "../SendTransaction";
import Search from "../Search";

export default (props) => {
    return (

        <div className="App">
            <ToastContainer />

            <ShowAccount />
            <SendTransaction />
            <Search />
            {/*<ReadString drizzle={drizzle} drizzleState={drizzleState}/>*/}
            {/*<SetString drizzle={drizzle} drizzleState={drizzleState}/>*/}
        </div>
    )
} ;