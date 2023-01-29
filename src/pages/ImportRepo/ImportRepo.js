import React from "react";
import { useNavigate } from "react-router-dom";
import FormCard from "../../components/FormCard/FormCard";
import InputField from "../../components/InputField/InputField";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Modal from "../../components/Modal/Modal";
import SuccessPopUp from "../../components/SuccessPopUp/SuccessPopUp";
import AuthContext from "../../context/auth-context";
import useHttp from "../../hooks/use-http";
import useInput from "../../hooks/use-input";
import useSuccesPopUp from "../../hooks/use-successPopUp";

import './ImportRepo.styles.scss';

const ImportRepo = () => {

    const navigate = useNavigate();

    const authCtx = React.useContext(AuthContext);
    const { getUserCredentials } = authCtx;
    const { userId } = getUserCredentials();

    const { isLoading, sendRequest } = useHttp();

    const {
        modalIsOpen,
        setModalIsOpen,
        requestIsFinished,
        setRequestIsFinished } = useSuccesPopUp(() => navigate('/repositories'));

    const {
        value: repoLinkValue,
        hasError: repoLinkHasError,
        valueIsValid: repoLinkIsValid,
        onChangeHandler: repoLinkOnChangeHandler,
        onBlurHandler: repoLinkOnBlurHandler,
    } = useInput(value => value.trim().length > 0);

    const {
        value: repoNameValue,
        hasError: repoNameHasError,
        valueIsValid: repoNameIsValid,
        onChangeHandler: repoNameOnChangeHandler,
        onBlurHandler: repoNameOnBlurHandler,
    } = useInput(value => value.trim().length > 0);

    let formIsInvalid = false;

    if (!repoLinkIsValid || !repoNameIsValid) {
        formIsInvalid = true;
    }

    console.log(formIsInvalid);

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const data = { [repoNameValue]: repoLinkValue }

        const requestConfig = {
            action: 'importNewRepo',
            path: `${userId}/repos`,
            data,
        };

        const dataHandler = () => {
            setModalIsOpen(true);
            setRequestIsFinished(true);
        };

        sendRequest(requestConfig, dataHandler);
    };

    return (
        <>
            {isLoading && <LoadingSpinner />}
            {modalIsOpen && requestIsFinished && <Modal>
                <SuccessPopUp message={`Succesfuly added ${repoNameValue} to the repos`} />
            </Modal>}
            {<div className="import-repo">
                <section className="import-repo-input-wraper">
                    <FormCard submitHandler={onSubmitHandler} formTitle={'IMPORT REPO'} btnName={"Import repo"} formIsInvalid={formIsInvalid}>
                        <InputField
                            icon={<i className="fa-sharp fa-solid fa-link"></i>}
                            placeholder={'Paste repo link'}
                            type={'text'}
                            id={'input-repo-link'}
                            name={'input-repo-link'}
                            value={repoLinkValue}
                            onChange={repoLinkOnChangeHandler}
                            onBlur={repoLinkOnBlurHandler}
                            inputIsInvalid={repoLinkHasError}
                            invalidMessage='Must entered a link!'
                        />

                        <InputField
                            icon={<i className="fa-solid fa-file-signature"></i>}
                            placeholder={'Name the repo'}
                            type={'text'}
                            id={'input-repo-name'}
                            name={'input-repo-name'}
                            value={repoNameValue}
                            onChange={repoNameOnChangeHandler}
                            onBlur={repoNameOnBlurHandler}
                            inputIsInvalid={repoNameHasError}
                            invalidMessage='Must give a name for the repo!'
                        />
                    </FormCard>
                </section>
            </div>}
        </>
    );
};

export default ImportRepo;