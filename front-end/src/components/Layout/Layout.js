
import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

const Layout = (props) => {
    return (
        <>
            <Navigation />
            <Outlet />
            {/* <main>{props.children}</main> */}
        </>
    );
};

export default Layout;