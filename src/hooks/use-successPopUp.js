import React from "react";

const useSuccesPopUp = (onCloseHandler) => {

    const [modalIsOpen, setModalIsOpen] = React.useState(false);
    const [requestIsFinished, setRequestIsFinished] = React.useState(false);

    React.useEffect(() => {
        if (modalIsOpen && requestIsFinished) {

            let timeOut = setTimeout(() => {
                setModalIsOpen(false);
                setRequestIsFinished(false);

                onCloseHandler();
            }, 1200);

            return () => clearTimeout(timeOut);
        }
    }, [modalIsOpen, requestIsFinished]);

    return {
        modalIsOpen,
        setModalIsOpen,
        requestIsFinished,
        setRequestIsFinished,
    };
};

export default useSuccesPopUp;