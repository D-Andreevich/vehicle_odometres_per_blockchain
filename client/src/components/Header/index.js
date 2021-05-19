import React from 'react'
import {Link, NavLink} from "react-router-dom";

const Header = _ => (
    <header className="cover-container w-100 mx-auto  masthead mb-auto" >
        <div className="inner">
            <h3 className="masthead-brand">
                <Link to="/">VehicleMileage</Link>
            </h3>
            <nav className="nav nav-masthead justify-content-center">
                <NavLink
                    key="search"
                    className="nav-link"
                    to="/search"
                >
                    Search
                </NavLink>
                <NavLink
                    key="my-account"
                    className="nav-link"
                    to="/my-account"
                >
                    My account
                </NavLink>
                <NavLink
                    key="create-transaction"
                    className="nav-link"
                    to="/create-transaction"
                >
                    Create Transaction
                </NavLink>
            </nav>
        </div>
    </header>
);

export default Header
