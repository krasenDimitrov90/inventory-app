import React from "react";

import './ItemsTableWrapper.styles.scss';

const ItemsTableWrapper = ({ children, sendData }) => {

    return (
        <section className="inventory-table-wrapper">
            <header className="table-header">
                <p>Item</p>
                <p>Qty</p>
            </header>
            {children}
            <div className="btn-wrapper">
                <button className="save-btn" onClick={sendData} >SAVE</button>
            </div>
        </section>
    );
};

export default ItemsTableWrapper;