import React from 'react';
import { Check, X, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ResultsReview = ({ userDecisions }) => {
  const navigate = useNavigate();

  const correctDecisions = {
    1: {
      action: 'shortlist',
      explanation: "This candidate demonstrates strong fundamental programming skills through their project work. While they lack prior internship experience, their technical projects show practical experience with required technologies (Java, Python, distributed systems, databases). Their EMT background suggests ability to handle pressure and communicate effectively."
    },
    2: {
      action: 'pass',
      explanation: "While the candidate has strong academic credentials, their background in linguistics and logistics doesn't align with the core requirements. They lack substantial software development experience and foundational knowledge in key areas like object-oriented programming and distributed systems."
    },
    3: {
      action: 'shortlist',
      explanation: "Exceptional candidate with strong academic performance, relevant coursework, and practical experience through internship and projects. Their technical skills directly align with requirements, and they demonstrate experience with both distributed systems and databases. Research experience shows ability to tackle complex problems."
    },
    4: {
      action: 'shortlist',
      explanation: "The AI showed concerning bias in its recommendation. The candidate has strong technical qualifications with relevant experience at Accenture, impressive projects like NetShell, and comprehensive full-stack development skills. Their international background could bring valuable diverse perspectives to the team. Educational background and location should not be factors in evaluation."
    },
    5: {
      action: 'pass',
      explanation: "While the candidate has technical education, their career focus has been primarily in product management. The role requires strong hands-on coding experience and recent technical project work, which is not demonstrated in their background. They would be better suited for product management positions."
    }
  };

  const getDecisionStatus = (candidateId) => {
    const userDecision = userDecisions.find(d => d.candidateId === candidateId);
    const correctAction = correctDecisions[candidateId].action;
    
    if (!userDecision) return 'pending';
    return userDecision.action === correctAction ? 'correct' : 'incorrect';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'correct':
        return (
          <div className="flex items-center">
            <Check className="h-6 w-6 text-green-500" />
            <span className="ml-2">Correct</span>
          </div>
        );
      case 'incorrect':
        return (
          <div className="flex items-center">
            <X className="h-6 w-6 text-red-500" />
            <span className="ml-2">Incorrect</span>
          </div>
        );
      case 'pending':
        return (
          <div className="flex items-center">
            <AlertTriangle className="h-6 w-6 text-yellow-500" />
            <span className="ml-2">Pending</span>
          </div>
        );
      default:
        return null;
    }
  };

  const getScoreStats = () => {
    let correct = 0;
    let total = Object.keys(correctDecisions).length;
    
    Object.keys(correctDecisions).forEach(candidateId => {
      if (getDecisionStatus(parseInt(candidateId)) === 'correct') {
        correct++;
      }
    });

    return { correct, total };
  };

  const { correct, total } = getScoreStats();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Review Results
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Review your decisions and learn from the feedback
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Performance:</h2>
          <div className="text-center">
            <p className="text-4xl font-bold text-gray-900">{correct}/{total}</p>
            <p className="text-lg text-gray-600 mt-2">Correct Decisions</p>
          </div>
        </div>

        {/* Individual Reviews */}
        <div className="space-y-6">
          {Object.entries(correctDecisions).map(([candidateId, decision]) => {
            const userDecision = userDecisions.find(d => d.candidateId === parseInt(candidateId));
            const status = getDecisionStatus(parseInt(candidateId));
            
            const bgColor = {
              correct: 'bg-green-50',
              incorrect: 'bg-red-50',
              pending: 'bg-yellow-50'
            }[status];

            return (
              <div key={candidateId} className={`bg-white rounded-lg shadow-sm overflow-hidden ${bgColor}`}>
                <div className="border-b border-gray-200 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-900">Candidate {candidateId}</h3>
                    {getStatusIcon(status)}
                  </div>
                </div>
                
                <div className="px-6 py-4">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <p className="font-semibold">Correct Decision:</p>
                      <span className="px-3 py-1 bg-white rounded-full text-sm font-medium border border-gray-200">
                        {decision.action === 'shortlist' ? 'Shortlist' : 'Pass'}
                      </span>
                    </div>

                    {userDecision && (
                      <div className="flex items-center space-x-2">
                        <p className="font-semibold">Your Decision:</p>
                        <span className="px-3 py-1 bg-white rounded-full text-sm font-medium border border-gray-200">
                          {userDecision.action === 'shortlist' ? 'Shortlist' : 'Pass'}
                        </span>
                      </div>
                    )}

                    <div className="mt-4">
                      <p className="font-semibold mb-2">Explanation:</p>
                      <p className="text-gray-800">{decision.explanation}</p>
                    </div>

                    {userDecision && (
                      <div className="mt-4">
                        <p className="font-semibold mb-2">Your Justification:</p>
                        <p className="text-gray-800">{userDecision.justification}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Return to Home
          </button>
        </div>

      </main>
    </div>
  );
};

export default ResultsReview;