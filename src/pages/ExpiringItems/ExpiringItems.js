import React from "react";
import { useNavigate } from "react-router-dom";
import Item from "../../components/Item/Item";
import ItemsTableWrapper from "../../components/ItemsTableWrapper/ItemsTableWrapper";
import ItemsContext from "../../context/items-context";
import useHttp from "../../hooks/use-http";

import './ExpiringItems.styles.scss';

const ExpiringItemsPage = () => {

    const navigate = useNavigate();

    const itemCtx = React.useContext(ItemsContext);
    const {items, updateItems} = itemCtx;
    const [expiringItems, setExpiringItems] = React.useState({});

    const {
        isLoading,
        sendRequest,
    } = useHttp();

    React.useEffect(() => {
        
            const filteredItems = Object.keys(items).reduce((acc, item) => {
                const newItem = {};
                const quantity = items[item].qty;
                const minQuantity = items[item]['min-qty'];
                if (quantity < minQuantity) {
                    acc[item] = items[item];
                }
                return acc;
            }, {});

            if (Object.keys(filteredItems).length > 0) {
                setExpiringItems(filteredItems);
            }

    }, [items]);

    const updateItemsQty = (items, item, action, quantity = null) => {

        const qty = quantity || items[item].qty;

        setExpiringItems(() => {
            const newItems = { ...items };
            if (action === 'add') {
                newItems[item].qty = qty + 1;

            } else if (action === 'subtract') {
                if (qty - 1 < 0) {
                    return;
                }
                newItems[item].qty = qty - 1;

            } else if (action === 'update') {
                if (qty < 0) {
                    return;
                }
                newItems[item].qty = qty;
            }
            return newItems;
        });
    };

    const sendUpdatedItems = (data) => {

        const dataHandler = () => {
            alert('Successfuly saved!');
            navigate('/inventory');
        };

        const requestConfig = { action: "updateItems", data };
        sendRequest(requestConfig, dataHandler);
    };

    return (
        <>
            <h1>Expiring Items</h1>
            {Object.keys(expiringItems).length > 0 &&
                <ItemsTableWrapper
                    sendData={sendUpdatedItems.bind(null, expiringItems)}
                >
                    {Object.entries(expiringItems).map(([item, itemProps]) => {
                        return (

                            <Item
                                expiring={true}
                                key={item}
                                items={expiringItems}
                                item={item}
                                qty={itemProps.qty}
                                btnHandler={updateItemsQty}
                            />
                        );
                    })}
                </ItemsTableWrapper>
            }
            {Object.keys(expiringItems).length === 0 && <p>You have enough items for work!</p>}
        </>
    );
};

export default ExpiringItemsPage;