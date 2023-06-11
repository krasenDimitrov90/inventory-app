import React from "react";
import { Outlet, Link, useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Item from "../../components/Item/Item";
import useHttp from "../../hooks/use-http";

import "./ItemsPage.styles.scss";
import AuthContext from "../../context/auth-context";
import Modal from "../../components/Modal/Modal";
import SuccessPopUp from "../../components/SuccessPopUp/SuccessPopUp";
import usePopUp from "../../hooks/use-popUp";

const ItemsPage = () => {

    const params = useParams();

    const { repoId } = params;

    const navigate = useNavigate();
    const authCtx = React.useContext(AuthContext);
    const { isLoggedIn } = authCtx;
    const [items, setItems] = React.useState(null);
    const [filteredItems, setFilteredItems] = React.useState(null);
    const { isLoading, sendRequest } = useHttp();
    const [itemsToShow, setItemsToShow] = React.useState('All Items');
    const [isOpen, setIsOpen] = React.useState(false);


    const classes = isOpen ? 'filter-btn-close' : 'filter-btn-open';

    const hadleOpen = () => setIsOpen((prev) => !prev);

    const setItemsToShowHandler = React.useCallback((e) => {
        setItemsToShow(() => e.target.textContent);
        setIsOpen(false);
    }, []);

    const prepareItems = React.useCallback(() => {
        const dataHandler = (data) => {

            let items = [];
            if (data !== null) {
                items = data;
            }
            setItems(items);
            setFilteredItems(items);
        };

        const path = itemsToShow === 'All Items' ? 'repos/' + params.repoId : 'repos/expiring/' + params.repoId

        const requestConfig = { action: "getRepo", path: path, isAuth: true };
        sendRequest(requestConfig, dataHandler);
    }, [sendRequest, params.repoId, itemsToShow]);

    const {
        modalIsOpen,
        requestIsFinished,
    } = usePopUp(prepareItems);


    React.useEffect(() => {
        prepareItems();
    }, [itemsToShow]);

    if (!isLoggedIn) {
        navigate('/login');
    }


    const updateItemsQty = (item, action, quantity = null) => {
        let qty = quantity !== null ? quantity : items[item].qty;
        qty = Number(qty);

        setItems((oldItems) => {
            const newItems = { ...oldItems };
            if (action === 'add') {
                newItems[item].qty = Number(qty) + 1;

            } else if (action === 'subtract') {
                if (qty - 1 < 0) {
                    return;
                }
                newItems[item].qty = Number(qty) - 1;

            } else if (action === 'update') {
                if (qty < 0) {
                    return;
                }
                newItems[item].qty = Number(qty);
            }
            return newItems;
        });

    };

    const NoItemsTemplate = () => {
        return (
            <div className="inventory-items-empty">
                <h2>You don't have any items in this repositorie!</h2>
            </div>
        );
    };


    return (
        <>
            <Outlet context={[repoId, prepareItems, items]} />

            {modalIsOpen && requestIsFinished && <Modal>
                <SuccessPopUp message={'Succesfuly saved'} />
            </Modal>}
            {isLoading && <LoadingSpinner />}
            <main className="main">
                <div className="px-[20px] " >
                    <div className="flex justify-between items-center border-b-[#152235] border-b-[1px]">
                        <div className="py-[21px] ">
                            <p className="text-[12px]" >Filter</p>
                            <div className="flex">
                                <p className="mr-[10px]">{itemsToShow}</p>
                                <span onClick={hadleOpen} className={classes}></span>
                            </div>
                            <ul className={isOpen ? 'filter-list' : 'filter-list filter-list-closed'}>
                                <li><button onClick={setItemsToShowHandler} >All Items</button></li>
                                <li className="mt-[10px]"><button onClick={setItemsToShowHandler} >Expiring Items</button></li>
                            </ul>
                        </div>
                        <div>
                            <Link to="add-item" className="transition duration-500 bg-[#2f80ed] py-[7px] px-[30px] rounded-[12px] hover:bg-[white] hover:text-[black]">ADD ITEM</Link >
                        </div>
                    </div>

                </div>
                <div className="flex flex-col p-[20px]">
                    <div>
                        <ul className="main-list">
                            <li className="table-header-items">TITLE</li>

                            <li className="big-screen-qty">Quantity</li>
                            <li className="big-screen-min-qty">Min Quantity</li>

                            <li className="small-screen-qty">Qty</li>
                            <li className="small-screen-min-qty" >Min Qty</li>

                            <li className="table-header-items">ACTIONS</li>
                        </ul>
                        {!modalIsOpen && !isLoading && filteredItems !== null && Object.entries(filteredItems).length > 0 &&
                            <>
                                {Object.entries(filteredItems).map(([item, properties]) => {
                                    return (
                                        <Item
                                            key={item}
                                            itemId={item}
                                            name={filteredItems[item].name}
                                            items={items}
                                            qty={filteredItems[item].qty}
                                            minQty={filteredItems[item]['min-qty']}
                                            unit={filteredItems[item].unit}
                                            btnHandler={updateItemsQty}
                                            updateItems={prepareItems}
                                            classes={itemsToShow === 'All Items' ? "" : "expiring-items"}
                                        />
                                    );
                                })}
                            </>}
                        {!isLoading && filteredItems !== null && Object.entries(filteredItems).length === 0 && <NoItemsTemplate />}
                    </div>
                </div>
            </main>
        </>
    );
};

export default ItemsPage;
