import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, HelpCircle, X, Home, ExternalLink } from 'lucide-react';
import ResultsReview from './ResultsReview';
import Quiz from './Quiz';
import { useNavigate } from 'react-router-dom';

const PrivacyEthicsTraining = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showHelpDialog, setShowHelpDialog] = useState(true);
  const [completedQuestions, setCompletedQuestions] = useState(new Set());
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  const [allQuestionsComplete, setAllQuestionsComplete] = useState(false);

  // Convert jobDescriptions to an array with numeric IDs
  const jobDescriptions = [
    {
      id: 0,
      title: "Non-Discrimination",
      description: `

## Overview
AI tools used in recruiting should be designed and deployed in a way that avoids harmful discrimination. This includes adhering to anti-discrimination laws and ensuring that AI systems are fair, unbiased, and equitable.

## Key Points for Technical Recruiters

### Compliance with Anti-Discrimination Laws
Make sure that any AI tools you use in recruiting align with current laws, such as civil rights regulations. This includes testing AI systems for bias in relation to factors like race, gender, age, disability, and more.

Title VII of the Civil Rights Act of 1964 prohibits employer discrimination on the basis of  race, color, religion, national origin, or sex. The American with Disabilities Act (ADA) prohibits employer discrimination against qualified individuals with a disability. The Age Discrimination in Employment Act of 1967 prohbits employer discrimination due to age. The Equal Pay Act of 1963 prohibits employer discrimination due to sex through wages.

### Internal Testing for Bias
It's crucial to assess AI tools for any potential unintended bias before they are deployed. For instance, ensure that the tool has been tested for fairness and compliance with legal standards. As a recruiter, you need to understand how these tests have been conducted and whether the tool's implementation might unintentionally discriminate.

### Responsible Use
Before using AI tools that impact hiring decisions, ensure they are developed and used responsibly. Be cautious of tools that analyze sensitive data, such as a candidate's emotional state or biometric information. Always verify the purpose and fairness of these tools before using them in your recruitment processes.

### Future Compliance
Stay informed about future laws and regulations regarding AI in recruitment. Create frameworks that ensure your recruitment practices remain compliant as new laws are introduced.
      `
    },
    {
      id: 1,
      title: "Transparency",
      description: `

## Overview
Transparency in AI is crucial to ensuring that individuals understand when and how AI tools impact them. Developers and deployers of AI tools must disclose relevant information about the tool's functioning, its limitations, and any alternatives or accommodations available to those interacting with the tool.

## Key Concepts

### Purpose and Impact
As a technical recruiter, it's important to understand that transparency applies not only to the functionality of AI tools but also to the data used, the decision-making process, and the potential impact on individuals. You should be transparent to both you employers and those you seek to employ on your use of AI.

### Communication
Ensuring clear communication about how AI tools are used, their intended purpose, and the possible risks helps build a more ethical and accountable AI ecosystem.

## Best Practices

### Comprehensive Disclosure
- Disclose any risks or potential biases and give applicants or employers the option to seek alternatives or accommodations
- Ensure transparency disclosures are understandable, accessible, and non-technical
- Regularly update disclosures to reflect changes in AI tool usage, capabilities, or regulations
      `
    },
    {
      id: 2,
      title: "Human Oversight",
      description: `

## Overview
AI tools that significantly impact individuals should be designed and implemented with clear human oversight to ensure transparency, accountability, and explainability. These tools should support human decision-making, particularly in processes with critical outcomes, such as hiring and employment decisions, rather than replacing human judgment.

## Best Practices

### Human Involvement in Deployment
As recruiters deploying AI tools, you should ensure that human oversight is maintained throughout the process. This is critical for preventing unfair or biased outcomes. Humans must remain accountable for decisions made with AI tools, ensuring compliance with ethical standards and legal requirements.

### Effective Human Oversight
The level and type of human oversight required will depend on factors like the specific use case of the AI tool, the impact on individuals, and the stage of deployment. Oversight mechanisms should be flexible and scalable to suit different roles and scenarios.

### Clarifying Roles and Responsibilities
Developers of these AI tools and recruiters have distinct but complementary roles:
- Developers create tools that allow for meaningful human intervention in decision-making
- Recruiters must implement these tools in alignment with ethical standards
- Human oversight must be present when making critical decisions about candidates
      `
    },
  ];
  

  // Use jobDescriptions[currentIndex] to get the current job description
  const currentJobDescription = jobDescriptions[currentIndex] || jobDescriptions[0];

  const candidates = [
    {
      id: 1,
          question: "When implementing AI hiring tools, which laws require employers to prevent discrimination based on sex?",
          choices: [
            "A) Title VII of the Civil Rights Act of 1964.",
            "B) Equal Pay Act of 1963.",
            "C) Age Discrimination in Employment Act of 1967",
            "D) A and B"
          ],
          correctAnswer: "D) A and B" 
    },
    {
      id: 2,
        question: "Which of the following is a best practice for ensuring transparency in AI tools?",
        choices: [
            "A) Disclosing only the tool’s functionality, without discussing risks or limitations.",
            "B) Providing clear disclosures about the tool’s training, purpose, and potential biases.",
            "C) Withholding information about potential risks to avoid scaring users.",
            "D) Avoiding updates to disclosures to prevent confusion."
        ],
        correctAnswer: "B) Providing clear disclosures about the tool’s training, purpose, and potential biases."
    },
    {
      id: 3,
        question: "Why is human oversight critical in the use of AI tools in recruitment?",
        choices: [
            "A) To ensure that AI can make all decisions without human intervention.",
            "B) To maintain fairness, accountability, and prevent biased or unfair outcomes.",
            "C) To eliminate the need for transparency in AI decisions.",
            "D) To speed up the decision-making process without regard to ethical considerations."
        ],
        correctAnswer: "B) To maintain fairness, accountability, and prevent biased or unfair outcomes."
    },
  ];
    
    // Function to render markdown-style text with proper styling
    const renderDescription = (text) => {
      return (
        <div className="prose max-w-none">
          {text.split('\n').map((line, index) => {
            if (line.startsWith('# ')) {
              return <h1 key={index} className="text-2xl font-bold mt-6 mb-4 text-gray-900">{line.replace('# ', '')}</h1>;
            } else if (line.startsWith('## ')) {
              return <h2 key={index} className="text-xl font-semibold mt-4 mb-2 text-gray-800">{line.replace('## ', '')}</h2>;
            } else if (line.startsWith('### ')) {
              return <h3 key={index} className="text-lg font-medium mt-3 mb-2 text-gray-700">{line.replace('### ', '')}</h3>;
            } else if (line.startsWith('- ')) {
              return <li key={index} className="ml-4 text-gray-600">{line.replace('- ', '')}</li>;
            } else if (line.trim() !== '') {
              return <p key={index} className="mb-2 text-gray-600">{line}</p>;
            }
            return null;
          })}
        </div>
      );
    };
  
    const handlePrevious = () => {
      setCurrentIndex(prev => Math.max(0, prev - 1));
    };
  
    const handleNext = () => {
      setCurrentIndex(prev => Math.min(jobDescriptions.length - 1, prev + 1));
    };

    const handleQuizComplete = (isCorrect) => {
      if (isCorrect) {
        const newCompleted = new Set(completedQuestions);
        newCompleted.add(currentIndex);
        setCompletedQuestions(newCompleted);
    
        if (newCompleted.size === jobDescriptions.length) {
          setAllQuestionsComplete(true);
        }
      }
    };
    
    const handleCompleteModule = () => {
      setShowCompletionDialog(true);
    };
  
    if (isComplete) {
      return <ResultsReview userDecisions={[]} />;
    }
  
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-purple-200 shadow-sm">
          <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
              >
                <Home className="h-6 w-6" />
                <span className="text-lg font-medium">Home</span>
              </button>
            </div>
  
            <div className="text-center flex-grow">
              <div className="flex items-center justify-center space-x-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  Module 3: Privacy and Ethics
                </h1>
                <button
                  onClick={() => setShowHelpDialog(true)}
                  className="p-2 hover:bg-purple-200 rounded-full transition-colors"
                  aria-label="Help"
                >
                  <HelpCircle className="h-7 w-7 text-gray-900" />
                </button>
              </div>
              <p className="mt-2 text-lg text-gray-600">
                Learn about privacy and ethics in using AI tools
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
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-purple-800">
                  The goal of this module is to educate you on the best practices regarding the safe and ethical use of AI in the resume screening process. You will review  material on non-discrimination, transparency, and human oversight in AI hiring and answer quiz questions to assess your understanding. 
                </p>
              </div>
              <div>
              For each topic you will:
              </div>
              
              <div className="space-y-2">
                <p className="font-medium">1. Review information</p>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>Read the topic's information on the left</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <p className="font-medium">2. Answer the quiz question</p>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>Answer the multiple-choice question on the right</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <p className="font-medium">3. Review your results</p>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>After answering a question, receive feedback on the correct answer</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-purple-900 mb-2">
                About This Module's Content
              </h4>
              <div className="prose text-purple-800 text-m">
                <p className="mb-2">
                  The material in this module is sourced from the Future of Privacy Forum's {' '}
                  <a 
                    href="https://fpf.org/wp-content/uploads/2024/02/FPF-Best-Practices-for-AI-and-WA-Tech-FINAL-with-date.pdf" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:text-purple-900 hover:underline inline-flex items-center"
                  >
                    Best Practices for AI and Workplace Assessment Technologies
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                  {' '}report. The FPF is a non-profit think tank that has partnered with employment companies such as LinkedIn and Workday to develop guidelines for ethical AI use in hiring. This module's material has been adapted and paraphrased from their report, with a focus for technical recruiters.
                </p>
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

        {showCompletionDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center max-w-md">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Congratulations!
            </h2>
            <p className="text-gray-600 mb-6">
              You've completed the Privacy and Ethics module. Great work understanding the key principles of ethical AI use in hiring!
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

      {/* Main Content */}
      <main className="max-w-8xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Privacy and Ethics */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-2xl font-bold text-gray-900">{currentJobDescription.title}</h2>
            </div>
            <div className="px-6 py-4">
              <div className="mb-4">
              {renderDescription(currentJobDescription.description)}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="border-b border-gray-200 px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-900">Quiz {`(${currentIndex + 1}/3)`}</h2>
              </div>
                <Quiz 
                  question={candidates[currentIndex].question} 
                  choices={candidates[currentIndex].choices} 
                  correctAnswer = {candidates[currentIndex].correctAnswer}
                  onComplete={handleQuizComplete}
                />
            </div>      

            {/* Navigation Controls */}
            <div className="flex items-center justify-between">
              <div className="flex space-x-4">
                <button
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentIndex === jobDescriptions.length - 1}
                  className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </button>
              </div>
              <div className="flex space-x-4">
              {allQuestionsComplete ? (
                <button
                  onClick={handleCompleteModule}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Complete Module
                  <ChevronRight className="ml-2 h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={() => navigate('/')}
                  className="flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Return to Home
                </button>
              )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyEthicsTraining;
