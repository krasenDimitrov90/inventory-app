import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
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
    "Work place": "asdasdadadadd",
    "home": "asdasdadadadd",
    "school": "asdasdadadadd",
    "Outside": "asdasdadadadd",
};

const RepositoriesPage = () => {

    const navigate = useNavigate();
    const authCtx = React.useContext(AuthContext);
    const { isLoggedIn, getUserCredentials } = authCtx;
    const [repos, setRepos] = React.useState(null);
    const { isLoading, sendRequest } = useHttp();


    const prepareItems = () => {
        const dataHandler = (data) => {
            if (data === null || data === '') {
                data = {};
            }

            console.log(data);
            setRepos(data);
        };

        const { userId } = getUserCredentials();

        const requestConfig = { action: "getAllRepos", path: `/${userId}/inventar` };
        sendRequest(requestConfig, dataHandler);
    };

    const {
        modalIsOpen,
        setModalIsOpen,
        requestIsFinished,
        setRequestIsFinished } = useSuccesPopUp(prepareItems);

    React.useEffect(() => {
        prepareItems();
    }, [navigate]);

    if (!isLoggedIn) {
        navigate('/login');
    }


    const updateItemsQty = (item, action, quantity = null) => {
        let qty = quantity !== null ? quantity : repos[item].qty;
        qty = Number(qty);

        setRepos((oldItems) => {
            const newItems = { ...oldItems };
            if (action === 'add') {
                newItems[item].qty = Number(qty) + 1;

            } else if (action === 'subtract') {
                if (qty - 1 < 0) {
                    return;
                }
                newItems[item].qty = Number(qty) - 1;

            } else if (action === 'update') {
                if (qty < 0) {
                    return;
                }
                newItems[item].qty = Number(qty);
            }
            return newItems;
        });

    };


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

    const RepoTemplate = ({ name }) => {

        return (
            <div className="repo-card">
                <div className="repo-name" >
                    <h3>{name}</h3>
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
            <Outlet context={[prepareItems]} />
            {modalIsOpen && requestIsFinished && <Modal>
                <SuccessPopUp message={'Succesfuly saved'} />
            </Modal>}
            {isLoading && <LoadingSpinner />}
            <h1 className="inventory-items-title">Repositories</h1>
            <article className="inventory">
                <div className="add-item">
                    <Link className="add-item-btn" to={'add-item'} >Add Repo</Link>
                </div>
                {!isLoading && dymmyRepos !== null && Object.entries(dymmyRepos).length > 0 &&

                    <section className="repositories-wrapper">
                        {Object.entries(dymmyRepos).map(([name, id]) => {
                            return (
                                <RepoTemplate
                                    name={name}
                                />
                            );
                        })}
                    </section>}
                {!isLoading && dymmyRepos !== null && Object.entries(dymmyRepos).length === 0 && <NoItemsTemplate />}
            </article>
        </>
    );
};

export default RepositoriesPage;
