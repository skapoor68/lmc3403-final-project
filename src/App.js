import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ResumeScreening from './components/ResumeScreening';

function App() {
  return (
    <Router>
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
