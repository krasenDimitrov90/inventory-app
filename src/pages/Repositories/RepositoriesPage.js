import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import useHttp from "../../hooks/use-http";

import "./RepositoriesPage.scss";
import AuthContext from "../../context/auth-context";
import Repo from "../../components/Repo/Repo";


const RepositoriesPage = () => {


    const navigate = useNavigate();
    const authCtx = React.useContext(AuthContext);
    const { isLoggedIn, getUserCredentials } = authCtx;
    const { userId } = getUserCredentials();
    const [repos, setRepos] = React.useState(null);
    const { isLoading, sendRequest } = useHttp();


    const prepareRepos = React.useCallback(() => {
        const dataHandler = (data) => {
            if (data === null || data === '') {
                data = {};
            }

            setRepos(data);
        };


        const requestConfig = { action: "getAllUserRepos", path: `${userId}/repos` };
        sendRequest(requestConfig, dataHandler);
    },[sendRequest, userId]);

    React.useEffect(() => {
        prepareRepos();
    }, [prepareRepos]);

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


    return (
        <>
            <Outlet context={[prepareRepos]} />
            {isLoading && <LoadingSpinner />}
            <h1 className="repositories-items-title">Repositories</h1>
            <article className="repositories">
                <div className="add-repositorie">
                    <Link className="add-repositorie-btn" to={'add-repo'} >Add Repo</Link>
                </div>
                {!isLoading && repos !== null && Object.entries(repos).length > 0 &&

                    <section className="repositories-wrapper">
                        {Object.entries(repos).map(([id, name]) => {
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
