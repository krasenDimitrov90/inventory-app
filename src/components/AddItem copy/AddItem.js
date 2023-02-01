import React from "react";
import FormCard from "../FormCard/FormCard";
import InputField from "../InputField/InputField";
import useInput from "../../hooks/use-input";
import useHttp from "../../hooks/use-http";

import './AddItem.styles.scss';
import { useNavigate, useOutlet, useOutletContext } from "react-router-dom";
import Modal from "../Modal/Modal";
import SuccessPopUp from "../SuccessPopUp/SuccessPopUp";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import usePopUp from "../../hooks/use-popUp";

const AddItem = () => {

    const [repoId] = useOutletContext();
    const navigate = useNavigate();
    const { isLoading, sendRequest } = useHttp();

    const navigateToInventory = () => navigate(`/inventory/${repoId}`);

    const {
        modalIsOpen,
        setModalIsOpen,
        requestIsFinished,
        setRequestIsFinished } = usePopUp(navigateToInventory);

    const formWrapperOnClickHandler = (e) => {
        if (e.target.className !== 'add-item-wrapper') {
            return;
        }
        navigate(-1);
    }

    const {
        value: enteredItem,
        hasError: itemInputIsInvalid,
        onChangeHandler: itemInputChangeHandler,
        onBlurHandler: itemInputOnBlurHandler,
    } = useInput(value => value.trim().length > 0);

    const {
        value: enteredMinQuantity,
        hasError: minQuantityInputIsInvalid,
        onChangeHandler: minQuantityInputChangeHandler,
        onBlurHandler: minQuantityInputOnBlurHandler,
    } = useInput(value => !isNaN(value) && value !== '');

    const submitHandler = (e) => {
        e.preventDefault();

        if (itemInputIsInvalid || minQuantityInputIsInvalid || !enteredItem || !enteredMinQuantity) {
            return;
        }

        const data = {};
        data[enteredItem] = {
            qty: 0,
            'min-qty': Number(enteredMinQuantity)
        };


        const requestConfig = {
            action: 'putNewItem',
            path: repoId,
            data: data,
        };

        const dataHandler = (data) => {
            setModalIsOpen(true);
            setRequestIsFinished(true);
        };

        sendRequest(requestConfig, dataHandler);
    };

    return (
        <>
            {isLoading && <LoadingSpinner />}
            {modalIsOpen && requestIsFinished && <Modal>
                <SuccessPopUp message={`Succesfuly added ${enteredItem} to the inventory`} />
            </Modal>}

            <div className="add-item-wrapper" onClick={formWrapperOnClickHandler}>
                <FormCard
                    submitHandler={submitHandler}
                    formTitle='ADD ITEM'
                    btnName='ADD'
                >
                    <InputField
                        icon={<i className="fa-sharp fa-solid fa-cube"></i>}
                        type="text"
                        id='item'
                        name='item'
                        placeholder="Enter item"
                        value={enteredItem}
                        onChange={itemInputChangeHandler}
                        onBlur={itemInputOnBlurHandler}
                        inputIsInvalid={itemInputIsInvalid}
                        invalidMessage='Must enter an valid Item!'
                    />

                    <InputField
                        icon={<i className="fa-solid fa-scale-unbalanced-flip"></i>}
                        type="number"
                        id='quantity'
                        name='quantity'
                        placeholder="Enter minimum quantity"
                        value={enteredMinQuantity}
                        onChange={minQuantityInputChangeHandler}
                        onBlur={minQuantityInputOnBlurHandler}
                        inputIsInvalid={minQuantityInputIsInvalid}
                        invalidMessage='Must enter an valid number!'
                    />

                </FormCard>
            </div>
        </>
    );
};

export default AddItem;