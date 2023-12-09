import { Avatar, Box, Button, CardContent, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setDeleteComment, setEditComment, setGetComment, setSnackbar } from '../Redux/ActionCreator';

const ShowComment = ({ comments, id }) => {

    // const [data, setData] = useState([])
    const [comment, setComment] = useState()
    const [commentData, setCommentData] = useState(comments)
    const date = new Date().toLocaleDateString();
    const userid = useSelector((state) => state.Login.id);
    const username = useSelector((state) => state.Login.name);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        setCommentData(comments);
    }, [comments]);

    const DeleteComment = (id) => {
        fetch(`https://62983daaf2decf5bb73ddb37.mockapi.io/comment/${id}`, {
            method: 'DELETE'
        }).then((result) => {
            result.json().then((resp) => {
                console.log("bcfgjseg=======", resp);
                dispatch(setDeleteComment(resp.id, resp.postid));

                dispatch(setSnackbar({
                    open: true,
                    message: "Comment Delete Sucessfully..!!",
                    type: "success"
                }))
            })
        })
    }

    const EditComment = (idd) => {
        const index = comments.findIndex((data) => data.id === idd);
        let item = comments[index]
        setComment(item.comment)
    }

    const UpdateComment = (id, postid) => {
        const cmtdata = { id, userid, username, postid, comment, date };
        fetch(`https://62983daaf2decf5bb73ddb37.mockapi.io/comment/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(cmtdata)
        }).then((result) => {
            result.json().then((resp) => {
                // console.log("bcfgjseg", resp);
                dispatch(setEditComment(resp,postid))
                // dispatch(setGetComment([resp]))
                dispatch(setSnackbar({
                    open: true,
                    message: "comment Update Sucessfully..!!",
                    type: "success"
                }))
                setComment()
            })
        })
    }

    return (
        <div>
            {comment &&
                <TextField
                    sx={{ mb: 2, mt: 2 }}
                    type="text"
                    value={comment}
                    name="name"
                    placeholder='Add Comment'
                    onChange={(e) => { setComment(e.target.value) }} />
            }
            {
                commentData?.map((cd) => (
                    <div key={cd.id + "-" + id}>
                        <Box sx={{
                            display: 'flex', m: 1
                        }}>
                            <CardContent>
                                <Avatar sx={{ width: 40, height: 40, mt: -1, ml: -1.5 }} alt="User" src={cd.userphoto}/>
                            </CardContent>

                            <CardContent>
                                <Typography mt={-1.5} ml={-2.5} color="primary.main" variant='body1' align='left'>{cd.username} </Typography>
                                <Typography mt={-2.5} ml={19} color="primary.main" variant='subtitle2' align='right'>{cd.date} </Typography>
                                <Typography mt={0} ml={-2.5} variant='subtitle2' align='left'>{cd.comment}</Typography>
                            </CardContent>
                        </Box>
                        <Box sx={{ mt: -4, mb: 2, ml: -13 }}>
                            {/* <Button size='small' sx={{ fontSize: 12 }}>reply</Button> */}
                            {cd.userid === userid &&
                                <Button onClick={() => EditComment(cd.id)} size='small' sx={{ ml: -2, fontSize: 12 }}>Edit</Button>
                            }
                            {comment &&
                                <Button onClick={() => UpdateComment(cd.id, id)} size='small' sx={{ ml: -2, fontSize: 12 }}>Update</Button>
                            }
                            {cd.userid === userid &&
                                <Button onClick={() => DeleteComment(cd.id)} size='small' sx={{ fontSize: 12 }}>Delete</Button>
                            }
                        </Box>
                    </div>
                ))
            }
        </div>
    )
}
export default ShowComment;