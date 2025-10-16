const LoginForm = ({
  username,
  password,
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
}) => {
  return (
    <div>
      <h2>Log in to application </h2>
      <form onSubmit={handleLogin}>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => handleUsernameChange(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password
          <input
            type="text"
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
          />
        </label>
        <br />
        <button type="submit"> Login </button>
      </form>
    </div>
  )
}

export default LoginForm
