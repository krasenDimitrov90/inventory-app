import React from "react";
import * as request from "../services/requests";


const useHttp = () => {

    const [isLoading, setIsloading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const sendRequest = React.useCallback((requestConfig, dataHandler, errorHandler) => {

        const action = requestConfig.action;
        
        setError(null);
        setIsloading(true);
        return request[action](requestConfig)
            .then(data => {
                dataHandler(data);
                setIsloading(false);
            })
            .catch(err => {
                err.then(error => {
                    const errorMessage = error.error.message || error.error;
                    setIsloading(false);
                    errorHandler();
                    setError(errorMessage);
                })
            });
    },[])


    return {
        isLoading,
        error,
        sendRequest,
    };
};

export default useHttp;