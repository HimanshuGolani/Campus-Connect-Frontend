import React, { useEffect, useState } from "react";
import { IoChatbubbles } from "react-icons/io5";
import mailIcon from "../../assets/Icons/mail.svg"
import mailSolidIcon from "../../assets/Icons/mailSolid.svg"
import chatIcon from "../../assets/Icons/chat.svg"
import chatSolidIcon from "../../assets/Icons/chatSolid.svg"
import heartIcon from "../../assets/Icons/heart.svg"
import heartSolidIcon from "../../assets/Icons/heartSolid.svg"
import binIcon from "../../assets/Icons/bin.svg"
import binSolidIcon from "../../assets/Icons/binSolid.svg"
import accountIcon from "../../assets/Icons/account.svg"
import accountSolidIcon from "../../assets/Icons/accountSolid.svg"
import Title from "../shared/Title.jsx";
import { useLocation, useNavigate } from "react-router-dom";

const AppLayout = ({children}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [chatIconState,setChatIconState] = useState(true);
    const [profileIconState,setProfileIconState] = useState(false);
    const [notificationIconState,setNotificationIconState] = useState(false);


    const CheckChatIcon = () => {
        if(location.pathname.includes('/chat')||location.pathname == '/'){
            setChatIconState(true);
        }else{
            setChatIconState(false);
        }
    }

    const CheckProfileIcon = () => {
        if(location.pathname ==`/chat/profile/${localStorage.getItem('UserId')}`){
            setProfileIconState(true);
        }else{
            setProfileIconState(false);
        }
    }

    const CheckNotificationIcon = () => {
        if(location.pathname.includes('/notification')){
            setNotificationIconState(true);
        }else{
            setNotificationIconState(false);
        }
    }


    useEffect(()=>{
        CheckChatIcon();
        CheckProfileIcon();
        CheckNotificationIcon();
    },[location])

    return (
        <>
            <Title />
            <div className="flex bg-lightdarkgray w-[100vw]">
                <div className="w-[80px] min-w-[56px] h-[95vh] bg-gray-800 my-[2.5vh] ml-6 rounded-xl flex flex-col relative items-center justify-between">
                    <IoChatbubbles className="fill-primary scale-150 my-[30px] cursor-pointer " onClick={()=>navigate("/")} />
                    <div className="flex flex-col gap-[50px]">
                        <img src={mailIcon} className="scale-150 cursor-pointer" onClick={()=>alert("under development")} />
                        {/* <img src={mailSolidIcon} className="scale-150 cursor-pointer" /> */}
                        {chatIconState?(
                            <img src={chatSolidIcon} className="scale-150 cursor-pointer" onClick={()=>navigate("/chitchat/chat")}/>
                        ):(
                            <img src={chatIcon} className="scale-150 cursor-pointer" onClick={()=>navigate("/chitchat/chat")} />
                        )}
                        {notificationIconState?(
                            <img src={heartSolidIcon} className="scale-150 cursor-pointer" />
                        ):(
                            <img src={heartIcon} className="scale-150 cursor-pointer" onClick={()=>navigate("/chitchat/notification")} />
                        )}
                        <img src={binIcon} className="scale-150 cursor-pointer" onClick={()=>alert("under development")} />
                        {/* <img src={binSolidIcon} className="scale-150 cursor-pointer" /> */}
                    </div>
                    <div className="flex flex-col gap-5 my-[30px]">
                        <div className="cursor-pointer" onClick={()=>navigate(`/chat/profile/${localStorage.getItem('UserId')}`)}>
                            {profileIconState?(
                                <img src={accountSolidIcon} className="scale-150" />
                            ):(
                                <img src={accountIcon} className="scale-150" />
                            )}
                        </div>
                    </div>
                </div>
                <div className="relative w-full">
                    {children}
                </div>
            </ div>
        </>
        );
};

export default AppLayout;