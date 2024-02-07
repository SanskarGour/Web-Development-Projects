import React from 'react'
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { NavLink } from 'react-router-dom';

const BlogDetails = ({post}) => {
  const {viewMode} = useContext(AppContext);

  return (
    <div className={ viewMode ? 
    ('w-[45vw] border border-gray-600 text-white bg-black z-20 rounded-lg p-7 flex flex-col gap-3 mt-5')
    :
    ('w-[45vw] shadow-md shadow-gray-400 z-20 rounded-lg bg-white p-7 flex flex-col gap-3 mt-5')}>

      <div>
        <NavLink to={`/blog/${post.id}`}><span className='text-xl font-semibold mb-1'>{post.title}</span>
        </NavLink>
        <p className='text-xs'>
          By <span className='italic'>
              {post.author}
            </span> 
            {" "} on {" "}
            <NavLink to={`categories/${post.category.replaceAll(" ","-")}`}>
            <span className='underline font-semibold '>
              {post.category}
            </span>
            </NavLink>
        </p>
        <p className='text-xs'> Posted on {post.date} </p>
      </div>


      <p className='font-medium'> {post.content}</p>

      <div className='text-sm text-blue-600'>
        {post.tags.map( (tag, index) => (
          <NavLink key={index} to={`tags/${tag.replaceAll(" ","-")}`}>
          <span>
            {`#${tag} `}
          </span>
          </NavLink>
          
          
        ) ) }
      </div>

    </div>
  )
}

export default BlogDetails;
