import React from "react";
import Item from "../../components/Item/Item";
import ItemsTableWrapper from "../../components/ItemsTableWrapper/ItemsTableWrapper";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import useHttp from "../../hooks/use-http";

import './ExpiringItems.styles.scss';

const ExpiringItemsPage = () => {

    const [expiringItems, setExpiringItems] = React.useState({});

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
            alert('Successfuly saved!');
            prepareExpiringItems();
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
            <h1 className="expiring-items-title">Expiring Items</h1>
            {isLoading && <LoadingSpinner />}
            {!isLoading && Object.keys(expiringItems).length > 0 &&
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
            {!isLoading && Object.keys(expiringItems).length === 0 && <NoItemsTemplate />}
        </>
    );
};

export default ExpiringItemsPage;