import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import { Fade } from 'hamburger-react';
import './Navigation.scss';

const Navigation = (props) => {

    const navigate = useNavigate();

    const [isOpen, setOpen] = React.useState(false);

    const authCtx = React.useContext(AuthContext);

    const { isLoggedIn, loggout } = authCtx;
    const navRef = React.useRef();

    React.useEffect(() => {
        setOpen(false);
    }, [navigate])



    const toggleHandler = (toggled) => {
        // if (toggled) {
        //     navRef.current.classList.add('active')
        //     console.log('add');
        // } else {
        //     navRef.current.classList.remove('active')
        //     console.log('remove');
        // }

        // navRef.current.classList.toggle('active');
    };

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
                <div className="menu-btn" >
                    <Fade onToggle={toggleHandler} toggled={isOpen} toggle={setOpen} />
                </div>
                <Nav />
            </header>
            {isOpen && <SmallScreenNav />}
        </>
    );
};

export default Navigation;