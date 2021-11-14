import React, {useState} from 'react' ;
import {Modal} from 'react-bootstrap'
import { postCreateRequestAction } from '../redux/Actions/postActions'
import Emoji from './emoji'
import { useSelector, useDispatch } from 'react-redux';
import './styles/postTextModel.css'
import {Image} from 'cloudinary-react'
import ProfileButton from './profileButton'
import TextField from '@material-ui/core/TextField'
import PhotosUploader from './photoUploader';


const MyVerticallyCenteredModal = (props) => {
    
    const dispatch = useDispatch()
    
    const [smileyBox, setSmileyBox] = useState(true)
    const [postText, setPostText] = useState("")
    const [isTyping, setIsTyping] = useState(true)
    const [photoInfo, setPhotoInfo] = useState("")

    const currentUser = useSelector((state) => state.userReducer.user)

    
   const handlePostClick = () => {
    dispatch(postCreateRequestAction({postText, assetId : photoInfo, userId : currentUser._id}))
    props.onHide()
     
   }

   const savePhotoInfo = (assetId) => {
     console.log("heuu")
    setPhotoInfo(assetId)
} 


const photoStyle = {
                    width : "560px",
                    height:"400px",
                    boxShadow: "0 0 15px 1px rgba(0, 0, 0, 0.4)",
                    display: "flex",
                    justifyContent:"center",
                    textAlign:"center"
                  }

    return (
      
      <Modal id="modal"
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
         <Modal.Header closeButton>

          <Modal.Title id="contained-modal-title-vcenter">
            <ProfileButton user = {currentUser}/>
          </Modal.Title>

        </Modal.Header> 


        <Modal.Body>

        

        <div id="text"> 

       {(isTyping) ?
       <> 
        <TextField
          id="filled-textarea"
          label="Speak Up"
          placeholder="What's on your mind?"
          multiline
          variant="filled"
          style = {{width : "400px"}}
          defaultValue ={postText}
          onChange={(e) => {setPostText(e.target.value)}}
        />
        <button onClick={() => setSmileyBox(false)}>😁</button>
        </>
       : 
       <p>{postText}</p>}
        <button onClick={() => setIsTyping(true)}><img src="https://img.icons8.com/offices/30/000000/edit.png"/></button>
        
        <button onClick={() => setIsTyping(false)}><img src="https://img.icons8.com/plasticine/100/000000/double-tick.png" width="35px" height="35px"/></button>
        </div>
         <hr></hr>
        <div style= {photoStyle}>
           {(photoInfo === "")
           ?
            <button style={{outline : "none"}}><PhotosUploader photoInfo={savePhotoInfo} />
            Add Photo
            </button>
             :
               <Image publicId={photoInfo} cloudName="prakhar-parashar" width="400" height="400"/> } 
         
         </div>
      
        
        </Modal.Body>

        <Modal.Footer>
          <button onClick={handlePostClick}>Post</button>
        </Modal.Footer>
      </Modal>
    
    );
  }

  
  export default  MyVerticallyCenteredModal;