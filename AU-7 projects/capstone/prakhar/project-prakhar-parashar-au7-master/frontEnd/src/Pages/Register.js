import React from 'react'
import LoginSignUpForm from '../Components/LoginSignUpForm';
import { useDispatch} from 'react-redux'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import {userLoggingIn} from '../redux/Actions/userActions'



const Register = (props) => {
  
   const history = useHistory()

   const dispatch = useDispatch()



    const userInfoToDb = (userInfo) => {
        axios({
            method: 'post',
            url: 'userRegistration',
    
            data: {
                email: userInfo.email,
                userName: userInfo.userName,
                password: userInfo.password,
                profilePic : userInfo.registerPhotoId
            }
        })
            .then((response) => {
                alert(response.data.message)
                dispatch(userLoggingIn(userInfo))
                history.push("/profileDetails")
            })
    }

        return (

            <LoginSignUpForm formType="Register" userRegistered={userInfoToDb} />


        )
    }


export default Register