import React from "react";
import Navigation from "../../components/Navigation/Navigation";

import './ErrorPage.styles.scss';

const ErrorPage = () => {

    return (
        <>
            <Navigation />
            <div className="error-page">
                <h1>Error Page</h1>
            </div>
        </>
    );
};

export default ErrorPage;