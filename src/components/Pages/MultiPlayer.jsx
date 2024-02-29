import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { io } from "socket.io-client";
import { Button } from "../ui/button";
import { ArrowLeftRight, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import toast from "react-hot-toast";

let name = "";
const token = localStorage.getItem("token");
if (token) name = jwtDecode(token);

const MultiPlayer = () => {
  const [room,setRoom] = useState();
  const [status,setStatus] = useState('waiting')
  const [joinRoom,setJoinRoom] = useState('');

  const socket = io('https://typingarena-server.onrender.com')
  
  const handleCreate = () => {
    setRoom(Math.floor(100000 + Math.random() * 900000))
    // socket.join(room);
    socket.emit('joined-room',{id:socket.id,room});
    // navigate('/multiplayer/id')
    setStatus('created');
  }

  const handleSubmit = () => {
    
    if(joinRoom.length === 6){
        socket.emit('check-room',{id:socket.id,room:joinRoom})
        socket.on('is-right-room',({success,message}) => {
          if(success) toast.success(message);
          else toast.error(message);                                                        
        })
    }
    else{
      toast.error('Please enter valid room code');
    }
  }

  const handleExit = () => {
    socket.emit('leave-room',room);
    setStatus('waiting');
    console.log('left')
  }

  return (
    <div className="w-full text-[#eef1f3] bg-[#222736]">
      <div className="seconds text-2xl p-4 pb-0 text-center">
        <p>Multiplayer mode</p>
      </div>
      <div className={`options-container justify-around items-center my-40 h-full self-center w-full ${status === 'waiting' ? 'flex' : 'hidden'}`}>
        <div
          className="flex-1 flex flex-col items-center gap-2 text-center h-full w-full"
          onClick={() => {}}
        >
          <p className="text-xl">Enter 6 digit Code to join</p>
          <Input className='w-1/2 text-black' value={joinRoom} onChange={e => setJoinRoom(e.target.value)}/>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
        <div className="m-auto flex" >
          <ArrowLeftRight className="w-[100px] h-[100px]" />
        </div>
        <div
          className="flex-1 flex text-center h-full w-full hover:animate-pulse hover:cursor-pointer"
          onClick={handleCreate}
        >
          <p className="m-auto text-xl">Create Room</p>
        </div>
      </div>
      <div className={`${status === 'created' ? 'flex flex-col' : 'hidden'} w-full text-center my-40 text-xl gap-4`}>
        <div>Waiting for other user to join</div>
        <div>Your Room code: {room}</div>
        <div className="text-base"> use this code to invite your friend</div>
        <Button className='w-fit mx-auto bg-red-500' onClick={handleExit}>Exit</Button>
      </div>
    </div>
  );
}; 

export default MultiPlayer;
