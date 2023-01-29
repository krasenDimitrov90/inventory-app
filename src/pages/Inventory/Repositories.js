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
import Repo from "./Repo";

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
    const { userId } = getUserCredentials();
    const [repos, setRepos] = React.useState(null);
    const { isLoading, sendRequest } = useHttp();
    const [removeRepoModalIsOpen, setRemoveRepoModalIsOpen] = React.useState(false);


    const prepareRepos = () => {
        const dataHandler = (data) => {
            if (data === null || data === '') {
                data = {};
            }

            setRepos(data);
        };


        const requestConfig = { action: "getAllRepos", path: `${userId}/repos` };
        sendRequest(requestConfig, dataHandler);
    };

    const {
        successModalIsOpen,
        setSuccessModalIsOpen,
        requestIsFinished,
        setRequestIsFinished } = useSuccesPopUp(prepareRepos);

    React.useEffect(() => {
        prepareRepos();
    }, [navigate]);

    if (!isLoggedIn) {
        navigate('/login');
    }



    // const requestDeleteRrepo = (repoName, repoId) => {

    //     const dataHandler = () => {
    //         const requestConfig = {
    //             action: "deleteUserRepo",
    //             path: `${userId}/repos/${repoName}`,
    //             data: {},
    //         };
    //         sendRequest(requestConfig, () => console.log('Success'));

    //         setSuccessModalIsOpen(true);
    //         setRequestIsFinished(true);
    //     };

    //     const requestConfig = {
    //         action: "deleteRepo",
    //         path: repoId,
    //         data: {},
    //     };
    //     sendRequest(requestConfig, dataHandler);

    // };

    const NoReposTemplate = () => {
        return (
            <div className="inventory-items-empty">
                <h2>You don't have any repository!</h2>
            </div>
        );
    };

    // const RepoTemplate = ({ repoName, repoId }) => {

    //     return (
    //         <>
    //             {!removeRepoModalIsOpen && requestIsFinished && <Modal >
    //                 <SuccessPopUp message={`Succesfuly removed ${repoName} from inventory`} />
    //             </Modal>}
    //             {removeRepoModalIsOpen && !requestIsFinished && <Modal onClose={() => setRemoveRepoModalIsOpen(false)} >
    //                 <div className="confirm-action">
    //                     <div className="confirm-action-message">
    //                         <h3>Are you shure you want to delete {`${repoName}, ${repoId}`}</h3>
    //                     </div>
    //                     <div className="confirm-action-btns">
    //                         <div className="confirm-action-btns-card">
    //                             <button className="confirm-action-btns-cancel" onClick={() => setRemoveRepoModalIsOpen(false)} >Cancel</button>
    //                         </div>
    //                         <div className="confirm-action-btns-card">
    //                             <button className="confirm-action-btns-yes" onClick={requestDeleteRrepo.bind(null,repoName, repoId)} >YES</button>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </Modal>}
    //             <div className="repo-card">
    //                 <div className="repo-name" >
    //                     <Link to={`/inventory/${repoId}`} state={{ repoName: repoName }}>{repoName}</Link>
    //                 </div>
    //                 <section className="repo-btns" >
    //                     <div className="repo-btn-share" >
    //                         <button>Share Repo</button>
    //                     </div>
    //                     <div className="repo-btn-delete" >
    //                         <button onClick={() => setRemoveRepoModalIsOpen(true)} >DELETE</button>
    //                     </div>
    //                 </section>
    //             </div>
    //         </>
    //     );
    // };


    return (
        <>
            <Outlet context={[prepareRepos]} />
            {/* {successModalIsOpen && requestIsFinished && <Modal>
                <SuccessPopUp message={'Succesfuly saved'} />
            </Modal>} */}
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
                                <Repo
                                    key={id}
                                    repoName={name}
                                    repoId={id}
                                    userId={userId}
                                    onRemoveRepo={() => prepareRepos()}
                                />
                            );
                        })}
                    </section>}
                {!isLoading && repos !== null && Object.entries(repos).length === 0 && <NoReposTemplate />}
            </article>
        </>
    );
};

export default RepositoriesPage;
