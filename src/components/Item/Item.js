import React from "react";
import useHttp from "../../hooks/use-http";

import './Item.styles.scss';
import ItemOptions from "./ItemOptions";
import Modal from "../Modal/Modal";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import SuccessPopUp from "../SuccessPopUp/SuccessPopUp";



const Item = ({ items, item, qty, btnHandler, expiring, updateItems }) => {

    const [modalIsOpen, setModalIsOpen] = React.useState(false);
    const [requestIsFinished, setRequestIsFinished] = React.useState(false);

    const popUpOnCloseHandler = () => {
        setRequestIsFinished(false);
        setModalIsOpen(false);
        updateItems();
    };

    const removeBtnHandler = () => setModalIsOpen(true);

    const { isLoading, sendRequest } = useHttp();

    const [itemOptionsIsShown, setItemOptionsIsShown] = React.useState(false);

    const backGroundColor = expiring ? { "backgroundColor": "#ED4C67" } : { "backgroundColor": " #D980FA" };

    const qtyElementRef = React.useRef();

    const itemOnClickHandler = (e) => {

        if (e.target.tagName !== 'P') {
            return;
        }

        setItemOptionsIsShown(oldState => !oldState);
    }

    const plusBtnClickHandler = () => {
        qtyElementRef.current.classList.toggle('bump');
        btnHandler(item, 'add');
    };

    const minusBtnClickHandler = () => {

        const qty = items[item].qty;
        if (qty === 0) {
            return
        }
        btnHandler(item, 'subtract');
    };

    const updateItemQtyHandler = (qty) => {
        if (qty < 0) {
            return;
        }
        setItemOptionsIsShown(oldState => !oldState);
        btnHandler(item, 'update', Number(qty));
    };

    const requestDeleteItem = () => {

        const requestConfig = {
            action: 'deleteItem',
            id: item,
            data: {},
        };

        const newItems = { ...items };
        delete newItems[item];

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
                <SuccessPopUp onClick={popUpOnCloseHandler}  message={`Succesfuly removed ${item} from inventory`} />
            </Modal>}
            {modalIsOpen && !requestIsFinished && <Modal onClose={() => setModalIsOpen(false)} >
                <div className="confirm-action">
                    <div className="confirm-action-message">
                        <h3>Are you shure you want to delete {item}</h3>
                    </div>
                    <div className="confirm-action-btns">
                        <div className="confirm-action-btns-card">
                            <button className="confirm-action-btns-cancel" onClick={() => setModalIsOpen(false)} >Cancel</button>
                        </div>
                        <div className="confirm-action-btns-card">
                            <button className="confirm-action-btns-yes" onClick={requestDeleteItem} >YES</button>
                        </div>
                    </div>
                </div>
            </Modal>}
            <div className="item-wrapper" style={backGroundColor}>
                <div className="item-wrapper-card" onClick={itemOnClickHandler} >
                    <p >{item}</p>
                    <p className='item-qty bump' ref={qtyElementRef} >{qty}</p>
                    <section className="btns-wrapper">
                        <button className="btn-plus" onClick={plusBtnClickHandler} ><i className="fa-solid fa-circle-plus"></i></button>
                        <button className="btn-minus" onClick={minusBtnClickHandler} ><i className="fa-solid fa-circle-minus"></i></button>
                    </section>
                </div>
                {itemOptionsIsShown && <ItemOptions
                    item={item}
                    updateQtyHandler={updateItemQtyHandler}
                    removeBtnHandler={removeBtnHandler}
                />}
            </div>
        </>
    );
}

export default Item;