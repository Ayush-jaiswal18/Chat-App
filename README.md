🚀 Real-Time Chat App (React + WebSocket)

A beautiful, modern real-time chat application built using React and WebSockets.
Supports chat rooms, smooth animations, auto-scrolling, glass UI, and a premium dark theme.

✨ Features

✅ Real-time messaging using WebSockets

✅ Join chat rooms with a room ID

✅ Beautiful glass-morphism UI

✅ Smooth auto-scroll to latest messages

✅ Modern gradients & dark theme

✅ Clean React architecture

✅ Lightweight — no external UI libraries

📁 Project Structure
/src
 ├── App.jsx        # Main React component (chat UI)
 ├── index.jsx      # Renders React App
 └── styles.css     # Tailwind / global styles

/server
 └── server.js      # WebSocket backend (Node.js + ws)

🛠️ Tech Stack
Frontend

React (Vite / CRA)

TailwindCSS

WebSocket API

Modern UI (Glassmorphism + Gradients)

Backend

Node.js

WebSocket server (ws library)

⚙️ Installation & Setup
Clone the repository
git clone https://github.com/your-username/chat-app.git
cd chat-app

▶️ Start Frontend

If using Vite:

npm install
npm run dev

▶️ Start Backend (WebSocket Server)
cd server
npm install
node server.js


By default, server runs on:

ws://localhost:8080

🧠 How It Works
1. Client connects to WebSocket server
const ws = new WebSocket("ws://localhost:8080");

2. User joins a room
{
  "type": "join",
  "payload": { "roomID": "xyz" }
}

3. Sending a message
{
  "type": "chat",
  "payload": { "message": "Hello!" }
}

4. Auto-scroll to newest messages

React useEffect keeps the chat window updated smoothly.

🎨 UI Preview

(Add screenshots here)

/screenshots
 ├── join-screen.png
 └── chat-screen.png

🔮 Upcoming Features

Typing indicator

Read receipts

Online user list

File sharing

Emojis & GIFs

Message timestamps

🤝 Contributing

Pull requests are welcome!
For major changes, please open an issue first to discuss what you would like to change.
