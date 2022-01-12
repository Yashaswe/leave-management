const Login = () => {
  return (
    <div>
      <form className="login_form">
        <h3>Login Here</h3>
        <div className="input_username">
          <label>User Name</label>
          <input type="text" placeholder="Email or Phone"></input>
        </div>
        <div className="input_password">
          <label>Password</label>
          <input type="password" placeholder="Password"></input>
        </div>
        <button className="login_button">Login</button>
      </form>
    </div>
  );
};

export default Login;
