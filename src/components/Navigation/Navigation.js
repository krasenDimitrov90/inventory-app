import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import { Fade } from 'hamburger-react';
import './Navigation.scss';

const Navigation = (props) => {

    const navigate = useNavigate();

    const [isOpen, setOpen] = React.useState(false);

    const authCtx = React.useContext(AuthContext);

    const { isLoggedIn, loggout, getUserCredentials } = authCtx;
    const navRef = React.useRef();

    const { userEmail } = getUserCredentials();

    React.useEffect(() => {
        setOpen(false);
    }, [navigate])


    const loggoutHandler = () => {
        loggout();
    };


    const guestTemplate = (
        <>
            <li><NavLink to={'login'} >Login</NavLink></li>
            <li><NavLink to={'register'} >Register</NavLink></li>
        </>
    );

    const userTemplate = (
        <>

            <li><NavLink to={'repositories'} >Repositories</NavLink></li>
            <li><NavLink to={'import-repo'} >Import Repo</NavLink></li>
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

    const SmallScreenNav = () => {
        return (
            <header className="small-screen-navigation-header">
                <nav className="navigation-small-screen">
                    <ul className="navigation-list">
                        <li className={'home-btn-link'}><NavLink to={'/'} >Home</NavLink></li>
                        {isLoggedIn && userTemplate}
                        {!isLoggedIn && guestTemplate}
                    </ul>
                </nav>
            </header>
        );
    };


    return (
        <>
            <header className="navigation-header">
                {isLoggedIn &&
                    <div className="navigation-user-name">
                        <p>Welcome {userEmail}</p>
                    </div>
                }


                <div className="menu-btn" >
                    <Fade toggled={isOpen} toggle={setOpen} />
                </div>
                <Nav />
            </header>
            {isOpen && <SmallScreenNav />}
        </>
    );
};

export default Navigation;