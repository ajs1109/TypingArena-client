import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { io } from 'socket.io-client';

const CreateRoom = () => {
  const params = useParams();

  const socket = io('http://localhost:6010')
  console.log(socket)

  useEffect(() => {
    socket.on('connect',() => {
      socket.emit('join-room',{id:params.id,room:'123456'})
    })
  },[])

    // var availableRooms = [];
    // var rooms = io.sockets.adapter.rooms;
    // if (rooms) {
    //     for (var room in rooms) {
    //         if (!rooms[room].hasOwnProperty(room)) {
    //             availableRooms.push(room);
    //         }
    //     }
    // }
    // console.log(availableRooms)
    // return availableRooms;



  console.log(params.id)
  return (
    <div>CreateRoom room id {params.id}</div>
  )
}

export default CreateRoom