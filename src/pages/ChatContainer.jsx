import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SearchBar from '../commponents/SearchBar';
import Message from '../commponents/Message';
import MessageInput from '../commponents/MessageInput';
import UserCard from '../commponents/UserCard';
import { ApplicationContext } from '../context/ApplicationContext';

const ChatContainer = () => {
  const { chatId } = useParams(); // Get chatId from URL params
  const [messages, setMessages] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { userId } = useContext(ApplicationContext);

  // Fetch chats (chat list of the current user)
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/messaging/chats/${userId}`);
        console.log("Chats Response:", response.data);
        setProfiles(response.data);
      } catch (error) {
        console.error("Error fetching chats:", error);
        setProfiles([]); // Handle any error by setting profiles to empty array
      }
    };
    fetchChats();
  }, [userId]);

  // Fetch messages for a specific chat (based on chatId from URL)
  useEffect(() => {
    if (!chatId) return;

    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/messaging/chats/${chatId}`);
        console.log("Messages Response:", response.data);
        setMessages(response.data.messages); // Assuming the API returns the messages array
        setSelectedProfile(response.data.profile); // Assuming the response includes the profile info
      } catch (error) {
        console.error("Error fetching messages:", error);
        setMessages([]); // Fallback in case of error
      }
    };

    fetchMessages();
  }, [chatId]);

  // Send message functionality
  const handleSendMessage = async (message) => {
    if (!selectedProfile) return;

    try {
      const response = await axios.post('http://localhost:8080/messaging/send', {
        chatId,
        senderId: userId,
        message
      });
      setMessages([...messages, { senderName: 'You', message, isSender: true }]); // Optimistic UI update
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Filter profiles based on search term
  const filteredProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative flex h-screen bg-white">
      {/* Profiles Section */}
      <div className="w-1/4 bg-gray-100 p-4 overflow-y-auto">
        <SearchBar
          placeholder="Search profiles"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="mt-4">
          {filteredProfiles.map((profile) => (
            <div
              key={profile.id}
              className="cursor-pointer mb-4"
              onClick={() => {
                setSelectedProfile(profile);
                setMessages([]); // Clear previous messages when a new profile is selected
                // Optionally, fetch new messages if needed
              }}
            >
              <UserCard
                name={profile.name}
                role={profile.role}
                imgUrl={profile.imgUrl}
                time={profile.time}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex-1 flex flex-col">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <p className="text-32 font-bold min-w-72">
            {selectedProfile ? selectedProfile.name : 'Select a profile to chat'}
          </p>
        </div>

        {/* Messages Section */}
        <div className="flex-1 overflow-y-auto p-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500">No messages yet</div>
          ) : (
            messages.map((msg, idx) => (
              <Message key={idx} {...msg} />
            ))
          )}
        </div>

        {/* Message Input Section */}
        {selectedProfile && <MessageInput onSendMessage={handleSendMessage} />}
      </div>
    </div>
  );
};

export default ChatContainer;
