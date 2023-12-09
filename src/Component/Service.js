import { setLogout } from "../Redux/ActionCreator";

export function saveTokenInLocalStorage(tokenDetails) {
    tokenDetails.expireDate = tokenDetails.expiresIn
    
    localStorage.setItem('token',  JSON.stringify(tokenDetails));
}
export function runLogoutTimer( timer) {
  
    setTimeout(() => { 
        setLogout()
    }, timer);
}