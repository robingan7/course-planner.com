import React from 'react';
import './App.css';
import LoginSignup from "./components/login-signup.component";

const link = "http://localhost:5000";

function App() {
  return <LoginSignup serverLink={link} />;
}

export default App;
