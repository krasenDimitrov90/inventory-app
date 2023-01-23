import React from "react";
import useInput from "../../hooks/use-input";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import InputField from "../InputField/InputField";

import './ItemOptions.styles.scss';

const ItemOptions = ({ updateQtyHandler, removeItemHandler }) => {

    const [modalIsOpen, setModalIsOpen] = React.useState(false);

    const showModal = () => setModalIsOpen(true);
    const hideModal = () => setModalIsOpen(false);


    const {
        value: enteredQuantity,
        hasError: quantityInputIsInvalid,
        onChangeHandler: quantityInputChangeHandler,
        onBlurHandler: quantityInputOnBlurHandler,
    } = useInput((value) => !isNaN(value) && value !== '');

    return (
        <>
            {/* <ConfirmModal>
                <div>
                    <h1>MODAL</h1>
                </div>
            </ConfirmModal> */}
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
                <div className="add-qty-btn-card">
                    <button className="item-options-add-qty-btn" onClick={updateQtyHandler.bind(null, enteredQuantity)} >Update quantity</button>
                </div>
                <div className="remove-btn-card">
                    <div>
                        <button className="item-options-remove-btn" onClick={removeItemHandler} >REMOVE</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ItemOptions;