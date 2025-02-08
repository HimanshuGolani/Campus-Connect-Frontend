import React, { lazy, Suspense } from 'react';

// Lazy loading the Chat component
const Chat = lazy(() => import('./Chat'));

const ChatList = ({ chats, chatParamId ,mode }) => {
  return (
    <div>
      <Suspense fallback={<div>Loading chats...</div>}>
        {chats.map((data,index) => (
          <Chat 
            key={index} 
            data={data.userName} 
            Id={data._id}
            mode = {data.mode} 
            chatParamId={chatParamId} 
          />
        ))}
      </Suspense>
    </div>
  );
};

export default ChatList;