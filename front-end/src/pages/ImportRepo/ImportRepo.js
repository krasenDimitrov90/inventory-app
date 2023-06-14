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
import usePopUp from "../../hooks/use-popUp";
import svg from "../../SVG";

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
        setRequestIsFinished } = usePopUp(() => navigate('/repositories'));

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


    const onSubmitHandler = (e) => {
        e.preventDefault();

        const data = {
            repoId: repoLinkValue,
            repoName: repoNameValue,
        }

        const requestConfig = {
            action: 'importNewRepo',
            path: `repos/import-repo`,
            data: data,
            isAuth: true,
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
                    <FormCard submitHandler={onSubmitHandler} formIsInvalid={formIsInvalid}>
                        <div className="actions-item-svg-wrapper">
                            <div>
                                <svg.Cloud />
                            </div>
                        </div>
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
                            invalidMessage={`${repoLinkValue.trim().length === 0 ? 'Must enter a repo link' : `There's no such repo!`}`}
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
                        <button disabled={formIsInvalid} className="disabled:opacity-30" >Import</button>
                    </FormCard>
                </section>
            </div>}
        </>
    );
};

export default ImportRepo;