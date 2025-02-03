


const ShowTimer = ( props ) => {
    const { hours, minutes, seconds, isPaused, handlePaused, handleResume, handleReset } = props;
  return (
    <div className='show-container'>
    <div className='timer-box'>
      <div>{hours < 10 ? `0${hours}` : hours}</div>
      <span>:</span>
      <div>{minutes < 10 ? `0${minutes}` : minutes}</div>
      <span>:</span>
      <div>{seconds < 10 ? `0${seconds}` : seconds}</div>
    </div>

    <div className='action-box'>
      {
        !isPaused ? (
          <button className='timer-button' onClick={handlePaused}>Pause</button>
        ) : (
          <button className='timer-button' onClick={handleResume}>Resume</button>
        )
      }
      <button className='timer-button' onClick={handleReset}>Reset</button>
    </div>
  </div>
  )
}

export default ShowTimer;