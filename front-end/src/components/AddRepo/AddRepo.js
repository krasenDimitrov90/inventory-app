import React from "react";
import useHttp from "../../hooks/use-http";

import './AddRepo.styles.scss';
import Modal from "../Modal/Modal";
import SuccessPopUp from "../SuccessPopUp/SuccessPopUp";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import usePopUp from "../../hooks/use-popUp";
import AuthContext from "../../context/auth-context";

const AddRepo = () => {

    const { isLoading, sendRequest } = useHttp();
    const { sendRequest: requestUpdateUserRepos } = useHttp();
    const { getUserCredentials } = React.useContext(AuthContext);
    const repoInputRef = React.useRef();

    const { userId } = getUserCredentials();


    const {
        modalIsOpen,
        setModalIsOpen,
        requestIsFinished,
        setRequestIsFinished } = usePopUp(() => console.log('Success'));



    const submitHandler = (e) => {
        e.preventDefault();


        if (repoInputRef.current.value.trim().length === 0) {
            return;
        }

        const requestConfig = {
            action: 'postNewRepo',
            data: { "ownerId": userId },
        };

        const dataHandler = (data) => {
            const newData = {
                [data.name]: repoInputRef.current.value,
            };
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
                <SuccessPopUp message={`Succesfuly added  to the repos`} />
            </Modal>}
            <div className="add-repo-form rounded-[20px] flex border-[1px] border-[#2f80ed] ">
                <form onSubmit={submitHandler} className="flex justify-between w-[100%]">
                    <input ref={repoInputRef} className="add-repo-input ml-[10px] bg-[transparent] outline-none" type="text" placeholder="Enter repo name" />
                    <button className="add-repo-btn text-[14px] bg-[#2f80ed] rounded-tr-[20px] rounded-br-[20px] p-[8px]">ADD REPO</button>
                </form>
            </div>
        </>
    );
};

export default AddRepo;