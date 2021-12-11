import React from "react";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
    const navigate = useNavigate();
    
    return (
        <>
            <nav>
              <div className="nav-wrapper">
                <ul id="nav-mobile" className="left">
                    <li className="brand">Welcome</li>
                    <li><Link to="/createstudent">Create Student</Link></li>
                    <li><Link to="/getstudents">Get Student List</Link></li>
                </ul>
                <ul id="nav-mobile" className="right">
                    <li><button className="btn-flat" onClick={() => {navigate("/");
                        localStorage.clear()
                        }}>Logout</button></li>
                        
                </ul>
              </div>
          </nav>
        </>
    )
}

export default NavBar;