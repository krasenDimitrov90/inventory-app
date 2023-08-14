import React from "react";
import FormCard from "../FormCard/FormCard";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import SuccessPopUp from "../SuccessPopUp/SuccessPopUp";
import Modal from "../Modal/Modal";
import useInput from "../../hooks/use-input";
import svg from "../../SVG";
import InputField from "../InputField/InputField";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import usePopUp from "../../hooks/use-popUp";
import AuthContext from "../../context/auth-context";

const EditRepo = () => {

    const [prepareRepos] = useOutletContext();
    const { repoId } = useParams();
    const navigate = useNavigate();
    const { isLoading, sendRequest } = useHttp();

    const { getUserCredentials } = React.useContext(AuthContext);
    const { userId } = getUserCredentials();


    const formWrapperOnClickHandler = (e) => {
        if (e.target.className !== 'actions-item-wrapper') {
            return;
        }
        navigate(-1);
    }

    const navigateToRepositories = () => {
        navigate(`/repositories`);
        prepareRepos();
    };

    const {
        modalIsOpen,
        setModalIsOpen,
        requestIsFinished,
        setRequestIsFinished } = usePopUp(navigateToRepositories);


    const {
        value: enteredRepo,
        hasError: repoInputIsInvalid,
        onChangeHandler: repoInputChangeHandler,
        onBlurHandler: repoInputOnBlurHandler,
    } = useInput(value => value.trim().length > 0);


    let formIsInvalid = repoInputIsInvalid || !enteredRepo;

    const submitHandler = (e) => {
        e.preventDefault();

        if (repoInputIsInvalid || !enteredRepo) return;

        console.log({ enteredRepo, repoId });
        console.log(`users/${userId}/repos/${repoId}`);

        const data = {
            name: enteredRepo
        };

        console.log(data);

        const requestConfig = {
            action: 'editRepo',
            path: `repos/${repoId}`,
            data: data,
            isAuth: true,
        };

        const dataHandler = (data) => {
            setModalIsOpen(true);
            setRequestIsFinished(true);
        };

        sendRequest(requestConfig, dataHandler);
    };

    return (
        <>
            {isLoading && <LoadingSpinner />}
            {modalIsOpen && requestIsFinished && <Modal>
                <SuccessPopUp message={`Succesfuly updated!`} />
            </Modal>}

            <div className="actions-item-wrapper" onClick={formWrapperOnClickHandler}>
                <FormCard
                    submitHandler={submitHandler}
                    formTitle='ADD ITEM'
                    btnName='ADD'
                    formIsInvalid={formIsInvalid}
                >
                    <div className="actions-item-svg-wrapper">
                        <div>
                            <svg.Update />
                        </div>
                    </div>
                    <InputField
                        type="text"
                        id='repo-name'
                        name='repo-name'
                        placeholder="Enter new name"
                        value={enteredRepo}
                        onChange={repoInputChangeHandler}
                        onBlur={repoInputOnBlurHandler}
                        inputIsInvalid={repoInputIsInvalid}
                        invalidMessage='Must enter an valid name!'
                    />
                    <button disabled={formIsInvalid} className="disabled:opacity-30" >EDIT</button>
                </FormCard>
            </div>
        </>
    );
};

export default EditRepo;