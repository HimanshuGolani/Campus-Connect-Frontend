import React , {useState} from "react";
const MessageInput = ({ onSendMessage }) => {
    const [message, setMessage] = useState ('');
  
    const handleSend = () => {
      if (message) {
        onSendMessage(message);
        setMessage('');
      }
    };
  
    return (
      <div className="flex items-center px-4 py-3 gap-3">
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 shrink-0"
          style={{ backgroundImage: 'url("https://cdn.usegalileo.ai/stability/ed1a53ff-da3e-4538-9229-59adce10af99.png")' }}
        ></div>
        <label className="flex flex-col min-w-40 h-12 flex-1">
          <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
            <input
              placeholder="Type a message"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border-none bg-[#f0f2f5] focus:border-none h-full placeholder:text-[#60778a] px-4 rounded-r-none border-r-0 pr-2 text-base font-normal leading-normal"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="flex border-none bg-[#f0f2f5] items-center justify-center pr-4 rounded-r-xl border-l-0 !pr-2">
              <button
                onClick={handleSend}
                className="min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#2094f3] text-white text-sm font-medium leading-normal"
              >
                <span className="truncate">Send</span>
              </button>
            </div>
          </div>
        </label>
      </div>
    );
  };
  
  export default MessageInput;