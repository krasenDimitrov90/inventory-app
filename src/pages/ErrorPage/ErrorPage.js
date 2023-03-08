import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../../components/Navigation/Navigation";

import './ErrorPage.styles.scss';

const ErrorPage = () => {

    return (
        <>
            <Navigation />
            {/* <div className="error-page">
                <h1>Page not found!</h1>
            </div> */}
            <div className="error-page-wrapper">
                <div className="error-page">
                    <h1>404</h1>
                    <p className="text-[12px]">The page you are looking for not available!</p>
                    <Link to={'/'} >Go to home page</Link>
                </div>
            </div>
        </>
    );
};

export default ErrorPage;