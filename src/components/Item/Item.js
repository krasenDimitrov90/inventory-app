import React from "react";
import useInput from "../../hooks/use-input";
import InputField from "../InputField/InputField";

import './Item.styles.scss';
import ItemOptions from "./ItemOptions";



const Item = ({ items, item, qty, btnHandler, expiring }) => {

    const [itemIsClicked, setItemIsClicked] = React.useState(false);

    const backGroundColor = expiring ? { "backgroundColor": "#ED4C67" } : { "backgroundColor": " #D980FA" };

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

        if (e.target.tagName !== 'P') {
            return;
        }

        setItemIsClicked(oldState => !oldState);
    }

    return (
        <div className="item-wrapper" style={backGroundColor}>
            <div className="item-wrapper-card">
                <p onClick={onCLickHandler} >{item}</p>
                <p onClick={onCLickHandler} >{qty}</p>
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