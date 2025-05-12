
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Gallery from './components/Gallery/Gallery';
import Contact from './components/Contact/Contact';
import Login from './components/Login/Login';
import CoursesPage from './components/CoursesPage/CoursesPage';
import SignUp from './components/SignUp/SignUp';
import FacultyDashboard from './components/FacultyDashboard/FacultyDashboard';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import QuizGenerator from './components/QuizGenerator/QuizGenerator';
import StudentDashboard from './components/StudentDashboard/StudentDashboard';

function App() {
  return (
    <Router basename="/AI-Learn-Hub">
      <div>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/quiz" element={<QuizGenerator />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/courses/:category" element={<CoursesPage />} />
          <Route path="/" exact element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
