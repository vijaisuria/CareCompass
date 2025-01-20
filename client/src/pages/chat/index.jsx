import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";
import { marked } from "marked";
import PageHeader from "../../components/Header";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input.trim() }]);
    const userMessage = input.trim();
    setInput("");
    setIsTyping(true);

    await fetchChatResponse(userMessage);

    setIsTyping(false);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleLike = (index) => {
    alert(`You liked response #${index + 1}`);
  };

  const handleDislike = (index) => {
    alert(`You disliked response #${index + 1}`);
  };

  const handleReadAloud = (text) => {
    alert(`Reading aloud: "${text}"`);
  };

  const handleEmotion = (index, emotion) => {
    alert(`You selected "${emotion}" for response #${index + 1}`);
  };

  const fetchChatResponse = async (message) => {
    try {
      const response = await fetch("http://127.0.0.1:3000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!response.body) {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Error: No response body." },
        ]);
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let botReply = "";
      let isFirstChunk = true;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        botReply += chunk;

        if (isFirstChunk) {
          setMessages((prev) => [...prev, { sender: "bot", text: chunk }]);
          isFirstChunk = false;
        } else {
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1].text = botReply;
            return updated;
          });
        }
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: `Error: ${error.message}` },
      ]);
    }
  };

  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 6rem)" }}>
      {/* Chat header */}
      <PageHeader title="Chat with Bot" description="Ask me anything!" />
      {/* Chat messages */}
      <div className="flex-1 overflow-auto p-2 md:p-6 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start gap-4 ${
              message.sender === "user" ? "justify-end" : ""
            }`}
          >
            {message.sender !== "user" && (
              <div className="w-10 h-10 border rounded-full overflow-hidden">
                <img
                  src="/logo.svg"
                  alt="Bot"
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            <div className="flex flex-col items-start max-w-[80%]">
              {message.sender === "user" ? (
                <div className="p-3 rounded-lg min-w-[80%] break-words shadow-md text-sm bg-blue-500 text-white self-end">
                  {message.text}
                </div>
              ) : (
                <div
                  className="p-3 rounded-lg min-w-[80%] break-words shadow-md text-sm bg-gray-300 text-black max-w-[80%]"
                  dangerouslySetInnerHTML={
                    message.sender === "bot"
                      ? { __html: marked.parse(message.text) }
                      : undefined
                  }
                ></div>
              )}

              {message.sender === "bot" && (
                <div className="ml-1 mt-2 flex items-center gap-3 text-sm">
                  <button
                    onClick={() => handleLike(index)}
                    className={`hover:text-blue-600 ${
                      message.liked ? "text-blue-600" : ""
                    }`}
                  >
                    <FontAwesomeIcon icon={faThumbsUp} />
                  </button>
                  <button
                    onClick={() => handleDislike(index)}
                    className={`hover:text-red-600 ${
                      message.disliked ? "text-red-600" : ""
                    }`}
                  >
                    <FontAwesomeIcon icon={faThumbsDown} />
                  </button>
                  <button
                    onClick={() => handleReadAloud(message.text)}
                    className="hover:text-green-600"
                  >
                    <FontAwesomeIcon icon={faVolumeUp} />
                  </button>
                  <div className="flex items-center gap-2">
                    {["😊", "😟", "😐"].map((emotion) => (
                      <button
                        key={emotion}
                        onClick={() => handleEmotion(index, emotion)}
                        className="px-2 py-1 rounded-full bg-gray-200 hover:bg-gray-300"
                      >
                        {emotion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 border rounded-full overflow-hidden">
              <img
                src="/logo.svg"
                alt="Bot"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="rounded-lg px-4 py-3 bg-white shadow-md max-w-[80%]">
              <p>Typing...</p>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input area */}
      <div className=" text-black border-t border-gray-300 p-4 flex items-center gap-3">
        <textarea
          placeholder="Type your message..."
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          className="flex-1 rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring focus:ring-violet-500"
        />
        <button
          onClick={handleSendMessage}
          className="p-3 rounded-full bg-purple-600 text-white hover:bg-purple-700"
        >
          <SendIcon className="w-5 h-5" />
          <span className="sr-only">Send</span>
        </button>
      </div>
    </div>
  );
}

function SendIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}
