import { Alert, AppBar, Avatar, Box, Button, Snackbar, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setLogout, setSnackbar } from '../Redux/ActionCreator'
// import { Link } from 'react-router-dom'
import pic from '../Images/pic.jpg'
import Menupage from './Menupage'

const Navbar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const logindata = useSelector((state) => state.Login.name);
    const snackbar = useSelector((state) => state.SnackBar);
    const handleClose = () => {
        dispatch(
            setSnackbar({
                open: false,
                message: "",
                type: snackbar.type,
            })
        )
    }

    function loginbtn() {
        navigate("/login")
    }
    function registerbtn() {
        navigate("/register")
    }
    // function searchbtn() {
    //     navigate("/search")
    // }
    function homebtn() {
        navigate("/")
    }
    function newpost() {
        navigate("/newpost")
    }
    function logoutbtn() {
        // localStorage.removeItem("login")
        localStorage.removeItem('token');
        dispatch(setLogout());
        navigate("/login")
    }

    return (
        <div>
            <AppBar position='fixed'>
                <Toolbar>
                   
                    <Typography variant='h6' flexGrow={1}></Typography>

                    {/* <Button variant='text' color="inherit" onClick={loginbtn}>Login</Button> */}
                    {/* <Button variant='text' color="inherit" onClick={registerbtn}>Register</Button> */}
                    {/* <Button variant='text' color="inherit" onClick={searchbtn}>Search Detail</Button> */}
                    <Button variant='text' color="inherit" onClick={homebtn}>Home</Button>
                    <Button variant='text' color="inherit" onClick={newpost}>New Post</Button>
                    {/* <Button variant='text' color="inherit" onClick={logoutbtn}>Logout</Button> */}
                    {
                        !localStorage.getItem('token') ?
                        <Button variant='text' color="inherit" onClick={loginbtn}>Login</Button>
                            :
                           null
                    }
                    {
                        localStorage.getItem('token') ?
                            null
                            :
                            <Button variant='text' color="inherit" onClick={registerbtn}>Register</Button>
                    }
                    {
                        localStorage.getItem('token') ? <Menupage/> : null
                    }
                </Toolbar>

                <Snackbar
                    open={snackbar.open}
                    onClose={handleClose}
                    autoHideDuration={3000}
                    anchorOrigin={{ horizontal: "center", vertical: "bottom" }}>
                    <Alert onClose={handleClose} variant="filled" severity={snackbar.type}>
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </AppBar>
        </div>
    )
}

export default Navbar