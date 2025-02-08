import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const Chat = ({data,Id,chatParamId,mode='Offline'}) => {
  // console.log(Id," ",chatParamId);
  const navigate = useNavigate();

  const clickChatHandler = () => {
    navigate(`/chat/${Id}`);
  }


  return (
    <div className={(Id==chatParamId?('bg-gray-100'):(''))+' h-[80px] flex items-center border-b px-4 relative flex gap-3 hover:bg-gray-100 hover:cursor-pointer'} onClick={clickChatHandler}>
        <div className='w-[50px] h-[50px] bg-black rounded-full overflow-hidden'>
            <img src="" alt="" />
        </div>
        <div className='flex flex-col'>
            <div className='h-[25px]'>
                {data}
            </div>
            <div className='text-sm text-gray-900'>
                {mode}
            </div>
        </div>
    </div>
  )
}

export default Chat
