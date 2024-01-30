import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlay, FaPause } from "react-icons/fa";
import { BsChevronCompactDown, BsChevronCompactUp, BsChevronDoubleDown, BsChevronDoubleUp } from "react-icons/bs";
import { GrPowerReset } from "react-icons/gr";

import { useEffect, useRef, useState } from 'react'
import './App.css'

const App = () => {

  const [timer, setTimer] = useState({
    sessionTimer: 25,
    breakTimer: 5
  })

  const [timerActive, setTimerActive] = useState(false)

  const [timerDisplay, setTimerDisplay] = useState('Session');

  const [displayCount, setDisplayCount] = useState(1500);

  useEffect(() => {
    if (timerActive) {
      clearTimeout(round.current);
      if (timerDisplay === 'Break') {
        changeColor3();
        console.log("hello1");
        beep.current.play();
        console.log("hello2");
        setDisplayCount(timer.breakTimer * 60);
        start_stop({ action: 'start', secondsLeft: timer.breakTimer * 60 });
      }
      else {
        setDisplayCount(timer.sessionTimer * 60);
        start_stop({ action: 'start', secondsLeft: timer.sessionTimer * 60 });
      }
    }
  }, [timerDisplay])


  const cheveronButtonStyle = `btn btn-outline-secondary`

  const handleDecrementAndIncrement = ({ object, value }) => {
    if ((object === 'sessionTimer' && timerActive && timerDisplay === 'Session') || (object === 'breakTimer' && timerActive && timerDisplay === 'Break')) {
      return;
    }
    if (value > 0 && value <= 60) {
      setTimer((prevValue) => ({
        ...prevValue,
        [object]: value
      }))
      if (object === "sessionTimer" && timerDisplay !== "Break") {
        setTimerActive(false);
        setDisplayCount(value * 60);
        clearTimeout(round.current);
      }
    }
  }

  const changeColor1 = () => {
    document.getElementById("boxShadow").style.backgroundImage = `linear-gradient(to top right,#a83832,black,#a83832,black,#a83832)`;
  }

  const changeColor2 = () => {
    document.getElementById("boxShadow").style.backgroundImage = `linear-gradient(to top right,black,#a83832,black,#a83832,black)`;
  }

  const changeColor3 = () => {
    document.getElementById("boxShadow").style.backgroundImage = `linear-gradient(to bottom right, #747264 ,var(--clock-color),#747264,var(--clock-color),#747264)`;

  }

  const round = useRef();
  const beep = useRef();

  const start_stop = ({ action, secondsLeft }) => {
    console.log(secondsLeft + " " + timerDisplay);
    if (action === 'start') {
      setTimerActive(true);
      round.current = setTimeout(step, 1000);
      function step() {
        if (timerDisplay === 'Session' && secondsLeft < 60) {
          const val = secondsLeft % 2;
          if (val === 0) {
            changeColor1();
          } else {
            changeColor2();
          }
        }
        if (secondsLeft > 0) {
          setDisplayCount(prevCount => prevCount = prevCount - 1);
          secondsLeft = secondsLeft - 1;
          round.current = setTimeout(step, 1000);
        } else {
          if (timerDisplay === 'Session') {
            setTimerDisplay('Break');
          } else {
            setTimerDisplay('Session')
          }
        }
      }

    } else {
      setTimerActive(false);
      clearTimeout(round.current);
    }
  }

  const countForDisplay = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds - (minutes * 60);
    return (
      `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`
    )
  }

  const handleReset = () => {
    clearTimeout(round.current);
    changeColor3();
    setDisplayCount(1500);
    setTimerDisplay('Session');
    setTimerActive(false);
    setTimer(() => ({
      sessionTimer: 25,
      breakTimer: 5
    }))
  }

  return (
    <div className="user-select-none">
      <div className="p-3 p-sm-5" id='display'>
        <div>
          <h1 className="text-center b-2" id='timer-label'>{timerDisplay}</h1>
        </div>
        <div id='display2' className="mt-5">
          <div id='boxShadow'>
            <h1 className="">{countForDisplay(displayCount)}</h1>
          </div>
        </div>
      </div>
      <div className="pt-5 pt-sm-3 d-flex flex-sm-row justify-content-center gap-5" id='controls' >
        <div class='controlButton'>
          {!timerActive &&
            <button
              id='start_stop'
              className={`${'btn btn-outline-secondary'}`}
              onClick={() =>
                start_stop({ action: "start", secondsLeft: displayCount })
              }
            >
              <FaPlay />
            </button>
          }
          {timerActive &&
            <button
              id='start_stop'
              className={`${'btn btn-outline-dark'}`}
              onClick={() =>
                start_stop({ action: "stop", secondsLeft: displayCount })
              }
            >
              <FaPause />
            </button>
          }
        </div>
        <div class="controlButton">
          <button
            id='reset'
            className={`${'btn btn-outline-dark'}`}
            onClick={() => {
              handleReset();
            }
            }
          >
            <GrPowerReset />
          </button>
        </div>
        <audio id="beep" ref={beep} src="https://sampleswap.org/samples-ghost/SOUND%20EFFECTS%20and%20NOISES/Alarm%20Sounds/238[kb]ding_dong.wav.mp3"></audio>
      </div>
      <div id='timers' className="mt-5 d-sm-flex justify-content-center align-items-center gap-5">
        <div id='session-timer' className="d-flex flex-column align-items-center gap-2">
          <h1 id='session-label'>Session</h1>
          <div id='session-length'>{timer.sessionTimer}</div>
          <div className="btn-group">
            <button
              className={cheveronButtonStyle}
              id='session-decrement-5'
              onClick={() => handleDecrementAndIncrement({ object: 'sessionTimer', value: timer.sessionTimer - 5 })}
            >
              <BsChevronDoubleDown />
            </button>
            <button
              className={cheveronButtonStyle}
              id='session-decrement'
              onClick={() => handleDecrementAndIncrement({ object: 'sessionTimer', value: timer.sessionTimer - 1 })}
            >
              <BsChevronCompactDown />
            </button>
            <button
              className={cheveronButtonStyle}
              id='session-increment'
              onClick={() => handleDecrementAndIncrement({ object: 'sessionTimer', value: timer.sessionTimer + 1 })}
            >
              <BsChevronCompactUp />
            </button>
            <button
              className={cheveronButtonStyle}
              id='session-increment-5'
              onClick={() => handleDecrementAndIncrement({ object: 'sessionTimer', value: timer.sessionTimer + 5 })}
            >
              <BsChevronDoubleUp />
            </button>
          </div>
        </div>
        <div id='break-timer' className="mt-3 mt-sm-0 d-flex flex-column align-items-center gap-2">
          <h1 id='break-label'>Break</h1>
          <div id='break-length'>{timer.breakTimer}</div>
          <div className="btn-group">
            <button
              className={cheveronButtonStyle}
              id='break-decrement-5'
              onClick={() => handleDecrementAndIncrement({ object: 'breakTimer', value: timer.breakTimer - 5 })}
            >
              <BsChevronDoubleDown />
            </button>
            <button
              className={cheveronButtonStyle}
              id='break-decrement'
              onClick={() => handleDecrementAndIncrement({ object: 'breakTimer', value: timer.breakTimer - 1 })}
            >
              <BsChevronCompactDown />
            </button>
            <button
              className={cheveronButtonStyle}
              id='break-increment'
              onClick={() => handleDecrementAndIncrement({ object: 'breakTimer', value: timer.breakTimer + 1 })}
            >
              <BsChevronCompactUp />
            </button>
            <button
              className={cheveronButtonStyle}
              id='break-increment-5'
              onClick={() => handleDecrementAndIncrement({ object: 'breakTimer', value: timer.breakTimer + 5 })}
            >
              <BsChevronDoubleUp />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
