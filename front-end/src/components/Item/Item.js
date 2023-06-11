import React from "react";
import useHttp from "../../hooks/use-http";

import './Item.styles.scss';
import Modal from "../Modal/Modal";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import SuccessPopUp from "../SuccessPopUp/SuccessPopUp";
import usePopUp from "../../hooks/use-popUp";
import { Link, useParams } from "react-router-dom";
import ConfirmPopUp from "../ConfirmPopUp/ConfirmPopUp";
import svg from "../../SVG";



const Item = ({ itemId, name, qty, minQty, unit, updateItems, classes }) => {

    const itemClasses = classes + " main-items-list";

    const prams = useParams();
    const { repoId } = prams;

    const {
        modalIsOpen,
        setModalIsOpen,
        requestIsFinished,
        setRequestIsFinished } = usePopUp(updateItems);

    const removeBtnHandler = () => setModalIsOpen(true);

    const { isLoading, sendRequest } = useHttp();


    const requestDeleteItem = () => {

        const requestConfig = {
            action: 'deleteItem',
            path: `repos/${repoId}/${itemId}`,
            data: {},
            isAuth: true,
        };


        const dataHandler = () => {
            setModalIsOpen(true);
            setRequestIsFinished(true);
        };

        sendRequest(requestConfig, dataHandler);
    };

    return (
        <>
            {isLoading && <LoadingSpinner />}
            {modalIsOpen && requestIsFinished && <Modal onClose={() => setModalIsOpen(false)} >
                <SuccessPopUp message={`Succesfuly removed ${name} from inventory`} />
            </Modal>}
            {modalIsOpen && !requestIsFinished && <Modal onClose={() => setModalIsOpen(false)} >
                <ConfirmPopUp
                    name={name}
                    onCancelHandler={() => setModalIsOpen(false)}
                    onCinfirmHandler={requestDeleteItem}
                />
            </Modal>}
            <ul className={itemClasses}>
                <li>{name}</li>
                <li>{qty} {unit}</li>
                <li>{minQty} {unit}</li>
                <li>
                    <div className="actions-icons-wrapper">
                        <Link to={`edit-item/${itemId}`} className="actions-links edit">
                            <svg.Pen />
                        </Link>
                        <button onClick={removeBtnHandler} className="actions-links delete">
                            <svg.Delete />
                        </button>
                    </div>
                </li>
            </ul>
        </>
    );
}

export default Item;