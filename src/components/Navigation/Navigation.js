import React from "react";
import { NavLink, Link } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import './Navigation.scss';

const Navigation = (props) => {

    const authCtx = React.useContext(AuthContext);

    const { isLoggedIn, loggout: loggoutHandler } = authCtx;

    let activeStyle = {
        'backgroundColor': "green",
      };

    const guestTemplate = (
        <>
            <li><NavLink to={'login'} >Login</NavLink></li>
            <li><NavLink to={'register'} >Register</NavLink></li>
        </>
    );

    const userTemplate = (
        <>
            <li><NavLink  to={'inventory'} >Inventory</NavLink></li>
            <li><NavLink  to={'expiring-items'} >Expiring Items</NavLink></li>
            <li><Link  onClick={loggoutHandler} >Loggout</Link></li>
        </>
    );

    return (
        <header className="navigation-header">
            <nav className="navigation">
                <ul className="navigation-list">
                    <li className={'home-btn-link'}><NavLink  to={'/'} >Home</NavLink></li>
                    {isLoggedIn && userTemplate}
                    {!isLoggedIn && guestTemplate}
                </ul>
            </nav>
        </header>
    );
};

export default Navigation;