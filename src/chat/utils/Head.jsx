import React from 'react'
import addSolidIcon from '../assets/Icons/addSolid.svg'

const Head = ({AddBtnHandler}) => {

  return (
    <div className='w-full h-[80px] bg-white rounded-xl flex items-center justify-center'>
      <div className=' text-lg font-medium'>
        Chit Chat
      </div>
      <div className='h-[35px] w-[200px] mx-5 relative'>
        <input className='h-full w-full p-3 text-sm border border-gray-400 rounded-full' type='text' placeholder='Search' />
      </div>
      <div onClick={AddBtnHandler}>
        <img src={addSolidIcon} className='h-[30px]' />
      </div>
    </div>
  )
}

export default Head
