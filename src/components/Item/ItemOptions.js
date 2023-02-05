import React from "react";
import useInput from "../../hooks/use-input";
import InputField from "../InputField/InputField";

import './ItemOptions.styles.scss';

const ItemOptions = ({ item, updateQtyHandler, removeBtnHandler }) => {

    const {
        value: enteredQuantity,
        hasError: quantityInputIsInvalid,
        onChangeHandler: quantityInputChangeHandler,
        onBlurHandler: quantityInputOnBlurHandler,
    } = useInput((value) => !isNaN(value) && value !== '');

    return (
        <>

            <div className="item-options" >
                <InputField
                    icon={<i className="fa-solid fa-scale-unbalanced-flip"></i>}
                    placeholder={'Enter new quantity'}
                    type={'number'}
                    id={'enter-qty'}
                    name={'enter-qty'}
                    value={enteredQuantity}
                    onBlur={quantityInputOnBlurHandler}
                    onChange={quantityInputChangeHandler}
                    inputIsInvalid={quantityInputIsInvalid}
                    invalidMessage='Must enter an valid number!'
                />
                <div className="quantity-btns-wrapper">

                    <div className="add-qty-btn-card">
                        <button className="item-options-add-qty-btn" onClick={updateQtyHandler.bind(null, enteredQuantity, quantityInputIsInvalid)} >Update quantity</button>
                    </div>
                    <div className="remove-btn-card">
                        <div>
                            <button className="item-options-remove-btn" onClick={removeBtnHandler} >REMOVE</button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default ItemOptions;