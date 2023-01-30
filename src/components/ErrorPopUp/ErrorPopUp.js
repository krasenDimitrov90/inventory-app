import React from "react";

import './ErrorPopUp.styles.scss';

const ErrorPopUp = ({message}) => {

    return (
        <>
            <div className="error-popup-wrapper">
                <div className="error-popup">
                    <span className="error-popup-bars bar1"></span>
                    <span className="error-popup-bars bar2"></span>
                </div>
            </div>
            <div className="error-popup-message-container">
                <div className="error-popup-message">
                    <h3>{message}</h3>
                </div>
            </div>
        </>
    );
};

export default ErrorPopUp;