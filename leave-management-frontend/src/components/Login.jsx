import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function validateEmail(email) {
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!email) throw new Error("Email is required");
  if (!email.match(mailformat)) throw new Error("Email is invalid");
}

function validatePassword(password) {
  if (!password) throw new Error("Password is required");
}

function validateAuthForm(formData) {
  const { email, password } = formData;
  const errors = {};
  try {
    validateEmail(email);
  } catch (err) {
    errors.email = err.message;
  }
  try {
    validatePassword(password);
  } catch (err) {
    errors.password = err.message;
  }
  return errors;
}

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
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState({
    email: "",
    password: "",
  });

  const { data, error, update } = useApiLogin();

  async function loginUser() {
    const loginDetails = JSON.stringify(formData);
    await update(loginDetails);
  }

  async function handleLogin(e) {
    e.preventDefault();
    const errors = validateAuthForm(formData);

    if (Object.keys(errors).length !== 0) return setLoginError(errors);
    return await loginUser();
  }

  useEffect(() => {
    if (data) {
      localStorage.setItem("token", data);
      navigate("/leave-request");
    }
  }, [data]);

  function handleOnChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <div className="login">
      <form className="login_form">
        <h3>Login Here</h3>
        <div className="input_username">
          <label>User Name</label>
          <input
            type="email"
            required
            placeholder="Email"
            name="email"
            onChange={handleOnChange}
          />
          {loginError.email && <p className="error">{loginError.email}</p>}
        </div>
        <div className="input_password">
          <label>Password</label>
          <input
            required
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleOnChange}
          />
          {loginError.password && (
            <p className="error">{loginError.password}</p>
          )}
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
