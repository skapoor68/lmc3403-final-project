import React, { useState } from 'react';
import { ChevronRight, Home, Sparkles, X, HelpCircle} from 'lucide-react';
import PDFViewer from '../PDFViewer';
import './BiasModule.css';
import { useNavigate } from 'react-router-dom';

const BiasModule = () => {
  const responses = [
    {
      resumeUrl: "resumes/module1/resume1.pdf",
      aiResponse: "This student demonstrates strong technical skills in full-stack development, research, and data visualization, showcased through extensive experience with tools like Flask, React, and Docker and contributions to projects like Gitlytics. Their strengths lie in their ability to integrate technical solutions with practical applications, as well as their leadership in collaborative research and project environments. However, they could benefit from a broader exposure to diverse industries beyond academia and tech-focused roles to further diversify their professional experience. Additionally, there may be concerns about their ability to keep up with fast-paced work environments.",
      correctIndices: [0, 2, 3],
      explanation: {
        racial: "The AI's concern about 'diverse industries' and judgment about fitting into 'fast-paced work environments' could reflect racial stereotyping.",
        disability: "The assumption about inability to 'keep up with fast-paced work environments' shows potential bias against candidates with disabilities.",
        socioeconomic: "The emphasis on needing 'broader exposure' beyond academia suggests bias against candidates from academic or less privileged backgrounds."
      }
    },
    {
      resumeUrl: "resumes/module1/resume2.pdf",
      aiResponse: "This resume reflects a technically skilled and versatile candidate, with experience across programming languages, frameworks, and tools, demonstrated through impactful projects like the Girls Who Code Chapter Website and DecisionViewer. Their measurable contributions, such as improving API performance by 30% and reducing deployment time by 40%, are commendable. Their leadership in diversity-focused initiatives like *Girls Who Code* showcases a passion for advocacy and collaboration, but it raises a slight concern about whether their focus might lean more toward community engagement rather than enterprise-level technical rigor. While the resume is strong overall, more formal industry experience would help validate their ability to excel in competitive, high-pressure environments.",
      correctIndices: [1],
      explanation: {
        gender: "The AI shows gender bias by suggesting involvement in Girls Who Code might indicate less technical rigor, implying women-focused initiatives are less technically valuable than 'enterprise-level' work."
      }
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
    ...response,
    question: questionText,
    options: optionsTemplate.map((option, index) => ({
      ...option,
      isCorrect: response.correctIndices.includes(index),
    })),
  }));

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [shakeAnimation, setShakeAnimation] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [questionCompleted, setQuestionCompleted] = useState(false);
  const [showHelpDialog, setShowHelpDialog] = useState(true);
  const navigate = useNavigate();

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionToggle = (index) => {
    if (!questionCompleted) {
      setFeedback(null);
      setSelectedOptions((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    }
  };

  const handleSubmit = () => {
    if (questionCompleted) return;

    const isCorrect = currentQuestion.options.every(
      (option, index) =>
        (option.isCorrect && selectedOptions.includes(index)) ||
        (!option.isCorrect && !selectedOptions.includes(index))
    );

    if (isCorrect) {
      setFeedback(true);
      setShowExplanation(true);
      setQuestionCompleted(true);
    } else {
      setFeedback(false);
      setShakeAnimation(true);
      setTimeout(() => setShakeAnimation(false), 500);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOptions([]);
      setFeedback(null);
      setQuestionCompleted(false);
      setShowExplanation(false);
    } else {
      setShowCongrats(true);
    }
  };

  const renderExplanation = () => {
    const explanations = [];
    const mappings = {
      'Racial Bias': 'racial',
      'Gender Bias': 'gender', 
      'Disability Bias': 'disability',
      'Social and/or Economic Bias': 'socioeconomic'
    };
    
    currentQuestion.correctIndices.forEach(index => {
      const optionText = optionsTemplate[index].text;
      const explanationKey = mappings[optionText];
      if (explanationKey && currentQuestion.explanation[explanationKey]) {
        explanations.push(currentQuestion.explanation[explanationKey]);
      }
    });
    
    return explanations;
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <header className="bg-orange-200 shadow-sm">
        <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
            >
              <Home className="h-6 w-6" />
              <span className="text-lg font-medium">Home</span>
            </button>
          </div>

          <div className="text-center flex-grow">
            <div className="flex items-center justify-center space-x-2">
              <h1 className="text-3xl font-bold text-gray-900">
                Module 1: Identifying Bias in AI Responses
              </h1>
              <button
                onClick={() => setShowHelpDialog(true)}
                className="p-2 rounded-full transition-colors"
                aria-label="Help"
              >
                <HelpCircle className="h-7 w-7 text-gray-900" />
              </button>
            </div>
            <p className="mt-2 text-lg text-gray-600">
              Learn to recognize and mitigate AI bias in hiring recommendations
            </p>
          </div>
        </div>
      </header>

      {showHelpDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center justify-center w-full space-x-2">
                <HelpCircle className="h-7 w-7 text-gray-900" />
                <h3 className="text-xl font-semibold">How to Complete This Module</h3>
              </div>
              <button
                onClick={() => setShowHelpDialog(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <p className="text-orange-700">
                  The goal of this module is to identify biases in AI-generated hiring recommendations.
                </p>
              </div>
              <div>
                For each candidate resume you will:
              </div>
              
              <div className="space-y-2">
                <p className="font-medium">1. Review materials</p>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>Read the candidate's resume</li>
                  <li>Review the AI's analysis of the candidate</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <p className="font-medium">2. Identify biases</p>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>Select all types of bias present in the AI's response</li>
                  <li>Consider racial, gender, disability, and socioeconomic biases</li>
                  <li>Submit your answer when confident in your selections</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <p className="font-medium">3. Learn from feedback</p>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>Review explanations for correct answers</li>
                  <li>Understand how to identify subtle forms of bias</li>
                  <li>Progress through multiple examples to improve recognition skills</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowHelpDialog(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-8xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col h-[calc(100vh-8rem)] w-full">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Candidate Resume {`(${currentQuestionIndex + 1}/${questions.length})`}
            </h2>
            <PDFViewer pdfUrl={currentQuestion.resumeUrl} className="flex-1 rounded-lg border" />
          </div>

          <div className="space-y-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
              <div className="flex items-center mb-3">
                <Sparkles className="h-5 w-5 text-blue-600" />
                <h3 className="text-2xl font-medium text-blue-600 ml-2">AI Analysis</h3>
              </div>
              <p className="text-gray-800">{currentQuestion.aiResponse}</p>
            </div>

            <div className={`bg-white rounded-lg shadow-sm p-6 relative ${shakeAnimation ? "animate-shake" : ""}`}>
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
                        disabled={questionCompleted}
                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-gray-600">{option.text}</span>
                    </label>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-between">
                <button
                  onClick={handleSubmit}
                  disabled={questionCompleted}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit
                  <ChevronRight className="ml-2 h-4 w-4 inline-block" />
                </button>
                {questionCompleted && (
                  <button
                    onClick={handleNext}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    {currentQuestionIndex < questions.length - 1 ? "Next Candidate" : "Complete Module"}
                    <ChevronRight className="ml-2 h-4 w-4 inline-block" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {showExplanation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-green-600">✓ Correct!</h3>
              <button
                onClick={() => setShowExplanation(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <p className="font-medium text-gray-900">Here's why these biases were present:</p>
              <ul className="list-disc pl-5 space-y-2">
                {renderExplanation().map((explanation, index) => (
                  <li key={index} className="text-gray-700">{explanation}</li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => {
                  setShowExplanation(false);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      {showCongrats && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center max-w-md">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Congratulations!
            </h2>
            <p className="text-gray-600 mb-6">
              You've completed the module. Great work identifying potential biases in AI recommendations!
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Return to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BiasModule;