import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useNavigate,
  BrowserRouter as Router,
} from "react-router-dom";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import LeaveReq from "./components/LeaveReq";
import "./index.css";

// function setToken(userToken) {
//   localStorage.setItem("token", JSON.stringify(userToken));
// }

function getToken() {
  const token = localStorage.getItem("token");
  if (token) return JSON.parse(token);
  return token;
}

function App() {
  return (
    <div>
      <Router>
        <AppRouter />
        <div className="App">
          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="dashboard" element={<Dashboard />}></Route>
            <Route path="leave-request" element={<LeaveReq />}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

function AppRouter() {
  const navigate = useNavigate();
  const [token, setToken] = useState(getToken());

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      navigate("/leave-request");
    }
  }, []);

  return null;
}

export default App;
