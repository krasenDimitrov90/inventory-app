import React from "react";
import AuthContext from "../../context/auth-context";
import svg from "../../SVG";
import { NavLink, useNavigate } from "react-router-dom";

const SmallScreenNav = () => {

    const navigate = useNavigate();

    const [loggoutIsOpen, setLoggoutIsOpen] = React.useState(false);
    const onProfileClickHandler = React.useCallback(() => {
        setLoggoutIsOpen((prev) => !prev);
    }, []);

    const { loggout } = React.useContext(AuthContext);


    const loggoutHandler = () => {
        loggout();
        navigate('/login');
    };

    const loggoutBtnClasses = `${!loggoutIsOpen ? 'logout-btn-small-screen' : 'logout-btn-small-screen shown'}`;

    return (
        <aside className="small-screen-nav flex flex-col pb-[50px]">

            <div className="relative t-[50px]">
                <div className=" flex relative z-[101] px-[20px] py-[20px] bg-[#131720]">
                    <div className="slidebar-user-img mr-[10px]">
                        <img className="rounded-[10px]" src="http://flixtv.volkovdesign.com/admin/img/user.svg" alt="" />
                    </div>
                    <div className="flex flex-col justify-end ">
                        <div className="user-name flex ">
                            <h2 className="text-[16px]">Kraskata</h2>
                            <div onClick={onProfileClickHandler} className="cursor-pointer">
                                <svg.ArrowDown />
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

            </div>

            <div className=" side-bar-wraper-open ">
                <ul className="sidebar-nav">
                    <li>
                        <NavLink to="/repositories" className="sidebar__nav-link">
                            <svg.Folder />
                            <span>Repos</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/import-repo" className="sidebar__nav-link">
                            <svg.Packge />
                            <span>Import repo</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default SmallScreenNav;