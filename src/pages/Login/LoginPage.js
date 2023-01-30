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
import useSuccesPopUp from "../../hooks/use-successPopUp";
import ErrorPopUp from "../../components/ErrorPopUp/ErrorPopUp";



const emailValidator = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const LoginPage = () => {

    const navigate = useNavigate();
    const [formIsInvalid, setFormIsInvalid] = React.useState(false);
    const { isLoading, sendRequest: requestLogin, error: requestError } = useHttp();
    const authCtx = React.useContext(AuthContext);

    // const navigateToHome = () => navigate('/');

    const afterRequestHandeled = () => {
        if (requestError) {
            setFormIsInvalid(true);
            navigate('/login');
        } else {
            navigate('/');
        }
    };

    const {
        modalIsOpen,
        setModalIsOpen,
        requestIsFinished,
        setRequestIsFinished } = useSuccesPopUp(afterRequestHandeled);

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
    } = useInput(value => value.trim().length >= 6);


    // let formIsInvalid = false;

    React.useEffect(() => {
        if (!enteredEmailIsValid || !enteredPasswordIsValid) {
            setFormIsInvalid(true);
        } else {
            setFormIsInvalid(false);
        }
    },[enteredEmailIsValid, enteredPasswordIsValid]);

    // if (!enteredEmailIsValid || !enteredPasswordIsValid) {
    //     formIsInvalid = true;
    // }

    const loginHandler = (userData) => {
        authCtx.login(userData.idToken, userData.localId, userData.email);
        setModalIsOpen(true);
        setRequestIsFinished(true);
    };

    const errorHandler = (err) => {
        setModalIsOpen(true);
        setRequestIsFinished(true);
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
            {modalIsOpen && requestIsFinished &&
                <Modal>
                    {requestError !== null && <ErrorPopUp message={requestError} />}
                    {requestError === null && <SuccessPopUp message={'Succesfuly logged in'} />}
                </Modal>}
            <section className="login-form-wrapper">
                {isLoading && <LoadingSpinner />}
                <FormCard submitHandler={submitHandler} formTitle={'LOG IN'} btnName={"Login"} formIsInvalid={formIsInvalid}>

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