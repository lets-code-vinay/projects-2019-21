import React from 'react'
import girl from "./social.svg"
import {Link} from "react-router-dom"

function Home() {
    
    return (
        <div>
            <img src={girl} style={{height:"75vh"}}></img>
            <h1>Welcome to Social Media  <Link to="/joinus">
                    <button class="w3-btn w3-white w3-border w3-border-black w3-round-large w3-padding-large">Join Us</button>
                </Link>
            </h1>
            
        </div>
    )
}

export default Home
