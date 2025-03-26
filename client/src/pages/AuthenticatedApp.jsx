import { Routes, Route } from "react-router-dom";
import "../App.css";
import HomePage from "./HomePage";
import AddBookPage from "./AddBookPage";
import EditBookPage from "./EditBookPage";

function AuthenticatedApp({ auth }) {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage auth={auth}/>} />
        <Route path="/book/add" element={<AddBookPage/>} />
        <Route path="/book/edit/:bookId" element={<EditBookPage/>} />
      </Routes>
    </div>
  );
}

export default AuthenticatedApp;