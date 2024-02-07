import Header from "../components/Header";
import Blogs from "../components/Blogs";
import Pagination from "../components/Pagination";

const Home = () => {
    return (
      <div>
        <Header/>
        {/* <div className='py-24 mx-auto max-w-[45vw] px-[25px] '> */}
        <div>
          <Blogs/>
        </div>
        <Pagination/>
      </div>
    )
  }
  
  export default Home;
  