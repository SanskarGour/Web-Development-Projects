import React from "react";
import './loader.css'

const Loader = () => {
    return(
        <div className="w-full h-[100vh]  flex justify-center items-center bg-black">
            <div class="custom-loader"></div>
        </div>
    );
};

export default Loader;