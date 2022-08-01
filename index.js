// I M P O R T S
import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
const app = express()
const PORT = process.env.PORT || 5000

// R O U T E S
import authRouter from './Routes/auth-route.js'
import userRouter from './Routes/user-route.js'
import postRouter from './Routes/post-route.js'
import uploadImageRouter from './Routes/upload-image-route.js'

// M I D D L E  W A R E S
app.use(express.static('public'))
app.use('/images', express.static('images'))
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({credentials : true, origin:'http://localhost:3000'}))


// R O U T E S  S E T U P 
app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/post', postRouter)
app.use('/upload', uploadImageRouter)

// Heroku Production Setup
if (process.env.NODE_ENV == "production") {
    app.use(express.static("client/build"));
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

// E S T A B L I S H I N G  C O N N E C T I O N
mongoose.connect(process.env.MONGO_CONNECT,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        app.listen(PORT, () => console.log(`Server started and listening on port ${PORT}`))
    }).catch((err) => console.log(`Error : ${err}`))