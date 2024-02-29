import { jwtDecode } from 'jwt-decode';
import { LogOut } from 'lucide-react';
import React from 'react'
import { Button } from '../ui/button';


const Header = () => {

    
let name = ""
const token = localStorage.getItem("token");
// console.log(token)
if(token)
name = jwtDecode(token)._name;

    const logout = () => {
        // socket.on("disconnect", () => {
        //   console.log(socket.id); // undefined
        //   console.log()
        // });
        localStorage.clear();
        window.location = "/";
      };

  return (
    <div className="flex justify-between leading-7 sm:truncate sm:tracking-tight text-xl bg-[#2a3042] w-full p-4">
        <div className="font-semibold my-auto">TYPING TEST ARENA</div>
        <div className="flex">
          <div className="my-auto mx-2">Hi, {name}</div>
          <Button title='Log Out?' className="bg-transparant hover:bg-red-500" onClick={logout}>
            <LogOut />
          </Button>
        </div>
      </div>
  )
}

export default Header