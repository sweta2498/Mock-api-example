import { Avatar, Card, CardContent, CardMedia, Checkbox, Stack, Typography } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setLikePost } from '../Redux/ActionCreator';
import ShowComment from './ShowComment';
import Comment from './Comment';

const MyPost = () => {

    const userid = useSelector((state) => state.Login.id);
    const username = useSelector((state) => state.Login.name);
    const posts = useSelector((state) => state.GetPost);
    const post = posts.filter((post) => post.userid === userid);

    const dispatch = useDispatch()

    const likePost = (id) => {
        const likesPost = post.filter((post) => post.id === id);
        let likedata = likesPost[0].like;
        let index = likedata.indexOf(userid);
        let likedata1 = []
        if (index === -1) likedata1 = [...likedata, userid];
        else likedata1 = likedata.filter((data) => data !== userid);
        // const cmt= commentdata.filter((post) => post.id === id);
        // console.log("aaa",cmt);
        // console.log("likedata---",likedata)
        dispatch(setLikePost(id, likedata1))
    }

    return (
        <div>
            <Stack direction="row" justifyContent="space-evenly" sx={{ flexWrap: "wrap", mt: 10 }}  >
                {
                    post.map((item, i) => {
                        return (
                            <Card sx={{ width: "320px", my: 2, mx: 10 }} key={item.id} >
                                <CardContent>
                                    <Avatar sx={{ width: 24, height: 24 }} alt="User" src={item.photo} />
                                    <Typography mt={-3.8} ml={4.5} variant='h6' align='left'>{item.name}</Typography>
                                </CardContent>
                                <CardMedia component="img"
                                    height="250"
                                    image={item.photo}
                                    alt='green iguana' />

                                <CardContent>
                                    <Typography mt={-1} variant='subtitle1' align='left'>{item.caption}</Typography>
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
                    })
                }
            </Stack>
        </div>
    )
}

export default MyPost