import React from 'react'
import './styles/emoji.css'

const allEmoji = "๐ ๐ ๐ ๐ ๐ ๐ ๐ ๐คฃ ๐ ๐ ๐ ๐ ๐ ๐ ๐ ๐ฅฐ ๐ ๐ ๐ ๐ ๐ ๐ ๐ ๐ ๐คช ๐คจ ๐ง ๐ค ๐ ๐คฉ ๐ฅณ ๐ ๐ ๐ ๐ ๐ ๐ ๐ โน๏ธ ๐ฃ ๐ ๐ซ ๐ฉ ๐ฅบ ๐ข ๐ญ ๐ค ๐  ๐ก ๐คฌ ๐คฏ ๐ณ ๐ฅต ๐ฅถ ๐ฑ ๐จ ๐ฐ ๐ฅ ๐ ๐ค ๐ค ๐คญ ๐คซ ๐คฅ ๐ถ ๐ ๐ ๐ฌ ๐ ๐ฏ ๐ฆ ๐ง ๐ฎ ๐ฒ ๐ฅฑ ๐ด ๐คค ๐ช ๐ต ๐ค ๐ฅด ๐คข ๐คฎ ๐คง ๐ท ๐ค ๐ค ๐ค ๐ค  ๐ ๐ฟ ๐น ๐บ ๐คก ๐ฉ ๐ป ๐ โ ๏ธ ๐ฝ ๐พ ๐ค ๐ ๐บ ๐ธ ๐น ๐ป ๐ผ ๐ฝ ๐ ๐ฟ ๐พ"
let newEmoArr = []
let j = 0;
for (let i=0;i<allEmoji.length;i++) {
    
    if(allEmoji[i] === " "){
        
        let thisEmo = allEmoji.slice(j,i)
        newEmoArr.push(thisEmo)
        j = i+1
    }
}

let emoStyle = {
   
}

const Emoji = (props) => {
    const emoo = newEmoArr.map( (emo) => <p>{emo}</p>) 
    console.log(newEmoArr)
    return(
        <div id="emoBox" >
            <div class="row">
            {emoo}
                </div>            
           
        </div>
    )
}

export default Emoji