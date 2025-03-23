import { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineSend } from "react-icons/ai";


const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchResponse = async (userMessage) => {
    setLoading(true);
    const newMessages = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);

    try {
      const response = await fetch(`${apiUrl}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}` ,
          "HTTP-Referer": "https://campus-connect-frontend-oru2.onrender.com/",
          "X-Title": "Campus-connect",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "qwen/qwen2.5-vl-72b-instruct:free",
          messages: [
            { role: "user", content: [{ type: "text", text: userMessage }] },
          ],
        }),
      });

      const data = await response.json();
      const botReply = data.choices?.[0]?.message?.content || "Sorry, I couldn't understand that.";
      setMessages([...newMessages, { role: "bot", content: botReply }]);
    } catch (error) {
      setMessages([...newMessages, { role: "bot", content: "Error fetching response." }]);
    }
    setLoading(false);
  };

  const handleSend = () => {
    if (input.trim()) {
      fetchResponse(input);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white p-4 max-w-2xl mx-auto">
      {/* Chat Header */}
      <motion.div className="text-center text-lg font-semibold text-gray-300 py-2" 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}>
        Welcome to ChatBot! Type a message below to start.
      </motion.div>

      {/* Chat Window */}
      <motion.div className="flex-1 overflow-y-auto p-4 bg-gray-800 rounded-lg shadow-md" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}>
        {messages.map((msg, index) => (
          <motion.div 
            key={index} 
            className={`p-3 my-2 max-w-xs md:max-w-sm lg:max-w-md rounded-lg ${msg.role === "user" ? "bg-blue-500 text-white ml-auto" : "bg-gray-700 text-white mr-auto"}`}
            initial={{ x: msg.role === "user" ? 50 : -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {msg.content}
          </motion.div>
        ))}
        {loading && <motion.div className="text-gray-400 animate-pulse text-center">Typing...</motion.div>}
      </motion.div>

      {/* Input Section */}
      <div className="flex items-center p-2 bg-gray-700 rounded-lg mt-2 w-full">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 rounded-lg bg-gray-600 text-white focus:outline-none"
        />
        <button
          onClick={handleSend}
          className="ml-2 bg-blue-500 p-2 rounded-lg hover:bg-blue-600 flex items-center justify-center"
        >
          <AiOutlineSend size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
