import React from "react";
import FormCard from "../FormCard/FormCard";
import InputField from "../InputField/InputField";
import useInput from "../../hooks/use-input";
import useHttp from "../../hooks/use-http";

import './AddRepo.styles.scss';
import { useNavigate, useOutletContext } from "react-router-dom";
import Modal from "../Modal/Modal";
import SuccessPopUp from "../SuccessPopUp/SuccessPopUp";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import usePopUp from "../../hooks/use-popUp";
import AuthContext from "../../context/auth-context";

const AddRepo = () => {

    const [prepareRepos] = useOutletContext();

    const navigate = useNavigate();
    const { isLoading, sendRequest } = useHttp();
    const { sendRequest: requestUpdateUserRepos } = useHttp();
    const { getUserCredentials } = React.useContext(AuthContext);

    const { userId } = getUserCredentials();

    const navigateToInventory = () => {
        navigate(`/repositories`);
        prepareRepos();
    };

    const {
        modalIsOpen,
        setModalIsOpen,
        requestIsFinished,
        setRequestIsFinished } = usePopUp(navigateToInventory);

    const formWrapperOnClickHandler = (e) => {
        if (e.target.className !== 'add-repo-wrapper') {
            return;
        }
        navigate(-1);
    }

    const {
        value: enteredRepo,
        hasError: repoInputIsInvalid,
        onChangeHandler: repoInputChangeHandler,
        onBlurHandler: repoInputOnBlurHandler,
    } = useInput(value => value.trim().length > 0);

    let formIsInvalid = repoInputIsInvalid || !enteredRepo

    const submitHandler = (e) => {
        e.preventDefault();

        if (repoInputIsInvalid || !enteredRepo) {
            return;
        }


        const requestConfig = {
            action: 'postNewRepo',
            data: {"ownerId": userId},
        };

        const dataHandler = (data) => {
            console.log(data);
            const newData = {
                [data.name]: enteredRepo,
            };
            console.log(newData);
            const requestConfig = {
                action: 'updateUserRepos',
                path: `${userId}/repos`,
                data: newData,
            };
            requestUpdateUserRepos(requestConfig, () => console.log('Success'));

            setModalIsOpen(true);
            setRequestIsFinished(true);
        };

        sendRequest(requestConfig, dataHandler);
    };

    return (
        <>
            {isLoading && <LoadingSpinner />}
            {modalIsOpen && requestIsFinished && <Modal>
                <SuccessPopUp message={`Succesfuly added ${enteredRepo} to the repos`} />
            </Modal>}

            <div className="add-repo-wrapper" onClick={formWrapperOnClickHandler}>
                <FormCard
                    submitHandler={submitHandler}
                    formTitle='ADD REPO'
                    btnName='ADD'
                    formIsInvalid={formIsInvalid}
                >
                    <InputField
                        icon={<i className="fa-sharp fa-solid fa-cube"></i>}
                        type="text"
                        id='new-repo'
                        name='new-repo'
                        placeholder="Enter new repo"
                        value={enteredRepo}
                        onChange={repoInputChangeHandler}
                        onBlur={repoInputOnBlurHandler}
                        inputIsInvalid={repoInputIsInvalid}
                        invalidMessage='Must enter a name!'
                    />

                </FormCard>
            </div>
        </>
    );
};

export default AddRepo;