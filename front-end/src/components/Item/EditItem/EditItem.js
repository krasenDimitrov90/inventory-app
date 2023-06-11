import React from "react";
import FormCard from "../../FormCard/FormCard";
import InputField from "../../InputField/InputField";
import svg from "../../../SVG";
import SuccessPopUp from "../../SuccessPopUp/SuccessPopUp";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import Modal from "../../Modal/Modal"
import useInput from "../../../hooks/use-input";
import { useLocation, useNavigate, useOutletContext, useParams } from "react-router-dom";
import useHttp from "../../../hooks/use-http";
import usePopUp from "../../../hooks/use-popUp";
import './EditItem.styles.scss';

const EditItem = () => {


    const [repoId, prepareItems, items] = useOutletContext();
    const location = useLocation();
    const { repoName } = location.state || '';
    const { itemId } = useParams();
    const [allOptionsAreShown, setAllOptionsAreShown] = React.useState(false);
    const [showOptionsBtnName, setShowOptionsBtnName] = React.useState('Show options');

    let optionsClasses = allOptionsAreShown ? 'options-container expanded' : 'options-container';
    let svgClasses = allOptionsAreShown ? 'rotate' : '';

    const handleOptionsBtn = React.useCallback((e) => {
        // e.preventDefault();
        // setShowOptionsBtnName(prev => prev === 'Show options' ? 'Hide options' : 'Show options');
        setAllOptionsAreShown(prev => !prev);
    }, []);

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
        autoFillInput: autoFillItemInput,
    } = useInput(value => value.trim().length > 0);

    const {
        value: enteredMinQuantity,
        hasError: minQuantityInputIsInvalid,
        onChangeHandler: minQuantityInputChangeHandler,
        onBlurHandler: minQuantityInputOnBlurHandler,
        autoFillInput: autoFillMinQuantityInput,
    } = useInput(value => !isNaN(value) && value !== '');

    const {
        value: enteredQuantity,
        hasError: quantityInputIsInvalid,
        onChangeHandler: quantityInputChangeHandler,
        onBlurHandler: quantityInputOnBlurHandler,
        autoFillInput: autoFillQuantityInput,

    } = useInput(value => !isNaN(value) && value !== '');

    const {
        value: enteredUnit,
        hasError: unitInputIsInvalid,
        onChangeHandler: unitInputChangeHandler,
        onBlurHandler: unitInputOnBlurHandler,
        autoFillInput: autoFillUnitInput,

    } = useInput(value => value.trim().length > 0);

    React.useEffect(() => {
        const item = items.find(i => i._id === itemId);
        autoFillItemInput(item.name);
        autoFillMinQuantityInput(item['min-qty']);
        autoFillQuantityInput(item.qty);
        autoFillUnitInput(item.unit);
    }, []);


    let formIsInvalid = itemInputIsInvalid || minQuantityInputIsInvalid || unitInputIsInvalid || !enteredItem || !enteredMinQuantity || !enteredUnit;

    const submitHandler = (e) => {
        e.preventDefault();

        if (itemInputIsInvalid || minQuantityInputIsInvalid || unitInputIsInvalid || !enteredItem || !enteredMinQuantity || !enteredUnit) {
            return;
        }

        const data = {
            qty: Number(enteredQuantity),
            'min-qty': Number(enteredMinQuantity),
            unit: enteredUnit,
            name: enteredItem
        };

console.log(`/repos/${repoId}/${itemId}`)
        const requestConfig = {
            action: 'editItem',
            path: `/repos/${repoId}/${itemId}`,
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
                            <svg.Update />
                        </div>
                    </div>
                    {/* <button onClick={handleOptionsBtn}>{showOptionsBtnName}</button> */}

                    <InputField
                        type="number"
                        id='quantity'
                        name='quantity'
                        placeholder="Enter quantity"
                        value={enteredQuantity}
                        onChange={quantityInputChangeHandler}
                        onBlur={quantityInputOnBlurHandler}
                        inputIsInvalid={quantityInputIsInvalid}
                        invalidMessage='Must enter an valid number!'
                    />

                    {/* {allOptionsAreShown && */}
                    <div className={optionsClasses}>
                        <div>
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
                                id='min-qty'
                                name='min-qty'
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
                        </div>
                    </div>

                    <div className="arrow-down-in-edit-page">
                        <div className={svgClasses} onClick={handleOptionsBtn}>
                            <svg.ArrowDown />
                        </div>
                    </div>
                    <button disabled={formIsInvalid} className="disabled:opacity-30" >EDIT</button>
                </FormCard>
            </div>
        </>
    );
};

export default EditItem;