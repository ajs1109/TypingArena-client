import React from "react";
import "./App.css";
import { ArrowLeftRight } from "lucide-react";
// import { io } from "socket.io-client";

const HomePage = () => {
  return (
    <div className="w-full text-[#eef1f3] bg-[#222736]">
      <div className="seconds text-2xl p-4 pb-0 text-center">
        <p>Select Game Mode</p>
      </div>
      <div className="options-container flex justify-around items-center my-40 h-full self-center w-full">
        <div
          className="flex-1 flex text-center h-full w-full hover:animate-pulse hover:cursor-pointer"
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
