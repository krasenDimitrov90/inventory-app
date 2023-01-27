import React from "react";

import './FormCard.styles.css';

const FormCard = ({
    submitHandler,
    formTitle,
    children,
    btnName,
    formIsInvalid,
}) => {

    return (
        <form onSubmit={submitHandler} className='form-card' >
            <h1 className="form-card-title" >{formTitle}</h1>
            {children}
            <div className="form-btn-wrapper">
                <button className="form-btn" disabled={formIsInvalid} >{btnName}</button>
            </div>
        </form>
    );
};

export default FormCard;