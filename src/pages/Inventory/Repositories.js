import React from "react";
import { Outlet, Link, useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Item from "../../components/Item/Item";
import ItemsTableWrapper from "../../components/ItemsTableWrapper/ItemsTableWrapper";
import useHttp from "../../hooks/use-http";

import "./Repositories.scss";
import AuthContext from "../../context/auth-context";
import Modal from "../../components/Modal/Modal";
import SuccessPopUp from "../../components/SuccessPopUp/SuccessPopUp";
import useSuccesPopUp from "../../hooks/use-successPopUp";

const dymmyRepos = {
    "Work place": "-NMNu8oA1dPw9ibo9F2P",
    "home": "-NMNu8oA1dPw9ibo9F2P",
    "school": "-NMNu8oA1dPw9ibo9F2P",
    "Outside": "-NMNu8oA1dPw9ibo9F2P",
};

const RepositoriesPage = () => {

    const params = useParams();

    const navigate = useNavigate();
    const authCtx = React.useContext(AuthContext);
    const { isLoggedIn, getUserCredentials } = authCtx;
    const [repos, setRepos] = React.useState(null);
    const { isLoading, sendRequest } = useHttp();


    const prepareRepos = () => {
        const dataHandler = (data) => {
            if (data === null || data === '') {
                data = {};
            }

            console.log(data);
            setRepos(data);
        };

        const { userId } = getUserCredentials();

        const requestConfig = { action: "getAllRepos", path: `${userId}/repos` };
        sendRequest(requestConfig, dataHandler);
    };

    const {
        modalIsOpen,
        setModalIsOpen,
        requestIsFinished,
        setRequestIsFinished } = useSuccesPopUp(prepareRepos);

    React.useEffect(() => {
        prepareRepos();
    }, [navigate]);

    if (!isLoggedIn) {
        navigate('/login');
    }


    


    const sendData = (data) => {

        const dataHandler = () => {
            setModalIsOpen(true);
            setRequestIsFinished(true);
        };

        const requestConfig = { action: "updateItems", data };
        sendRequest(requestConfig, dataHandler);

    };

    const NoItemsTemplate = () => {
        return (
            <div className="inventory-items-empty">
                <h2>You don't have any repository!</h2>
            </div>
        );
    };

    const RepoTemplate = ({ name, repoId }) => {

        return (
            <div className="repo-card">
                <div className="repo-name" >
                    <Link to={`/inventory/${repoId}`} >{name}</Link>
                </div>
                <section className="repo-btns" >
                    <div className="repo-btn-share" >
                        <button>Share Repo</button>
                    </div>
                    <div className="repo-btn-delete" >
                        <button>DELETE</button>
                    </div>
                </section>
            </div>
        );
    };


    return (
        <>
            <Outlet context={[prepareRepos]} />
            {modalIsOpen && requestIsFinished && <Modal>
                <SuccessPopUp message={'Succesfuly saved'} />
            </Modal>}
            {isLoading && <LoadingSpinner />}
            <h1 className="inventory-items-title">Repositories</h1>
            <article className="inventory">
                <div className="add-item">
                    <Link className="add-item-btn" to={'add-repo'} >Add Repo</Link>
                </div>
                {!isLoading && repos !== null && Object.entries(repos).length > 0 &&

                    <section className="repositories-wrapper">
                        {Object.entries(repos).map(([name, id]) => {
                            return (
                                <RepoTemplate
                                    name={name}
                                    repoId={id}
                                />
                            );
                        })}
                    </section>}
                {!isLoading && repos !== null && Object.entries(repos).length === 0 && <NoItemsTemplate />}
            </article>
        </>
    );
};

export default RepositoriesPage;
