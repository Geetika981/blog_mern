import React from 'react'
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Header from './components/Header'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import PrivateRoute from './components/PrivateRoute'
import BlogById from './pages/BlogById'
import About from './pages/About'
import MyBlogs from './pages/MyBlogs'
import NewBlog from './pages/NewBlog'
import Profile from './components/Profile'
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