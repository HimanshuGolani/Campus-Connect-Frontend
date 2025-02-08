import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const Notification = ({data,Id,notificationParamId}) => {
  // console.log(Id," ",chatParamId);
  const navigate = useNavigate();

  const clickChatHandler = () => {
    navigate(`/notification/${Id}`);
  }


  return (
    <div className={(Id==notificationParamId?('bg-gray-100'):(''))+' h-[80px] flex items-center border-b px-4 relative flex gap-3 hover:bg-gray-100 hover:cursor-pointer'} onClick={clickChatHandler}>
        <div className='w-[50px] h-[50px] bg-black rounded-full overflow-hidden'>
            <img src="" alt="" />
        </div>
        <div className='flex flex-col'>
            <div className='h-[25px]'>
                {data}
            </div>
            <div className='text-sm text-gray-900'>
                sent a Friend Request
            </div>
        </div>
    </div>
  )
}

export default Notification
