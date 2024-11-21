import React, { useState } from 'react';
import { ChevronRight, Home, Info } from 'lucide-react';
import PDFViewer from '../PDFViewer';
import './BiasModule.css';

const BiasModule = () => {
  const responses = [
    {
      resumeUrl: "resumes/module1/resume1.pdf",
      aiResponse: "This student demonstrates strong technical skills in full-stack development, research, and data visualization, showcased through extensive experience with tools like Flask, React, and Docker and contributions to projects like Gitlytics. Their strengths lie in their ability to integrate technical solutions with practical applications, as well as their leadership in collaborative research and project environments. However, they could benefit from a broader exposure to diverse industries beyond academia and tech-focused roles to further diversify their professional experience. Additionally, there may be concerns about their ability to keep up with fast-paced work environments.",
      correctIndices: [0, 2, 3],
    },
    {
      resumeUrl: "resumes/module1/resume2.pdf",
      aiResponse: "This resume reflects a technically skilled and versatile candidate, with experience across programming languages, frameworks, and tools, demonstrated through impactful projects like the Girls Who Code Chapter Website and DecisionViewer. Their measurable contributions, such as improving API performance by 30% and reducing deployment time by 40%, are commendable. Their leadership in diversity-focused initiatives like *Girls Who Code* showcases a passion for advocacy and collaboration, but it raises a slight concern about whether their focus might lean more toward community engagement rather than enterprise-level technical rigor. While the resume is strong overall, more formal industry experience would help validate their ability to excel in competitive, high-pressure environments.",
      correctIndices: [1],
    },
  ];

  const questionText = "Identify which of the following biases may have appeared in a discriminatory manner in the AI response. Select all that apply.";
  const optionsTemplate = [
    { text: "Racial Bias", isCorrect: false },
    { text: "Gender Bias", isCorrect: false },
    { text: "Disability Bias", isCorrect: false },
    { text: "Social and/or Economic Bias", isCorrect: false },
  ];

  const questions = responses.map((response) => ({
    resumeUrl: response.resumeUrl,
    aiResponse: response.aiResponse,
    question: questionText,
    options: optionsTemplate.map((option, index) => ({
      ...option,
      isCorrect: response.correctIndices.includes(index),
    })),
  }));

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [feedback, setFeedback] = useState(null); // Null: no feedback, true: correct, false: incorrect
  const [shakeAnimation, setShakeAnimation] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // For correct answer pop-up
  const [showCongrats, setShowCongrats] = useState(false); // For congratulations screen

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionToggle = (index) => {
    setFeedback(null); // Clear feedback on new selection
    setSelectedOptions((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleSubmit = () => {
    const isCorrect = currentQuestion.options.every(
      (option, index) =>
        (option.isCorrect && selectedOptions.includes(index)) ||
        (!option.isCorrect && !selectedOptions.includes(index))
    );

    if (isCorrect) {
      setFeedback(true); // Show correct feedback
      setShowPopup(true); // Show correct answer pop-up
      setTimeout(() => setShowPopup(false), 2000); // Hide pop-up after 2 seconds

      setTimeout(() => {
        setSelectedOptions([]);
        setFeedback(null);
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
          setShowCongrats(true); // Show congratulations screen
        }
      }, 1500);
    } else {
      setFeedback(false); // Trigger shake animation for incorrect answers
      setShakeAnimation(true);
      setTimeout(() => setShakeAnimation(false), 500); // Reset animation
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Header */}
      <header className="bg-blue-100 shadow-sm">
        <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Home Button */}
          <button
            onClick={() => (window.location.href = "/")} // Replace with appropriate route if using a router
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
          >
            <Home className="h-6 w-6" />
            <span className="text-lg font-medium">Home</span>
          </button>

          {/* Title */}
          <div className="text-center flex-grow">
            <h1 className="text-3xl font-bold text-gray-900">
              Module 1: Identifying Bias in AI Responses
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Learn to recognize and mitigate AI bias in hiring recommendations.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-8xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* PDF Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col h-[calc(100vh-8rem)] w-full">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Candidate Resume
            </h2>
            <PDFViewer pdfUrl={currentQuestion.resumeUrl} className="flex-1 rounded-lg border" />
          </div>

          {/* Text and Quiz Section */}
          <div className="space-y-8">
            {/* AI Response Section */}
            <div className="bg-blue-50 rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-3">
                <Info className="h-5 w-5 text-blue-500" />
                <h3 className="text-2xl font-medium ml-2">AI Analysis</h3>
              </div>
              <p className="text-gray-600">{currentQuestion.aiResponse}</p>
            </div>

            {/* Quiz */}
            <div
              className={`bg-white rounded-lg shadow-sm p-6 relative ${
                shakeAnimation ? "animate-shake" : ""
              }`}
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Identifying Biases
              </h2>
              <p className="text-gray-900 font-medium mb-4">
                {currentQuestion.question}
              </p>
              <div className="space-y-2">
                {currentQuestion.options.map((option, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border ${
                      feedback !== null
                        ? option.isCorrect
                          ? "border-green-500 bg-green-50"
                          : selectedOptions.includes(index)
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300"
                        : selectedOptions.includes(index)
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300"
                    }`}
                  >
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={selectedOptions.includes(index)}
                        onChange={() => handleOptionToggle(index)}
                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-gray-600">{option.text}</span>
                    </label>
                  </div>
                ))}
              </div>
              <button
                onClick={handleSubmit}
                className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Submit
                <ChevronRight className="ml-2 h-4 w-4 inline-block" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Correct Answer Pop-Up */}
      {showPopup && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transition-opacity">
          ✅ Correct!
        </div>
      )}

      {/* Congratulations Screen */}
      {showCongrats && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center max-w-md">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              🎉 Congratulations!
            </h2>
            <p className="text-gray-600 mb-6">
              You’ve completed the module. Great work!
            </p>
            <button
              onClick={() => (window.location.href = "/")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Go to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BiasModule;
