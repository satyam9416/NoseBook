import React from 'react'
import Navbar from '../components/navbar/navbar'
import './chat.css'

const Chat = () => {
    return (
        <div className='chat'>
            <Navbar />
            <div className='chats-container'>
                {/* <ChatList />
                <ChatBox /> */}
            </div>
        </div>
    )
}

export default Chat