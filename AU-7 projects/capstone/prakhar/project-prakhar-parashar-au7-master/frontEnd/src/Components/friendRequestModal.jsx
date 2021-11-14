import React, {useState} from 'react' ;
import {Modal} from 'react-bootstrap'
import './styles/postTextModel.css'
import FriendRequests from './friendRequests';



const MyVerticallyCenteredModal = (props) => {
    

    
   

 

    
   
    return (
      
      <Modal id="modal"
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
         <Modal.Header closeButton>

          <Modal.Title id="contained-modal-title-vcenter">
            Friend Requests
          </Modal.Title>

        </Modal.Header> 


        <Modal.Body>

        <FriendRequests/>

        
        </Modal.Body>

        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    
    );
  }

  
  export default  MyVerticallyCenteredModal;