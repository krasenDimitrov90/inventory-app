import React from "react";

import './InputField.styles.css';

const InputField = (props) => {

    return (
        <>
            <div className="form-input-card">
                {props.icon || null}
                <input className="form-input-field"
                    placeholder={props.placeholder}
                    type={props.type}
                    id={props.id}
                    name={props.name}
                    value={props.value}
                    onBlur={props.onBlur}
                    onChange={props.onChange}
                />
            </div>
            {props.inputIsInvalid && <p className="invalid-input">{props.invalidMessage}</p>}
        </>
    );
};

export default InputField;