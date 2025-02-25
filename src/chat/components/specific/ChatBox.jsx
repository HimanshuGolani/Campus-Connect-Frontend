import React, { useContext, useEffect, useRef, useState } from 'react'
import SendIcon from '../../assets/Icons/sendIcon.svg'
import AttachIcon from '../../assets/Icons/attach-icon.svg'
import { Link, useNavigate, useParams } from 'react-router-dom'
import proxyService1 from '../../proxyService1'
import { AppContext } from '../../context/AppProvider'
import axios from 'axios'

const ChatBox = (
    currentChat
) => {
    console.log('oi',currentChat?.currentChat?.unFriended);
    console.log(currentChat?.currentChat?.unFriended?.includes(localStorage.getItem('UserId')));
    const msgRef = useRef(null);
    const messagesRef = useRef(null);
    const wsRef = useContext(AppContext).wsRef;
    const {chatParamId} = useParams();
    const [isDisabled,setIsDisabled] = useState(false)

    const navigate = useNavigate();


    const [chatData,setChatData] = useState([]);

    const fetchChatData = async()=>{
        try {
            console.log(localStorage.getItem('userId'),currentChat.currentChat._id);
            const response = await proxyService1.post('/message/getAllMessages',{
                userId: localStorage.getItem('userId'),
                friendId:currentChat.currentChat._id
            });
            console.log("response",response.data.messages);
            setChatData(response.data.messages);
        } catch (error) {
            console.log("error",error.message)
        }
    }

    const SendMessageHandler = async()=>{
        try{
            console.log(localStorage.getItem('userId'),currentChat.currentChat._id,msgRef.current.value)
            const response = await proxyService1.post('/message/sendMessage',{
                userId: localStorage.getItem('userId'),
                receiverId:currentChat.currentChat._id,
                message:msgRef.current.value
            })
            // const messagePayload = {
            //     type: 'message',
            //     senderId: localStorage.getItem('UserId'),
            //     receiverId: currentChat.currentChat._id,
            //     message: msgRef.current.value,
            //     createdAt: getTime(response.data.createdAt),
            // };
        
            // wsRef.current.send(JSON.stringify(messagePayload));
            // console.log("Message sent:", JSON.stringify(messagePayload));
            // console.log(chatData);
            // if(response.data){
            //     msgRef.current.value = '';
            // }
        }catch(error){
            console.log("error",error.message);
        }
        
    }
    
    const MsgInputHandler = (event)=>{
        if(event.key === 'Enter'&&event.shiftKey){
            msgRef.current.value = msgRef.current.value + '\n';
        }else if(event.key === 'Enter'){
            SendMessageHandler();
        }
    }
    
    const ProfileButtonHandler = ()=>{
        navigate(`/chitchat/profile/${currentChat?.currentChat?._id}`);
    }

    const getTime = (time)=>{
        if(!time) return;
        const date = new Date(time);
        const hour = date.getHours();
        const minute = date.getMinutes();
        const stringHour = (hour%12)<10?'0'+(hour%12):(hour%12);
        const stringMinute = minute<10?'0'+minute:minute;
        if(hour<12){
            return stringHour + ':' + stringMinute + ' AM';
        }else{
            return stringHour + ':' + stringMinute + ' PM';
        }
    }

    const getDate = (time)=>{
        if(!time) return;
        const date = new Date(time);
        const currentDate = new Date();
        if(
            date.getDate()==currentDate.getDate()&&
            date.getMonth()==currentDate.getMonth()&&
            date.getFullYear()==currentDate.getFullYear()){
            return 'Today';
        }
        const yesterdayDate = new Date(currentDate);
        yesterdayDate.setDate(yesterdayDate.getDate()-1);
        if(
            date.getDate()==yesterdayDate.getDate()&&
            date.getMonth()==yesterdayDate.getMonth()&&
            date.getFullYear()==yesterdayDate.getFullYear()){
            return 'Yesterday';
        }
        const month = date.getMonth();
        const monthArray = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ]
        const monthString = monthArray[month];
        const day = date.getDate();
        const year = date.getFullYear();
        return day + ' ' + monthString + ' ' + year;
    }

    const RemoveFriendHandler = async()=>{
        const response = await proxyService1.delete('friend/removeFriend',{
            headers: {
                token: localStorage.getItem('token')
            },
            data: {
                friendId: chatParamId,
                iRemoved: false
            }
        });
        navigate('/');
    }
    
    useEffect(()=>{
        fetchChatData();
        // console.log("WsRef",wsRef.current);
        // wsRef.current.onmessage = (message)=>{
        //     const res = JSON.parse(message.data);
        //     if(res.type == 'message'){
        //         res.webSocket = true;
        //         setChatData((chat)=>[...chat,res]);
        //     }
        // }
        console.log(wsRef.current)
    },[currentChat,chatParamId])
    
    useEffect(()=>{
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    },[chatData])


  return (
    <div className='flex flex-col gap-3 h-full relative'>
        <div className='h-[80px] bg-white rounded-xl flex items-center px-5 justify-between'>
            <div className='flex gap-3'>
                <div className='h-[50px] w-[50px] bg-black rounded-full'>

                </div>
                <div className='flex flex-col'>
                    <div className='text-lg'>
                        {currentChat?.currentChat?.userName}
                    </div>
                    <div className='text-sm text-gray-600'>
                        {currentChat?.currentChat?.mode?(curr.currentChat.mode):("Offline")}
                    </div>
                </div>
            </div>
            <div className='px-5 py-2 text-md border border-black rounded-full cursor-pointer hover:bg-primary hover:text-white hover:border-primary transition-all duration-100' onClick={ProfileButtonHandler}>
                Profile
            </div>
        </div>

        <div ref={messagesRef} className='h-[calc(100vh-160px)] bg-white rounded-xl overflow-y-auto'>
            {chatData?(
                <div className='relative'>
                     {chatData.map((data,index)=>{
                        let addAddress = '';
                        if(index==0){
                            if(data.webSocket){
                                addAddress = (
                                    <div key={index} className='text-center text-gray-800'>
                                        Today
                                    </div>
                                )
                            }else{
                                addAddress = (
                                    <div key={index} className='text-center text-gray-800'>
                                        {getDate(data.createdAt)}
                                    </div>
                                )
                            }
                        }else if(data.webSocket){
                            if((!chatData[index-1].webSocket&&getDate(chatData[index-1]?.createdAt)!='Today')){
                                console.log(data.createdAt,getDate(chatData[index-1]?.createdAt));
                                addAddress = (
                                    <div key={index} className='text-center text-gray-800'>
                                        Today
                                    </div>
                                )
                            }
                        }else{
                            if(getDate(chatData[index].createdAt)!=getDate(chatData[index-1]?.createdAt)){
                                addAddress = (
                                    <div key={index} className='text-center text-gray-800'>
                                        {getDate(data.createdAt)}
                                    </div>
                                )
                            }
                        }
                        if(data.senderId==currentChat.currentChat._id){
                            return (
                                <div key={index}>
                                    {addAddress}
                                    <div className='bg-primary text-white block m-2 mb-0 p-2 rounded-r-xl rounded-tl-xl  max-w-[50%] w-fit'>
                                        {data.message}
                                    </div>
                                    <div className='text-[12px] text-gray-800 ml-2'>
                                        {data.webSocket?(data.createdAt):(getTime(data.createdAt))}
                                    </div>
                                </div>
                            )
                        }else{
                            return(
                                <div key={index} >
                                    {addAddress}
                                    <div className='flex flex-col items-end'>
                                        <div className='bg-gray-700 text-white block m-2 mb-0 p-2 rounded-l-xl rounded-tr-xl  max-w-[50%] w-fit text-right relative right-0'>
                                            {data.message}
                                        </div>
                                        <div className='text-[12px] text-gray-800 mr-2'>
                                            {data.webSocket?(data.createdAt):(getTime(data.createdAt))}
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })} 
                    {currentChat?.currentChat?.unFriended?.includes(localStorage.getItem('UserId'))?(<div className='w-full bg-white sticky bottom-0  '> 
                    <div className='flex flex-col gap-5 items-center bg-white border-gray-500 border-2 m-5 rounded-lg p-5'>
                        <div>
                            {currentChat?.currentChat?.userName} has unfriend you
                        </div>
                        <div className='flex gap-5'>
                            <button className='px-5 py-2 text-white text-md border border-primary rounded-full cursor-pointer bg-primary hover:bg-orange-700 transition-all duration-100 text-center'>
                                Sent Request
                            </button>
                            <div className='px-5 py-2 text-md border border-black rounded-full cursor-pointer hover:bg-primary hover:text-white hover:border-primary transition-all duration-100 text-center' onClick={RemoveFriendHandler}>
                                    Remove Friend
                            </div>
                        </div>
                    </div>
                    
                    </div>):(<></>)}
                </div>
            ):(
                <div>No Message</div>
            )}
        </div>

        <div className='h-[60px] flex w-full relative gap-3'>
            <div className={`w-full ${isDisabled?('bg-gray-700'):('bg-white')} rounded-xl flex items-center justify-center`}>
                <div className='w-[60px] flex justify-center cursor-pointer'>
                    <img src={AttachIcon} alt="" className='scale-150' />
                </div>
                <input ref={msgRef} onKeyDown={MsgInputHandler} type='text' placeholder='Write messages...' className={`${isDisabled?('bg-gray-700'):('')} w-full h-full rounded-xl outline-none`} disabled={isDisabled} />
            </div>
            <div className={`w-[60px] h-[60px] ${isDisabled?('bg-gray-700'):('bg-primary')} rounded-xl flex justify-center items-center cursor-pointer`} onClick={isDisabled?(null):(SendMessageHandler)}>
                <img src={SendIcon} alt="" className='scale-150 relative top-[5px]' />
            </div>
        </div>

    </div>
  )
}

export default ChatBox
