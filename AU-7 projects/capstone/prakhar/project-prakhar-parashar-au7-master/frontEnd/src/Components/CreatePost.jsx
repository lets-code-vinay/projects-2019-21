import React, { Component } from 'react'
import { connect } from 'react-redux'
import { useState } from 'react'
import { postCreateRequestAction } from '../redux/Actions/postActions'
import './styles/createPost.css'
import PhotosUploader from './photoUploader';
import PostTextModal from './postTextModal'
import { Image } from 'cloudinary-react'



const CreatePost = (props) => {

    const [modalShow, setModalShow] = useState(false);
    const [photoInfo, setPhotoInfo] = useState("")
    const [postText, setPostText] = useState("")

    



    return (


         <div>


         <button onClick={() => { setModalShow(true) }}><span><img src="https://upload-icon.s3.us-east-2.amazonaws.com/uploads/icons/png/15071590061574055268-64.png" width="30" height="30"></img></span></button>
            
            


             <PostTextModal
                 show={modalShow}
                 onHide={() => setModalShow(false)}
             />
           


        </div>



    )

}


const stateMapper = (state) => {

    return {
        userName: state.userReducer.user.userName,
        userId : state.userReducer.user._id
    }
}


const dispatchMapper = {
    postCreateRequestAction: postCreateRequestAction
}

export default connect(stateMapper, dispatchMapper)(CreatePost)