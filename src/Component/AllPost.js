
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
    Avatar,
    Card, CardContent, CardMedia,
    Checkbox,
    Stack, Typography
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setGetComment, setGetPost, setLikePost, setSnackbar } from '../Redux/ActionCreator';
import Comment from './Comment';
import ShowComment from './ShowComment';

const AllPost = () => {

    const [data, setData] = useState([])
    const dispatch=useDispatch();
    const [comment,setComment]=useState("")
    const userid = useSelector((state) => state.Login.id);
    const username = useSelector((state) => state.Login.name);
    const post = useSelector((state) => state.GetPost); 
    const date = new Date().toLocaleDateString();
    const trydata = useSelector((state) => state.Login)
    const [like,setlike]=useState()

    // post.map((p)=>{
    //     if(p.like?.length){
    //         let check=p.like?.includes(userid)
    //         if(check===true)
    //             setlike(true)
    //         else
    //             setlike(false)
    //         }
    // })
    
    useEffect(() => {
        getData();
    },[])

    function getData() {
        fetch("https://62983daaf2decf5bb73ddb37.mockapi.io/post").then((result) => {
            result.json().then((resp) => {
                // setData(resp)
                dispatch(setGetPost(resp)); 
                getComment();
            })
        })
    }

    function getComment() {
        fetch("https://62983daaf2decf5bb73ddb37.mockapi.io/comment").then((result) => {
            result.json().then((resp) => {
                setData(resp)
                dispatch(setGetComment(resp)); 
            })
        })
    }

    /////////////like post with redux
    const likePost = (id) => {
        const likesPost = post.filter((post) => post.id === id);
        // console.log(likesPost);
        let likedata = likesPost[0].like;
        // console.log(likedata);
        let index = likedata.indexOf(userid);    
        // console.log(index);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
        let likedata1 =[]
        
        if(index === -1){
            likedata1 = [...likedata, userid];   
        }
        else{
            likedata1 = likedata.filter((data)=>data!==userid);   
        } 
        dispatch(setLikePost(id,likedata1))  
    }

    const makeComment = (postid)=>{
        const commentdata=[userid,username,postid,comment,date];
        console.log("-=-== ",commentdata);
        fetch('https://62983daaf2decf5bb73ddb37.mockapi.io/comment',{
            method:"POST",
            headers:{
                'Accept': 'application/json',   
                'Content-type': 'application/json'
            },
            body:JSON.stringify(commentdata)
        }).then((result) => {               
            getComment()
        })         
    }

    function DeleteComment(id)
    {
        console.log("----------================",id);
        fetch(`https://62983daaf2decf5bb73ddb37.mockapi.io/comment/${id}`,{
            method:'DELETE'
        }).then((result)=>{
            result.json().then((resp)=>{
                console.log(resp);
                getData();
                dispatch(setSnackbar({
                    open: true,
                    message: "comment Delete Sucessfully..!!",
                    type: "success"
                }))
            })
        })
    }

    function EditComment(id,postid)
    {
        console.log("dsfchd===",data.id)//-
        console.log("dsfchd===",id)//1
        const index = data.findIndex((data) => data.id === id);
        console.log("index==",index);//0
        let item=data[index]
        console.log("item====",item.id);//1
        setComment(item.comment)    
    }

    function UpdateComment(id,postid)
    {
        const commentdata=[id,userid,username,postid,comment,date];
        fetch(`https://62983daaf2decf5bb73ddb37.mockapi.io/comment/${id}`,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-type':'application/json'
            },
            body:JSON.stringify(commentdata)
        }).then((result) => {               
            getComment()
            dispatch(setSnackbar({
                open: true,
                message: "comment Delete Sucessfully..!!",
                type: "success"
            }))
        })
    }

    return (
        <div> 
            <Stack direction="row" justifyContent="space-evenly" sx={{ flexWrap: "wrap", mt: 10 }}  >
                {
                    post.map((item, i) => {
                        return (
                            <Card sx={{ width: "320px", my:2, mx: 10 }} key={item.id} >
                                <CardContent>
                                <Avatar sx={{ width: 24, height: 24 }} alt="User" src={item.userphoto} />
                                    <Typography mt={-3.8} ml={4.5} variant='h6' align='left'>{item.name}</Typography>
                                </CardContent>
                                <CardMedia component="img"
                                    height="250"
                                    image={item.photo}
                                    alt='green iguana' />   

                                <CardContent>
                                    <Typography mt={-1} variant='subtitle1' align='left'>{item.caption}</Typography>
                                </CardContent>

                                <Checkbox sx={{mr:34,mt:-2}}
                                    onClick={() => { likePost(item.id) }}
                                    icon={<FavoriteBorder />}
                                    checkedIcon={<Favorite />} />

                                {/* {
                                    like && 
                                    <>
                                    <Favorite  onClick={() => { likePost(item.id) }}/> 
                                        <Checkbox sx={{mr:34,mt:-2}}
                                            onClick={() => { likePost(item.id) }}
                                            icon={<Favorite />}
                                            checkedIcon={<Favorite />} />
                                    </>
                                }
                                {
                                    !like &&
                                    <>
                                    <FavoriteBorder onClick={() => { likePost(item.id) }}/>
                                        <Checkbox sx={{mr:34,mt:-2}}
                                            onClick={() => { likePost(item.id) }}
                                            icon={<FavoriteBorder />}
                                            checkedIcon={<FavoriteBorder />} />
                                    </>
                                } */}

                                {/* {
                                    like===true ?  <Favorite  onClick={() => { likePost(item.id) }}/>  : <FavoriteBorder onClick={() => { likePost(item.id) }}/>
                                }
                             */}
                                <Typography ml={2} mt={-4.5} variant='h6' align='right'>{item.like?.length} likes</Typography>

                                {
                                    <Comment id={item.id}/>
                                }
                                {
                                    <ShowComment comments={item?.comment} id={item.id}/>
                                }
                              
                                {/* <TextField  
                                    sx={{mb:2,mt:2}}  
                                    type="text" 
                                    value={comment} 
                                    name="name" 
                                    placeholder='Add Comment' 
                                    onChange={(e)=>{setComment(e.target.value)}} />                          
                                <Button variant='outlined' onClick={()=>makeComment(item.id)} sx={{mt:3,ml:1}} >Add</Button> */}
                                
                                {/* { 
                                    item?.comment?.map((cdata,i)=>{
                                         return(<>
                                            <Typography key={i}  variant='body2' align='left'>{cdata.comment} by- {cdata.username} </Typography>
                                             <Button onClick={()=>DeleteComment(cdata.id)} sx={{ml:30,mt:-5.5}}>Delete</Button>
                                            <Button onClick={()=>EditComment(cdata.id)} sx={{ml:30,mt:-5.5}}>Edit</Button>
                                            <Button onClick={()=>UpdateComment(cdata.id,item.id)} sx={{ml:30,mt:-5.5}}>update</Button>
                                            </>
                                        )
                                    })             
                                }    */}
                            </Card>)
                        })
                    }
            </Stack>
        </div>
    )
}
export default AllPost;

////////////////like & unlike post without redux
// const likePost = (id) => {
//     const likesPost = data.filter((post) => post.id === id);
//     let likedata = likesPost[0].like;
//     let index = likedata.indexOf(userid);
//     let likedata1 =[]
//     if(index === -1)  likedata1 = [...likedata, userid];
//     else likedata1 = likedata.filter((data)=>data!==userid);
    
//     fetch(`https://62983daaf2decf5bb73ddb37.mockapi.io/post/${id}`,
//         {
//             method: 'PUT',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-type': 'application/json'
//             },
//             body: JSON.stringify({ like: likedata1 })
//         }).then(res => res.json()).
//         then((result) => {
//             // console.log(result)
//             const newData = likesPost.map(item => {
//                 if (item.id === result.id) {
//                     return result
//                 } else {
//                     return item
//                 }
//             })
//             setData(newData)
//             // dispatch(setLikePost(newData))
//         })
// }

// //////  new reducer use  in comment
// commentdata.map((cdata,i)=>{
//     if(cdata.postid === item.id) return(
//             <Typography  key={i}  variant='h6' align='left'>{cdata.comment}---{cdata.username}</Typography>
//             )
//     })      
////////only user can update and delete comment, other user only see the comment and make comment 