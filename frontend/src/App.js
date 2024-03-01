import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import axios from "axios";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  useEffect(async () => {
    // Check for token in localStorage upon component mount
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      let userInfo = await getUser(token);

      if (userInfo) setUser(userInfo);
    } else {
      setIsAuthenticated(false);
    }
  }, []);
  const getUser = async (token) => {
    console.log("Getting user");
    const API_URL = "/api/users/me";
    // Set up headers with the token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.get(API_URL, config);
      return response.data;
    } catch (error) {
      console.error("Error fetching user information:", error);
      throw error;
    }
  };
  const login = async (userData) => {
    const API_URL = "/api/users/";
    const response = await axios.post(API_URL + "login", userData);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);
    }
    return response.data;
  };
  const register = async (userData) => {
    console.log(userData);
    const API_URL = "/api/users/";
    try {
      const response = await axios.post(API_URL, userData);
      if (response) {
        localStorage.setItem("token", response.data.token);
        setIsAuthenticated(true);
        return response.data;
      }
    } catch (error) {
      // Handle error
      throw error;
    }
  };
  return (
    <>
      <Router>
        <div className='container'>
          <Header
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
          />
          <Routes>
            <Route
              path='/'
              element={
                isAuthenticated ? (
                  <Dashboard user={user} />
                ) : (
                  <Login login={login} />
                )
              }
            />
            <Route
              path='/login'
              element={
                isAuthenticated ? (
                  <Dashboard user={user} />
                ) : (
                  <Login login={login} />
                )
              }
            />
            <Route
              path='/register'
              element={<Register register={register} />}
            />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
