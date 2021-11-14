import {authConstants  } from "./constants";
import axios from "../helpers/axios";
//import axios from 'axios';


export const login = (user) =>{

    console.log('consoling users', user)

    return  async(dispatch) => {

        dispatch({ type:authConstants.LOGIN_REQUEST});
        try{
            console.log(1)
            const res =  await axios.post(`/admin/signin`,{
            ...user
        });
        console.log(2, res.dat)

            console.log('consoling user here', user)
            if(res.status ===200){
                const {token, user} = res.data;
                localStorage.setItem('token', token);
                localStorage.setItem('user',JSON.stringify(user) );
                dispatch({
                    type: authConstants.LOGIN_SUCCESS,
                    payload: {
                        token, user
                    }
                });
            } else{
                if(res.status=== 400){
                    dispatch({
                        type:authConstants.LOGIN_FAILURE,
                        payload:{ error: res.data.error}
                    });
                }
            }
        } catch(error){
            console.log('this is founded error', error.message);
        }        
     } 
}

export const isUserLoggedIn = () =>{
    return async dispatch =>{
        const token = localStorage.getItem('token');
        if(token){
            const  user  =JSON.parse(localStorage.getItem('user')) 
            dispatch({
                type:authConstants.LOGIN_SUCCESS,
                payload:{
                    token, user
                }
            });
        } else{
            dispatch({
                type:authConstants.LOGIN_FAILURE,
                payload:{ error:'Failed to login'  }
            })
        }
    }
}


export const signout = () =>{
    return async dispatch =>{

        dispatch({ type : authConstants.LOGOUT_REQUEST });
        
        const res = await axios.post(`/admin/signout`);
        
        if(res.status === 200){
            localStorage.clear();
            dispatch({ type: authConstants.LOGOUT_SUCCESS })                
        } else{
            dispatch({
                type: authConstants.LOGOUT_FAILURE,
                payload : { error : res.data.error }
            });
        }
    }
}


















