import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import API from '../../API/API';
import './follower-card.css'

const FollowerCard = ({id}) => {
    const navigate = useNavigate()
    const authData = useSelector((state) => state.authReducer.authData)
    const [userData, setUserData] = useState({})
    const [isFollowing, setIsFollowing] = useState(authData.followings.includes(id))
    useEffect(() => {
        const fetchUserData = async () => {
            const { data } = await API.get(`user/${id}`)
            setUserData(prev => data)
        }
        fetchUserData()
    }, [id, authData])

    const followHandler = async() => {
        await API.put(`user/follow/${id}`, {currentUserid : authData._id})
        setIsFollowing((prev) => !prev)
    }

    return (
        <div className='follower-card'>
            <div className='follower-profile' onClick={() => navigate(`/profile/${userData?._id}`)}>
                <img src={userData?.profileImg ? process.env.REACT_APP_SERVER_IMAGES + userData.profileImg : process.env.REACT_APP_SERVER_IMAGES + 'defaultProfile.jpg'} alt="" />
                <div className='follower-name '>
                    <span style={{fontSize : '2.5rem' }}>{userData?.fName}</span>
                    {/* <span>{userData?.userName}</span> */}
                </div>
            </div>
            <button className='btn follow-btn' onClick={followHandler}>{isFollowing ? 'Unfollow' : 'Follow'}</button>
        </div>
    )
};
export default FollowerCard;