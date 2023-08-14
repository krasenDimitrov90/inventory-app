import React from "react";

import './InputField.styles.scss';

const InputField = (props) => {
    const [classes, setClasses] = React.useState("input-wrapper");

    const onBlurHandler = React.useCallback(() => {
        props.onBlur();
        setClasses("input-wrapper");
    },[]);

    const onFocusHandler = () =>  setClasses("input-wrapper focus");

    const capitalizedFirstLetter = React.useCallback((str) => {
        return str.slice(0,1).toUpperCase() + str.slice(1);
    },[]);

    return (
        <div className="mb-[24px]">
            <div className={classes}>
                <label htmlFor={props.id}>{capitalizedFirstLetter(props.name)}</label>
                <input
                    type={props.type}
                    placeholder={props.placeholder}
                    id={props.id}
                    className="bg-[transparent] "
                    name={props.name}
                    value={props.value}
                    onChange={props.onChange}
                    onBlur={onBlurHandler}
                    onFocus={onFocusHandler}
                    maxLength={props.maxlength || 35}
                />
            </div>
            {props.inputIsInvalid && <p className="pl-[20px] pt-[4px] text-[12px] text-[#e74c3c]">{props.invalidMessage}</p>}
        </div>
    );
};

export default InputField;