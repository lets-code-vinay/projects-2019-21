import React, {useState} from 'react' ;
import {Modal} from 'react-bootstrap'
import './styles/postTextModel.css'
import { Image } from 'cloudinary-react';
import {Link} from 'react-router-dom'



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
            Search Results
          </Modal.Title>

        </Modal.Header> 


        <Modal.Body>

        {
          props.searchedUsers.map(user => <div>
            <Link to={{ pathname: '/userProfile', state: { user: user.userId} }}>
            <Image publicId={user.profilePic} cloudName="prakhar-parashar" width="100px" height="100px"/>
                   <h5>{user.userName}</h5>
                   </Link>
          </div>)
        }

        
        </Modal.Body>

        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    
    );
  }

  
  export default  MyVerticallyCenteredModal;