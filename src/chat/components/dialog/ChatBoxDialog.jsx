import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ChatBoxDialog = () => {

  return (
    <div className='w-full h-full bg-white rounded-xl flex flex-col justify-center items-center'>
        <div className='text-3xl'>
            Hi {localStorage.getItem('userName')} !!!
        </div>
        <div className='text-3xl'>
            Chit Chat with your Friends
        </div>
    </div>
  )
}

export default ChatBoxDialog
