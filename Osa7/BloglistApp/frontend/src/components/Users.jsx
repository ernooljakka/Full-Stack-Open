import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
  Box,
} from '@mui/material'

const Users = () => {
  const users = useSelector((state) => state.users)

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        mt: 1,
      }}
    >
      <Typography variant="h4" sx={{ color: 'white', mb: 2 }}>
        Users
      </Typography>

      {users && (
        <Paper
          sx={{
            width: '50%',
            overflowX: 'auto',
            backgroundColor: '#2d2f46ff',
            color: 'white',
            borderRadius: 2,
          }}
          elevation={4}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  User
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Blogs Created
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  component={Link}
                  to={`${user.id}`}
                  sx={{
                    '&:hover': {
                      backgroundColor: '#3b3d5aff',
                    },
                  }}
                >
                  <TableCell sx={{ color: 'white' }}>{user.name}</TableCell>

                  <TableCell sx={{ color: 'white' }}>
                    {user.blogs.length}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  )
}

export default Users
