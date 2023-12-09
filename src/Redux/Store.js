import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import LoginReducer, { CommentReducer, GetPostReducer, SnackbarReducer } from "./ReducerPage";

export const reducers = combineReducers({
    Login:LoginReducer,
    SnackBar:SnackbarReducer,
    GetPost:GetPostReducer,
    // Comment:CommentReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;

