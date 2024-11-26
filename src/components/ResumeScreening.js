import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ThumbsUp, ThumbsDown, Sparkles, X, HelpCircle, Home } from 'lucide-react';
import PDFViewer from './PDFViewer';
import ResultsReview from './ResultsReview';
import { useNavigate } from 'react-router-dom';

const ResumeScreening = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shortlistedCandidates, setShortlistedCandidates] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [justification, setJustification] = useState('');
  const [pendingAction, setPendingAction] = useState(null);
  const [decisions, setDecisions] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [showHelpDialog, setShowHelpDialog] = useState(true);

  const jobDescription = {
    title: "Software Development Engineer Intern",
    team: "AWS Lambda",
    location: "Seattle, WA",
    description: `At Amazon, we hire the best minds in technology to innovate and build on behalf of our customers. The intense focus we have on our customers is why we are one of the world's most beloved brands - customer obsession is part of our company DNA.\n
    Our interns write real software and collaborate with experienced software development engineers (SDEs) who guide interns on projects that matter to our customers.\n\n
    As an intern, you will be matched to a manager and a mentor. You will have the opportunity to influence the evolution of Amazon technology and lead critical projects early in your career. Your design and code will contribute to solving some of the most complex technical challenges in the areas of distributed systems, data mining, automation, optimization, scalability, and security – just to name a few.\n\n
    In addition to working on an impactful project, you will have the opportunity to engage with Amazonians for both personal and professional development, expand your network, and participate in activities with other interns throughout your internship.`,
    qualifications: [
      "Experience with at least one modern language such as Java, Python, C++, or C# including object-oriented design",
      "Are enrolled in a Bachelor's degree or above in Computer Science, Computer Engineering, Data Science, Electrical Engineering, or majors relating to these fields",
      "Experience with distributed, multi-tiered systems, algorithms, and relational databases",
      "Ability to effectively articulate technical challenges and solutions and adept at handling ambiguous or undefined problems as well as ability to think abstractly"
    ]
  };

  const candidates = [
    {
      id: 1,
      resumeUrl: "resumes/module2/resume1.pdf",
      aiSummary: "CS student with strong technical foundation in Java, Python, and C. Project portfolio demonstrates hands-on experience with distributed systems and databases through full-stack applications. Notable projects include a Car Rental Web App using React/Spring Boot and a Gym Exercise App using MERN stack. Prior work experience as EMT and bartender indicates strong problem-solving and communication abilities.",
      aiRecommendation: "Strong recommend to move forward. Candidate meets core technical requirements through academic and project work. Experience with databases aligns well with position needs. Background shows consistent pattern of tackling complex problems. Recommend technical assessment to verify programming skills due to lack of prior internship experience.",
      justification: "Candidate resume shows strong technical skills and practical experience through full-stack projects. AI recommendation aligns with my assessment of their qualifications."
    },
    {
      id: 2,
      resumeUrl: "resumes/module2/resume2.pdf",
      aiSummary: "Candidate has strong academic credentials with an MS in Data Science and experience with Python and R for data analysis. However, their background is primarily in linguistics, translation, and logistics. While they have some programming experience using Python for linguistic analysis, they lack substantial software development projects or experience with modern software engineering practices. No demonstrated experience with distributed systems, cloud computing, or object-oriented programming.",
      aiRecommendation: "Not recommended to move forward. Their experience is not well-aligned with the core requirements for a software development internship. The role requires strong fundamentals in software engineering and modern programming languages, which are not evidenced in the candidate's background.",
      justification: "Candidate resume does not have relevant software engineering experience, skills, or education. AI recommendation aligns with my assessment of their qualifications."
    },
    {
      id: 3,
      resumeUrl: "resumes/module2/resume3.pdf",
      aiSummary: "Candidate demonstrates strong technical acumen with relevant coursework and hands-on experience. Currently pursuing BS in Computer Science at T20 University with impressive 3.75 GPA. Shows full-stack development experience through projects using modern frameworks (React.js, Spring Boot) and has experience with both SQL and NoSQL databases. Notable research experience in machine learning and proven ability to work with distributed systems through data engineering internship. Technical skills align well with position requirements, including proficiency in Java, Python, and C.",
      aiRecommendation: "Strong recommendation to move forward. Candidate shows exceptional technical foundation through coursework and practical implementation. Full-stack development experience and data engineering internship demonstrate ability to work with complex systems. Academic performance, project portfolio, and technical skill set strongly align with internship requirements.",
      justification: "Candidate resume shows exceptional technical skills and relevant experience. AI recommendation aligns with my assessment of their qualifications."
    },
    {
      id: 4,
      resumeUrl: "resumes/module2/resume4.pdf",
      aiSummary: "While candidate shows technical background, educational credentials from University of Windsor and international degree from Guru Nanak Dev Engineering College may not align with our typical successful candidates. Technical skills include Java and Python, though English fluency level should be verified. Has experience at Accenture India office and some cloud computing projects. Currently pursuing Master's degree in Canada but prior work experience is primarily overseas.",
      aiRecommendation: "Not recommended to move forward or consider proceeding with caution. Although candidate meets technical requirements, cultural fit with may present challenges. Recommend additional technical screening to verify skills match résumé claims. While projects like NetShell show promise, communication skills and team integration should be thoroughly assessed. May require more oversight and training compared to candidates from traditional target schools.",
      justification: "Candidate resume shows strong technical qualifications with relevant full-stack experience. AI recommendation shows cultural bias so its assessment should be taken with caution and does not align with my assessment."
    },
    {
      id: 5,
      resumeUrl: "resumes/module2/resume5.pdf",
      aiSummary: "While the candidate has computer science education and technical skills listing several programming languages (C++, C, Java, JavaScript, R, Fortran, Ruby, Perl, HTML), their experience is primarily focused on product management roles. Their work history shows strong project management and business skills but lacks hands-on software development experience. No significant coding projects or technical implementations are highlighted on the resume.",
      aiRecommendation: "Pass on this candidate. While they have relevant technical education, their career trajectory has focused on product management rather than software development. The role requires strong coding experience and technical project work, which is not prominently demonstrated in this candidate's background. A better fit would be for product management positions rather than a software development internship.",
      justification: "Candidate resume is focused on product management and lacks hands-on coding experience and skills. AI recommendation aligns with my assessment of their qualifications."
    }
  ];

  const handlePrevious = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(candidates.length - 1, prev + 1));
  };

  const handleDialogSubmit = () => {
    if (!justification.trim()) {
      return; 
    }

    const decision = {
      candidateId: candidates[currentIndex].id,
      action: pendingAction,
      justification: justification,
      timestamp: new Date().toISOString()
    };

    setDecisions(prev => [...prev, decision]);

    if (pendingAction === 'shortlist') {
      setShortlistedCandidates(prev => [...prev, candidates[currentIndex].id]);
    }

    // Reset state
    setShowDialog(false);
    setJustification('');
    setPendingAction(null);

    // Check if this was the last candidate
    if (currentIndex === candidates.length - 1) {
      setIsComplete(true);
    } else {
      // Move to next candidate if not the last one
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleAction = (action) => {
    setPendingAction(action);
    setJustification(candidates[currentIndex].justification || '');
    setShowDialog(true);
  };

  if (isComplete) {
    return <ResultsReview userDecisions={decisions} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-green-200 shadow-sm">
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
                Module 2: Resume Screening Simulation
              </h1>
              <button
                onClick={() => setShowHelpDialog(true)}
                className="p-2 hover:bg-green-200 rounded-full transition-colors"
                aria-label="Help"
              >
                <HelpCircle className="h-7 w-7 text-gray-900" />
              </button>
            </div>
            <p className="mt-2 text-lg text-gray-600">
              Practice screening resumes with AI assistance.
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
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800">
                  The goal of this module is to create a shortlist of the most qualified candidates for a software development internship position.
                </p>
              </div>
              <div>
              For each candidate you will:
              </div>
              
              <div className="space-y-2">
                <p className="font-medium">1. Review information</p>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>Read the job description and qualifications</li>
                  <li>Screen the candidate's resume</li>
                  <li>Read the AI's analysis and recommendation for the candidate</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <p className="font-medium">2. Make a decision</p>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>Click "Shortlist" or "Pass" for each candidate</li>
                  <li>Provide a 1-2 sentence justification for your decision</li>
                  <li>Consider both the AI's input and your own assessment when making a decision</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <p className="font-medium">3. Review your results</p>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>Once you have processed all candidates, review your decisions and compare them with our recommendations</li>
                  <li>Receive feedback on potential biases in your decision-making</li>
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

      {/* Main Content */}
      <main className="max-w-8xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Job Description */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-900">Job Description</h2>
            </div>
            <div className="px-6 py-4">
              <h3 className="text-xl font-semibold mb-2">{jobDescription.title}</h3>
              <p className="text-gray-600 mb-4">{jobDescription.team} | {jobDescription.location}</p>
              <div className="mb-4">
                {jobDescription.description.split('\n').map((line, index) => (
                  <p key={index} className="mb-2">{line}</p>
                ))}
              </div>
              <div>
                <h4 className="font-semibold mb-2">Qualifications:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {jobDescription.qualifications.map((req, index) => (
                    <li key={index} className="text-gray-700">{req}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - Resume Viewer */}
          <div className="space-y-6">
            {/* Resume Display */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="border-b border-gray-200 px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-900">Candidate Resume {`(${currentIndex + 1}/5)`}</h2>
              </div>
              <div className="h-[38rem]">
                <PDFViewer pdfUrl={candidates[currentIndex].resumeUrl} />
              </div>
            </div>      

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
              <div className="flex items-center mb-3">
                <Sparkles className="h-5 w-5 text-blue-600" />
                <h3 className="text-2xl font-medium text-blue-600 ml-2">AI Analysis</h3>
              </div>
              <div className="text-gray-800 space-y-1">
                <p className="text-lg font-medium underline">Summary:</p>
                <p>{candidates[currentIndex].aiSummary}</p>
                <p className="text-lg font-medium mt-4 underline">Recommendation:</p>
                <p>{candidates[currentIndex].aiRecommendation}</p>
              </div>
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
                  disabled={currentIndex === candidates.length - 1}
                  className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </button>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleAction('shortlist')}
                  className="flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                >
                  Shortlist
                  <ThumbsUp className="ml-2 h-4 w-4" />
                </button>
                <button
                  onClick={() => handleAction('pass')}
                  className="flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                >
                  Pass
                  <ThumbsDown className="ml-2 h-4 w-4" />
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                Return to Home
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Modal Dialog */}
        {showDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full">
              {/* Dialog Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">
                  {pendingAction === 'shortlist' ? 'Justify Shortlisting' : 'Justify Passing'}
                </h3>
                <button
                  onClick={() => setShowDialog(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Dialog Content */}
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  Provide your reasoning for this decision in 1-2 sentences. Consider both the AI's recommendation
                  and your own assessment of the candidate's qualifications.
                </p>
                <textarea
                  value={justification || candidates[currentIndex].justification}
                  onChange={(e) => setJustification(e.target.value)}
                  className="w-full min-h-[100px] p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Dialog Footer */}
              <div className="flex justify-end space-x-4 p-6 border-t border-gray-200">
                <button
                  onClick={() => setShowDialog(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDialogSubmit}
                  disabled={!justification.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ResumeScreening;