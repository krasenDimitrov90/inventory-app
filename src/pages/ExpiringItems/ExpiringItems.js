import React from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import Item from "../../components/Item/Item";
import ItemsTableWrapper from "../../components/ItemsTableWrapper/ItemsTableWrapper";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import AuthContext from "../../context/auth-context";
import useHttp from "../../hooks/use-http";

import './ExpiringItems.styles.scss';
import SuccessPopUp from "../../components/SuccessPopUp/SuccessPopUp";

const ExpiringItemsPage = () => {

    const navigate = useNavigate();

    const [modalIsOpen, setModalIsOpen] = React.useState(false);
    const [requestIsFinished, setRequestIsFinished] = React.useState(false);

    const authCtx = React.useContext(AuthContext);
    const { isLoggedIn } = authCtx;

    const popUpOnCloseHandler = () => {
        setRequestIsFinished(false);
        setModalIsOpen(false);
        prepareExpiringItems();
    };

    if (!isLoggedIn) {
        navigate('/login');
    }

    const [expiringItems, setExpiringItems] = React.useState(null);

    const {
        isLoading,
        sendRequest,
    } = useHttp();

    const filterItems = (items) => {
        const filteredItems = Object.keys(items).reduce((acc, item) => {

            const quantity = Number(items[item].qty);
            const minQuantity = Number(items[item]['min-qty']);

            if (quantity < minQuantity) {
                acc[item] = items[item];
            }
            return acc;
        }, {});

        setExpiringItems(filteredItems);
    }

    const prepareExpiringItems = () => {

        const dataHandler = (data) => {
            filterItems(data);
        };

        const requestConfig = { action: "getAllItems" };
        sendRequest(requestConfig, dataHandler);
    };

    React.useEffect(() => {
        prepareExpiringItems();
    }, []);

    const updateItemsQty = (item, action, quantity = null) => {

        let qty = quantity !== null ? quantity : expiringItems[item].qty;
        qty = Number(qty);

        setExpiringItems((oldItems) => {
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

    const sendUpdatedItems = (data) => {

        const dataHandler = () => {
            setModalIsOpen(true);
            setRequestIsFinished(true);
        };

        const requestConfig = { action: "updateItems", data };
        sendRequest(requestConfig, dataHandler);
    };

    const NoItemsTemplate = () => {
        return (
            <div className="expiring-items-empty">
                <h2>You have enough items for work!</h2>
            </div>
        );
    };

    return (
        <>
            {isLoading && <LoadingSpinner />}
            {modalIsOpen && requestIsFinished && <Modal>
                <SuccessPopUp onClick={popUpOnCloseHandler} message={'Seccessfuly saved'} />
            </Modal>}

            <h1 className="expiring-items-title">Expiring Items</h1>
            {!isLoading && expiringItems !== null && Object.keys(expiringItems).length > 0 &&
                <ItemsTableWrapper
                    sendData={sendUpdatedItems.bind(null, expiringItems)}
                >
                    {Object.entries(expiringItems).map(([item, itemProps]) => {
                        return (

                            <Item
                                expiring={true}
                                key={item}
                                item={item}
                                items={expiringItems}
                                qty={itemProps.qty}
                                btnHandler={updateItemsQty}
                                updateItems={prepareExpiringItems}
                            />
                        );
                    })}
                </ItemsTableWrapper>
            }
            {!isLoading && expiringItems !== null && Object.keys(expiringItems).length === 0 && <NoItemsTemplate />}
        </>
    );
};

export default ExpiringItemsPage;