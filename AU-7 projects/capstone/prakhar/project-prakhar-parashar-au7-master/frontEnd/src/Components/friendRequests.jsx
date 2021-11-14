import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { Image } from 'cloudinary-react';
import { findAllByDisplayValue } from '@testing-library/react';

const FriendRequests = (props) => {
    

    const [isRequests, setRequests] = useState([])
    
    let recievedRequest = useSelector(state => state.userReducer.user.recievedRequest)

    const currentUser = useSelector(state => state.userReducer.user._id)
    
    useEffect(()=> {
        const requests = recievedRequest.filter(req => req !== null)
        setRequests(requests)
    }, [])


   const requestHandle = (id,e) => {
    console.log(id)
    console.log(e.target)
   const newReq =  isRequests.filter(request => request.userId != id)
   setRequests(newReq)

   axios({
       method : "post",
       url : "/requestHandle",
       data : {
           requestedUser : id,
           currentUser : currentUser,
           request : e.currentTarget.name
       }
   }).then((response) => {
       console.log(response)
   })
}


    useEffect(() => {
        
        console.log(recievedRequest)
       
    }, [])

   



    const boxStyle = {
        boxShadow: "0 0 15px 1px rgba(0, 0, 0, 0.4)",
        width : "150px",
        textAlign : "center"
    }

    return (
        <div style={{display :"grid", gridTemplateColumns : "auto auto auto ", gridGap : "20px"}}>
            {
                (isRequests.length!==0) ? isRequests.map(user => <div style={boxStyle}>
                    <Image publicId={user.profilePic} cloudName="prakhar-parashar" width="100px" height="100px"/>
                   <h5>{user.userName}</h5>
                   <div style={{display : "grid", gridTemplateColumns : "40px 40px"}}>

                   <button onClick={(e) => requestHandle(user.userId,e)} data-key="hi" name="accept"><img src="https://img.icons8.com/ultraviolet/40/000000/checked-2.png" width="25px" height="27px"/></button>
                   <button key={user.userId} onClick={requestHandle} name="reject"><img src="https://img.icons8.com/fluent/48/000000/close-window.png" width="28px" height="30px"/></button>
                   </div>  
  </div> )  : null
            }
            

        </div>
    )
}

export default FriendRequests