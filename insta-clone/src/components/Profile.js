import axios from 'axios'
import React,{useEffect,useState,useContext} from 'react'
import NavBar from './NavBar';
import { useHistory } from 'react-router';
import NavLogin from './NavLogin';
import 'bootstrap/dist/css/bootstrap.css'
import profilepic from '../assets/images/image.jfif'
import { useParams } from 'react-router-dom';
import { Spinner } from 'reactstrap';

function Profile() {
  var [userposts,setUserposts] = useState([])
  var [user,setUser] = useState({})
  var [loaded,setLoaded] = useState(false)


  
  var {userId} = useParams()



  let history = useHistory()
  const JWTtoken = localStorage.getItem("JWTtoken")


    useEffect(() => {

      
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
        setLoaded(true)
        })
        .catch(err=>{
          console.log(err)
          history.push('/unauthorized')
        
        })


        axios.get('http://localhost:3001/user',{
          headers:{
              'auth-token':JWTtoken
            }
          })
        .then(res=>{
          console.log(res)
          setUser(res.data)
        })


        
    }, [])

 
  



    var Button
    if(JWTtoken)
      Button = <NavLogin></NavLogin>
    else
      Button = <NavBar></NavBar>

    return (
      <>
      {loaded?
       <div>
       {Button}
       


       <div id="profile-cont" className="container">
        <div className="row" >
           <div className="col-4 my-auto" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
             <img class="profile-pic" src={profilepic}></img>
           </div>
           <div className="col-8 my-auto" style={{marginTop:"center",marginBottom:"center"}}>
               <h5>{user.name}</h5>
               <div>
                 <ul style={{listStyle:"none",display:"flex",justifyContent:"space-around",alignItems:"center"}}>
                   <li>
                     <b>{userposts.length}</b> posts
                   </li>
                   <li>
                     <b>{user.followers.length}</b> followers
                   </li>
                   <li>
                     <b>{user.following.length}</b> following
                   </li>
                 </ul>
               </div>
           </div>
        </div>
       </div>

    <hr></hr>



                <div className="grid-container">
                  {userposts.map(post=>(
                <div className="post-cont">
                  <img className="posts" src={post.image}>
                  </img>
                  <div className="post-stats">
                  
                      <p style={{padding:"5px"}}><i class="fas fa-heart" aria-hidden="true"></i> {post.likes.length} </p>
                      <p><i class="fas fa-comment" aria-hidden="true"></i> 0 </p>

                  </div>
                  </div>
            
                
              ))}
              </div>
    
     
    
     </div> :<div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}> <h2><Spinner color="danger" /></h2></div>}
       
        </>
    )
}

export default Profile
