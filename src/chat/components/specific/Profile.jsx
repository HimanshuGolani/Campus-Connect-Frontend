import React, { useEffect, useState , useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import AppLayout from '../layout/AppLayout';
import proxyService1 from '../../proxyService1';
import toast from 'react-hot-toast';
import Profile2 from './Profile2'

const Profile = () => {
    const {profileId} = useParams();
    const [loading,setLoading] = useState(true);
    const [personData,setPersonData] = useState(null);
    const [bioBtn,setBioBtn] = useState(true);
    const navigate = useNavigate();
    // const [bioContent,setBioContent] = useState('');
    const bioRef = useRef();

    const ChangeBioHandler = async()=>{
        if(bioBtn){
            bioRef.current.value = personData.description;
            bioRef.current.focus();
            console.log(bioRef);
            setBioBtn(false);
        }else{
            const response = await proxyService1.post('user/putDescription',{
                description: bioRef.current.value
            },{
                headers: {
                    token: localStorage.getItem('token'), 
                }
            });
            bioRef.current.value= await response.data.description;
            console.log(bioRef.current.value); 
            toast.success('Bio Updated');
            setBioBtn(true);
        }

    }

    const RemoveFriendHandler = async()=>{
        const response = await proxyService1.delete('friend/removeFriend',{
            headers: {
                token: localStorage.getItem('token')
            },
            data: {
                friendId: profileId,
                iRemoved: true
            }
        });
        navigate('/');
    }

    const BioInputChangeHandler = (event) => {
        // bioRef.current.value = event.target.value;
    }

    const currentProfileFunction = async()=>{
        console.log("profileId",profileId)
        setLoading(true);

        const response = await proxyService1.post('/user/findUser',{
                userId: profileId
            },{
            headers: {
                token: localStorage.getItem('token'), 
            }
        });
        console.log('personData',response.data.foundUser);
        setPersonData(response.data.foundUser);
    }

    const LogOutHandler = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('UserId');
        window.location.href = '/';
    }

    useEffect(()=>{
        currentProfileFunction();
        setLoading(false);
    },[profileId,bioBtn])

    return (
        <AppLayout>
            <Profile2 />
        </AppLayout>
    )
}

export default Profile
