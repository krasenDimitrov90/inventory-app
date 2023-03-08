import React from "react";
import AuthContext from "../../context/auth-context";
import { Link, useNavigate } from "react-router-dom";
import './LoginPage.scss';
import useInput from "../../hooks/use-input";
import useHttp from "../../hooks/use-http";
import usePopUp from "../../hooks/use-popUp";
import FormCard from "../../components/FormCard/FormCard";
import InputField from "../../components/InputField/InputField";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Modal from "../../components/Modal/Modal";
import SuccessPopUp from "../../components/SuccessPopUp/SuccessPopUp";
import ErrorPopUp from "../../components/ErrorPopUp/ErrorPopUp";



const emailValidator = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const LoginPage = () => {

    const navigate = useNavigate();
    const [formIsInvalid, setFormIsInvalid] = React.useState(false);
    const { isLoading, sendRequest: requestLogin, error: requestError } = useHttp();
    const authCtx = React.useContext(AuthContext);


    const afterRequestFinished = () => {
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
    } = useInput(value => value.trim().length >= 6);


    React.useEffect(() => {
        if (!enteredEmailIsValid || !enteredPasswordIsValid) {
            setFormIsInvalid(true);
        } else {
            setFormIsInvalid(false);
        }
    }, [enteredEmailIsValid, enteredPasswordIsValid]);


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
            <div className="login w-[100vw] h-[100vh] flex justify-center items-center">
                <img src="https://digitalworkforce.com/wp-content/uploads/2017/11/repository-1.jpg" alt="" />
                <div className="flex ">
                    {isLoading && <LoadingSpinner />}
                    <FormCard submitHandler={submitHandler} >
                        <InputField
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
                        <button disabled={formIsInvalid} className="disabled:opacity-30" >SIGN IN</button>
                        <span className="mb-[18px]">
                            <p>Don't have an account?
                                <Link className=" text-[#2f72b9]" to="/register"> Sign up!</Link>
                            </p>
                        </span>
                        {/* <span className="mb-[30px] text-[#2f72b9]"><Link to="/">Forgot password?</Link></span> */}
                    </FormCard>
                </div>
            </div>
        </>
    );
};

export default LoginPage;