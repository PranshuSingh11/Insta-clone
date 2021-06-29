import React,{useState} from "react";
import  axios  from "axios";
import {  Form,Label,Input,FormGroup } from "reactstrap";
import { useHistory } from "react-router-dom";
import NavBar from './NavBar';

function Login() {

  let history = useHistory();


  var [email,setEmail]=useState('')
  var [password,setPassword]=useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    const data = {
      email:email,
      password:password
    }
    console.log(data)
    axios.post("http://localhost:3001/user/login",data)
    .then((response)=>{
     
      console.log(response)
      var JWTtoken = response.data
      localStorage.setItem("JWTtoken",JWTtoken)
      localStorage.setItem("UserEmail",data.email)
      alert('Welcome');

      axios.get("http://localhost:3001/posts", {
        headers: {
        "auth-token":localStorage.getItem("JWTtoken")
        }
        })
        .then(response=>{
          console.log(response)
          history.push('/post')
        })
        .catch(err=>{
          console.log({message:err})
        })
    })


    
    .catch((err)=>{
      console.log({message:err.response.data})
      alert(err.response.data)
    })
  }



  return (
    <div>
    <NavBar></NavBar>
    <div style={{width:'25%',margin:'auto'}}>
    
      <Form onSubmit={submitHandler}>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input
            type="email"
            name="email"
            id="exampleEmail"
            placeholder="Email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input
            type="password"
            name="password"
            id="examplePassword"
            placeholder="Password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
          />
        </FormGroup>
        <input type="submit"></input>
      </Form>
    </div>
    </div>
  );
}

export default Login;
