import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ThumbsUp, ThumbsDown, Info, X } from 'lucide-react';
import PDFViewer from './PDFViewer';
import ResultsReview from './ResultsReview';

const ResumeScreening = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shortlistedCandidates, setShortlistedCandidates] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [justification, setJustification] = useState('');
  const [pendingAction, setPendingAction] = useState(null);
  const [decisions, setDecisions] = useState([]);
  const [isComplete, setIsComplete] = useState(false);

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
      "Have an expected graduate date between October 2025 - September 2028 and be able to work 40 hours/week minimum and commit to 12 week internship",
      "Experience with distributed, multi-tiered systems, algorithms, and relational databases",
      "Ability to effectively articulate technical challenges and solutions and adept at handling ambiguous or undefined problems as well as ability to think abstractly"
    ]
  };

  const candidates = [
    {
      id: 1,
      resumeUrl: "resumes/module2/resume1.pdf",
      aiSummary: "CS student with strong technical foundation in Java, Python, and C. Project portfolio demonstrates hands-on experience with distributed systems and databases through full-stack applications. Notable projects include a Car Rental Web App using React/Spring Boot and a Gym Exercise App using MERN stack. Prior work experience as EMT and bartender indicates strong problem-solving and communication abilities.",
      aiRecommendation: "Strong recommend to move forward. Candidate meets core technical requirements through academic and project work. Experience with databases aligns well with position needs. Background shows consistent pattern of tackling complex problems. Recommend technical assessment to verify programming skills due to lack of prior internship experience."
    },
    {
      id: 2,
      resumeUrl: "resumes/module2/resume2.pdf",
      aiSummary: "Candidate has strong academic credentials with an MS in Data Science and experience with Python and R for data analysis. However, their background is primarily in linguistics, translation, and logistics. While they have some programming experience using Python for linguistic analysis, they lack substantial software development projects or experience with modern software engineering practices. No demonstrated experience with distributed systems, cloud computing, or object-oriented programming.",
      aiRecommendation: "Not recommended to move forward. Their experience is not well-aligned with the core requirements for a software development internship. The role requires strong fundamentals in software engineering and modern programming languages, which are not evidenced in the candidate's background."
    },
    {
      id: 3,
      resumeUrl: "resumes/module2/resume3.pdf",
      aiSummary: "Candidate demonstrates strong technical acumen with relevant coursework and hands-on experience. Currently pursuing BS in Computer Science at T20 University with impressive 3.75 GPA. Shows full-stack development experience through projects using modern frameworks (React.js, Spring Boot) and has experience with both SQL and NoSQL databases. Notable research experience in machine learning and proven ability to work with distributed systems through data engineering internship. Technical skills align well with position requirements, including proficiency in Java, Python, and C.",
      aiRecommendation: "Strong recommendation to move forward. Candidate shows exceptional technical foundation through coursework and practical implementation. Full-stack development experience and data engineering internship demonstrate ability to work with complex systems. Academic performance, project portfolio, and technical skill set strongly align with internship requirements"
    },
    {
      id: 4,
      resumeUrl: "resumes/module2/resume4.pdf",
      aiSummary: "While candidate shows technical background, educational credentials from University of Windsor and international degree from Guru Nanak Dev Engineering College may not align with our typical successful candidates. Technical skills include Java and Python, though English fluency level should be verified. Has experience at Accenture India office and some cloud computing projects. Currently pursuing Master's degree in Canada but prior work experience is primarily overseas.",
      aiRecommendation: "Not recommended to move forward or consider proceeding with caution. Although candidate meets technical requirements, cultural fit with may present challenges. Recommend additional technical screening to verify skills match résumé claims. While projects like NetShell show promise, communication skills and team integration should be thoroughly assessed. May require more oversight and training compared to candidates from traditional target schools."
    },
    {
      id: 5,
      resumeUrl: "resumes/module2/resume5.pdf",
      aiSummary: "While the candidate has computer science education and technical skills listing several programming languages (C++, C, Java, JavaScript, R, Fortran, Ruby, Perl, HTML), their experience is primarily focused on product management roles. Their work history shows strong project management and business skills but lacks hands-on software development experience. No significant coding projects or technical implementations are highlighted on the resume.",
      aiRecommendation: "Pass on this candidate. While they have relevant technical education, their career trajectory has focused on product management rather than software development. The role requires strong coding experience and technical project work, which is not prominently demonstrated in this candidate's background. A better fit would be for product management positions rather than a software development internship."
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
    setShowDialog(true);
  };

  if (isComplete) {
    return <ResultsReview userDecisions={decisions} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Resume Screening Simulation
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Module 2: Practice evaluating candidates with AI assistance
          </p>
        </div>
      </header>

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
                <h2 className="text-xl font-semibold text-gray-900">Candidate Resume</h2>
              </div>
              <div className="h-[38rem]">
                <PDFViewer pdfUrl={candidates[currentIndex].resumeUrl} />
              </div>
            </div>      

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
              <div className="flex items-center mb-3">
                <Info className="h-5 w-5 text-blue-500" />
                <h3 className="text-2xl font-medium text-blue-900 ml-2">AI Analysis</h3>
              </div>
              <div className="text-blue-800 space-y-1">
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
                  onClick={() => handleAction('pass')}
                  className="flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                >
                  <ThumbsDown className="mr-2 h-4 w-4" />
                  Pass
                </button>
                <button
                  onClick={() => handleAction('shortlist')}
                  className="flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                >
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  Shortlist
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
                  Please provide your reasoning for this decision. Consider both the AI's recommendation
                  and your own assessment of the candidate's qualifications.
                </p>
                <textarea
                  value={justification}
                  onChange={(e) => setJustification(e.target.value)}
                  placeholder= {pendingAction === 'shortlist' ? 'Justification for shortlisting the candidate' : 'Justification for passing the candidate'}
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