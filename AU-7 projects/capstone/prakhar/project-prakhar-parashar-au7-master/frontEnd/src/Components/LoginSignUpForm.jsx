import React from 'react';
import './styles/loginSignup.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import PhotosUploader from './photoUploader';
import { Image, Transformation } from 'cloudinary-react'

const LoginSignUpForm = (props) => {

    const [userName, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [registerPhotoId, setRegisterPhotoId] = useState("")

    const handleClick = (e) => {
        e.preventDefault()
        props.formType === 'Register' ? props.userRegistered({ userName, password, email, registerPhotoId}) : props.userLoggingIn({ userName, password })
    }
    return (
        <div id="form">

            <form className="form">




                <div id="fields">
                    {(props.formType == "Register") &&
                        <div id="profilePic">
                            {registerPhotoId == "" ?
                                 
                                     <div id="photoUploaders">
                                <PhotosUploader photoInfo={(assetId) => setRegisterPhotoId(assetId)} /> 
                                </div> :
                                <Image cloudName="prakhar-parashar" publicId={registerPhotoId} width="70" height="70" id="profilePic" >

                                    <Transformation radius="80" />

                                </Image>
                                
                            }
                        </div>
                    }
                    <div>
                        {
                            (props.formType === "Register") && <div><input onChange={(event) => setEmail(event.target.value)} type="email" className="input" placeholder="Email"></input>
                                <br></br><br></br>
                            </div>}
                        <input onChange={(event) => setUsername(event.target.value)} type="text" className="input" placeholder="Username"></input>
                        <br></br><br></br>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Password"></input>
                        <br></br><br></br>

                        <button type="submit" onClick={handleClick} className="btn btn-primary">{props.formType}</button>

                        <br></br><br></br><br></br>
                        {(props.formType === "Login") &&
                            <>
                                
                                <Link to="/register">New user? Register here</Link>
                            </>
                        }
                        
                    </div>
                    
                </div>
               
            </form>
            {
                            (props.formType === "Register") &&
                            <div style={{marginTop : "550px"}}>
                            <Link to="/">Already Registered? Login Here</Link>
                            </div>
                        }
        </div>

    )
}

export default LoginSignUpForm