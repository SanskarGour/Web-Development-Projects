import Header from "../components/Header";
import Blogs from "../components/Blogs";
import Pagination from "../components/Pagination";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";

export default function TagPage ()  {
    
    const navigation = useNavigate();
    const location = useLocation();
    const tag = location.pathname.split("/").at(-1);
    const {viewMode} = useContext(AppContext);

    return (
        <div>
        <Header />
        {/* <div className='max-w-[720px] px-[25px] mx-auto'> */}
        <div className={ viewMode?
        ("h-[calc(100vh-6.5rem)] pb-10 overflow-hidden  bg-gray-950 text-white ")
        :
        ("h-[calc(100vh-6.5rem)] pb-10 overflow-hidden")}>
        <div className={viewMode? 
          (' flex items-center justify-between gap-3 max-w-[45vw] bg-gray-950 text-white  mx-auto my-5 z-10 ') 
          : 
          (' flex items-center justify-between gap-3 max-w-[45vw] text-black mx-auto my-5 z-10 ')}>
            <button className='border-2 rounded-md border-[#dfdfdf] py-1 px-4 transition-all'
            onClick={() => navigation(-1)}>
            Back
            </button>
            <h2 className='font-bold'>
            Blogs Tagged <span className='text-blue-700'>#{tag}</span>
            </h2>
        </div>
        <Blogs />
        </div>
        <Pagination />
    </div>
    );
}