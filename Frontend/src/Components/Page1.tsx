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
  const [messages, setMessages] = useState([]);
  const [copied, setCopied] = useState(false);
  // Refs
  const wsRef = useRef(null);
  const inputRef = useRef();
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
      //@ts-ignore
          wsRef.current.close();
        }
    const ws = new WebSocket("ws://localhost:8080");

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
  const joinRoom=()=>{
    
    
    const inputRoomId = joinInputRef.current?.value;
   
    if (!inputRoomId) {
      console.error("Room ID is required");
      return;
    }
    if (wsRef.current) {
      wsRef.current.close();
    }

    const ws = new WebSocket("ws://localhost:8080");

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

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };
  }
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
      <div className="w-screen h-screen text-white bg-black font-JetBrain flex justify-center flex-col items-center  " >
        <div className="md:w-[40%] w-[80%] bg-[url('../public/Images/Logo2.png')] bg-cover bg-center  h-[20vh] " >
        </div>
        <div className="border-[#262626] p-4 rounded-lg border-solid border-[1px] flex flex-col shadow-lg md:w-[40%] w-[80%] " >
        <div className="w-full flex gap-2  items-center">
        <svg 
        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-8">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
        </svg>
        <p className="text-xl" >Real Time Chat</p>
        </div>
        <p className="text-sm text-[#A3A3A3] mt-1" >
        temporary room that expires after all users exit
        </p>
        {connected
        ?<div>
          <div className="w-full text-sm p-2 bg-[#262626] rounded-md  text-[#A3A3A3]" >
          Room Code:  {randomString}
          </div>
          <div className="h-[25rem]  w-full text-[#A3A3A3] overflow-y-auto p-3 outline-[0.5px] bg-transparent border-[#262626] rounded-lg border-solid border-[1px]">
          {messages.map((message, index) => (
            <div className="mt-4" >
              <p>Anon</p>
              <div key={index} className="p-1 px-2 text-sm bg-white text-black rounded-md ">
                {message}
              </div>
            </div>
          ))}
        </div>
          <div className="w-full flex gap-3" >
          <input
          ref={inputRef}
          type="text" placeholder="Type a message..." className="w-full mt-4 text-sm text-[#A3A3A3] focus:outline-[#262626] p-2 outline-[0.5px] bg-transparent border-[#262626]  rounded-lg border-solid border-[1px] " >
          </input>
          <button
          onClick={sendMessage }
          className=" px-8  text-sm bg-white text-black rounded-md mt-4 " > 
          Send
          </button>
        </div>
        </div>
        :
        <div>
        <button onClick={createRoom} className="w-full flex justify-center items-center p-2 bg-white text-black rounded-md mt-4 " >
          Create New Room
        </button>
        <div className="w-full flex gap-3" >
          <input ref={joinInputRef} type="text" placeholder="Enter Room Code" className="w-full mt-4 text-sm text-[#A3A3A3] focus:outline-[#262626] p-2 outline-[0.5px] bg-transparent border-[#262626]  rounded-lg border-solid border-[1px] " >
          </input>
          <button onClick={joinRoom} className=" px-16  text-sm bg-white text-black rounded-md mt-4 " >
          Join
          </button>
        </div>
        {click &&
        <div className="w-full flex flex-col gap-2 justify-center items-center p-6 bg-[#262626]  rounded-md mt-4 " >
        <p className="text-[0.7rem] text-[#A3A3A3]" >
        Share this code with your friend
        </p>
        <div className="flex gap-2 " >
          <p className="text-2xl  " >
          {randomString}
          </p>
          <div onClick={handleCopy} className="flex justify-center cursor-pointer items-center" >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
            </svg>
            {copied && <span>Copied!</span>}
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