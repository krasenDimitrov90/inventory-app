import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Item from "../../components/Item/Item";
import ItemsTableWrapper from "../../components/ItemsTableWrapper/ItemsTableWrapper";
import useHttp from "../../hooks/use-http";

import "./InventoryPage.scss";
import AuthContext from "../../context/auth-context";
import Modal from "../../components/Modal/Modal";
import SuccessPopUp from "../../components/SuccessPopUp/SuccessPopUp";
import useSuccesPopUp from "../../hooks/use-successPopUp";

const InventoryPage = () => {

    const navigate = useNavigate();
    const authCtx = React.useContext(AuthContext);
    const { isLoggedIn } = authCtx;
    const [items, setItems] = React.useState(null);
    const { isLoading, sendRequest } = useHttp();


    const prepareItems = () => {
        const dataHandler = (data) => {
            if (data === null) {
                data = {};
            }
            setItems(data);
        };

        const requestConfig = { action: "getAllItems" };
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

        const requestConfig = { action: "updateItems", data };
        sendRequest(requestConfig, dataHandler);

    };

    const NoItemsTemplate = () => {
        return (
            <div className="inventory-items-empty">
                <h2>You don't have any items in the inventory!</h2>
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
            <h1 className="inventory-items-title">Inventory</h1>
            <article className="inventory">
                <div className="add-item">
                    <Link className="add-item-btn" to={'add-item'} >Add Item</Link>
                </div>
                {!isLoading && items !== null && Object.entries(items).length > 0 && <ItemsTableWrapper
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
                            />
                        );
                    })}
                </ItemsTableWrapper>}
                {!isLoading && items !== null && Object.entries(items).length === 0 && <NoItemsTemplate />}
            </article>
        </>
    );
};

export default InventoryPage;
