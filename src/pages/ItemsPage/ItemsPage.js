import React from "react";
import { Outlet, Link, useNavigate, useParams, useLocation } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Item from "../../components/Item/Item";
import ItemsTableWrapper from "../../components/ItemsTableWrapper/ItemsTableWrapper";
import useHttp from "../../hooks/use-http";

import "./ItemsPage.styles.scss";
import AuthContext from "../../context/auth-context";
import Modal from "../../components/Modal/Modal";
import SuccessPopUp from "../../components/SuccessPopUp/SuccessPopUp";
import usePopUp from "../../hooks/use-popUp";
import AddItem from "../../components/AddItem/AddItem";

const ItemsPage = () => {

    const params = useParams();
    const { repoId } = params;
    const location = useLocation();
    const { repoName } = location.state || '';

    const navigate = useNavigate();
    const authCtx = React.useContext(AuthContext);
    const { isLoggedIn } = authCtx;
    const [items, setItems] = React.useState(null);
    const { isLoading, sendRequest } = useHttp();
    const [addItemModalIsOpen, setAddItemModalIsOpen] = React.useState(false);

    const addItemOnCloseHandler = () => setAddItemModalIsOpen(false);

    const prepareItems = React.useCallback(() => {
        const dataHandler = (data) => {

            let filteredData = {};
            if (data !== null) {

                filteredData = Object.keys(data).reduce((acc, item) => {
                    if (item !== 'ownerId') {
                        acc[item] = data[item];
                    }
                    return acc;
                }, {});
                setItems(filteredData);

                return;
            }
            setItems({});
        };

        const requestConfig = { action: "getRepo", path: params.repoId };
        sendRequest(requestConfig, dataHandler);
    }, [sendRequest, params.repoId]);

    const {
        modalIsOpen,
        setModalIsOpen,
        requestIsFinished,
        setRequestIsFinished } = usePopUp(prepareItems);

    React.useEffect(() => {
        prepareItems();
    }, [prepareItems]);

    if (!isLoggedIn) {
        navigate('/login');
    }


    const updateItemsQty = (item, action, quantity = null) => {
        let qty = quantity !== null ? quantity : items[item].qty;
        qty = Number(qty);

        setItems((oldItems) => {
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

        const requestConfig = { action: "updateItems", path: params.repoId, data };
        sendRequest(requestConfig, dataHandler);

    };

    const NoItemsTemplate = () => {
        return (
            <div className="inventory-items-empty">
                <h2>You don't have any items in this repositorie!</h2>
            </div>
        );
    };

    return (
        <>
            <Outlet context={[repoId, prepareItems]} />
            {addItemModalIsOpen && <AddItem
                onCloseHandler={addItemOnCloseHandler}
                repoId={repoId}
            />}
            {modalIsOpen && requestIsFinished && <Modal>
                <SuccessPopUp message={'Succesfuly saved'} />
            </Modal>}
            {isLoading && <LoadingSpinner />}
            <h1 className="inventory-items-title">Items in   <span>{repoName}</span></h1>
            <article className="inventory">
                <section className="inventory-links" >
                    <div className="add-item">
                        <Link className="inventory-links-btns add-item-btn"
                            to={`add-item`}
                            state={{ repoName: repoName }}
                        >
                            Add Item
                        </Link>
                    </div>
                    <div className="add-item">
                        <Link className="inventory-links-btns expiring-items-btn" to={`/expiring-items/${repoId}`} state={{ repoName: repoName }} >Expiring Items</Link>
                    </div>
                </section>

                {!modalIsOpen && !isLoading && items !== null && Object.entries(items).length > 0 &&
                    <ItemsTableWrapper
                        sendData={sendData.bind(null, items)}
                    >

                        {Object.entries(items).map(([item, properties]) => {
                            return (
                                <Item
                                    key={item}
                                    item={item}
                                    items={items}
                                    qty={items[item].qty}
                                    btnHandler={updateItemsQty}
                                    updateItems={prepareItems}
                                    classes={'all-items'}
                                />
                            );
                        })}
                    </ItemsTableWrapper>}
                {!isLoading && items !== null && Object.entries(items).length === 0 && <NoItemsTemplate />}
            </article>
        </>
    );
};

export default ItemsPage;
