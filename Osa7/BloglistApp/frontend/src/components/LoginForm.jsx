import { useState } from 'react'

const LoginForm = ({ onLogin }) => {
  const [loginVisible, setLoginVisible] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onLogin({ username, password })
    setUsername('')
    setPassword('')
    setLoginVisible(false)
  }

  if (!loginVisible) {
    return <button onClick={() => setLoginVisible(true)}>Login</button>
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      <button onClick={() => setLoginVisible(false)}>Cancel</button>
    </div>
  )
}

export default LoginForm
