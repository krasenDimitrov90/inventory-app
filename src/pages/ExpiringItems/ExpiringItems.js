import React from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import Item from "../../components/Item/Item";
import ItemsTableWrapper from "../../components/ItemsTableWrapper/ItemsTableWrapper";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import AuthContext from "../../context/auth-context";
import useHttp from "../../hooks/use-http";

import './ExpiringItems.styles.scss';
import SuccessPopUp from "../../components/SuccessPopUp/SuccessPopUp";
import usePopUp from "../../hooks/use-popUp";

const ExpiringItemsPage = () => {

    const params = useParams();

    const navigate = useNavigate();
    const [expiringItems, setExpiringItems] = React.useState(null);
    const [itemsCount, setItemsCount] = React.useState(null);
    const authCtx = React.useContext(AuthContext);
    const { isLoggedIn } = authCtx;
    const { isLoading, sendRequest, } = useHttp();
    const location = useLocation();
    const { repoName } = location.state;

    if (!isLoggedIn) {
        navigate('/login');
    }

    const filterItems = React.useCallback((items) => {
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

        setItemsCount(Object.keys(items).length);
        setExpiringItems(filteredItems);
    }, []);


    const prepareExpiringItems = React.useCallback(() => {

        const dataHandler = (data) => {
            filterItems(data);
        };

        const requestConfig = { action: "getRepo", path: params.repoId };
        sendRequest(requestConfig, dataHandler);
    }, [filterItems, sendRequest, params.repoId]);

    React.useEffect(() => {
        prepareExpiringItems();
    }, [navigate, prepareExpiringItems]);

    const {
        modalIsOpen,
        setModalIsOpen,
        requestIsFinished,
        setRequestIsFinished } = usePopUp(prepareExpiringItems);




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
        const message = itemsCount > 1
            ? 'You have enough items in this repositorie!'
            : `You don't have any items in this repositorie!`
        return (
            <div className="expiring-items-empty">
                <h2>{message}</h2>
            </div>
        );
    };

    return (
        <>
            {isLoading && <LoadingSpinner />}
            {modalIsOpen && requestIsFinished && <Modal>
                <SuccessPopUp message={'Seccessfuly saved'} />
            </Modal>}

            <h1 className="expiring-items-title"><span>{repoName}</span> - items that expiring soon</h1>
            <article className="inventory">
                <section className="inventory-links" >
                    <div className="add-item">
                        <Link className="inventory-links-btns add-item-btn"
                            // to={`add-item`}
                            onClick={() => navigate(-1)}
                            state={{ repoName: repoName }}
                        >
                            Back to all items
                        </Link>
                    </div>
                </section>
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
                                    classes={'expiring-items'}
                                />
                            );
                        })}
                    </ItemsTableWrapper>
                }
                {!isLoading && expiringItems !== null && Object.keys(expiringItems).length === 0 && <NoItemsTemplate />}
            </article>
        </>
    );
};

export default ExpiringItemsPage;