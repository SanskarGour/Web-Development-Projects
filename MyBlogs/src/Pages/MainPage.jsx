import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Blogs from "../components/Blogs";
import Pagination from "../components/Pagination";

export default function MainPage(){
    return (
        <div>
            {Outlet}
            <Header />
            
            <Blogs />
            <Pagination />
        </div>
    );
}