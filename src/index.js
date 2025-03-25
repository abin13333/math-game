import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

// component import
import Login from './component/Login';
import Home from './component/Home';


const Navbar = () => {
  return (
    <nav style={{ padding: "20px",margin:"0px" , backgroundColor: "lightblue", textAlign:"center"}}>
      <h3>Welcome to the Math Game !</h3>
    </nav>
  );
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  margin: "0 10px",
  fontSize: "18px"
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

export default App;
