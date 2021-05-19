import React from 'react'
import {DrizzleProvider} from "@drizzle/react-plugin";
import {LoadingContainer} from "@drizzle/react-components";
import {BrowserRouter} from "react-router-dom";
import drizzleOptions from "../../drizzleOptions"
import store from '../../middleware'

import "./cover.css";
import Header from "../Header";
import Footer from "../Footer";
import MyContainer from "../Container";

const App = _ => {

    return (
        <BrowserRouter>
            <Header/>
            <main role="main" className="inner cover">
                <DrizzleProvider store={store} options={drizzleOptions}>
                    <LoadingContainer>
                        <MyContainer/>
                    </LoadingContainer>
                </DrizzleProvider>
            </main>
            <Footer/>
        </BrowserRouter>
    );
}

export default App
