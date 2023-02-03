import React from "react";

import './HomePage.scss';

const HomePage = () => {

    // const navigate = useNavigate();
    // const authCtx = React.useContext(AuthContext);
    // const { isLoggedIn } = authCtx;

    // React.useEffect(() => {


    //     if (!isLoggedIn) {
    //         return navigate('/login');
    //     } else {
    //         return navigate('/repositories');
    //     }
    // }, [navigate, isLoggedIn]);

    return (
        <div className="home-page">
            <h1>Home Page</h1>
        </div>
    );
};

export default HomePage;