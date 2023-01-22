import React from "react";
import useHttp from "../hooks/use-http";

const ItemsContext = React.createContext({
    items: {},
    updateItems: () => { },
    addNewItem: () => { },
    updateSingleItem: () => {},
});

export const ItemsContextProvider = (props) => {

    const [items, setItems] = React.useState({});

    const { sendRequest: getItems } = useHttp();

    const updateItems = (items) => {

        setItems(items);
    };

    const updateSingleItem = () => {

    };

    const addNewItem = (item) => {
        setItems((oldItems) => {
            const newItmes = { ...item, ...oldItems };
            return newItmes;
        });
    };

    React.useEffect(() => {

        const dataHandler = (data) => {
            updateItems(data);
        };
        const requestConfig = { action: "getAllItems" };
        getItems(requestConfig, dataHandler);
    },[]);

    const contextValue = {
        items,
        updateItems,
        addNewItem,
        updateSingleItem,
    };

    return (
        <ItemsContext.Provider value={contextValue} >
            {props.children}
        </ItemsContext.Provider>
    );
};

export default ItemsContext;