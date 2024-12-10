import React from 'react';

const Message = ({ senderName, message, isSender, senderImgUrl }) => {
  return (
    <div className={`flex ${isSender ? 'justify-end' : 'justify-start'} mb-3`}>
      <img src={senderImgUrl} alt={senderName} className="w-8 h-8 rounded-full" />
      <div className={`max-w-xs p-3 rounded-xl ${isSender ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Message;
