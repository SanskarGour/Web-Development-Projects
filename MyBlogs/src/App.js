import "./App.css";
import { useContext, useEffect } from "react";
import { AppContext } from "./context/AppContext";
// import Header from "./components/Header";
// import Blogs from "./components/Blogs";
// import Pagination from "./components/Pagination";
import { Route, Routes, useLocation, useSearchParams } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import BlogPage from "./Pages/BlogPage";
import TagPage from "./Pages/TagPage";
import CategoryPage from "./Pages/CategoryPage";
// import MainPage from "./Pages/MainPage";

export default function App() {
  const { fetchBlogPosts } = useContext(AppContext);
  // useSearchParams is used to get and set parameter in the current location
  // react router v6 calls objs search params because they exist in window.location.search 
  const [searchPramas] = useSearchParams();
  //useLocation returns an objs of current location
  const location = useLocation();

  useEffect(() => {
    // if page ke liye value mil jae tho page = value krdo nhi tho page = 1 krdo   
    const page = searchPramas.get("page") ?? 1;

    if(location.pathname.includes("tags")){
      // iska matlab tag wala page show krna ha

      // pathname > "/" ke basis pr different intities hai > usme se jo last "/" ha > 
      // uske aghe jo value ha > usme "-" replace krke " " laga kr > tag me store krna ha

      const tag = location.pathname.split("/").at(-1).replaceAll("-"," ");
      fetchBlogPosts(Number(page), tag);
    } 
    else if(location.pathname.includes("categories")){
      const category = location.pathname.split("/").at(-1).replaceAll("-"," ");
      fetchBlogPosts(Number(page), null, category);
    } 
    else {
      fetchBlogPosts(Number(page));
    }

    // jb bhi URL ke andar location me kuch change ho tab (location.pathname) , yah page change ho tab call hona chahiye
    // location.pathname = /HomePage/
    // location.search = ?tags={tag} => return a value for key tag
  }, [location.pathname, location.search] );

  return (
    <Routes>
      <Route path="/" element = {<HomePage />} />
      {/* dynamic paramete /:  */}
      {/* bolg ke aghe jo bhi likha aega usko blogID man liya jaega (/blog/100) */}
      <Route path="/blog/:blogId" element = {<BlogPage />} />
      <Route path="/tags/:tag" element = {<TagPage />} />
      <Route path="/categories/:category" element = {<CategoryPage />} />
    </Routes>

  // <Routes>
  // <Route path="/" element = {<MainPage />}>
  //   <Route index element = {<HomePage />} />
  //   {/* dynamic paramete /:  */}
  //   {/* blog ke aghe jo bhi likha aega usko blogID man liya jaega (/blog/100) */}
  //   <Route path="/blog/:blodID" element = {<BlogPage />} />
  //   <Route path="/tag/:tag" element = {<TagPage />} />
  //   <Route path="/category/:category" element = {<CategoryPage />} />
  // </Route>
  // </Routes>
  );
}
