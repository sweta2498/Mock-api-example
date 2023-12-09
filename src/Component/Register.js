import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import {  setSnackbar } from '../Redux/ActionCreator'


const Register = () => {
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [profilephoto, setphoto] = useState("")
    const [values, setValues] = useState({
        name: "",
        contact: "",
        email: "",
        password: ''
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setphoto(base64);
      };
    
      const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
    
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
    
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      };

    function registerbtn() {
        // const data={name,contact,email,password}
            const name=values.name;
            const contact=values.contact;
            const email=values.email;
            const password=values.password;
        const data={name,contact,email,password,profilephoto};
        // console.log("=-=-=",data);
        if (values.name === '' || values.email === '' || values.contact === '' || values.password === '' || profilephoto==="") {
            console.log("Enter Value");
        }
        else {
            fetch("https://62983daaf2decf5bb73ddb37.mockapi.io/UserData",
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(data)

                }).then((result) => {
                    // alert("yesssss");
                    navigate('/')
                    
                    dispatch(setSnackbar({
                        open: true,
                        message: "Register Sucessfull..!!",
                        type: "success"
                    }))
                })
        }
    }

    return (
        <div>Register

            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                width: '70vh',
                m: 10
            }}>

                <TextField
                    label="Name"
                    value={values.name}
                    fullWidth
                    onChange={handleChange('name')}
                    sx={{ m: 1 }} />

                <TextField
                    label="Contact No"
                    value={values.contact}
                    fullWidth
                    onChange={handleChange('contact')}
                    sx={{ m: 1 }} />

                <TextField
                    label="Email"
                    value={values.email}
                    onChange={handleChange('email')}
                    fullWidth
                    sx={{ m: 1 }} />

                <TextField
                    label="Password"
                    fullWidth
                    type='password'
                    value={values.password}
                    onChange={handleChange('password')}
                    sx={{ m: 1 }} />

                <TextField
                    fullWidth
                    type='file'
                    label='Choose Photo'
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => {
                        uploadImage(e);
                    }}
                    sx={{ m: 1 }} />


                {/* <Input
                    fullWidth
                    type='file'
                    onChange={(e)=>setFile(e.target.files[0])}
                    sx={{ m: 1 }} /> */}

            </Box>

            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                width: '70vh',
                m: 5

            }}>
                <Button
                    sx={{ mt: -6 }}
                    variant='outlined'
                    onClick={registerbtn}>Register</Button>
            </Box>

        </div>
    )
}

export default Register