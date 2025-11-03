import { useState } from 'react'
import { Button, TextField, Typography, Box, Paper, Stack } from '@mui/material'

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
    return (
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#2d2f46ff', // light teal background
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => setLoginVisible(true)}
          sx={{ height: 60, width: 120, fontSize: '1rem' }}
        >
          Login
        </Button>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#2d2f46ff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper
        elevation={7}
        sx={{ p: 5, width: 320, backgroundColor: '#e6eaf5ff' }}
      >
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <Typography variant="h4" align="center">
              Log in to application
            </Typography>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setLoginVisible(false)}
              fullWidth
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  )
}

export default LoginForm
