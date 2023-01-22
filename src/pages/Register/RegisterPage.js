import React from "react";
import { useNavigate } from "react-router";
import './RegisterPage.css';
import useHttp from "../../hooks/use-http";
import useInput from "../../hooks/use-input";
import InputField from "../../components/InputField/InputField";
import FormCard from "../../components/FormCard/FormCard";
import AuthContext from "../../context/auth-context";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";


const emailValidator = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const RegisterPage = () => {

    const navigate = useNavigate();

    const authCtx = React.useContext(AuthContext);

    const { isLoading, sendRequest: requestRegister } = useHttp();

    const {
        value: enteredEmail,
        valueIsValid: enteredEmailIsValid,
        hasError: emailInputIsInvalid,
        onChangeHandler: emailInputChangeHandler,
        onBlurHandler: emailInputOnBlurHandler,
        resetValue: resetEmailInput,
    } = useInput(value => value.match(emailValidator));

    const {
        value: enteredPassword,
        valueIsValid: enteredPasswordIsValid,
        hasError: passwordInputIsInvalid,
        onChangeHandler: passwordInputOnChangeHandler,
        onBlurHandler: passwordInputOnBlurHandler,
        resetValue: resetPasswordInput,
    } = useInput(value => value.length > 5);

    const {
        value: repeatPassword,
        valueIsValid: repeatPasswordIsValid,
        hasError: repeatPasswordInputHasError,
        onChangeHandler: repeatPasswordInputOnChangeHandler,
        onBlurHandler: repeatPasswordInputBlurHandler,
        resetValue: resetRepeatPasswordInput,
    } = useInput((value) => enteredPassword === value);


    let formIsValid = true;

    if (!enteredEmailIsValid || !enteredPasswordIsValid || !repeatPasswordIsValid || enteredPassword !== repeatPassword) {
        formIsValid = false;
    }

    const loginHandler = (userData) => {
        navigate('/login');
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if (!enteredEmailIsValid) {
            console.log('Invalid email');
            return;
        }

        if (enteredPassword !== repeatPassword) {
            console.log('Passwords does\'t match!');
            return;
        }

        const data = {
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
        };

        const requestConfig = {
            action: 'register',
            data: data,
        };

        requestRegister(requestConfig, loginHandler);

        resetEmailInput();
        resetPasswordInput();
    };

    return (
        <>
            <section className="login-form-wrapper">
                {isLoading && <LoadingSpinner />}
                <FormCard submitHandler={onSubmitHandler} formTitle={'REGISTER'} btnName={"Register"}>

                    <InputField
                        icon={<i className="fa-solid fa-user"></i>}
                        type="text"
                        id='email'
                        name='email'
                        placeholder="Email"
                        value={enteredEmail}
                        onBlur={emailInputOnBlurHandler}
                        onChange={emailInputChangeHandler}
                        inputIsInvalid={emailInputIsInvalid}
                        invalidMessage='Invalid Email!'
                    />

                    {/* {emailInputIsInvalid && <p>Incorrect email!</p>} */}

                    <InputField
                        icon={<i className="fa-solid fa-lock"></i>}
                        type="text"
                        id='email'
                        name='email'
                        placeholder="Password"
                        value={enteredPassword}
                        onBlur={passwordInputOnBlurHandler}
                        onChange={passwordInputOnChangeHandler}
                        inputIsInvalid={passwordInputIsInvalid}
                        invalidMessage='Password must have at least 6 characters!'
                    />
                    {/* {passwordInputIsInvalid && <p>Password must have at least 6 characters!</p>} */}

                    <InputField
                        icon={<i className="fa-solid fa-lock"></i>}
                        type="text"
                        id='email'
                        name='email'
                        placeholder="Repeat password"
                        value={repeatPassword}
                        onBlur={repeatPasswordInputBlurHandler}
                        onChange={repeatPasswordInputOnChangeHandler}
                        inputIsInvalid={repeatPasswordInputHasError}
                        invalidMessage={`Passwords does\'t match!`}
                    />
                    {/* {repeatPasswordInputHasError && <p>Passwords does't match!</p>} */}
                </FormCard>
            </section>
        </>
    );
};

export default RegisterPage;