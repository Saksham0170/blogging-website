import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Blog from './pages/Blog'
import Blogs from './pages/Blogs'
import Publish from './pages/Publish'
import ProtectedRoute from './components/ProtectedRoute';
import { Navigate } from 'react-router-dom' 
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* public routes */}
          <Route path='/signup' element={<Signup/>}></Route>  
          <Route path='/signin' element={<Signin/>}></Route>

          {/* protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path='/blog/:id' element={<Blog/>}></Route>
            <Route path='/blogs' element={<Blogs/>}></Route>
            <Route path='/publish' element={<Publish/>}></Route>
          </Route>  

          {/* fallback for protected routes and wrong url */}
          <Route
            path="*"
            element={
              localStorage.getItem('token') ? (
                <Navigate to="/blogs" />
              ) : (
                <Navigate to="/signin" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
