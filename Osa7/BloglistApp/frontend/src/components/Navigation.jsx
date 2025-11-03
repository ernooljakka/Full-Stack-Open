import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../features/userSlice'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, Stack } from '@mui/material'

const Navigation = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <AppBar
      position="static"
      elevation={2}
      sx={{ backgroundColor: '#2d2f46ff', mb: 2, borderRadius: 1 }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Stack direction="row" spacing={2}>
          <Button color="white" component={Link} to="/">
            Blogs
          </Button>
          <Button color="white" component={Link} to="/users">
            Users
          </Button>
        </Stack>
        {user && (
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="body1">{user.username} logged in</Typography>
            <Button variant="outlined" color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navigation
