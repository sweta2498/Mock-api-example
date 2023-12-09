import { Box, Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setSnackbar } from '../Redux/ActionCreator';

const Update = () => {

    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name, setName] = useState("")
    const [contact, setContact] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    // const [values, setValues] = useState({
    //     name: "",
    //     contact: "",
    //     email: "",
    //     password: ''
    // });

    // const handleChange = (prop) => (event) => {
    //     setValues({ ...values, [prop]: event.target.value });
    // };

    useEffect(() => {
        getData();
    }, [])

    function getData() {
        fetch(`https://62983daaf2decf5bb73ddb37.mockapi.io/UserData/${params.id}`).then((result) => {
            result.json().then((resp) => {

                console.log("-----", resp);

                setName(resp.name)
                setContact(resp.contact)
                setEmail(resp.email)
                setPassword(resp.password
                )
            })
        })
    }

    const updatebtn = async () => {

        let data = { name, contact, email, password }
        let result = await fetch(`https://62983daaf2decf5bb73ddb37.mockapi.io/UserData/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'Application/json'
            }
        });
        result = await result.json();
        if (result) {
            // alert("Update Success..!!!")
            navigate('/')
            dispatch(setSnackbar({
                open: true,
                message: "Update Sucessfull..!!",
                type: "success"
            }))
        }
    }
    return (
        <div>
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
                    value={name}
                    fullWidth
                    onChange={(e) => setName(e.target.value)}
                    sx={{ m: 1 }} />

                <TextField
                    label="Contact No"
                    value={contact}
                    fullWidth
                    onChange={(e) => setContact(e.target.value)}
                    sx={{ m: 1 }} />

                <TextField
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    sx={{ m: 1 }} />

                <TextField
                    label="Password"
                    fullWidth
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ m: 1 }} />

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
                    onClick={updatebtn}>Update Detail</Button>
            </Box></div>
    )
}

export default Update