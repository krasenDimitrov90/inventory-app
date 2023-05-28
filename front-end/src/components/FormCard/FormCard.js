import React from "react";

import './FormCard.styles.scss';

const FormCard = ({
    submitHandler,
    children,
}) => {

    return (
        <form onSubmit={submitHandler} className="form-card border-[#151f30] border-[1px] rounded-[16px] bg-[#131720]">
            {children}
        </form>
    );
};

export default FormCard;