import React from 'react'
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Header from './components/Header'
import Home from './pages/UserPages/Home'
import SignIn from './pages/UserPages/SignIn'
import SignUp from './pages/UserPages/SignUp'
import PrivateRoute from './components/PrivateRoute'
import BlogById from './pages/BlogPages/BlogById'
import About from './pages/UserPages/About'
import MyBlogs from './pages/BlogPages/MyBlogs'
import NewBlog from './pages/BlogPages/NewBlog'
import Profile from './components/Profile'
import UserBlog from './pages/BlogPages/UserBlog'
const App = () => {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' exact element={<Home/>} />
      <Route path='/signin' element={<SignIn/>} />
      <Route path='/signup' element={<SignUp/>} />
      <Route element={<PrivateRoute/>} >
          <Route path='/blog/:id' element={<BlogById/>} />
          <Route path='/userblog/:id' element={<UserBlog/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/myblogs' element={<MyBlogs/>} />
          <Route path='/new-blog' element={<NewBlog/>} />
          <Route path='/profile' element={<Profile/>} />
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App