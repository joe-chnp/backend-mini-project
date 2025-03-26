import { Routes, Route } from "react-router-dom";
import "../App.css";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";

function UnauthenticatedApp({ auth }) {
    console.log('unauth')
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage auth={auth}/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="*" element={<HomePage auth={auth}/>} />
      </Routes>
    </div>
  );
}

export default UnauthenticatedApp;