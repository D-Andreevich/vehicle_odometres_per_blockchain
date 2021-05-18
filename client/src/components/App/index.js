import React from 'react'
import { DrizzleProvider } from "@drizzle/react-plugin";
import { LoadingContainer } from "@drizzle/react-components";

import "./index.css";

import drizzleOptions from "../../drizzleOptions"
import store from '../../middleware'
import MyContainer from "../MyContainer";

const App = _ => {

    return (
        <DrizzleProvider store={store} options={drizzleOptions}>
            <LoadingContainer>
                <MyContainer />
            </LoadingContainer>
        </DrizzleProvider>
    );
}

export default App
