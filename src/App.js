import './App.css';
import React, { useEffect, useState, useRef } from "react";
import InputTimer from './components/inputTimer';
import ShowTimer from './components/showTimer';

function App() {
  // useState for timer state
  const [isStart, setIsStart] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  // useRef to keep track of the interval ID
  const timerRef = useRef(null);

  // Handle start button
  const handleStart = () => {
    // Check if any of the inputs are empty, zero, or invalid numbers
    if (
      isNaN(hours) || isNaN(minutes) || isNaN(seconds) ||
      hours < 0 || minutes < 0 || seconds < 0 ||
      (hours === 0 && minutes === 0 && seconds === 0)
    ) {
      alert('Please enter valid time');
      return;
    }
  
    // If the time values are valid, start the timer
    setIsStart(true);
    setIsPaused(false);  // Ensure that it's not paused when starting
  };
  

  // Handle reset button
  const handleReset = () => {
    setIsStart(false);
    setIsPaused(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  // Handle pause button
  const handlePaused = () => {
    setIsPaused(true);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  // Handle resume button
  const handleResume = () => {
    setIsPaused(false);
    runTimer();
  };

  // Handle input change for hours, minutes, and seconds
  const handleInput = (e) => {
    const value = parseInt(e.target.value);
    const id = e.target.id;
    if (id === 'hours') {
      setHours(value);
    } else if (id === 'minutes') {
      setMinutes(value);
    } else {
      setSeconds(value);
    }
  };

  // Timer function that runs every second
  const runTimer = () => {
    timerRef.current = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds > 0) {
          return prevSeconds - 1;
        } else if (minutes > 0) {
          setMinutes(prevMinutes => prevMinutes - 1);
          return 59;
        } else if (hours > 0) {
          setHours(prevHours => prevHours - 1);
          setMinutes(59);
          return 59;
        } else {
          clearInterval(timerRef.current);
          alert('Time is up! Please reset the timer.');
          // setIsStart(false);
          return 0;
        }
      });
    }, 1000);
  };

  // useEffect to start the timer when isStart is true
  useEffect(() => {
    if (isStart && !isPaused) {
      runTimer();
    }
    return () => {
      // Cleanup the interval on component unmount or when isStart changes
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isStart, isPaused]);

  return (
    <div className="App">
      <h1>Countdown Timer</h1>
      {
        !isStart && (
          <InputTimer
          handleInput = {handleInput}
          handleStart = {handleStart}/>
        )
      }

      {
        isStart && (
        <ShowTimer
          hours = {hours}
          minutes ={minutes}
          seconds = {seconds}
          isPaused = {isPaused}
          handlePaused = {handlePaused}
          handleResume = {handleResume}
          handleReset = {handleReset}
        />
          
        )
      }
    </div>
  );
}

export default App;
