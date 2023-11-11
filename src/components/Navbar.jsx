import "../styles/navbar.css"
import logo_image from "../asset/e-teachers-logo-new.png"
import { BsGrid, BsAward } from "react-icons/bs";
import { FiBook, FiBell, FiChevronDown } from "react-icons/fi";
import { FaRegCircleUser } from "react-icons/fa6";
import { FcMindMap } from "react-icons/fc";
import Badge from '@mui/material/Badge';
import { useState } from "react";
import { BiMenu, BiExpand } from "react-icons/bi";

const Navbar = () => {


    const [isClick, setIsClicked] = useState(false);

    return (
        <div className='navbar'>
            <div className='nav_left'>
                {/* <img src={logo_image} alt="" /> */}
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ_cNA4fHWPmyVYVq6NYMYWhSTCBS9-Q9bV3buGqIMxM-_dMLguKDcs2t77y-9BraN0rQ&usqp=CAU" alt="" />

            </div>

            <div className={`${!isClick ? 'mid_nav' : 'mid_nav mid_nav2'}`}>
                <div className="icon-box">
                    <BsGrid className="icon" />
                    <div>Dashboard</div>
                </div>

                <div className="icon-box course">

                    <FiBook className="icon" />
                    <div>Course</div>
                </div>
                <div className="icon-box">
                    <BsAward className="icon" />
                    <div> Achievement</div>
                </div>

                <div className="icon-box">
                    <FcMindMap className="icon" />
                    <div>Learning </div>
                </div>

                <div className="nav_right2">
                    <FaRegCircleUser className="icon" />
                    <Badge badgeContent={4} color="error">
                        <FiBell className="icon" />
                    </Badge>
                    <FiChevronDown className="icon" />
                </div>




            </div>

            <div className='nav_right'>
                <FaRegCircleUser className="icon" />
                <Badge badgeContent={4} color="error">
                    <FiBell className="icon" />
                </Badge>
                <FiChevronDown className="icon" />

            </div>

            <div className="menu-icon">
                {!isClick && <BiMenu className="icon" onClick={() => setIsClicked(!isClick)} />}
                {isClick && <BiExpand className="icon" onClick={() => setIsClicked(!isClick)} />}
            </div>

        </div>
    )
}

export default Navbar