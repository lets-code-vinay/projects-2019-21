import React from 'react';
import loadingGif from '../images/gif/loading-arrow.gif'
function Loading(){
    return(
        <div className ="loading">
            <h2>rooms data Loading</h2>
            <img src={loadingGif} alt="loading animation" />
        </div>
    )
}

export default Loading;