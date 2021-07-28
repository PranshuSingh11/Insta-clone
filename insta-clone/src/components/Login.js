import React,{useState} from "react";
import  axios  from "axios";
import {  Form,Label,Input,FormGroup } from "reactstrap";
import { useHistory,Link } from "react-router-dom";
import NavBar from './NavBar';
import 'bootstrap/dist/css/bootstrap.css'
import loginImg from '../assets/images/login3.svg'


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
      var JWTtoken = response.data.token
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
   
    <div className="row" style={{height:"93vh",backgroundColor:"black"}}>
      <div className="col-lg-6">
      <img style={{position:"absolute",left:"0",right:"0",top:"0",bottom:"0",width:"50%",margin:"auto",height:"auto"}} src={loginImg}></img>
      </div>
      <div id="form" className="col-lg-6" >
      <Form onSubmit={submitHandler}>
        <Label style={{fontSize:"50px",fontFamily:"'Anton', sans-serif"}}>INSTAGRAM</Label><br></br><br></br>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input
            type="email"
            name="email"
            id="exampleEmail"
            placeholder="Email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            style={{width:"50%",margin:"auto"}}
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
            style={{width:"50%",margin:"auto"}}
          />
        </FormGroup>
        <input type="submit"></input><br></br><br></br>

        <p style={{color:"white"}}>Don't have an account ? <Link style={{color:"#F50057"}} to='/register'>Sign up</Link> now !!!</p>
      </Form><br></br>

      </div>
    </div>
    </div>
  );
}

export default Login;
