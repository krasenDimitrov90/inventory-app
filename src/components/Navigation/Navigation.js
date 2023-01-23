import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import {Fade} from 'hamburger-react';
import './Navigation.scss';

const Navigation = (props) => {

    const navigate = useNavigate();

    const authCtx = React.useContext(AuthContext);

    const { isLoggedIn, loggout } = authCtx;
    const navRef = React.useRef();



    const toggleHandler = () => {
        navRef.current.classList.toggle('active');
    };

    const loggoutHandler = () => {
        loggout();
    };

    const isMobile = window.screen.width < 400;

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
            <li><NavLink to={'inventory'} >Inventory</NavLink></li>
            <li><NavLink to={'expiring-items'} >Expiring Items</NavLink></li>
            <li><Link onClick={loggoutHandler} >Loggout</Link></li>
        </>
    );

    const Nav = () => {
        return (
            <nav ref={navRef} className="navigation">
                <ul className="navigation-list">
                    <li className={'home-btn-link'}><NavLink to={'/'} >Home</NavLink></li>
                    {isLoggedIn && userTemplate}
                    {!isLoggedIn && guestTemplate}
                </ul>
            </nav>
        );
    };


    return (
        <header className="navigation-header">
            <Fade onToggle={toggleHandler}  />
            <Nav />
        </header>
    );
};

export default Navigation;