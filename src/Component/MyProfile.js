import { Avatar, Box, Button, Grid, Input, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setLogin, setLogout, setSnackbar } from '../Redux/ActionCreator'
import { ActionType } from '../Redux/ActionType'
import { saveTokenInLocalStorage } from './Service'

const MyProfile = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const logindata = useSelector((state) => state.Login)
    const trydata = useSelector((state) => state.Login)
    // console.log("myprofile====",trydata);
    const [name, setname] = useState("")
    const [contact, setcontact] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [profilephoto, setprofilephoto] = useState()
    const [task, settask] = useState(true)

    function logoutbtn() {
        localStorage.removeItem('token');
        dispatch(setLogout());
        navigate("/")
    }

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setprofilephoto(base64);
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

    function getdata() {
        setname(logindata.name)
        setcontact(logindata.contact)
        setemail(logindata.email)
        setpassword(logindata.password)
        setprofilephoto(logindata.profilephoto)
    }

    function editbtn() {
        getdata()
        settask(false)
    }

    const updatebtn =  (id) => {
        let data1 = { id,name, contact, email, password ,profilephoto}
        let data = { name, contact, email, password ,profilephoto}
        // console.log(data,"id==",id);
        let result =  fetch(`https://62983daaf2decf5bb73ddb37.mockapi.io/UserData/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'Application/json'
            }
        });

        // result =  result.json();
        if (result) {
            // alert("Update Success..!!!")
            // navigate('/')
            saveTokenInLocalStorage(data1);
            dispatch(setSnackbar({
                open: true,
                message: "Update Sucessfull..!!",
                type: "success"
            }))
            dispatch({
                type: ActionType.SET_LOGIN,
                payload: data1
            })
            settask(true)
        }
    }

    return (
        <div>MyProfile

            <Grid sx={{
                display: 'flex',
                flexDirection: "column",
                alignItems: 'center',
                justifyContent: 'center',
                mt: 10
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: "column",
                    alignItems: 'center',
                    justifyContent: 'center',
                    mt: 10
                }}>
                    <Avatar
                        sx={{ width: 200, height: 200 }}
                        src={logindata.profilephoto} />
                </Box>
                {
                    task &&
                    <>
                        <Box sx={{ display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: 'center', m: 1 }}>
                            <Typography>User ID :: </Typography>
                            <Typography ml={1}> {logindata.id}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: 'center', m: 1 }}>
                            <Typography>User Name :: </Typography>
                            <Typography ml={1}> {logindata.name}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: 'center', m: 1 }}>
                            <Typography>Contact No :: </Typography>
                            <Typography ml={1}> {logindata.contact}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: 'center', m: 1 }}>
                            <Typography>Email Id :: </Typography>
                            <Typography ml={1}> {logindata.email}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: 'center', m: 1 }}>
                            <Typography>Password ::</Typography>
                            <Typography ml={1}> {logindata.password}</Typography>
                        </Box>
                    </>
                }
                {
                    !task &&
                    <>
                        <Box sx={{ display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: 'center', m: 1 }}>
                            <Typography mr={2}>User Name :: </Typography>
                            <Input type='text' value={name} onChange={e => setname(e.target.value)} />
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: 'center', m: 1 }}>
                            <Typography mr={2}>Contact No :: </Typography>
                            <Input type='number' value={contact} onChange={e => setcontact(e.target.value)} />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: 'center', m: 1 }}>
                            <Typography mr={2}>Email Id :: </Typography>
                            <Input type='email' value={email} onChange={e => setemail(e.target.value)} />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: 'center', m: 1 }}>
                            <Typography mr={2}>Password ::</Typography>
                            <Input type='password' value={password} onChange={e => setpassword(e.target.value)} />
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: 'center', m: 1 }}>
                            <Typography mr={2}>Profile ::</Typography>
                            <Input type='file' onChange={(e) => { uploadImage(e) }} />
                        </Box>
                        {/* <Input type='file' value={profilephoto} onChange={e=>setname(e.target.value)} /> */}
                    </>
                }
                {
                    !task ?
                        <Button variant='outlined' sx={{ fontSize: 14, fontWeight: 'bold', mt: 1    , p: 2 }} onClick={e=>updatebtn(logindata.id)}>Update Detail</Button>
                        :
                        <Button variant='outlined' sx={{ fontSize: 15, fontWeight: 'bold', m: 2, p: 2 }} onClick={e=>editbtn()}>Edit Detail</Button>
                }
                <Button variant='outlined' sx={{ fontSize: 18, fontWeight: 'bold', mt: 24 }} onClick={logoutbtn}>Logout</Button>
            </Grid>

        </div>
    )
}

export default MyProfile