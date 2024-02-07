import React, { useRef } from "react";
import logo from "./image.png";
import { NavLink, useNavigate } from "react-router-dom";


const Navbar = () => {
  return (
    <div className="bg-black w-[100%] ">
      <div className=" text-white flex h-[4rem] justify-between mx-auto items-center max-w-[1200px]">
        <div className="w-[40%]">
          <NavLink to={"/"} className="h-14"><img className="h-14" src={logo}></img></NavLink>
        </div>

        <div className=" text-white flex h-[4rem] max-w-[10rem] w-[10rem] mr-12 justify-between items-center">
          <div className="w-10 h-50 flex justify-center items-center">
            <NavLink
              to="/"
              className="rounded-lg flex justify-center items-center w-full h-full"
            >
              Home
            </NavLink>
          </div>

          <div className="w-10 h-50 flex justify-center items-center">
            <NavLink
              to="/coins"
              className="rounded-lg flex justify-center items-center w-full h-full"
            >
              Coin
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
