import { useEffect, useRef, useState } from "react";
import "./styles.css";

function App() {
  const [text, setText] = useState("")
  const [timer, setTimer] = useState(5)
  const [isTimeRunning, setIsTimeRunning] = useState(false)
  const [wordCount, setWordCount] = useState(0)
  let inputRef = useRef(null)

  function onChangeText(event) {
    setText(event.target.value)
  }

  function calculateWordCount(text) {
    const words = text.trim().split(" ")
    const filteredWords = words.filter(word => word !== "")
    return filteredWords.length
  }

  function startGame() {
    setIsTimeRunning(true)
    setTimer(5)
    setText("")
    inputRef.current.disabled = false
    inputRef.current.focus()
  }

  function endGame() {
    setIsTimeRunning(false)
    setWordCount(calculateWordCount(text))
  }

  useEffect(() => {
    if(isTimeRunning && timer > 0){
      setTimeout(() => {
        setTimer(prevState => prevState - 1)
      }, 1000)
    } else if(timer === 0){
      endGame()
    }
  }, [timer, isTimeRunning])

  return (
    <div className="App">
      <h1>How fast can you type?</h1>
      <textarea ref={inputRef} disabled={!isTimeRunning} onChange={onChangeText} name="text" value={text}></textarea>
      <h4>time remaining: {timer}</h4>
      <button disabled={isTimeRunning} onClick={startGame}>START</button>
      <h1>Word count: {wordCount}</h1>
    </div>
  );
}

export default App;
