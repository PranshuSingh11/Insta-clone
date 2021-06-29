import './App.css';
import {useState,useEffect} from 'react'
import NavBar from './components/NavBar';
import Post from './components/Post'
import 'bootstrap/dist/css/bootstrap.min.css';
import image from "../src/assets/images/image.jfif";
import CreatePost from './components/CreatePost';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile'
import Logout from './components/Logout'
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from './components/Unauthorized';




function App() {   
    // useEffect(()=>{
    //   let data = localStorage.getItem('post-list')
    //   if(data){
    //     setPosts(JSON.parse(data))
    //   }
    // },[])

    // useEffect(()=>{
    //   localStorage.setItem('post-list',JSON.stringify(posts))
    // })
    

  return (
    <Router>
    <div className="App">
      <Switch>
        <Route path='/' exact ><Login></Login></Route>
        <Route path='/register' exact ><Register></Register></Route>
        <Route path='/login' exact ><Login></Login></Route>
        <ProtectedRoute path='/create-post' exact component={CreatePost}></ProtectedRoute>
        <ProtectedRoute path='/post' exact component={Post}></ProtectedRoute>
        <ProtectedRoute path='/profile' exact component={Profile}></ProtectedRoute>
        <ProtectedRoute path='/logout' exact component={Logout}></ProtectedRoute> 
        <Route path='/unauthorized' exact ><Unauthorized></Unauthorized></Route>
        <Route path='*' >404 Not found</Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
