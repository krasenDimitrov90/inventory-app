import React from "react";

const useInput = (validateValue) => {
    const [value, setValue] = React.useState('');
    const [valueIsValid, setValueIsValid] = React.useState(false);
    const [valueInputIsTouched, setValueInputIsTouched] = React.useState(false);

    const hasError = valueInputIsTouched && !valueIsValid;

    const onChangeHandler = (e) => {
        setValue(e.target.value);
        if (!validateValue(e.target.value)) {
            setValueIsValid(false);
            return;
        }
        setValueIsValid(true);
    };

    const onBlurHandler = () => setValueInputIsTouched(true);

    const resetValue = () => setValue('');

    return {
        value,
        valueIsValid,
        hasError,
        onChangeHandler,
        onBlurHandler,
        resetValue,
    };
};

export default useInput;