import React, { lazy, Suspense } from 'react';

// Lazy loading the Chat component
const Notification = lazy(() => import('./Notification'));

const NotificationList = ({ notification = [], notificationParamId }) => {
  return (
    <div>
      <Suspense fallback={<div>Loading notification...</div>}>
        {notification.map((data,index) => (
          <Notification 
            key={index} 
            data={data.userName} 
            Id={data._id} 
            mode = {data.mode}
            notificationParamId={notificationParamId} 
          />
        ))}
      </Suspense>
    </div>
  );
};

export default NotificationList;