import React from "react";
import { useNavigate } from "react-router";
import './RegisterPage.css';
import useHttp from "../../hooks/use-http";
import useInput from "../../hooks/use-input";
import InputField from "../../components/InputField/InputField";
import FormCard from "../../components/FormCard/FormCard";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import SuccessPopUp from "../../components/SuccessPopUp/SuccessPopUp";
import Modal from "../../components/Modal/Modal";
import usePopUp from "../../hooks/use-popUp";
import ErrorPopUp from "../../components/ErrorPopUp/ErrorPopUp";


const emailValidator = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const RegisterPage = () => {

    const navigate = useNavigate();
    const [formIsInvalid, setFormIsInvalid] = React.useState(false);
    const { isLoading, sendRequest: requestRegister, error: requestError } = useHttp();
    const { sendRequest: requestPutNewUser } = useHttp();


    const afterRequestFinished = () => {
        if (requestError) {
            setFormIsInvalid(true);
            navigate('/register');
        } else {
            navigate('/login');
        }
    };

    const {
        modalIsOpen,
        setModalIsOpen,
        requestIsFinished,
        setRequestIsFinished } = usePopUp(afterRequestFinished);

    const {
        value: enteredEmail,
        valueIsValid: enteredEmailIsValid,
        hasError: emailInputIsInvalid,
        onChangeHandler: emailInputChangeHandler,
        onBlurHandler: emailInputOnBlurHandler,
        resetInput: resetEmailInput,
    } = useInput(value => value.match(emailValidator));

    const {
        value: enteredPassword,
        valueIsValid: enteredPasswordIsValid,
        hasError: passwordInputIsInvalid,
        onChangeHandler: passwordInputOnChangeHandler,
        onBlurHandler: passwordInputOnBlurHandler,
        resetInput: resetPasswordInput,
    } = useInput(value => value.length > 5);

    const {
        value: repeatPassword,
        valueIsValid: repeatPasswordIsValid,
        hasError: repeatPasswordInputHasError,
        onChangeHandler: repeatPasswordInputOnChangeHandler,
        onBlurHandler: repeatPasswordInputBlurHandler,
        resetInput: resetRepeatPasswordInput,
    } = useInput((value) => enteredPassword === value);



    React.useEffect(() => {
        if (!enteredEmailIsValid || !enteredPasswordIsValid || !repeatPasswordIsValid || enteredPassword !== repeatPassword) {
            setFormIsInvalid(true);
        } else {
            setFormIsInvalid(false);
        }
    }, [enteredEmailIsValid, enteredPasswordIsValid, repeatPasswordIsValid, enteredPassword, repeatPassword]);


    const registerHandler = (userData) => {
        const { localId, email } = userData;
        const data = {
            [localId]: {
                "email": email,
                "repos": ""
            }
        };

        const requestConfig = {
            action: 'putNewUser',
            data: data,
        };

        requestPutNewUser(requestConfig, () => console.log('Success'));
        setRequestIsFinished(true);
        setModalIsOpen(true);
    };

    const errorHandler = () => {
        setModalIsOpen(true);
        setRequestIsFinished(true);
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if (!enteredEmailIsValid) {
            return;
        }

        if (enteredPassword !== repeatPassword) {
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

        requestRegister(requestConfig, registerHandler, errorHandler);

        resetEmailInput();
        resetPasswordInput();
        resetRepeatPasswordInput();
    };

    return (
        <>
            {modalIsOpen && requestIsFinished &&
                <Modal>
                    {requestError !== null && <ErrorPopUp message={requestError} />}
                    {requestError === null && <SuccessPopUp message={'Succesfuly registered'} />}
                </Modal>}
            <section className="register-form-wrapper">
                {isLoading && <LoadingSpinner />}
                <FormCard submitHandler={onSubmitHandler} formTitle={'REGISTER'} btnName={"Register"} formIsInvalid={formIsInvalid}>

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

                    <InputField
                        icon={<i className="fa-solid fa-lock"></i>}
                        type="password"
                        id='password'
                        name='password'
                        placeholder="Password"
                        value={enteredPassword}
                        onBlur={passwordInputOnBlurHandler}
                        onChange={passwordInputOnChangeHandler}
                        inputIsInvalid={passwordInputIsInvalid}
                        invalidMessage='Password must have at least 6 characters!'
                    />

                    <InputField
                        icon={<i className="fa-solid fa-lock"></i>}
                        type="password"
                        id='repeat-password'
                        name='repeat-password'
                        placeholder="Repeat password"
                        value={repeatPassword}
                        onBlur={repeatPasswordInputBlurHandler}
                        onChange={repeatPasswordInputOnChangeHandler}
                        inputIsInvalid={repeatPasswordInputHasError}
                        invalidMessage={`Passwords does't match!`}
                    />
                </FormCard>
            </section>
        </>
    );
};

export default RegisterPage;