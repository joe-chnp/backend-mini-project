import { Routes, Route } from "react-router-dom";
import "../App.css";
import HomePage from "./HomePage";
import AddBookPage from "./AddBookPage";
import EditBookPage from "./EditBookPage";

function AuthenticatedApp({ auth }) {
  console.log('auth')
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage auth={auth}/>} />
        <Route path="/book/add" element={<AddBookPage/>} />
        <Route path="/book/edit/:bookId" element={<EditBookPage/>} />
        <Route path="*" element={<HomePage auth={auth}/>} />
      </Routes>
    </div>
  );
}

export default AuthenticatedApp;