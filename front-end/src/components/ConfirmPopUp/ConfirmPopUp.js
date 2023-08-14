import React from "react";

import './ConfirmPopUp.styles.scss';

const ConfirmPopUp = ({ name, onCancelHandler, onCinfirmHandler }) => {

    return (
        <div className="confirm-action">
            <div className="confirm-action-message">
                <h3>Are you shure you want to delete {name}</h3>
            </div>
            <div className="confirm-action-btns">
                <div className="confirm-action-btns-card">
                    <button className="confirm-action-btns-cancel" onClick={onCancelHandler} >Cancel</button>
                </div>
                <div className="confirm-action-btns-card">
                    <button className="confirm-action-btns-delete" onClick={onCinfirmHandler} >Delete</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmPopUp;