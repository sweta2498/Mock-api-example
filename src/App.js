
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Component/Login';
import Register from './Component/Register';
import HomePage from './Component/HomePage';
import Navbar from './Component/Navbar';
import Update from './Component/Update';
import Search from './Component/Search';
import NewPost from './Component/New Post';
import Protected from './Protected';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from './Redux/ActionCreator';
import { ActionType } from './Redux/ActionType';
import AllPost from './Component/AllPost';
import Comment from './Component/Comment';
import Menupage from './Component/Menupage';
import MyPost from './Component/MyPost';
import EditPost from './Component/EditPost';
import UpdatePost from './Component/UpdatePost';
import MyProfile from './Component/MyProfile';

// import PostComponent from './Component/PostComponent';

function App() {

  const logindata = useSelector((state) => state?.Login[0]?.email);
  const [auth, setAuth] = useState(Boolean(logindata))
  // console.log(Boolean(logindata));
  const dispatch = useDispatch()
  // console.log(logindata);

  useEffect(() => {
    let time1 = localStorage.getItem('token');
    const time = JSON.parse(time1);

    if (time === null) {
      // console.log("null");
      dispatch(setLogout());
      // setAuth(false)
    }
    else if (time.expiresIn < Date.now()) {
      // console.log("time1-", time.expiresIn);
      localStorage.removeItem('token')
      dispatch(setLogout());
      // console.log("heelo")
      // setAuth(false)
    }
    else {
      setAuth(true)
      dispatch({
        type: ActionType.SET_LOGIN,
        payload: time
      })
      // console.log("bello");
    }

  }, [])

   function RequireAuth({ children }) {
    console.log("knhjjnhnnj",Boolean(logindata));
    // return Boolean(logindata)? children : <Navigate to="/login" />; //
     return Boolean(logindata)? children : <Login/>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/home' element={<Protected Component={HomePage} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/cmt' element={<Comment />} />
          <Route path='/menupage' element={<Menupage />} />
          <Route path='/myprofile' element={<MyProfile />} />
          <Route path='/mypost' element={<MyPost />} />
          <Route path='/editpost' element={<EditPost />} />
          <Route path='/updatepost/:id' element={<UpdatePost />} />
          <Route path='/update/:id' element={<Update />} />
          <Route path='/search' element={<Search />} />
          <Route path='/newpost' element={<Protected Component={NewPost} />} />
          <Route path='/' element={<Protected Component={AllPost} />} />
          {/* <Route path='postcomponent' element={<PostComponent/>}/> */}

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
