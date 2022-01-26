import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  Link,
} from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import LeaveReq from "./components/LeaveReq";
import "./index.css";

// function setToken(userToken) {
//   localStorage.setItem("token", JSON.stringify(userToken));
// }

function getToken() {
  const localStorageToken = JSON.parse(localStorage.getItem("token"));
  return localStorageToken;
}

function App() {
  return (
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
