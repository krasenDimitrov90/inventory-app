import React from "react";
import FormCard from "../../FormCard/FormCard";
import InputField from "../../InputField/InputField";
import useInput from "../../../hooks/use-input";
import useHttp from "../../../hooks/use-http";

import './AddItem.styles.scss';
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import Modal from "../../Modal/Modal";
import SuccessPopUp from "../../SuccessPopUp/SuccessPopUp";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import usePopUp from "../../../hooks/use-popUp";
import svg from "../../../SVG";

const AddItem = () => {

    const [repoId, prepareItems] = useOutletContext();
    const location = useLocation();
    const { repoName } = location.state || '';

    const navigate = useNavigate();
    const { isLoading, sendRequest } = useHttp();

    const navigateToInventory = () => {
        navigate(`/repo/${repoId}/items`, { state: { repoName: repoName } });
        prepareItems();
    };

    const {
        modalIsOpen,
        setModalIsOpen,
        requestIsFinished,
        setRequestIsFinished } = usePopUp(navigateToInventory);

    const formWrapperOnClickHandler = (e) => {
        if (e.target.className !== 'actions-item-wrapper') {
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

    const {
        value: enteredUnit,
        hasError: unitInputIsInvalid,
        onChangeHandler: unitInputChangeHandler,
        onBlurHandler: unitInputOnBlurHandler,
    } = useInput(value => 2 >= value.trim().length > 0);

    let formIsInvalid = itemInputIsInvalid || minQuantityInputIsInvalid || unitInputIsInvalid || !enteredItem || !enteredMinQuantity || !enteredUnit;

    const submitHandler = (e) => {
        e.preventDefault();

        if (itemInputIsInvalid || minQuantityInputIsInvalid || unitInputIsInvalid || !enteredItem || !enteredMinQuantity || !enteredUnit) {
            return;
        }

        const data = {
            qty: 0,
            'min-qty': Number(enteredMinQuantity),
            unit: enteredUnit,
            name: enteredItem,
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

            <div className="actions-item-wrapper" onClick={formWrapperOnClickHandler}>
                <FormCard
                    submitHandler={submitHandler}
                    formTitle='ADD ITEM'
                    btnName='ADD'
                    formIsInvalid={formIsInvalid}
                >
                    <div className="actions-item-svg-wrapper">
                        <div>
                            <svg.Packge />
                        </div>
                    </div>
                    <InputField
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

                    <InputField
                        type="text"
                        id='unit'
                        name='unit'
                        placeholder="Enter unit"
                        value={enteredUnit}
                        onChange={unitInputChangeHandler}
                        onBlur={unitInputOnBlurHandler}
                        inputIsInvalid={unitInputIsInvalid}
                        invalidMessage='Must enter an valid unit!'
                        maxlength={2}
                    />
                    <button disabled={formIsInvalid} className="disabled:opacity-30" >ADD</button>
                </FormCard>
            </div>
        </>
    );
};

export default AddItem;