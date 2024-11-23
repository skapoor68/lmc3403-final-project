import React, { useState, useEffect } from 'react';

const Quiz = ({ question, choices, correctAnswer, onComplete }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [shakeAnimation, setShakeAnimation] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Reset state when question changes
  useEffect(() => {
    setSelectedAnswer(null);
    setFeedback(null);
    setShakeAnimation(false);
    setIsCorrect(false);
  }, [question]);

  const handleAnswerSelect = (choice) => {
    if (isCorrect) return; // Prevent changes if already correct
    setSelectedAnswer(choice);
    setFeedback(null); // Clear feedback when selecting new answer
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) {
      return;
    }

    if (selectedAnswer === correctAnswer) {
      setIsCorrect(true);
      setFeedback('correct');
      if (onComplete) {
        onComplete(true);
      }
    } else {
      setFeedback('incorrect');
      setShakeAnimation(true);
      setTimeout(() => setShakeAnimation(false), 500);
      if (onComplete) {
        onComplete(false);
      }
    }
  };

  return (
    <div className={`p-6 ${shakeAnimation ? 'animate-shake' : ''}`}>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        {question}
      </h2>
      <div className="space-y-2">
        {choices.map((choice, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg border ${
              feedback
                ? choice === correctAnswer
                  ? 'border-green-500 bg-green-50'
                  : selectedAnswer === choice
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-300'
                : selectedAnswer === choice
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300'
            }`}
          >
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                checked={selectedAnswer === choice}
                onChange={() => handleAnswerSelect(choice)}
                disabled={isCorrect} // Only disable if answer is correct
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className={`text-gray-600 ${
                feedback && choice === correctAnswer ? 'font-medium' : ''
              }`}>
                {choice}
              </span>
            </label>
          </div>
        ))}
      </div>
      <div className="mt-6">
        {(!feedback || (feedback === 'incorrect' && !isCorrect)) && (
          <button
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        )}
        {feedback && (
          <div className="flex items-center">
            {feedback === 'correct' ? (
              <h3 className="text-xl font-semibold text-green-600">
                ✓ Correct!
              </h3>
            ) : (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-red-600">
                </h3>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;