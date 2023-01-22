import React from "react";

import './Item.styles.scss';

const ItemOptions = () => {

    return (
        <div className="item-options" >
            <input type="number" className="item-options-qty" />
            <button className="item-options-add-qty-btn" >Update quantity</button>
            <div>
                <button className="item-options-remove-btn" >REMOVE</button>
            </div>
        </div>
    );
};

const Item = ({ items, item, qty, btnHandler, expiring }) => {

    const [itemIsClicked, setItemIsClicked] = React.useState(false);

    const backGrounfColor = expiring ? { "backgroundColor": "#ED4C67" } : { "backgroundColor": " #D980FA" };

    const plusBtnClickHandler = () => {
        btnHandler(items, item, 'add');
    };

    const minusBtnClickHandler = () => {

        const qty = items[item].qty;
        if (qty === 0) {
            return
        }

        btnHandler(items, item, 'subtract');
    };

    const onCLickHandler = (e) => {

        console.log(e.target);
        const wrongClasses = ["item-options", "item-options-add-qty-btn", "item-options-qty", "item-options-remove-btn", "btns-wrapper", "btn-plus", "btn-minus", "fa-solid fa-circle-plus", "fa-solid fa-circle-minus"];

        const eventClassName = e.target.className;

        if (wrongClasses.includes(eventClassName)) {
            return;
        }

        if (eventClassName) {

        }

        setItemIsClicked(oldState => !oldState);
    }

    return (
        <div className="item-wrapper" style={backGrounfColor} onClick={onCLickHandler}>
            <div className="item-wrapper-card">
                <p>{item}</p>
                <p>{qty}</p>
                <section className="btns-wrapper">
                    <button className="btn-plus" onClick={plusBtnClickHandler} ><i className="fa-solid fa-circle-plus"></i></button>
                    <button className="btn-minus" onClick={minusBtnClickHandler} ><i className="fa-solid fa-circle-minus"></i></button>
                </section>
            </div>
            {itemIsClicked && <ItemOptions />}
        </div>
    );
}

export default Item;