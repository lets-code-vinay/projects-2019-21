import React, {useState} from 'react'
import { connect } from 'react-redux'
import {userLoggingIn} from '../redux/Actions/userActions'
import LoginSignUpForm from '../Components/LoginSignUpForm'
import { useHistory , Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux'



const Login = (props) => {


    const history = useHistory()

    const userLoggingIn = (userInfo) => {
    
         props.userLoggingIn(userInfo)
        
         
       
        
         
     }
     if(localStorage.getItem("token")) {
        console.log(props)
        history.push('/home')
    }
        
        return (
            
            
           
  <LoginSignUpForm formType="Login" userLoggingIn = {userLoggingIn}/>

  


        )
    }


const dispatchMapper = {
    userLoggingIn : userLoggingIn
} 

const stateMapper = (state) => {
    return {
        user : state.userReducer.user,
        isAuthenticated : state.userReducer.isAuthenticated
    }
}

export default connect(stateMapper, dispatchMapper)(Login);
