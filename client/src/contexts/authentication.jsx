import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [state, setState] = useState({
    loading: null,
    error: null,
    user: null,
  });

  const navigate = useNavigate();

  const register = async (data) => {
    await axios.post("http://localhost:4000/auth/register", data);
    navigate("/login");
  };

  const login = async (data) => {
    const result = await axios.post("http://localhost:4000/auth/login", data);
    const token = result.data.token;
    
    localStorage.setItem("token", token);
    const userDataFromToken = jwtDecode(token);
    setState({ ...state, user:userDataFromToken });
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setState({ ...state, user: null });
  };

  const isAuthenticated = Boolean(localStorage.getItem("token"));

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, state, setState, register, login, logout }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };