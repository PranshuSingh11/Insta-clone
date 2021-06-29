import React from 'react'
import { useHistory } from 'react-router'
import NavBar from './NavBar';

function Logout() {
    let history = useHistory()
    const logout = () =>{
        localStorage.removeItem('JWTtoken')
        history.push('/')
    }
    return (
        <div>
            <NavBar></NavBar>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Logout
