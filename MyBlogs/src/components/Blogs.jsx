import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import BlogDetails from "./BlogDetails";

export default function Blogs() {
  const { posts, loading } = useContext(AppContext);
  const {viewMode} = useContext(AppContext);

  return (
    <div 
    className={viewMode?
      ("w-[100vw] pb-20 h-[calc(100vh-6.5rem)] flex flex-col justify-start bg-gray-950 items-center no-scrollbar overflow-y-scroll overflow-x-hidden")
      :
      ("w-[100vw] pb-20 h-[calc(100vh-6.5rem)] flex flex-col justify-start items-center no-scrollbar overflow-y-scroll overflow-x-hidden")}
    >
      {loading ? (
        <div className="flex flex-col w-[50vw] justify-center items-center font-semibold uppercase text-2xl h-full">
          <p>Loading ...</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="flex flex-col w-[50vw] h-[calc(100vh-3.5rem)] justify-center items-center font-semibold uppercase text-2xl ">
        <p>No Blog Found!</p>
        </div>
      ) : (
        posts.map((post) => (
          <BlogDetails key={post.id} post={post} />
        ))
      )}
    </div>
  );
}
