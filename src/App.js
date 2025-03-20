
import './App.css';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Gallery from './components/Gallery/Gallery';
import Contact from './components/Contact/Contact';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
// import Faq from './components/Faq/Faq';


function App() {
  return (
    <div>
      
      <Router>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/faq" element={<Faq/>} /> */}
          <Route path="/" exact element={<Home />} />
        </Routes>
      </Router>

      <Footer />

    </div>

  );
}

export default App;
