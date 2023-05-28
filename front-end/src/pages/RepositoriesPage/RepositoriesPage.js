import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import useHttp from "../../hooks/use-http";

import "./RepositoriesPage.scss";
import AuthContext from "../../context/auth-context";
import Repo from "../../components/Repo/Repo";
import usePopUp from "../../hooks/use-popUp";
import Modal from "../../components/Modal/Modal";
import SuccessPopUp from "../../components/SuccessPopUp/SuccessPopUp";


const RepositoriesPage = () => {

    const { sendRequest: requestUpdateUserRepos } = useHttp();
    const repoInputRef = React.useRef();
    const formRef = React.useRef();


    const navigate = useNavigate();
    const authCtx = React.useContext(AuthContext);
    const { isLoggedIn, getUserCredentials } = authCtx;
    const { userId } = getUserCredentials();
    const [repos, setRepos] = React.useState(null);
    const { isLoading, sendRequest } = useHttp();

    const {
        modalIsOpen,
        setModalIsOpen,
        requestIsFinished,
        setRequestIsFinished } = usePopUp(() => console.log('Success'));


    const dataHandler = React.useCallback((data) => {
        if (data === null || data === '') {
            data = {};
        }
        setRepos(data);
    }, []);


    const prepareRepos = React.useCallback(() => {
        const requestConfig = { action: "getAllUserRepos", path: `${userId}/repos` };
        sendRequest(requestConfig, dataHandler);
    }, [sendRequest, userId, dataHandler]);


    React.useEffect(() => {
        prepareRepos();
    }, []);

    if (!isLoggedIn) {
        navigate('/login');
    }


    const NoReposTemplate = () => {
        return (
            <div className="repositorie-items-empty">
                <h2>You don't have any repository!</h2>
            </div>
        );
    };



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
                [data.name]:{ name: repoInputRef.current.value,}
            };
            const requestConfig = {
                action: 'updateUserRepos',
                path: `${userId}/repos`,
                data: newData,
            };
            requestUpdateUserRepos(requestConfig, () => prepareRepos());

            setModalIsOpen(true);
            setRequestIsFinished(true);
            repoInputRef.current.value = '';
            repoInputRef.current.blur();
        };

        sendRequest(requestConfig, dataHandler);
    };


    return (
        <>
            <Outlet context={[prepareRepos]} />
            {isLoading && <LoadingSpinner />}
            {modalIsOpen && requestIsFinished && <Modal>
                <SuccessPopUp message={`Succesfuly added ${repoInputRef.current.value} to the repos`} />
            </Modal>}
            <main className="main">
                <div className="px-[20px]" >
                    <div className="repositories-header ">
                        <div className="flex">
                            <p className="mr-[10px]">Repositories</p>
                        </div>
                        <div className="add-repo-form rounded-[20px] flex border-[1px] border-[#2f80ed] ">
                            <form ref={formRef} onSubmit={submitHandler} className="flex justify-between w-[100%]">
                                <input ref={repoInputRef} className="add-repo-input ml-[10px] bg-[transparent] outline-none" type="text" placeholder="Enter repo name"
                                  
                                 />
                                <button className="add-repo-btn text-[14px] bg-[#2f80ed] rounded-tr-[20px] rounded-br-[20px] p-[8px]">ADD REPO</button>
                            </form>
                        </div>
                    </div>
                </div>
                {!isLoading && repos !== null && Object.entries(repos).length > 0 &&
                    <div className="flex flex-col p-[20px]">
                        <div>
                            <ul className="main-list">
                                <li className="table-header-items">TITLE</li>
                                <li className="table-header-items">ACTIONS</li>
                            </ul>
                            {Object.entries(repos).map(([id, props]) => {
                                return (
                                    <Repo
                                        key={id}
                                        repoName={props.name}
                                        repoId={id}
                                        userId={userId}
                                        onRemoveRepo={() => prepareRepos()}
                                    />
                                );
                            })}
                        </div>
                    </div>}
                {!isLoading && repos !== null && Object.entries(repos).length === 0 && <NoReposTemplate />}
            </main>
        </>
    );
};

export default RepositoriesPage;
