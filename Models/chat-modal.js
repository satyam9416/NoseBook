import mongoose from "mongoose"
const messageSchema = new mongoose.Schema({
    senderID : String,
    reciverId : String
    
})

const chatSchema = new mongoose.Schema({
    members : [2],
    messages: messageSchema
},{
    timestamps : true
})

const chatModal = new mongoose.model('Chats', )