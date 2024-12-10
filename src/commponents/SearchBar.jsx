import React from 'react';

const SearchBar = ({ placeholder, value, onChange }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full p-2 rounded-xl border border-gray-300"
    />
  );
};

export default SearchBar;
