import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import { Fade } from 'hamburger-react';
import './Navigation.scss';
import svg from "../../SVG";
import SmallScreenNav from "./SmallScreenNav";

const Navigation = (props) => {

    const navigate = useNavigate();
    const [isOpen, setIsOpen] = React.useState(false);
    const authCtx = React.useContext(AuthContext);
    const { loggout, getUserCredentials } = authCtx;
    const { userEmail } = getUserCredentials();

    React.useEffect(() => {
        setIsOpen(false);
    }, [navigate])


    const loggoutHandler = () => {
        loggout();
        navigate('/login');
    };


    const [loggoutIsOpen, setLoggoutIsOpen] = React.useState(false);

    const onProfileClickHandler = React.useCallback(() => {
        setLoggoutIsOpen((prev) => !prev);
    }, []);

    const loggoutBtnClasses = `${!loggoutIsOpen ? 'logout-btn' : 'logout-btn shown'}`;


    return (
        <>
            {isOpen && <SmallScreenNav />}
            <div className="menu-btn">
                <Fade toggled={isOpen} toggle={setIsOpen} />
            </div>
            <aside className="big-screen-nav flex flex-col pb-[50px]">

                <div className="p-[30px] border-b-[#152235] border-b-[1px]" >
                    <h2 className="opacity-0">Left Side</h2>
                </div>

                <div className="user-profile ">
                    <div className=" flex relative z-[101] px-[20px] py-[20px] bg-[#131720]">
                        <div className="slidebar-user-img mr-[10px]">
                            <img className="rounded-[10px]" src="http://flixtv.volkovdesign.com/admin/img/user.svg" alt="" />
                        </div>
                        <div className="flex flex-col justify-end ">
                            <div className="user-name flex ">
                                <h2 className="text-[16px]">{userEmail}</h2>
                                <div onClick={onProfileClickHandler} className="cursor-pointer">
                                    <svg.ArrowDown />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className={loggoutBtnClasses}>
                    <button onClick={loggoutHandler} className="sidebar-user-btn">
                        <svg.ArrowRight />
                    </button>
                    <p className="ml-[10px] text-[12px]">Loggout</p>
                </div>

                <div className="flex flex-col flex-1 h-[200px]">
                    <ul className="sidebar-nav scroll-content px-[30px] py-[20px] flex flex-1 flex-col w-[100%]">
                        <li>
                            <NavLink to="/repositories" className="sidebar__nav-link">
                                <svg.Folder />
                                <span>Repos</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/import-repo" className="sidebar__nav-link">
                                <svg.Cloud />
                                <span>Import repo</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    );
};

export default Navigation;