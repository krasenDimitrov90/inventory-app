import React from "react";
import useHttp from "../hooks/use-http";

const ItemsContext = React.createContext({
    items: {},
    // ctxIsLoading,
    updateItems: () => { },
    addNewItem: () => { },
    requestItems: () => { },
});

export const ItemsContextProvider = (props) => {

    const [items, setItems] = React.useState({});

    const { isLoading: ctxIsLoading, sendRequest: getItems } = useHttp();

    // const updateItems = (items) => {

    //     setItems(items);
    // };

    // const requestItems = () => {
    //     console.log('In context requestItems');

    //     const dataHandler = (data) => {
    //         updateItems(data);
    //     };

    //     const requestConfig = { action: "getAllItems" };
    //     getItems(requestConfig, dataHandler);
    // };


    const addNewItem = (item) => {
        setItems((oldItems) => {
            const newItmes = { ...item, ...oldItems };
            return newItmes;
        });
    };

    // React.useEffect(() => {
    //     console.log('In context UseEffect');
    //     requestItems();
    // }, []);

    const contextValue = {
        // items,
        // ctxIsLoading,
        // updateItems,
        addNewItem,
        // requestItems,
    };

    return (
        <ItemsContext.Provider value={contextValue} >
            {props.children}
        </ItemsContext.Provider>
    );
};

export default ItemsContext;