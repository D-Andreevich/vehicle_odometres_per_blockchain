import React from 'react';
import {NavLink} from "react-router-dom";

const Home = _ => (
    <div className="cover-container mx-auto">
        <h1 className="cover-heading">Welcome !</h1>
        <p className="lead">Congratulations, you have successfully connected to the network and can use the resource: create records, search, get information about your account .</p>
        <p className="lead">To search, click:</p>
        <p className="lead">
            <NavLink
                className="btn btn-lg btn-secondary"
                to="/search"
            >
                Search
            </NavLink>
        </p>
    </div>
);

export default Home
