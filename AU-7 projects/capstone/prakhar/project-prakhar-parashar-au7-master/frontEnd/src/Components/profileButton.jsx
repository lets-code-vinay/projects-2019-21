import React from 'react'
import {Image} from 'cloudinary-react'
import { useSelector } from 'react-redux';
import './styles/profileButton.css'
import { Link } from 'react-router-dom';


const ProfileButton = (props) => {
    
    return (

        <button id="profileButton">
            <Link to={{ pathname: '/userProfile', state: { user: props.user._id} }}>
                        <div id="userInfo">
                  
                            <Image id="profilePic" publicId={props.user.profilePic} width="60" height="60"  cloudName="prakhar-parashar"/>
                             
                            <h4 id="userName">{props.user.userName}</h4>
                        </div>
                        </Link>
                    </button>

    )
}

export default ProfileButton;

