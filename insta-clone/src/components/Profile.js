import axios from 'axios'
import React,{useEffect,useState} from 'react'
import NavBar from './NavBar';
import { useHistory } from 'react-router';

function Profile() {
  var [userposts,setUserposts] = useState([])
  let history = useHistory()

    useEffect(() => {
        const JWTtoken = localStorage.getItem("JWTtoken")
        axios.get("http://localhost:3001/posts/myposts",{
            headers:{
                'auth-token':JWTtoken
            }
        })
        .then(res=>{
          if(res.status===200){
            console.log(res)
            setUserposts(res.data)
          }
          if(res.status==400){
            localStorage.removeItem("JWTtoken")
            history.pushState('/unauthorized')
          }
        })
        
    }, [])

    return (
        <div>
          <NavBar></NavBar>
            {userposts.map(post=>(
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
    )
}

export default Profile
