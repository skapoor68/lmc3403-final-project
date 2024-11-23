import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Brain, Shield, ClipboardList } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();

  const modules = [
    {
      title: "Module 1: Identifying Bias in AI Responses",
      description: "Learn to recognize and mitigate AI bias in hiring recommendations",
      icon: Brain,
      color: "bg-blue-100 hover:bg-blue-200",
      path: "/bias-module"
    },
    {
      title: "Module 2: Resume Screening Simulation",
      description: "Practice processing resumes with AI assistance through interactive scenarios",
      icon: ClipboardList,
      color: "bg-green-100 hover:bg-green-200",
      path: "/resume-screening"
    },
    {
      title: "Module 3: Privacy and Ethics Training",
      description: "Master best practices for ethical AI implementation in hiring",
      icon: Shield,
      color: "bg-purple-100 hover:bg-purple-200",
      path: "/privacy-ethics"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            AI-Assisted Resume Screening
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            An Interactive Training Platform for Technical Recruiters
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Welcome to Your Training Platform
            </h2>
            <p className="text-gray-600">
              Master the skills needed to effectively and ethically leverage AI in your hiring process. 
              Complete each module in order below.
            </p>
          </div>

          {/* Module Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            {modules.map((module, index) => (
              <button
                key={index}
                className="group text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                onClick={() => navigate(module.path)}
              >
                <div className={`h-full ${module.color} rounded-lg shadow-sm p-6 transition-all duration-200`}>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <module.icon className="h-8 w-8 text-gray-700 mt-1" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {module.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {module.description}
                      </p>
                      <div className="flex items-center text-blue-600 group-hover:text-blue-700">
                        Start Module
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;