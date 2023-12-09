import { AccountCircle } from '@mui/icons-material'
import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setLogin, setSnackbar } from '../Redux/ActionCreator'

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        let login = localStorage.getItem('token');
        if (login) {
            navigate('/');
        }
    });

    const [values, setValues] = React.useState({
        email: "",
        password: ''
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const loginbtn = (e) => {
        dispatch(setLogin({
            email: values.email,
            password: values.password
        },
            (res) => {
                if (res.success) {
                    // console.log("sucess---",res.success);
                    dispatch(setSnackbar({
                        open: true,
                        message: res.message,
                        type: res.type
                    }))
                    navigate("/")
                    // alert("Login success..!!!")
                } else {
                    dispatch(setSnackbar({
                        open: true,
                        message: res.message,
                        type: res.type
                    }))
                }
            }
        ))
    }

    return (
        <div>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mt: 10
            }}>
                <Typography variant='h6'>Sign In</Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                m: 1
            }}>
                <AccountCircle
                    sx={{
                        mr: 1,
                        my: 0.5
                    }} />
                <TextField
                    label="Email"
                    variant="standard"
                    value={values.email}
                    onChange={handleChange('email')} />
            </Box>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                m: 1

            }}>
                <AccountCircle
                    sx={{

                        mr: 1,
                        my: 0.5
                    }} />
                <TextField
                    label="Password"
                    variant="standard"
                    type="password"
                    value={values.password}
                    onChange={handleChange('password')} />
            </Box>

            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'

            }}>
                <Button onClick={loginbtn} sx={{ mt: 2 }} variant='outlined'>Signin</Button>
            </Box>
        </div >
    )
}
export default Login