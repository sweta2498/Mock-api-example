import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setGetComment } from '../Redux/ActionCreator';

const Comment = (postid) => {
  const [comment, setComment] = useState("")
  const dispatch = useDispatch()
  const userid = useSelector((state) => state.Login.id);
  const username = useSelector((state) => state.Login.name);
  const userphoto = useSelector((state) => state.Login.profilephoto);
  const date = new Date().toLocaleDateString();

  const makeComment = (postid) => {
    const commentdata = { userid, username, postid, comment, date,userphoto };
    fetch('https://62983daaf2decf5bb73ddb37.mockapi.io/comment', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(commentdata)
    }).then((result) => {
      setComment("")
      result.json().then((resp) => {
        console.log("bcfgjseg", resp);
        dispatch(setGetComment([resp]))
        // dispatch(setGetComment([commentdata]))
      })
    })
  }

  return (
    <div>
      <TextField
        sx={{ mb: 2, mt: 2 }}
        type="text"
        name="name"
        value={comment}
        placeholder='Add Comment'
        onChange={(e) => { setComment(e.target.value) }} />

      <Button variant='outlined' onClick={() => makeComment(postid.id)} sx={{ mt: 3, ml: 1 }} >Add</Button>
    </div>
  )
}

export default Comment