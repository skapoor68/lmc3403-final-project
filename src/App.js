import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ResumeScreening from './components/ResumeScreening';

function App() {
  const basename = process.env.NODE_ENV === 'production' 
    ? '/lmc3403-final-project'
    : '';

  return (
    <Router basename={basename}>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/resume-screening" element={<ResumeScreening />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
