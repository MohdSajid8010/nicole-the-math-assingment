import "../styles/navbar.css"
import logo_image from "../asset/e-teachers-logo-new.png"
import { BsGrid, BsAward } from "react-icons/bs";
import { FiBook, FiBell, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FaRegCircleUser } from "react-icons/fa6";
import { VscBellDot } from "react-icons/vsc";
import { FcMindMap } from "react-icons/fc";
import Badge from '@mui/material/Badge';
import { useState } from "react";

const Navbar = () => {
    const [isClick, setIsClicked] = useState(false)
    return (
        <div className='navbar'>
            <div className='nav_left'>
                {/* <img src={logo_image} alt="" /> */}
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ_cNA4fHWPmyVYVq6NYMYWhSTCBS9-Q9bV3buGqIMxM-_dMLguKDcs2t77y-9BraN0rQ&usqp=CAU" alt="" />

            </div>

            <div className={`${!isClick ? 'mid_nav' : 'mid_nav mid_nav2'}`}>
                <div>
                    <BsGrid className="icon" />
                    <div>Dashboard</div>
                </div>

                <div className="course">

                    <FiBook className="icon" />
                    <div>Course</div>
                </div>
                <div>
                    <BsAward className="icon" />
                    <div> Achievement</div>
                </div>

                <div>
                    <FcMindMap className="icon" />
                    <div>Learning </div>
                </div>




            </div>

            <div className='nav_right'>
                <FaRegCircleUser className="icon" />
                {/* <VscBellDot /> */}
                <Badge badgeContent={4} color="error">
                    <FiBell className="icon" />
                </Badge>
                <FiChevronDown className={`forRedcolor ${!isClick ? "icon " : "icon icon2"}`} onClick={() => setIsClicked(!isClick)} />

            </div>

        </div>
    )
}

export default Navbar