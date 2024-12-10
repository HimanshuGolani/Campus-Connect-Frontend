import React from 'react';

const UserCard = ({ name, role, imgUrl, time }) => {
  return (
    <div className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded-lg">
      <img src={imgUrl} alt={name} className="w-12 h-12 rounded-full" />
      <div className="flex flex-col">
        <span className="font-semibold">{name}</span>
        <span className="text-sm text-gray-500">{role}</span>
      </div>
      <span className="ml-auto text-sm text-gray-400">{time}</span>
    </div>
  );
};

export default UserCard;
