import React from "react";
import "./App.css";
import { ArrowLeftRight, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { jwtDecode } from "jwt-decode";

let name = ""
const token = localStorage.getItem("token");
console.log(token)
if(token)
name = jwtDecode(token)._name;

const HomePage = () => {
  const logout = () => {
    localStorage.clear();
    window.location = "/";
  };

  return (
    <div className="w-[100vw] h-screen max-h-[100vh] text-[#eef1f3] bg-[#222736]">
      <div className="flex justify-between leading-7 sm:truncate sm:tracking-tight text-xl bg-[#2a3042] w-full p-4">
        <div className="font-semibold my-auto">TYPING TEST ARENA</div>
        <div className="flex">
          <div className="my-auto mx-2">Hi, {name}</div>
          <Button title='Log Out?' className="bg-transparant hover:bg-red-500" onClick={logout}>
            <LogOut />
          </Button>
        </div>
      </div>
      <div className="seconds text-2xl p-4 pb-0 text-center ">
        <p>Select Game Mode</p>
      </div>
      <div className="options-container flex justify-around max-h-[80vh] w-full h-full">
        <div
          className="flex-1 flex text-center m-auto h-full w-full hover:animate-pulse hover:cursor-pointer"
          onClick={() => window.location.assign("/singlePlayer")}
        >
          <p className="m-auto text-xl">Singleplayer</p>
        </div>
        <div className="m-auto flex">
          <ArrowLeftRight className="w-[100px] h-[100px]" />
        </div>
        <div
          className="flex-1 flex text-center h-full w-full hover:animate-pulse hover:cursor-pointer"
          onClick={() => window.location.assign("/multiPlayer")}
        >
          <p className="m-auto text-xl">Multiplayer</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
