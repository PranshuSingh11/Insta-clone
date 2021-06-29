import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from 'axios'
import { useHistory } from "react-router-dom";
import NavBar from './NavBar';

function CreatePost() {

    

    var [username,setUsername] = useState("")
    var [caption,setCaption] = useState("")
    var [image,setImage] = useState("")

    let history = useHistory();
    

    const submitHandler = (e) => {

        const JWTtoken = localStorage.getItem('JWTtoken')

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
          history.push('/unauthorized')
        }
        })
        .catch((err)=>{
          console.log({message:err})
        })
    }
  return (
    <div>
      <NavBar></NavBar>

        <form onSubmit={submitHandler}>
            <input value={username} onChange={e=>{setUsername(e.target.value)}} type="text"></input>
            <input value={caption} onChange={e=>{setCaption(e.target.value)}} type="text"></input>
            <input onChange={e=>{setImage(e.target.files[0]); console.log(e.target.files)}} type="file"></input>
            <input type="submit"></input>
        </form>
    </div>
  );
}

export default CreatePost;
