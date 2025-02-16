import React , {lazy, useContext, useEffect, useState} from 'react'
import AppLayout from '../components/layout/AppLayout'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';
import proxyService1 from '../proxyService1';
import proxyService2 from '../proxyService2';
import { AppContext } from '../context/AppProvider';

const Head = lazy(()=> import('../utils/Head'))
const ChatListDialog = lazy(()=>import('../components/dialog/ChatListDialog'))
const ChatList = lazy(()=>import('../components/specific/ChatList'))
const ChatBoxDialog = lazy(()=>import('../components/dialog/ChatBoxDialog'))
const ChatBox = lazy(()=>import('../components/specific/ChatBox'))

const Home = () => {
    const {chatParamId} = useParams();
    const wsRef = useContext(AppContext).wsRef;
    const [chatP,setChatP] = useState(chatParamId);
    const [addBtnToggle,setAddBtnToggle] = useState(false);
    const [loading,setLoading] = useState(true);
    const[currentChat,setCurrentChat] = useState(null);
    const [friendEmail,setFriendEmail] = useState('');
    const [friendPersons,setFriendPerson] = useState([]);

    const fetchFriend = async () => {
        try {
            const response = await proxyService1.get('/friend/getAllFriend/'+localStorage.getItem('userId'));
            setFriendPerson(response.data.friends);
        } catch (error) {
            if(error.status==400){
                localStorage.removeItem('token');
                toast.sucess('Logout');
            }
            // if(error.status==404){
            //     localStorage.removeItem('token');
            //     toast.sucess('Logout');
            // }
            console.log("error", error.message);
        }
    };

    const emailInputHandler = (event)=>{
        setFriendEmail(event.target.value);
    }


    const AddBtnHandler = () => {
        setAddBtnToggle(!addBtnToggle);
    }
    
    const RequestBtnHandler = async() =>{
        const response = await proxyService1.post('/friend/addFriend',{
            friendEmail:friendEmail
        },{
            headers:{
                token: localStorage.getItem('token')
            }
        })
        if(response.status==200){
            toast.success('Friend Request Sent');
        }else{
            toast.error('Friend Request Failed');
        }
        setAddBtnToggle(!addBtnToggle);
        setFriendEmail('');
    }

    const currentChatFunction = ()=>{
        const chat = friendPersons.find((chat)=>chat._id==chatParamId);
        setCurrentChat(chat);
    }

    const joinSocketHandler = async()=>{
        const socket = new WebSocket('ws://localhost:8080');
        wsRef.current = socket;
        socket.onopen = ()=>{
            socket.send(JSON.stringify({
                type:'join',
                userId:localStorage.getItem('UserId')
            }))
            console.log("Connnected");
        }
        socket.onclose = ()=>{
            console.log("Disconnected");
        }
    }

    useEffect(()=>{
        setChatP(chatParamId)
        joinSocketHandler();
        fetchFriend();
    },[chatParamId])

    useEffect(()=>{
        currentChatFunction();
        setLoading(false);
    },[friendPersons]);
    
  return (
    <div className='relative'>
        <AppLayout>
            {
                loading?(<>Loading</>):(
            <div className='flex items-center w-full h-full mx-3'>
                <div className='flex h-[95%] relative w-full gap-2'>
                    <div className='w-[400px] flex flex-col gap-3'>
                        <div>
                            <Head AddBtnHandler={AddBtnHandler} />
                        </div>
                        <div className='h-full w-full bg-white border rounded-xl'>
                            {
                                friendPersons?.length==0? (<ChatListDialog />) :(<ChatList chats={friendPersons} chatParamId={chatParamId} />)
                            }
                        </div>
                    </div>
                    <div className='w-[calc(100%-450px)] h-full relative'>
                        {
                            !currentChat? (<ChatBoxDialog />) :(<ChatBox currentChat={currentChat} />)
                        }
                    </div>
                </div>
            </div>
        )}
        </AppLayout>
        <div className={(addBtnToggle?(''):('hidden'))}>
            <div className='absolute h-full w-full flex justify-center items-center top-0 left-0 '>
                <div className='absolute h-full w-full bg-black z-1 opacity-50' onClick={AddBtnHandler}>

                </div>
                <div className='h-[300px] w-[600px] bg-white rounded-xl border relative z-2 flex flex-col justify-center'>
                    <div className='text-[30px] mx-10 my-2' >
                        Add a friend
                    </div>
                    <div className='flex flex-col items-center justify-around h-[150px]'>
                        <div className='h-[55px] w-[80%] relative'>
                            <input className='h-full w-full p-7 text-lg border border-gray-400 rounded-full' type='text' placeholder='Search Email' value={friendEmail} onChange={emailInputHandler} />
                        </div>
                        <button className='bg-primary py-3 px-7 rounded-full text-white hover:bg-orange-700' onClick={RequestBtnHandler}>
                            Send Request
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Home;
