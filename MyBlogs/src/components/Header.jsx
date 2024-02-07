import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import {Link} from 'react-router-dom';

export default function Header() {

  const {viewMode, setViewMode} = useContext(AppContext);
  
  return (
    <header 
    className={viewMode? 
    ("w-[100vw] h-[3.5rem] relative border-b-[0.5px] border-gray-300 text-white font-semibold flex bg-myDark items-center justify-center text-3xl") 
    : 
    ("w-[100vw] shadow-lg shadow-gray-300 h-[3.5rem] relative border-b-[0.5px] border-gray-300 text-black font-semibold flex items-center justify-center text-3xl")}
    > 
      <Link to={'/'}>
      <h1 className="w-[45vw] text-center">
        My Blogs
      </h1>
      </Link>
    
      <button onClick={() => {setViewMode((mode) => !mode)}}
      className={viewMode? ("text-white text-sm font-normal absolute right-10 top-3 border border-gray-600 hover:cursor-pointer py-1 z-30 w-[3.5rem] px-2 rounded-lg") 
      : ("text-black bg-white text-sm font-normal border border-gray-600 absolute right-10 top-3 hover:cursor-pointer py-1 z-30 w-[3.5rem] px-2 rounded-lg")}
      >{!viewMode? ('Dark') : ('Light')}</button>

    </header>
  );
}
