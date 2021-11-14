import React from 'react';
export default function Hero({children, hero}){  //Childrenfor child element and hero is prop
    return(
        <header className={hero}>
            {children}
        </header>
        )
}
Hero.defaultProps = {
    hero:"defaultHero"
};