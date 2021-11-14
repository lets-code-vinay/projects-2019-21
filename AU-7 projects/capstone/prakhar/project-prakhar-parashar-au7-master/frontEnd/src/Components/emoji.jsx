import React from 'react'
import './styles/emoji.css'

const allEmoji = "😀 😃 😄 😁 😆 😅 😂 🤣 😊 😇 🙂 🙃 😉 😌 😍 🥰 😘 😗 😙 😚 😋 😛 😝 😜 🤪 🤨 🧐 🤓 😎 🤩 🥳 😏 😒 😞 😔 😟 😕 🙁 ☹️ 😣 😖 😫 😩 🥺 😢 😭 😤 😠 😡 🤬 🤯 😳 🥵 🥶 😱 😨 😰 😥 😓 🤗 🤔 🤭 🤫 🤥 😶 😐 😑 😬 🙄 😯 😦 😧 😮 😲 🥱 😴 🤤 😪 😵 🤐 🥴 🤢 🤮 🤧 😷 🤒 🤕 🤑 🤠 😈 👿 👹 👺 🤡 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾"
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