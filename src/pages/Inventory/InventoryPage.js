import React from "react";
import { Outlet, Link } from "react-router-dom";
import Item from "../../components/Item/Item";
import ItemsTableWrapper from "../../components/ItemsTableWrapper/ItemsTableWrapper";
import ItemsContext from "../../context/items-context";
import useHttp from "../../hooks/use-http";

import "./InventoryPage.scss";

const InventoryPage = () => {

    const itemsCtx = React.useContext(ItemsContext);

    const { items, updateItems } = itemsCtx;

    const { isLoading, sendRequest } = useHttp();

    const updateItemsQty = ( item, action, quantity = null) => {
        const qty = quantity || items[item].qty;
        const newItems = { ...items };
        if (action === 'add') {
            newItems[item].qty = qty + 1;

        } else if (action === 'subtract') {
            newItems[item].qty = qty - 1;
        } else if (action === 'update') {
            if (qty < 0) {
                return;
            }
            newItems[item].qty = qty;
        }

        updateItems(newItems);
    };


    const sendData = (data) => {

        const dataHandler = () => {
            alert('Successfuly saved!')
            updateItems(items);
        };

        const requestConfig = { action: "updateItems", data };
        sendRequest(requestConfig, dataHandler);

    };

    return (
        <>
            <Outlet />
            <article className="inventory">
                <h1>Inventory</h1>
                <div className="add-item">
                    <Link className="add-item-btn" to={'add-item'} >Add Item</Link>
                </div>
                <ItemsTableWrapper
                    sendData={sendData.bind(null, items)}
                >

                    {Object.entries(items).map(([item, properties]) => {
                        return (
                            <Item
                                key={item}
                                item={item}
                                // items={items}
                                qty={items[item].qty}
                                btnHandler={updateItemsQty}
                            />
                        );
                    })}
                </ItemsTableWrapper>
            </article>
        </>
    );
};

export default InventoryPage;
