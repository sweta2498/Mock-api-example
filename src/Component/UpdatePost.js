import { Box, Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSnackbar } from '../Redux/ActionCreator';
import { useNavigate, useParams } from 'react-router-dom';

const UpdatePost = () => {

    const params = useParams();
    const [name, setName] = useState("")
    const [caption, setCaption] = useState("")
    const [photo, setphoto] = useState("")
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const date = new Date().toLocaleDateString();
    const userid = useSelector((state) => state.Login.id);
    const username = useSelector((state) => state.Login.name);
    const posts = useSelector((state) => state.GetPost);
    const post = posts.filter((post) => post.id === params.id);

    useEffect(() => {
        getData();
    }, [])

    function getData() {
        post?.map((p)=>{
            setName(p.name);
            setCaption(p.caption);
            setphoto(p.photo)
        })
    }

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
    
    function updatepost() {
        const id=params.id;
        console.log("===", id);
        const data={id,name, caption, photo,userid,username,date};
        // console.log("data post 00--",data);
        if (name === '' || caption === '' || photo === '' ) {
            console.log("Enter Value");
        }
        else {
            
            fetch(`https://62983daaf2decf5bb73ddb37.mockapi.io/post/${params.id}`,
                {
                    method: 'PUT',
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
                        message: "Post Updated..!!",
                        type: "success"
                    }))
                })
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
                    onChange={e => setName(e.target.value)}
                    sx={{ m: 1 }} />

                <TextField
                    label="Caption"
                    value={caption}
                    fullWidth
                    onChange={e => setCaption(e.target.value)}
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
                    onClick={updatepost}>Update Post</Button>
            </Box>
        </div>
    )
}
export default UpdatePost