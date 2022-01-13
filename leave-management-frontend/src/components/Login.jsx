import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function createPostApiHook(endpoint, method) {
  return () => {
    const [apiData, setApiData] = useState("");
    const [apiError, setApiError] = useState("");
    const url = "http://localhost:8080" + endpoint;

    function update(dataToApi) {
      fetch(url, {
        method: method,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: dataToApi,
      })
        .then((data) => data.json())
        .then((response) => {
          setApiData(JSON.stringify(response));
        })
        .catch((error) => {
          setApiError(error);
        });
    }

    return { data: apiData, error: apiError, update };
  };
}

const useApiLogin = createPostApiHook("/Login", "POST");

const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userToken, setUserToken] = useState(null);

  const { data, error, update } = useApiLogin();

  async function loginUser() {
    const loginDetails = JSON.stringify({ userName, password });
    await update(loginDetails);
    setUserToken(data);
  }

  async function handleLogin(e) {
    e.preventDefault();
    await loginUser();
    if (userToken) {
      navigate("/dashboard");
    }
  }

  return (
    <div>
      <form className="login_form">
        <h3>Login Here</h3>
        <div className="input_username">
          <label>User Name</label>
          <input
            type="text"
            placeholder="Email or Phone"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          ></input>
        </div>
        <div className="input_password">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </div>
        <button
          className="login_button"
          onClick={(e) => {
            handleLogin(e);
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
