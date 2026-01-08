import { useEffect, useRef, useState } from "react";

export default function App() {
  const [socket, setSocket] = useState(null);
  const [roomID, setRoomID] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [isJoined, setIsJoined] = useState(false);

  const chatEndRef = useRef(null);

  // WebSocket setup
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onmessage = (ev) => {
      setChat((prev) => [...prev, { sender: "other", text: ev.data }]);
    };

    setSocket(ws);
  }, []);

  // Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  function joinRoom() {
    if (!roomID.trim()) return;

    socket.send(
      JSON.stringify({
        type: "join",
        payload: { roomID },
      })
    );

    setIsJoined(true);
  }

  function sendMessage() {
    if (!message.trim()) return;

    socket.send(
      JSON.stringify({
        type: "chat",
        payload: { message },
      })
    );

    setChat((prev) => [...prev, { sender: "me", text: message }]);
    setMessage("");
  }

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center p-4">

      {/* Outer Glass Card */}
      <div className="w-full max-w-md rounded-3xl bg-[#0d0d0d]/80 backdrop-blur-xl shadow-2xl border border-white/10 overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white p-5 text-center font-bold text-xl tracking-wide shadow-md">
          Chat Room
        </div>

        {/* JOIN SCREEN */}
        {!isJoined ? (
          <div className="p-8">
            <p className="text-gray-300 mb-3 text-sm">Enter Room ID</p>

            <input
              type="text"
              value={roomID}
              onChange={(e) => setRoomID(e.target.value)}
              className="w-full p-3 rounded-xl border border-white/20 bg-black/40 text-white placeholder-gray-500 outline-none focus:border-pink-500 transition mb-5"
              placeholder="room123"
            />

            <button
              onClick={joinRoom}
              className="w-full p-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-medium shadow-lg hover:opacity-90 transition"
            >
              Join Room
            </button>
          </div>
        ) : (
          <>
            {/* CHAT WINDOW */}
            <div className="h-[60vh] overflow-y-scroll p-5 space-y-3 bg-black/20 backdrop-blur-sm">

              {chat.map((c, i) => (
                <div key={i} className={`flex ${c.sender === "me" ? "justify-end" : "justify-start"}`}>
                  <p
                    className={`
                    px-4 py-2 rounded-2xl max-w-[70%] text-sm shadow-md
                    ${c.sender === "me"
                        ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-pink-600/20"
                        : "bg-white/10 text-gray-200 border border-white/10 backdrop-blur"
                      }
                  `}
                  >
                    {c.text}
                  </p>
                </div>
              ))}

              <div ref={chatEndRef} />
            </div>

            {/* INPUT BOX */}
            <div className="p-4 flex items-center gap-3 border-t border-white/10 bg-black/40 backdrop-blur-xl">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 p-3 bg-white/10 text-white rounded-full border border-white/20 placeholder-gray-400 outline-none focus:border-pink-500 transition"
                placeholder="Type a message..."
              />
              <button
                onClick={sendMessage}
                className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-2 rounded-full shadow-lg hover:opacity-90 transition"
              >
                Send
              </button>
            </div>
          </>
        )}
      </div>

    </div>
  );
}
hhjv
kjghhv