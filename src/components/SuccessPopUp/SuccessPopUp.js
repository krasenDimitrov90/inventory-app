import React from "react";

import './SuccessPopUp.styles.scss';

const SuccessPopUp = ({ onClick, message }) => {

    return (
        <>
            <div className="main-container" onClick={onClick}>
                <div className="check-container">
                    <div className="check-background">
                        <svg viewBox="0 0 65 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 25L27.3077 44L58.5 7" stroke="white" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="check-shadow"></div>

                </div>
            </div>
            <div className="popup-message-container">
                <div className="popup-message">
                    <h3>{message}</h3>
                </div>
            </div>
        </>
    );
};

export default SuccessPopUp;