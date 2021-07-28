import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import {useHistory,Link} from 'react-router-dom'
import logo from '../assets/images/Logo.png'

function NavLogin() {
  let history = useHistory()
  const logout = () =>{
    localStorage.removeItem('JWTtoken')
    localStorage.removeItem('UserEmail')
    localStorage.removeItem('UserName')
    history.push('/login')
}

  return (
    <div>
      <Navbar bg="light">
      <img id="logo" src={logo}></img>
        <Nav className="mr-auto">
          <Link to="/">
            <Nav.Link href="#home">Home</Nav.Link>
          </Link>
          <NavDropdown title="Profile" id="basic-nav-dropdown">
            <Link to="/create-post">
              <NavDropdown.Item href="#action/3.1">
                Create Post
              </NavDropdown.Item>
            </Link>
            <Link to="/post">
              <NavDropdown.Item href="#action/3.2">View Posts</NavDropdown.Item>
            </Link>
            <NavDropdown.Divider />
            <Link to="/profile">
              <NavDropdown.Item href="#action/3.3">Account</NavDropdown.Item>
            </Link>
            <Link>
              <NavDropdown.Item href="#action/3.3" onClick={logout}>Logout</NavDropdown.Item>
            </Link>
          </NavDropdown>
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavLogin;
