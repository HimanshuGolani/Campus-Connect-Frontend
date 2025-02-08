import React, { useEffect, useState , useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import AppLayout from '../layout/AppLayout';
import proxyService1 from '../../proxyService1';
import toast from 'react-hot-toast';

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
        <>
        {loading?(<h1>Loading....</h1>):(
            <AppLayout>
            <div className='bg-white h-full w-full rounded-xl relative flex flex-col gap-3 items-center py-[80px]'>
            <div className='bg-black h-[150px] w-[150px] rounded-full'>

            </div>
            <div className='text-3xl'>
                {personData?personData.userName:'Name not loaded'}
            </div>
            <div type='text' className={`w-[90%] border text-black ${!bioBtn?('border-primary border-2 '):('border-black')} rounded-xl p-3 relative`}>
                <textarea ref={bioRef} onChange={BioInputChangeHandler} disabled={bioBtn} className='placeholder:text-black w-full h-full outline-none' placeholder={personData?personData.description:'Bio not loaded'}></textarea>
            </div>
            <div className='w-full flex justify-end px-[5%]'>
                <div >
                    {
                        profileId == localStorage.getItem('UserId')? (
                            <div className='flex gap-3'>
                                <div className={bioBtn?('px-5 py-2 text-md border border-black rounded-full cursor-pointer hover:bg-primary hover:text-white hover:border-primary transition-all duration-100'):('px-5 py-2 text-md border rounded-full cursor-pointer bg-primary text-white hover:bg-orange-700 hover:border-primary transition-all duration-100')} onClick={ChangeBioHandler}>
                                    {bioBtn?('Change Bio'):('UpdateBio')}
                                </div>
                                <div onClick={LogOutHandler} className='px-5 py-2 text-md border border-black rounded-full cursor-pointer hover:bg-primary hover:text-white hover:border-primary transition-all duration-100'>
                                    Log Out
                                </div>
                            </div>
                            ):(
                            <div className='flex gap-3'>
                                <div className='px-5 py-2 text-md border border-black rounded-full cursor-pointer hover:bg-primary hover:text-white hover:border-primary transition-all duration-100 text-center' onClick={RemoveFriendHandler}>
                                    Remove Friend
                                </div>
                                <div className='px-5 py-2 text-md border border-black rounded-full cursor-pointer hover:bg-primary hover:text-white hover:border-primary transition-all duration-100 text-center'>
                                    Archive Friend
                                </div>
                                <div className='px-5 py-2 text-md border border-black rounded-full cursor-pointer hover:bg-primary hover:text-white hover:border-primary transition-all duration-100 text-center'>
                                    Block Friend
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
        </AppLayout>
        
    )}
    </>
    )
}

export default Profile
