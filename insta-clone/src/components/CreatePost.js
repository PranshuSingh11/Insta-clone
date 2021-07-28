import React, { useState,useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from 'axios'
import { useHistory } from "react-router-dom";
import NavBar from './NavBar';
import NavLogin from './NavLogin'
import 'bootstrap/dist/css/bootstrap.css'

function CreatePost() {


    

    var [username,setUsername] = useState("")
    var [caption,setCaption] = useState("")
    var [image,setImage] = useState("")

    let history = useHistory();
    const JWTtoken = localStorage.getItem('JWTtoken')

    const submitHandler = (e) => {



        e.preventDefault()
        setUsername("")
        setCaption("")
        
        const formData = new FormData()
        formData.append('image', image)
        formData.append('caption', caption)
        formData.append('username', username)
        axios.post("http://localhost:3001/posts",formData,{
          headers:{
            'auth-token':JWTtoken
          }
        })
        .then((data)=>{
          if(data.status===200){
          console.log(data)
          alert('Post Added Successfully')
          history.push('/profile')
        }
        if(data.status===400){
          localStorage.removeItem("JWTtoken")
        }
        })
        .catch((err)=>{
          console.log({message:err})
          history.push('/unauthorized')
        })
    }

    useEffect(() => {
      document.body.style.backgroundColor="black"

      return ()=>{
        document.body.style.backgroundColor="white"
      }
    }, [])
    
    var Button
    if(JWTtoken)
      Button = <NavLogin></NavLogin>
    else
      Button = <NavBar></NavBar>

  return (
    <div style={{backgroundColor:"black",height:"100vh"}}>
      {Button}
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
        <form  onSubmit={submitHandler} style={{padding:"50px"}}>
            <label style={{padding:"25px"}}>Username</label>
            <input value={username} onChange={e=>{setUsername(e.target.value)}} type="text"></input><br></br>
            <label style={{padding:"25px"}}>Caption</label>
            <input value={caption} onChange={e=>{setCaption(e.target.value)}} type="text"></input><br></br>
            <input style={{padding:"25px"}} onChange={e=>{setImage(e.target.files[0]); console.log(e.target.files)}} type="file"></input><br></br>
            <label style={{padding:"25px"}}>   
              {image.preview?
              <img src={image.preview}  alt="dummy" width="300" height="300"></img>:
              <p>Upload pic</p>}
            </label><br></br>
            <input type="submit"></input>
        </form>
        </div>
        </div>
      </div>
     
      
    </div>
  );
}

export default CreatePost;
