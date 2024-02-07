import Header from "../components/Header";
// import Blogs from "../components/Blogs";
// import Pagination from "../components/Pagination";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import BlogDetails from "../components/BlogDetails";
import './BlogPage.css';

export default function BlogPage ()  {

    const baseUrl = "https://codehelp-apis.vercel.app/api/";
    const [blog, setBlog] = useState(null);
    const [relatedBlogs, setRelatedBlogs] = useState([]);
    const location = useLocation();
    const navigation = useNavigate();
    const {loading , setLoading} = useContext(AppContext);
    const {viewMode} = useContext(AppContext);

    const blogId = location.pathname.split("/").at(-1);

    async function fetchRelatedBlogs () {
        setLoading(true);

        let url = `${baseUrl}get-blog?blogId=${blogId}`;
        console.log("URL is: ");
        console.log(url);

        try {
            const res = await fetch(url);
            const data = await res.json();
            setBlog(data.blog);
            setRelatedBlogs(data.relatedBlogs);
        } catch (error) {
            console.log("error");
            setBlog(null);
            setRelatedBlogs([]);
        }

        setLoading(false);
    }

    useEffect(() => {
        if(blogId){
            fetchRelatedBlogs();
        }
    } , [location.pathname]);

    return (
        <div className="overflow-hidden">
            <Header />
            <div className={viewMode? 
            ("mx-auto overflow-y-scroll h-[calc(100vh-3.5rem)] no-scrollbar pb-5 overflow-hidden bg-gray-950 flex flex-col start-center items-center") : 
            ("mx-auto overflow-y-scroll h-[calc(100vh-3.5rem)] no-scrollbar flex pb-5 flex-col overflow-hidden justify-start items-center")}>
                <div 
                className={viewMode? 
                (' flex items-center justify-between gap-3 max-w-[45vw] bg-gray-950 text-white  mx-auto my-5 z-10 ') 
                : 
                (' flex items-center justify-between gap-3 max-w-[45vw] mx-auto my-5 z-10 ')}>
                    
                    <button className='mt-6 border-2 rounded-md border-[#dfdfdf] py-1 px-4 transition-all'
                        onClick={() => navigation(-1)}
                    >
                        Back
                    </button>
                </div>
                {
                    loading ?
                    (<div className={viewMode? ("flex flex-col w-[50vw] text-white bg-gray-950 justify-center no-scrollbar items-center font-semibold uppercase text-2xl h-full"):
                    ("flex flex-col w-[50vw] justify-center no-scrollbar items-center font-semibold uppercase text-2xl h-full")}>
                    <p>Loading ...</p>
                    </div>) :
                    blog ?
                    (<div className='flex flex-col'>
                        <BlogDetails post={blog} />
                        <h2 className={viewMode?('text-3xl text-white ml-1 font-bold mt-6'): ('text-3xl ml-1 font-bold mt-6')}> Related Blogs </h2>
                        {
                            relatedBlogs.map((post) => (
                                <div key={post.id}>
                                    <BlogDetails post={post} />
                                </div>
                            ))
                        }

                    </div>) :
                    (<div>
                        <p>No Blog Found</p>
                    </div>)

                }

            </div>

        </div>
    );
}