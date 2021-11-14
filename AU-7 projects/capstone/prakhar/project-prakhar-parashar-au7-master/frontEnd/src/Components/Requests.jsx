import React, { Component } from 'react'
import { connect } from 'react-redux'
import { useState } from 'react'
import { postCreateRequestAction } from '../redux/Actions/postActions'
import './styles/createPost.css'
import PhotosUploader from './photoUploader';
import FriendRequestModal from './friendRequestModal'
import { Image } from 'cloudinary-react'



const Request = (props) => {

    const [modalShow, setModalShow] = useState(false);
   

    



    return (


         <div>


         <button onClick={() => { setModalShow(true) }}><span><img src="https://img.icons8.com/bubbles/50/000000/appointment-reminders.png"/></span></button>
            
            


             <FriendRequestModal
                 show={modalShow}
                 onHide={() => setModalShow(false)}
             />
           


        </div>



    )

}





export default Request