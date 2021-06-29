import React, { useState,useEffect } from "react";
import axios from 'axios'
import NavBar from './NavBar';
import { useHistory } from "react-router";

function Post() {
  var [posts, setPosts] = useState([]);
  let history = useHistory()

    // var [posts, setPosts] = useState([ { username: "Pranshu_Singh", image: `${image}`, caption: "Hello" },
    // { username: "Pravin_Singh", image: `${image}`, caption: "Ciao" },]);
useEffect(()=>{
  const JWTtoken = localStorage.getItem('JWTtoken')
  axios.get("http://localhost:3001/posts",{
    headers:{
      'auth-token':JWTtoken
    }
  })
  .then(res=>{
  if(res.status===200){
    console.log(res)
    setPosts(res.data)
  }
  if(res.status===400)
    localStorage.removeItem(JWTtoken)
  })
  .catch(err=>{
    console.log(err)
    history.push('/unauthorized')
  })
},[])

  return (
    <div>
    <NavBar></NavBar>
        
    
        {posts.map((post) => (
          <>
            <main>
            <div className="head">
              <div className="image">
                <i className="fas fa-user-circle"></i>
              </div>
              <div className="username">{post.username}</div>
            </div>
            <div className="body">
              <img src={post.image}></img>
            </div>
            <div className="foot">
              <div className="like">
                <i className="far fa-heart fa-lg"></i>
              </div>
              <div className="comment">
                <i className="far fa-comment fa-lg"></i>
              </div>
            </div>
            <div className="caption">
              {post.username}&nbsp;
              {post.caption}
            </div>
            </main>
          </>
        

        ))}

         
    </div>
  );
}

export default Post;
