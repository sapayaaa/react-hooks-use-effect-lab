import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (timeRemaining > 0) {
        setTimeRemaining((prevState) => prevState - 1);
      } else {
        setTimeRemaining(10);
        onAnswered(false); // Time's up, answer is incorrect
      }
    }, 1000);

    return () => {
      clearTimeout(timeoutId); // Clean up the timeout function
    };
  }, [timeRemaining]); // Only run the effect when timeRemaining changes

  function handleAnswer(isCorrect) {
    setTimeRemaining(10); // Reset timeRemaining for the next question
    onAnswered(isCorrect); // Pass the correct answer status
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
