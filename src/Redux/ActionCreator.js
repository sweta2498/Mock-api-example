import { runLogoutTimer, saveTokenInLocalStorage } from "../Component/Service";
import { ActionType } from "./ActionType"



export const setLogin = (payload, next) =>

    async (dispatch) => {
        await fetch("https://62983daaf2decf5bb73ddb37.mockapi.io/UserData").then((result) => {
            result.json().then((resp) => {

                let data = resp.find(user => user.email === payload.email && user.password === payload.password);
                if (data) {
                    data = {
                        ...data,
                        expiresIn: Date.now() + (60 * 60 * 1000)
                    }
                    // console.log("aaaaaa",typeof(next));////check next is function or not
                    if (typeof next === "function")
                        next({ message: "Login Sucessfully..!!", success: true, type: 'success' })

                    dispatch({
                        type: ActionType.SET_LOGIN,
                        payload: data
                    })
                    saveTokenInLocalStorage(data);
                    runLogoutTimer(
                        60 * 60 * 1000
                    );

                } else {
                    if (typeof next === "function")
                        next({ message: "User Name & Password Not Match..!!!", success: false, type: 'error' })
                }
            })
        })
    }

export const setSnackbar = (payload) =>
    (dispatch) => {
        dispatch({
            type: ActionType.SET_SNACKBAR,
            payload
        })
    }

export const setLogout = () =>
    (dispatch) => {
        dispatch({
            type: ActionType.SET_LOGOUT,

        });
    }

export const setGetPost = (payload) =>
    (dispatch) => {
        dispatch({
            type: ActionType.SET_GETPOST,
            payload
        });
    }

export const setLikePost = (id, payload) =>
    (dispatch) => {
        fetch(`https://62983daaf2decf5bb73ddb37.mockapi.io/post/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ like: payload })
            }).then(res => res.json())
        dispatch({
            type: ActionType.SET_LIKE,
            payload, id
        });
    }

export const setGetComment = (payload) =>
    (dispatch) => {
        dispatch({
            type: ActionType.SET_COMMENT,
            payload
        });
    }
export const setEditComment = (payload, id) =>
    (dispatch) => {
        dispatch({
            type: ActionType.EDIT_COMMENT,
            payload, id
        });
    }

export const setDeleteComment = (id, postid) =>
    (dispatch) => {
        dispatch({
            type: ActionType.SET_DELETE_COMMENT,
            id, postid
        });
    }