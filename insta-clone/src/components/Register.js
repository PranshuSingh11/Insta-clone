import React,{useState,useContext} from "react";
import  axios  from "axios";
import {  Form,Label,Input,FormGroup } from "reactstrap";
import { useHistory,Link } from "react-router-dom";
import NavBar from './NavBar';
import loginImg from '../assets/images/login9.svg'

function Register() {

  const [name,setName]=useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')


  let history = useHistory();


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
   
    <div className="row" style={{height:"93vh",backgroundColor:"black"}}>
      <div className="col-lg-6">
      <img style={{position:"absolute",left:"0",right:"0",top:"0",bottom:"0",width:"50%",margin:"auto",height:"auto"}} src={loginImg}></img>
      </div>
      <div id="form" className="col-lg-6" >
      <Form onSubmit={submitHandler}>
        <Label style={{fontSize:"50px",fontFamily:"'Anton', sans-serif"}}>INSTAGRAM</Label><br></br><br></br>
        <FormGroup>
          <Label for="examplePassword">Name</Label>
          <Input
            type="text"
            name="name"
            id="examplePassword"
            placeholder="Name"
            value={name}
            onChange={(e)=>{setName(e.target.value)}}
            style={{width:"50%",margin:"auto"}}
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

        <p style={{color:"white"}}>Already have an account ? <Link style={{color:"#F50057"}} to='/login'>Sign in</Link> now !!!</p>
      </Form><br></br>

      </div>
    </div>
    </div>
  );
}

export default Register;
