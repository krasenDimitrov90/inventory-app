import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import useHttp from "../../hooks/use-http";

import "./Repositories.scss";
import AuthContext from "../../context/auth-context";
import Repo from "./Repo";


const RepositoriesPage = () => {


    const navigate = useNavigate();
    const authCtx = React.useContext(AuthContext);
    const { isLoggedIn, getUserCredentials } = authCtx;
    const { userId } = getUserCredentials();
    const [repos, setRepos] = React.useState(null);
    const { isLoading, sendRequest } = useHttp();


    const prepareRepos = () => {
        const dataHandler = (data) => {
            if (data === null || data === '') {
                data = {};
            }

            setRepos(data);
        };


        const requestConfig = { action: "getAllUserRepos", path: `${userId}/repos` };
        sendRequest(requestConfig, dataHandler);
    };

    React.useEffect(() => {
        prepareRepos();
    }, [navigate]);

    if (!isLoggedIn) {
        navigate('/login');
    }


    const NoReposTemplate = () => {
        return (
            <div className="inventory-items-empty">
                <h2>You don't have any repository!</h2>
            </div>
        );
    }; 


    return (
        <>
            <Outlet context={[prepareRepos]} />
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
