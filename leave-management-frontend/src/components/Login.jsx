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
  const [loginError, setLoginError] = useState({
    userName: "",
    password: "",
  });

  const { data, error, update } = useApiLogin();

  async function loginUser() {
    const loginDetails = JSON.stringify({ userName, password });
    await update(loginDetails);
  }

  async function handleLogin(e) {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let validation = true;

    if (userName.length === 0) {
      validation = false;
      setLoginError((prevState) => ({
        ...prevState,
        userName: "Please fill in the required UserName",
      }));
    } else if (!userName.match(mailformat)) {
      validation = false;

      setLoginError((prevState) => ({
        ...prevState,
        userName: "Incorrect email address",
      }));
    } else {
      setLoginError((prevState) => ({
        ...prevState,
        userName: "",
      }));
    }

    if (password.length === 0) {
      validation = false;
      setLoginError((prevState) => ({
        ...prevState,
        password: "Please fill in the required password",
      }));
    } else {
      setLoginError((prevState) => ({
        ...prevState,
        password: "",
      }));
    }

    console.log(loginError);
    console.log("error", loginError.userName);
    e.preventDefault();
    if (validation) {
      await loginUser();
    }
  }

  useEffect(() => {
    if (data) {
      navigate("/dashboard");
    }
  }, [data]);

  return (
    <div>
      <form className="login_form">
        <h3>Login Here</h3>
        <div className="input_username">
          <label>User Name</label>
          <input
            type="text"
            required
            placeholder="Email"
            name="UserName"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <p className="error">{loginError.userName}</p>
        </div>
        <div className="input_password">
          <label>Password</label>
          <input
            required
            type="password"
            placeholder="Password"
            name="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
          <p className="error">{loginError.password}</p>
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
