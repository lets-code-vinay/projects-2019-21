import express from 'express'
import http from 'http'
import bodyparser from 'body-parser'
import cookieParser from 'cookie-parser'
import router from './routes/userRoutes.js'
import './Models/db_connect.js'
import socketIo from 'socket.io'

const app = express()
const httpInstance = http.createServer(app)

app.use(express.json())
app.use(bodyparser.urlencoded({extended: true}))
app.use(cookieParser())

app.use(router)



//socket IO
// const io = socketIo(httpInstance);
// io.on('connection', (socket) => {
//     socket.on('message', (msg) => {
//         console.log(msg)
//         socket.broadcast.emit('chat-message', msg);
//     })
// });






httpInstance.listen(process.env.PORT||8080, () => {
    console.log('Server listening on port 8080')
})

