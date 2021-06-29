import React,{useState} from "react";
import  axios  from "axios";
import {  Form,Label,Input,FormGroup } from "reactstrap";
import { useHistory } from "react-router-dom";
import NavBar from './NavBar';

function Register(props) {

  let history = useHistory();

  var [name,setName]=useState('')
  var [email,setEmail]=useState('')
  var [password,setPassword]=useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    const data = {
      name:name,
      email:email,
      password:password
    }
    axios.post("http://localhost:3001/user/register",data)
    .then((response)=>{
      console.log(response)
      alert('User added successfully');
      history.push('/login')
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
          <Label for="exampleEmail">Name</Label>
          <Input
            type="text"
            name="name"
            id="exampleText"
            placeholder="Name"
            value={name}
            onChange={(e)=>{setName(e.target.value)}}
          />
        </FormGroup>
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

export default Register;
