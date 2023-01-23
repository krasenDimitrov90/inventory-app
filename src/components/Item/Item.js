import React from "react";
import useHttp from "../../hooks/use-http";
import ItemsContext from "../../context/items-context";

import './Item.styles.scss';
import ItemOptions from "./ItemOptions";



const Item = ({ items, item, qty, btnHandler, expiring, updateItems }) => {

    const { isLoading, sendRequest } = useHttp();

    // const itemCtx = React.useContext(ItemsContext);
    // const { items, updateItems } = itemCtx;

    const [toggle, setToggle] = React.useState(false);

    const backGroundColor = expiring ? { "backgroundColor": "#ED4C67" } : { "backgroundColor": " #D980FA" };

    const itemOnClickHandler = (e) => {

        if (e.target.tagName !== 'P') {
            return;
        }

        setToggle(oldState => !oldState);
    }

    const plusBtnClickHandler = () => {
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
        setToggle(oldState => !oldState);
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
            alert('Successfuly removed!');
            updateItems();
        };

        sendRequest(requestConfig, dataHandler);
    };

    const clickHandler = (e) => {
        e.stopPropagation();
        console.log('ckick');
    };



    return (
        <div className="item-wrapper" style={backGroundColor}>
            <div className="item-wrapper-card" onClick={clickHandler}>
                <p onClick={itemOnClickHandler} >{item}</p>
                <p onClick={itemOnClickHandler} >{qty}</p>
                <section className="btns-wrapper">
                    <button className="btn-plus" onClick={plusBtnClickHandler} ><i className="fa-solid fa-circle-plus"></i></button>
                    <button className="btn-minus" onClick={minusBtnClickHandler} ><i className="fa-solid fa-circle-minus"></i></button>
                </section>
            </div>
            {toggle && <ItemOptions
                updateQtyHandler={updateItemQtyHandler}
                removeItemHandler={requestDeleteItem}
            />}
        </div>
    );
}

export default Item;