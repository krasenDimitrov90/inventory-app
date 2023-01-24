import React from "react";
import AuthContext from "../../context/auth-context";
import useInput from "../../hooks/use-input";
import { useNavigate } from "react-router-dom";
import './LoginPage.css';
import useHttp from "../../hooks/use-http";
import FormCard from "../../components/FormCard/FormCard";
import InputField from "../../components/InputField/InputField";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Modal from "../../components/Modal/Modal";
import SuccessPopUp from "../../components/SuccessPopUp/SuccessPopUp";



const emailValidator = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const LoginPage = () => {

    const navigate = useNavigate();

    const [modalIsOpen, setModalIsOpen] = React.useState(false);
    const [requestIsFinished, setRequestIsFinished] = React.useState(false);

    const popUpOnCloseHandler = () => {
        setRequestIsFinished(false);
        setModalIsOpen(false);
        navigate('/');
    };

    const { isLoading, sendRequest: requestLogin } = useHttp();

    const authCtx = React.useContext(AuthContext);

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
    } = useInput(value => value.trim().length >= 6);

    const loginHandler = (userData) => {
        authCtx.login(userData.idToken, userData.localId, userData.email);
        setModalIsOpen(true);
        setRequestIsFinished(true);
    };

    const errorHandler = (err) => {
        alert(err);
    };

    const submitHandler = (e) => {
        e.preventDefault();

        if (!enteredEmailIsValid) {
            return;
        }
        if (!enteredPasswordIsValid) {
            return;
        }

        const data = {
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
        };

        const requestConfig = {
            action: 'login',
            data: data,
        };

        requestLogin(requestConfig, loginHandler, errorHandler);

        resetEmailInput();
        resetPasswordInput();
    };


    return (
        <>
            {modalIsOpen && requestIsFinished && <Modal>
                <SuccessPopUp onClick={popUpOnCloseHandler} message={'Succesfuly logged in'} />
            </Modal> }
            <section className="login-form-wrapper">
                {isLoading && <LoadingSpinner />}
                <FormCard submitHandler={submitHandler} formTitle={'LOG IN'} btnName={"Login"}>

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
                        invalidMessage='Incorect password!'
                    />

                </FormCard>
            </section>
        </>
    );
};

export default LoginPage;