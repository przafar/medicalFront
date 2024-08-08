import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

import axios from 'axios';

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleSubmit = () => {
    const response = axios.post('http://192.168.110.136:3001/api/auth/login', {
      username: `${email}`,
      password: `${passwords}`,
    });

    response
      .then((res) => {
        console.log(res, 'REEESSS');
        setEmail('');
        setPassword('');
        setLoading(false);
        navigate('/');
        localStorage.setItem(
          'token',
          res.data.accessToken

        );
      })
      .catch((error) => {
        console.log('ошибка', error);
        setLoading(false);  
      });
  };

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [passwords, setPassword] = useState('');
  const [loading, setLoading] = useState(true)

  if(!loading) {
    console.log('loading');
  }

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name="email"
          label="Email address"
        />

        <TextField
          onChange={(e) => setPassword(e.target.value)}
          value={passwords}
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleSubmit}
      >
        Login
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Sign in </Typography>
          {loading ? renderForm : <h1>Loafing</h1>}
        </Card>
      </Stack>
    </Box>
  );
}
