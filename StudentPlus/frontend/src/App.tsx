import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Signup } from './pages/Signup'
import Signin from './pages/Signin'
import { Blog } from './pages/Blog'
import Blogs from './pages/Blogs'
import LikedPage from './pages/LikedPage'
import { WorkInProgress } from './components/WorkInProgress'
// import {Publish} from './pages/Publish'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path='/publish' element={<Publish/>}/> */}
          <Route path="/signup" element={<Signup/>} />
          <Route path="/signin" element={<Signin/>} />
          <Route path="/blogs" element={<Blogs/>} />
          <Route path='/blog/:id' element={<Blog/>}/>
          <Route path='/blog/likedPosts' element={<LikedPage/>} />
          <Route path='/saved' element={<WorkInProgress/>}/>
          <Route path='/myCollege' element={<WorkInProgress/>}/>
          <Route path='/contact' element={<WorkInProgress/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
