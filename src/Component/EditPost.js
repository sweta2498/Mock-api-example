import { Avatar, Button, Card, CardContent, CardMedia, Checkbox, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setLikePost, setSnackbar } from '../Redux/ActionCreator';
import ShowComment from './ShowComment';
import Comment from './Comment';
import { useNavigate } from 'react-router-dom';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const EditPost = () => {

    const userid = useSelector((state) => state.Login.id);
    const posts = useSelector((state) => state.GetPost);
    const post = posts.filter((post) => post.userid === userid);
    const [item, setItem] = useState({});
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const likePost = (id) => {
        const likesPost = post.filter((post) => post.id === id);
        let likedata = likesPost[0].like;
        let index = likedata.indexOf(userid);
        let likedata1 = []
        if (index === -1) likedata1 = [...likedata, userid];
        else likedata1 = likedata.filter((data) => data !== userid);
        dispatch(setLikePost(id, likedata1))
    }

    function editpost() {
        navigate("/updatepost/" + item.id)
    }

    const deletepost = () => {
        fetch(`https://62983daaf2decf5bb73ddb37.mockapi.io/post/${item.id}`, {
            method: 'DELETE'
        }).then((result) => {
            result.json().then((resp) => {
                console.log(resp);
                navigate("/")
                dispatch(setSnackbar({
                    open: true,
                    message: "Record Delete Sucessfully..!!",
                    type: "success"
                }))
            })
        })
    }

    const handleClick = (event,data) => {
        setItem(data)
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Stack direction="row" justifyContent="space-evenly" sx={{ flexWrap: "wrap", mt: 10 }}  >
                {
                    post?.map((item, i) => (
                        <Card sx={{ width: "320px", my: 2, mx: 10 }} key={item.id} >
                            <CardContent>
                                <Avatar sx={{ width: 24, height: 24 }} alt="User" src={item.photo} />
                                <Typography mt={-3.8} ml={4.5} variant='h6' align='left'>{item.name}</Typography>

                                <Button sx={{ mt: -7, mr: -35 }}
                                    id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={(e)=>handleClick(e, item)}>
                                    <DragIndicatorIcon />
                                </Button>

                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}>

                                    <MenuItem onClick={() => editpost(item.id)}><EditOutlinedIcon fontSize="small" /> Edit</MenuItem>
                                    <MenuItem onClick={() => deletepost(item.id)}><DeleteOutlineIcon fontSize="small" /> Delete</MenuItem>
                                </Menu>

                            </CardContent>
                            <CardMedia component="img"
                                height="250"
                                image={item.photo}
                                sx={{ mt: -2 }}
                                alt='green iguana' />

                            <CardContent>
                                <Typography variant='subtitle1' align='left'>{item.caption}</Typography>
                            </CardContent>

                            <Checkbox sx={{ mr: 34, mt: -2 }}
                                onClick={() => { likePost(item.id) }}
                                icon={<FavoriteBorder />}
                                checkedIcon={<Favorite />} />

                            <Typography ml={2} mt={-4.5} variant='h6' align='right'>{item.like?.length} likes</Typography>

                            {
                                <Comment id={item.id} />
                            }
                            {
                                <ShowComment comments={item?.comment} id={item.id} />
                            }

                        </Card>)
                    )
                }
            </Stack>
        </div>
    )
}
export default EditPost