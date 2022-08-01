import React, { useState, useEffect } from 'react';
import {  useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import API from '../../API/API';
import './profile-card.css'
const images = process.env.REACT_APP_SERVER_IMAGES

const ProfileCard = ({ location }) => {
    const [userData, setUserData] = useState({})
    const { _id } = useSelector((state) => state.authReducer.authData)
    const newShare = useSelector((state) => state.shareReducer.data)
    const { id } = useParams()
    const [posts, setPosts] = useState({})

    useEffect(() => {
        const fetchUserData = async() => {
            const userID = location === 'profile' ? id : _id
            const { data } = await API.get(`user/${userID}`)
            setUserData(data)
        }
        const fetchUserPosts = async () => {
            const { data } = await API.get(`user/posts/${id}`)
            setPosts(data)
        }
        fetchUserData()
        fetchUserPosts()
    }, [location, id, _id, newShare])

    return (
        <div className='profile-box'>
            <div className='profile-images'>
                <img src={userData?.coverImg ? images + userData.coverImg : images + 'defaultCover.jpg'} className='cover-img' alt=''/>
                <img src={userData?.profileImg ? images + userData.profileImg : images + 'defaultProfile.jpg'} alt="" className='profile-img' />
            </div>
            <form>
            </form>
            <div className='profile-name'>
                <span><h1>{userData?.fName}</h1></span>
                <span>{userData?.status ? userData?.status : 'MERN Stack Developer'}</span>
                
            </div>
            <div className='hr' style={{ width: "90%" }} />
            <div className='follow-status'>
                <div className='followers'>
                    <span>{userData?.followers?.length}</span>
                    <span>Followers</span>
                </div>
                <div className='vl' style={{ height: "85%" }} />
                <div className='following'>
                    <span>{userData?.followings?.length}</span>
                    <span>Following</span>
                </div>
                {location === 'profile' && 
                <>
                <div className='vl' style={{ height: "85%" }} />
                <div className='posts-count'>
                    <span>{posts?.length}</span>
                    <span>{posts?.length < 2 ? 'Post' : 'Posts'}</span>
                </div>
                </>
                }
            </div>
            <div className='hr' style={{ width: "90%" }} />
        </div>
    )
};
export default ProfileCard;