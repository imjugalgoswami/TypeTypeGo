import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TypeTypeGoLanding from './Components/TypeTypeGo';
import TypingTest from './Components/TypingTest';
import { RegisterForm } from './Components/auth/RegisterForm';
import LoginForm from './Components/auth/LoginForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TypeTypeGoLanding />} />
        <Route path="/test" element={<TypingTest />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
  );
};

export default App;