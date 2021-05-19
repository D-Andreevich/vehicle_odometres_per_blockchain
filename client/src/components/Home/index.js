import React from 'react';
import {NavLink} from "react-router-dom";

const Home = _ => (
    <div className="cover-container mx-auto">
        <h1 className="cover-heading">Cover your page.</h1>
        <p className="lead">Cover is a one-page template for building simple and beautiful home pages. Download,
            edit the text, and add your own fullscreen background photo to make it your own.</p>
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
