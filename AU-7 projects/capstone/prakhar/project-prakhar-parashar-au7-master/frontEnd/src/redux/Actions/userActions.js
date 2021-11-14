import axios from 'axios'




const userRegistered = {
      type : "USER_REGISTERED"
}






export const userLoggingIn = (userInfo) => {
    return async (dispatch) => {
        return axios({
            method : 'post',
            url : 'userLogin',
            data : {
                userName : userInfo.userName,
                password : userInfo.password
            }
        }).then((response) => {
            console.log(response.data.message)
             localStorage.setItem("token", response.data.token)
             axios.defaults.headers.common = {'Authorization': `bearer ${response.data.token}`}  
             console.log(response.data.user)         
             dispatch(userLoggingActionCreator(response.data.user))                      
        })
    }
}


export const userLoggingActionCreator = (user) => {
    return {
        type : "CREATE_USER_SESSION",
        payload : {
        user
    }
}
}

export const getLoggedInUserInfo = (userId) => {
    console.log("he")
    return async (dispatch) => {
        return axios({
            method : 'post',
            url : 'loggedInUserInfo',
            data : {
                userId : userId
            }
        }).then((response) => {
            console.log(response) 
           dispatch(userLoggingActionCreator(response.data))
         })

}
}