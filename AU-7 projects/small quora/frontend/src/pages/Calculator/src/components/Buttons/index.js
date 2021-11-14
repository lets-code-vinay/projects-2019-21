import React from 'react';

import './Button.css';

const Button = ({content, type, onButtonClick }) => {
    return(
        <button className={`Button ${content === "0" ? "zero" : " "} ${type || " "}`}
            onClick={onButtonClick(content)} >
            {content}
        </button>
    ) 
}

export default Button