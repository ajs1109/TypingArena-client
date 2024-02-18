import React, { useState, useEffect, useRef } from "react";
import "./SP.css";
import { generate } from "random-words";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { jwtDecode } from "jwt-decode";
import { LogOut } from "lucide-react";
import toast from "react-hot-toast";

const noOfWords = 200;
const seconds = 60;
let paraLength = 0;

function SinglePlayer() {
  const [words, setWords] = useState([]);
  const [countDown, setCountDown] = useState(seconds);
  const [currInput, setCurrInput] = useState("");
  const [currCharIndex, setCurrCharIndex] = useState(-1);
  const [currChar, setCurrChar] = useState("");
  const [status, setStatus] = useState("waiting");
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [wordsPerMinute, setWordsPerMinute] = useState(0);
  const [paragraphInd, setParagraphInd] = useState(1);
  const [paragraph, setParagraph] = useState("");
  const [colors,setColors] = useState([''])
  const textInput = useRef(null);

  const token = localStorage.getItem("token");
  const name = jwtDecode(token)._name;

  function generateWords() {
    return generate({ exactly: noOfWords });
  }
  useEffect(() => {
    setWords(generateWords());
  }, []);

  useEffect(() => {
    setParagraphInd(1);
    setParagraph("");
    paraLength = 0;
    words.map((word) => {
      setParagraph((p) => p + " " + word);
      paraLength += word.length + 1;
    });
    setColors(Array(paraLength).fill(''));
  }, [words]);
  // console.log(paraLength)

  // console.log(colors)

  useEffect(() => {
    if (countDown !== seconds)
      setWordsPerMinute(
        Number(
          Math.round(
            ((60 / seconds) * (correct * seconds)) / (seconds - countDown)
          )
        )
      );
  }, [countDown, correct]);

  useEffect(() => {
    if (status === "started") {
      textInput.current.focus();
    }
  }, [status]);

  const start = () => {
    if (status === "finished") {
      setWords(generateWords());
      setCorrect(0);
      setIncorrect(0);
      setCurrChar("");
    }
    if (status !== "started") setStatus("started");

    let interval = setInterval(() => {
      setCountDown((prevCount) => {
        if (prevCount === 0) {
          setStatus("finished");
          clearInterval(interval);
          setCurrInput("");
          return seconds;
        } else {
          return prevCount;
        }
      });
    }, 1000);
  };

  const reset = () => {
    setCountDown(0);
    setStatus("waiting");
    setWords(generateWords());
    setCorrect(0);
    setIncorrect(0);
    setCurrCharIndex(-1);
    setCurrChar("");
  };

  function handleKeyDown({ keyCode, key }) {
    console.log("pressed key : ",keyCode, key);
    console.log('paragraph ind : ',paragraphInd);
    if (keyCode >= 65 && keyCode <= 90) {
      setCurrChar(key);
      setParagraphInd((id) => id + 1);
      console.log("paragraph key : ",paragraph[paragraphInd]);
      if (key === paragraph[paragraphInd]) {
        console.log("ok");
      }
    }
    if (keyCode === 32) {
      setCurrChar(" ");
      setParagraphInd((id) => id + 1);
    } else if (keyCode === 8) {
      if (paragraphInd > 0) {setParagraphInd((id) => id - 1);
      setCurrChar(paragraph[paragraphInd]);
      setColors((color) => { color[paragraphInd]=''; return color});
    }
      else setCurrChar(" ");
    } else {
      setCurrChar(null);
    }
  }

  function getCharClass(charInd, char) {
     if (!char) return "";
    // if (charInd === paragraphInd && char && status !== "finished") {
      if (char === currChar) return "success";
      else return "failure";
  
  }

  const logout = () => {
    localStorage.clear();
    window.location = "/";
  };

  const checkColor = (target) => {
    setCurrInput(target);
    console.log('hh : ', currInput.charAt(currInput.length - 1) )
    if(currInput.charAt(currInput.length - 1) === paragraph[paragraphInd - 1]) setColors((color) => { color[paragraphInd]='success'; return color});
    else setColors(color => {color[paragraphInd]='failure'; return color});
    // setColors((color) => {
    //   color = Array(paraLength).fill('')
    //   color[paragraphInd] = 'success'
    //   return color
    // });
  }
 

  return (
    <div className="  h-[100vh] w-[100vw] bg-[#222736] text-[#eef1f2] flex flex-col flex-nowrap">
      <div className="flex justify-between leading-7 sm:truncate sm:tracking-tight text-xl bg-[#2a3042] w-full p-4">
        <div className="font-semibold my-auto">TYPING TEST ARENA</div>
        <div className="flex">
          <div className="my-auto mx-2">Hi, {name}</div>
          <Button className="bg-transparant hover:bg-red-500" onClick={logout}>
            <LogOut />
          </Button>
        </div>
      </div>

      <div className="seconds text-2xl p-4 pb-0 text-center ">
        <p>{countDown}</p>
      </div>

      <div className="input-group p-4">
        <Input
          ref={textInput}
          disabled={status !== "started"}
          type="text"
          className=" bg-[#32394e] border-none outline-none"
          onKeyDown={handleKeyDown}
          value={currInput}
          onChange={(e) => checkColor(e.target.value)}
        />
      </div>

      <div className="startButton text-center d-grid gap-2 my-2 mx-auto">
        {status === "waiting" || status === "finished" ? (
          <Button type="button" className="bg-[#556ee6]" onClick={start}>
            Start
          </Button>
        ) : (
          <Button type="button" className="bg-[#556ee6]" onClick={reset}>
            Reset
          </Button>
        )}
      </div>
      {status === "started" && (
        <div className="words p-2 m-4 bg-[#2a3042] ">
          {paragraph.split("").map((char, i) => (
            <span key={i}>
              <span className={colors[i]}>{char}</span>
            </span>
          ))}
        </div>
      )}
      {status !== "waiting" && (
        <div className="flex justify-evenly w-full">
          <div className="col flex justify-around">
            <p className="fs-2 text-xl">
              Words Per Minute : {correct === 0 ? 0 : wordsPerMinute}
            </p>
            <p className="seconds fs-1"></p>
          </div>
          <div className="flex justify-around">
            <p className="text-xl">
              Accuracy :{" "}
              {correct === 0
                ? 0
                : Math.round((correct / (correct + incorrect)) * 100)}
              %
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SinglePlayer;
