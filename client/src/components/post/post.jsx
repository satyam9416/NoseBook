import React from 'react'
import './post.css'
import { FaHeart, FaRegComment } from 'react-icons/fa'
import { RiSendPlaneLine } from 'react-icons/ri'
import { AiOutlineHeart } from 'react-icons/ai'
import API from '../../API/API'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const Post = ({ post }) => {
    const authData = useSelector((state) => state.authReducer.authData)
    const [liked, setLiked] = useState(post.likes.includes(authData._id))
    const [likes, setLikes] = useState(post.likes.length)

    const likePost = async (id) => {
        setLiked((prev) => !prev)
        await API.put(`post/like/${id}`, { userId: authData._id })
        liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1)
    }

    return (
        <div className='post'>
            <img src={`http://localhost:5000/images/${post.image}` || ''} className='post-img' alt='' />
            <div className='post-content-box'>
                <span className='post-content'>{post.content}</span>
                <div className='rxn-btns' onClick={() => likePost(post._id)}>
                    {liked ? <FaHeart className='btn' /> : <AiOutlineHeart className='btn' />}
                    <FaRegComment className='btn' />
                    <RiSendPlaneLine className='btn' />
                </div>
                <h2 className='likes-counter'>{likes} Likes </h2>
                {/* <div className='comment'>
                <span style={{ display: 'inline-block' }}>
                  {post.comments[0].userName} :
                </span>
                <span>
                  {post.comments[0].comment}
                </span>
              </div>
            <a href="!#" className='more-comments-btn'>{(post.comments.length) - 1} more comments</a> */}
            </div>
        </div>
    )
}

export default Post