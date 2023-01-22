import React from "react";
import { Outlet, Link } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Item from "../../components/Item/Item";
import ItemsTableWrapper from "../../components/ItemsTableWrapper/ItemsTableWrapper";
import ItemsContext from "../../context/items-context";
import useHttp from "../../hooks/use-http";

import "./InventoryPage.scss";

const InventoryPage = () => {

    const itemsCtx = React.useContext(ItemsContext);

    // const { ctxIsLoading, items: adw, updateItems: wad } = itemsCtx;
    const [items, setItems] = React.useState({});

    const { isLoading, sendRequest } = useHttp();

    const prepareItems = () => {

        const dataHandler = (data) => {
            setItems(data);
        };

        const requestConfig = { action: "getAllItems" };
        sendRequest(requestConfig, dataHandler);
    };

    React.useEffect(() => {
        console.log('In useefect');
        prepareItems();
    }, []);

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

        // const newItems = { ...items };
        // if (action === 'add') {
        //     newItems[item].qty = qty + 1;

        // } else if (action === 'subtract') {
        //     newItems[item].qty = qty - 1;

        // } else if (action === 'update') {
        //     if (qty < 0) {
        //         return;
        //     }
        //     newItems[item].qty = qty;
        // }
    };


    const sendData = (data) => {

        const dataHandler = () => {
            alert('Successfuly saved!')
            prepareItems();
        };

        const requestConfig = { action: "updateItems", data };
        sendRequest(requestConfig, dataHandler);

    };

    return (
        <>
            <Outlet />
            {isLoading && <LoadingSpinner />}
            {/* {ctxIsLoading && <LoadingSpinner />} */}
            <article className="inventory">
                <h1>Inventory</h1>
                <div className="add-item">
                    <Link className="add-item-btn" to={'add-item'} >Add Item</Link>
                </div>
                {!isLoading && Object.entries(items).length > 0 && <ItemsTableWrapper
                    sendData={sendData.bind(null, items)}
                >

                    {Object.entries(items).map(([item, properties]) => {
                        return (
                            <Item
                                key={item}
                                item={item}
                                qty={items[item].qty}
                                btnHandler={updateItemsQty}
                            />
                        );
                    })}
                </ItemsTableWrapper>}
                {!isLoading && Object.entries(items).length === 0 && <p>You don't have any items in the inventory</p>}
            </article>
        </>
    );
};

export default InventoryPage;
