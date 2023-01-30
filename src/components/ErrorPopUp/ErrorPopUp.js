import React from "react";
import Modal from "../Modal/Modal";

import './ErrorPopUp.styles.scss';

const ErrorPopUp = () => {

    return (
        <Modal>
            <div className="error-popup-wrapper">
                <div className="error-popup">
                    <span className="error-popup-bars bar1"></span>
                    <span className="error-popup-bars bar2"></span>
                </div>
            </div>
            <div className="error-popup-message-container">
                <div className="error-popup-message">
                    <h3>Wrong email or password</h3>
                </div>
            </div>
        </Modal>
    );
};

export default ErrorPopUp;