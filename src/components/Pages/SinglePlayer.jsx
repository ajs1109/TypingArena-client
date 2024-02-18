import React, { useEffect, useState } from "react";
import { generate } from "random-words";
import { LogOut } from "lucide-react";

import "./SinglePlayer.scss";

const noOfWords = 200;
const Time = 60;

const SinglePlayer2 = () => {
  const [timer, setTimer] = useState(Time);
  const [words, setWords] = useState([]);
  const [index, setIndex] = useState(0);
  const [paragraph, setParagraph] = useState("");
  const [letterCSS, setLetterCSS] = useState([]);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [isCorrect, setIsCorrect] = useState(0);
  const [status, setStatus] = useState("waiting");
  const [accuracyArray, setAccuracyArray] = useState([]);

  const start = () => {
    setCorrect(0);
    setIncorrect(0);
    setIsCorrect(0);
    setIndex(0);
    setLetterCSS([]);
    setParagraph("");
    setParagraph((text) => {
      words.map((word) => {
        text = text + word + " ";
      });
      return text;
    });
  };

  useEffect(() => {
    const generateWords = () => {
      return generate({ exactly: noOfWords });
    };
    setWords(generateWords());
    console.log("words", words);
    setCorrect(0);
    setIncorrect(0);
    setIsCorrect(0);
    setIndex(0);
    setLetterCSS([]);
    setParagraph("");
    setParagraph((text) => {
      words.map((word) => {
        text = text + word + " ";
      });
      return text;
    });
    console.log("para: ", paragraph);
  }, []);

  useEffect(() => {
    console.log(status);

    if (status === "waiting") {
      setTimer(Time);
    }
    if (status === "finished") {
      setIsCorrect(0);
      setIndex(0);
      setLetterCSS([]);
      setParagraph("");
      setTimer(Time);
    }
  }, [status]);

  const logout = () => {
    localStorage.clear();
  };

  const inputText = (e) => {
    const arr = letterCSS;
    arr.pop();
    console.log(e, index, isCorrect);
    console.log(letterCSS);
    if (e === "Backspace") {
      if (paragraph[index - 1] === " ") {
        if (accuracyArray.at(-1) === "correct") {
          setCorrect((c) => c - 1);
        } else setIncorrect((c) => c - 1);
      }

      if (index >= 0 && letterCSS[index - 1] === "failure")
        setIsCorrect((c) => c - 1);
      setIndex((ind) => (ind > 1 ? ind - 1 : 0));

      if (index > 0) {
        arr.pop();
        arr.push("char-pointer");
      }
    } else if (e.length === 1) {
      setIndex((ind) => ind + 1);
      if (e === paragraph[index]) {
        arr.push("success");
      } else {
        setIsCorrect((c) => c + 1);
        arr.push("failure");
      }
      arr.push("char-pointer");
      if (paragraph[index] === " ") {
        if (isCorrect <= 0) {
          setCorrect((c) => c + 1);
          let arr = accuracyArray;
          arr.push("correct");
          setAccuracyArray(arr);
        } else {
          setIncorrect((c) => c + 1);
          let arr = accuracyArray;
          arr.push("incorrect");
          setAccuracyArray(arr);
        }
        setIsCorrect(0);
        console.log("accuracy:" + (correct * 100) / (correct + incorrect));
        console.log("wpm:", correct);
      }
      setLetterCSS(arr);
    }
  };

  const handleClick = () => {
    document.getElementById("words").focus();
    if (status !== "started") {
      setStatus("started");

      start();
      let interval = setInterval(() => {
        setTimer((currTime) => {
          if (currTime <= 0) {
            setStatus("finished");
            clearInterval(interval);
            return 0;
          }
          return currTime - 1;
        });
      }, 1000);
    }
  };

  return (
    <div
      className="font-mono text-justify h-[100vh] w-[100vw] bg-[#222736] text-[#eef1f2] flex flex-col flex-nowrap"
      onKeyDown={(e) =>
        e.key === "Enter" && status !== "started" ? handleClick() : null
      }
    >
      {/* Header */}
      <div className="flex justify-between leading-7 sm:truncate sm:tracking-tight text-xl bg-[#2a3042] w-full p-4">
        <div className="font-semibold my-auto">TYPING TEST ARENA</div>
        <div className="flex">
          <div className="my-auto mx-2">Hi, name</div>
          <button className="bg-transparant hover:bg-red-500" onClick={logout}>
            <LogOut />
          </button>
        </div>
      </div>

      <div className="mx-auto w-full mt-8 text-bold text-[30px] font-mono flex justify-around">
        <div
          className={`${
            status === "started" || status === "finished"
              ? "flex justify-center"
              : "invisible"
          } flex-1`}
        >
          WPM:{" "}
          {correct > 0 && timer !== 0
            ? ((correct * Time) / (Time - timer))
                .toLocaleString()
                .substring(0, 4)
            : 0}
        </div>
        <div className="flex-1 flex justify-center">{timer}</div>
        <div
          className={`${
            status === "started" || status === "finished"
              ? "flex justify-center"
              : "invisible"
          } flex-1`}
        >
          Accuracy:{" "}
          {correct > 0
            ? ((correct * 100) / (correct + incorrect))
                .toString()
                .substring(0, 4)
            : 0}{" "}
          %
        </div>
      </div>

      <button
        onClick={() => {
          window.location.reload();
        }}
      >
        Reset
      </button>

      <div
        id="game"
        tabIndex="0"
        onKeyDown={(e) => inputText(e.key)}
        onClick={handleClick}
        className={`outline-none w-[90%] h-full mt-16 text-xl mx-auto relative tracking-widest`}
      >
        <div id="words" className="z-10">
          {paragraph.split("").map((letter, ind) => (
            <span key={ind} className={`${letterCSS[ind]}`}>
              {letter}
            </span>
          ))}
        </div>
        <div id="focus-click" className="cursor-pointer">
          Click here to Play
        </div>
      </div>
    </div>
  );
};

export default SinglePlayer2;
