import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import Item from "../../components/Item/Item";
import ItemsTableWrapper from "../../components/ItemsTableWrapper/ItemsTableWrapper";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import AuthContext from "../../context/auth-context";
import useHttp from "../../hooks/use-http";

import './ExpiringItems.styles.scss';
import SuccessPopUp from "../../components/SuccessPopUp/SuccessPopUp";
import useSuccesPopUp from "../../hooks/use-successPopUp";

const ExpiringItemsPage = () => {

    const params = useParams();

    const navigate = useNavigate();
    const [expiringItems, setExpiringItems] = React.useState(null);
    const authCtx = React.useContext(AuthContext);
    const { isLoggedIn } = authCtx;
    const { isLoading, sendRequest, } = useHttp();
    const location = useLocation();
    const { repoName } = location.state;

    React.useEffect(() => {
        prepareExpiringItems();
    }, [navigate]);

    const prepareExpiringItems = () => {

        const dataHandler = (data) => {
            filterItems(data);
        };

        const requestConfig = { action: "getRepo", path: params.repoId };
        sendRequest(requestConfig, dataHandler);
    };

    const {
        modalIsOpen,
        setModalIsOpen,
        requestIsFinished,
        setRequestIsFinished } = useSuccesPopUp(prepareExpiringItems);


    if (!isLoggedIn) {
        navigate('/login');
    }

    const filterItems = (items) => {
        const filteredItems = Object.keys(items).reduce((acc, item) => {

            if (item !== 'ownerId') {
                const quantity = Number(items[item].qty);
                const minQuantity = Number(items[item]['min-qty']);
    
                if (quantity < minQuantity) {
                    acc[item] = items[item];
                }
            }
            return acc;
        }, {});

        setExpiringItems(filteredItems);
    }

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

        const requestConfig = { action: "updateItems", path: params.repoId, data };
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
                <SuccessPopUp message={'Seccessfuly saved'} />
            </Modal>}

            <h1 className="expiring-items-title">{repoName} - items that expiring soon</h1>
            {!modalIsOpen && !isLoading && expiringItems !== null && Object.keys(expiringItems).length > 0 &&
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