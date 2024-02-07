import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import React from "react";

export default function Pagination() {
  
  const {page, handlePageChange, totalPages} = useContext(AppContext);
  const {viewMode} = useContext(AppContext);

  if (!totalPages) return null;

  return (
    <footer className={
      viewMode?
      ("w-[100vw] h-[3rem] flex justify-center border-t-[0.5px] bg-myDark text-white shadow-lg z-[-10] items-center")
      :
      ("w-[100vw] h-[3rem] flex justify-center border-t-[0.5px] shadow-lg z-[-10] items-center")
    }>
    <div className="w-[45vw] h-full flex justify-between items-center text-sm">
      <div className=" flex gap-5">
        { page > 1 &&
          (<button className="border border-gray-400 rounded-lg py-1 px-2"
            onClick={() => handlePageChange(page-1)}
          >Previous</button>)
        }
        {
          page < totalPages && 
          (<button className="border border-gray-400 rounded-lg py-1 px-2"
            onClick={() => handlePageChange(page+1)}
          >Next</button>)
        }
      </div>

      <p className="w-[5rem]">Page {page} of {totalPages}</p>
    </div>
    </footer>
  );
}
