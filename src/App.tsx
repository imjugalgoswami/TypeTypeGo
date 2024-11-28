import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TypeTypeGoLanding from './Components/TypeTypeGo';
import TypingTest from './Components/TypingTest';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TypeTypeGoLanding />} />
        <Route path="/test" element={<TypingTest />} />
      </Routes>
    </Router>
  );
};

export default App;