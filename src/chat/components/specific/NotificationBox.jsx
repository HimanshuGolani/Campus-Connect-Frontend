import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import proxyService1 from '../../proxyService1';
import FriendProfile from './FriendProfile';

const NotificationBox = ({notP,notPersons=[]}) => {
    const [loading, setLoading] = useState(true);
    const [personData, setPersonData] = useState(null);
    const navigate = useNavigate();
  
    console.log("notPerson",notPersons)

    const findNotification = () => {
      const findUser = notPersons.find((n) => n._id === notP); 
      setPersonData(findUser); 
    };


  
    useEffect(() => {
      findNotification();
      setLoading(false);
    }, [notPersons, notP]); 
  

  return (
    <>
        {loading?(<h1>Loading....</h1>):(
            <FriendProfile notP={notP} notPersons={notPersons} />
        //     <div className='h-full'>
        //     <div className='bg-white h-full w-full rounded-xl relative flex flex-col gap-3 items-center py-[80px]'>
        //     <div className='bg-black h-[150px] w-[150px] rounded-full'>

        //     </div>
        //     <div className='text-3xl'>
        //         {personData?.userName}
        //     </div>
        //     <div type='text' className='w-[90%] border border-black rounded-xl p-3 relative'>
        //         <div>
        //             {personData?.description}
        //         </div>
        //     </div>
        //     <div className='w-full flex justify-end px-[5%] gap-3'>
        //         <button className='px-5 py-2 text-md bg-primary text-white rounded-full cursor-pointer hover:bg-orange-700 transition-all duration-100' onClick={AcceptRequestHandler} >
        //             Accept Request
        //         </button>
        //         <div className='px-5 py-2 text-md border border-black rounded-full cursor-pointer hover:bg-black hover:text-white  transition-all duration-100'>
        //             Cancel Request
        //         </div>
        //     </div>
        // </div>
        // </div>
        
    )}
    </>
  )
}

export default NotificationBox
