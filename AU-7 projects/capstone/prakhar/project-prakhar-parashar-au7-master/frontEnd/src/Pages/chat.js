import React, { useState } from 'react'
import io from 'socket.io-client'







const Chat = () => {


  //  const [recievedText, setRecievedText] = useState("")
    const [sentText, setSentText] = useState("")
   // const [sent, setSent] = useState(false)
   // const [textRecieved, setTextRecieved] = useState(false)



    const socket = io('http://localhost:8000')

    socket.on('chat-message', data => {
        console.log(data)
        // setRecievedText(msg)
        // setTextRecieved(true)
    })

    const handleChange = (e) => {
        setSentText(e.target.value)
    }

    const handleClick = () => {
       // setSent(true)
        socket.emit('message', "hii")
        setSentText("")
    }
    return (
        <>
            <input onChange={handleChange} value={sentText}></input>
            <button onClick={handleClick}>send</button>
            {/* {(sent) ? 
               <p>{sentText}</p> : null
            } */}

            {/* {
                (textRecieved) ?
            <h4>{recievedText}</h4> : null
            } */}
             
        </>
    )

}

export default Chat