import { useEffect, useRef, useState } from "react"


function generateRandomString(length = 6) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
const Page1 = () => {
  // State Variables
  const [connected, setConnected] = useState(false);
  const [click, setClick] = useState(false);
  const [randomString, setRandomString] = useState('');
  const [roomId, setRoomId] = useState("");
  const [messages, setMessages] =  useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  // Refs
  const wsRef = useRef<WebSocket | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const joinInputRef = useRef<HTMLInputElement>(null);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(randomString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // reset copied state after 2 seconds
    } catch (error) {
      console.error('Error copying text:', error);
    }
  };

  const createRoom=()=>{
    setClick(true);
    const newRoomId = generateRandomString();
    setRandomString(newRoomId);
    setRoomId(newRoomId);
    if (wsRef.current) {
          wsRef.current.close();
        }
    const ws = new WebSocket(import.meta.env.VITE_BACKEND_WS_URL);

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "create",
        payload: {
          roomId: newRoomId
        }
      }));
   
      wsRef.current = ws;
    };
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "message") {
        
        setMessages((prevMessages) => [...prevMessages, message.payload.message]);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }
  const joinRoom = async () => {
    setIsJoining(true);
    try {
      const inputRoomId = joinInputRef.current?.value;
      if (!inputRoomId) {
        console.error("Room ID is required");
        setIsJoining(false);
        return;
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
      const ws = new WebSocket(import.meta.env.VITE_BACKEND_WS_URL);
      ws.onopen = () => {
        ws.send(JSON.stringify({
          type: "join",
          payload: {
            roomId: inputRoomId
          }
        }));
        setConnected(true);
        wsRef.current = ws;
        setRoomId(inputRoomId); // Set the room ID for the joining user
        setIsJoining(false);
      };
      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === "message") {
          setMessages((prevMessages) => [...prevMessages, message.payload.message]);
        }
      };
      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        setIsJoining(false);
      };
    } catch (error) {
      setIsJoining(false);
    }
  };
  useEffect(() => {

    return () => {
      if (wsRef.current) {
    wsRef.current.close();
          }
        };
      }, []);
  const sendMessage = () => {
    const ws = wsRef.current;
    const message = inputRef.current?.value;
  
    if (!message || !ws) {
      console.error("No message or WebSocket connection");
      return;
    }

    // Check if the WebSocket is open
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        type: "message",
        payload: {
          roomId: roomId, // Include the room ID in the message
          message: message
        }
      }));
    } else {
      // If the WebSocket is not open, wait for it to open and then send the message
      ws.onopen = () => {
        ws.send(JSON.stringify({
          type: "message",
          payload: {
            roomId: roomId, // Include the room ID in the message
            message: message
          }
        }));
      };
    }

  // Clear the input field after sending the message
  if (inputRef.current) {
    inputRef.current.value = "";
  }
};
    return (
      <div className="w-full h-screen bg-[url('/Images/HomeBg.png')] bg-cover bg-center text-black flex justify-center flex-col items-center pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-20" >
        {/* <div className="md:w-[40%] w-[80%] bg-[url('../public/Images/Logo2.png')] bg-cover bg-center h-[15vh] md:h-[20vh] " >
        </div> */}
        <div className={`bg-white p-6 rounded-lg border-solid border-[1px] justify-center items-center flex flex-col shadow-lg w-[95vw] max-w-xl ${connected ? 'min-h-[28rem]' : 'min-h-[32rem]'} md:w-[38rem] ${connected ? 'md:min-h-[32rem]' : 'md:min-h-[36rem]'} relative`}>
          {/* Floating GhostLogo */}
          <div className="absolute md:-top-16  -top-14 left-1/2 transform -translate-x-1/2">
            <div className="w-32 h-32 bg-[url('/Images/GhostLogo.png')] bg-contain bg-no-repeat"></div>
          </div>
          <div className="w-full flex gap-2 justify-center items-center mt-8">
            <svg 
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-10 text-[#572c73] md:size-12">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
            </svg>
            <p className="text-2xl text-[#572c73] md:text-3xl font-bold" >Real Time Chat</p>
          </div>
          <p className="text-base md:text-lg text-[#655687] mt-2 md:mt-3" >
          temporary room that expires after all users exit
          </p>
          {connected
          ?<div className="md:w-[90%] w-[95%]">
            <div className="w-full text-lg md:text-xl p-3 bg-[#7f7399] my-3 rounded-md  text-[#d0c9ea] font-semibold" >
            Room Code:  {randomString}
            </div>
            <div className="h-[20rem] md:h-[22rem] w-full text-[#A3A3A3] overflow-y-auto p-4 outline-[0.5px] bg-transparent border-[#655687] rounded-lg border-solid border-[1px] text-base md:text-lg">
            {messages.map((message, index) => (
              <div className="mt-5" key={index}>
                <p className="text-[#655687] font-semibold text-sm md:text-base" >Anon</p>
                <div className="p-2 px-3 text-base md:text-lg bg-[#7f7399] text-white rounded-md ">
                  {message}
                </div>
              </div>
            ))}
        </div>
          <div className="w-full flex gap-4 mt-2" >
          <input
          ref={inputRef}
          type="text" placeholder="Type a message..." 
          className="w-full mt-4 text-base md:text-lg text-[#655687] focus:outline-[#655687] p-3 outline-[0.5px] bg-transparent border-[#655687] rounded-lg border-solid border-[1px] "
          onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(); }}
          >
          </input>
          <button
          onClick={sendMessage }
          className="px-10 text-base md:text-lg bg-[#572c73] text-white rounded-md mt-4 font-semibold" > 
          Send
          </button>
        </div>
        </div>
        :
        <div>
        <button onClick={createRoom} className="w-full flex justify-center items-center p-3 bg-[#572c73]  text-white rounded-md mt-4 text-base md:text-lg font-semibold" >
          Create New Room
        </button>
        <div className="w-full flex gap-4" >
          <input ref={joinInputRef} type="text" placeholder="Enter Room Code" className="w-full mt-4 text-base md:text-lg text-[#655687] focus:outline-[#655687] p-3 outline-[0.5px] bg-transparent border-[#655687] rounded-md border-solid border-[1px] " >
          </input>
          <button
          onClick={joinRoom}
          className={`px-16 text-base md:text-lg rounded-md mt-4 font-semibold transition-colors duration-200 ${isJoining ? "bg-[#bfa6d6] text-[#572c73] cursor-wait" : "bg-[#572c73] hover:bg-[#655687] text-white"}`}
          disabled={isJoining}
>
  {isJoining ? "Joining..." : "Join"}
</button>
        </div>
        {click &&
        <div className="w-full flex flex-col gap-2 justify-center items-center p-6 bg-[#7f7399] rounded-md mt-4 " >
        <p className="text-sm md:text-base text-[#d0c9ea]" >
        Share this code with your friend
        </p>
        <div className="flex gap-3 " >
          <p className="text-2xl md:text-3xl text-[#d0c9ea] font-bold " >
          {randomString}
          </p>
          <div onClick={handleCopy} className="flex justify-center cursor-pointer items-center" >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[#d0c9ea]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
            </svg>
            {copied && <span className="text-white text-base md:text-lg ml-1">Copied!</span>}
          </div>
        </div>
      </div>
        }
        </div>}
        
        </div>
      </div>
    )
  }
  
  export default Page1