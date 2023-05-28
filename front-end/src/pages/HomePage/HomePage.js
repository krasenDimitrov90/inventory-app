import React from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth-context";

import './HomePage.scss';

const HomePage = () => {

    const navigate = useNavigate();
    const authCtx = React.useContext(AuthContext);
    const { isLoggedIn } = authCtx;

    React.useEffect(() => {

        return !isLoggedIn ? navigate('/login') : navigate('/repositories');
        
    }, [navigate, isLoggedIn]);

    // return (
    //     <div className="home-page">
    //         <h1>Home Page</h1>
    //     </div>
    // );
};

export default HomePage;