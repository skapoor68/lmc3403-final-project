import React, { useState, useEffect } from 'react';

const Quiz = ({ question, choices, correctAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);

  // Reset state when question changes
  useEffect(() => {
    setSelectedAnswer(null);
    setFeedback(null);
  }, [question]);

  const handleAnswerSelect = (choice) => {
    setSelectedAnswer(choice);
    setFeedback(null); // Clear feedback when a new choice is selected
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) {
      setFeedback("Please select an answer.");
      return;
    }
    if (selectedAnswer === correctAnswer) {
      setFeedback("Correct! 🎉");
    } else {
      setFeedback(`Incorrect. The correct answer is: ${correctAnswer}`);
    }
  };

  return (
    <div className="quiz-container p-4 border rounded shadow-md bg-white">
      <h2 className="text-lg font-bold mb-4">{question}</h2>
      <ul className="space-y-2">
        {choices.map((choice, index) => (
          <li key={index}>
            <label className={`flex items-center space-x-2 p-2 rounded ${
              feedback && choice === correctAnswer ? 'bg-green-100' :
              feedback && choice === selectedAnswer && choice !== correctAnswer ? 'bg-red-100' :
              selectedAnswer === choice ? 'bg-blue-100' : ''
            }`}>
              <input
                type="radio"
                name="quiz-choice"
                value={choice}
                checked={selectedAnswer === choice}
                onChange={() => handleAnswerSelect(choice)}
                className="form-radio"
                disabled={feedback !== null}
              />
              <span>{choice}</span>
            </label>
          </li>
        ))}
      </ul>
      {!feedback && (
        <button
          onClick={handleSubmit}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={selectedAnswer === null}
        >
          Submit
        </button>
      )}
      {feedback && (
        <p
          className={`mt-4 text-lg font-medium ${
            feedback.includes("Correct") ? "text-green-500" : "text-red-500"
          }`}
        >
          {feedback}
        </p>
      )}
    </div>
  );
    
};

export default Quiz;