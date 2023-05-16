import { useAuthContext } from "./useAuthContext"


export const useLogout =  () =>{
    const {dispatch} = useAuthContext();
    const logout = () =>{
        //remove user from local storage
        sessionStorage.setItem('user',null);
        //dispatch logout action
        dispatch({type: 'LOGOUT'});
    }
    return {logout}
}