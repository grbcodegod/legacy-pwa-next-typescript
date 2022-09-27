import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  Box, Typography, Card, CardContent, TextField, Button,
  FormControl, OutlinedInput, Grid, InputAdornment,
  IconButton
} from '@mui/material'
import { ShellTitle } from 'components'
import { AppLayout } from 'components/layout'
import Email from 'mdi-material-ui/Email'
import Lock from 'mdi-material-ui/Lock'
import Check from 'mdi-material-ui/Check'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import axios from 'axios'
import config from '../config'
import { useSnackbar } from 'notistack';
import { Actions, useAppShell } from 'components/providers/AppShellProvider'

export default function Login() {
  const router = useRouter()
  const [user, setUser] = useState({ email: '', password: '' })
  const { enqueueSnackbar } = useSnackbar();
  const [error,setError]=useState({email:'',password:''})
  const { state, dispatch } = useAppShell()

  const onLogin = async () => {
    try {
      const response = await axios.post(`${config.API_URL}/appuser/login`, user)
      if (response.data.result) {
        enqueueSnackbar('Welcome!', { variant: 'success' })
        window.localStorage.setItem('accessAuth', JSON.stringify(response.data.data));
        // dispatch(setUser(response.data.data))
        setError({email:'',password:''})
        router.push('/app')
      } else {
        // enqueueSnackbar(response.data.data, { variant: 'error' })
        setError({email:response.data.data,password:response.data.data})
      }
    } catch (e) {
      console.log(e)
      enqueueSnackbar('Failed', { variant: 'error' })
    }
  }

  const [showPassword, setShowPassword] = useState(false)

  return (
    <>
      <ShellTitle title="Login" />
      <div className='main' style={{height: 667}}>
        <Card className='main_card' style={{paddingTop: 70}}>
          <CardContent>
            {/* <img src='legacy-logo-black.png' width={168} height={51} /> */}
            <img src='logo.png' width={80} height={80} />
            <Typography className='log_title' style={{paddingTop: 20,color: state.theme === 'dark' ? '#fff':'#0E1446'}}>
              Welcome back
            </Typography>
            <div style={{ marginTop: 50, float: 'left' }}>
              <Grid container spacing={5}>
                <Grid item xs={12} style={{ paddingTop: 20 }}>
                  <Typography className='input_title'>Edit</Typography>
                  <TextField
                    fullWidth
                    type='email'
                    label=''
                    placeholder='Enter your registered email ID'
                    // helperText='You can use letters, numbers & periods'
                    value={user.email || ''}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    sx={{
                      '& legend': { display: 'none' },
                      '& fieldset': { top: 0, borderRadius: '10px' },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <Email style={{ color: '#6D43FD' }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            aria-label='toggle password visibility'
                          >
                            <Check style={{ color: '#6D43FD' }} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                  <span className='error'>{error.email}</span>
                </Grid>
                <Grid item xs={12} style={{ paddingTop: 20 }}>
                  <FormControl fullWidth>
                    <Typography className='input_title'>Password</Typography>
                    <OutlinedInput
                      id='form-layouts-basic-password'
                      type={showPassword ? 'text' : 'password'}
                      aria-describedby='form-layouts-basic-password-helper'
                      value={user.password || ''}
                      onChange={(e) => setUser({ ...user, password: e.target.value })}
                      sx={{
                        '& legend': { display: 'none' },
                        '& fieldset': { top: 0, borderRadius: '10px' },
                      }}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            aria-label='toggle password visibility'
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOffOutline style={{ color: '#6D43FD' }} /> : <EyeOutline style={{ color: '#6D43FD' }} />}
                          </IconButton>
                        </InputAdornment>
                      }
                      startAdornment={
                        <InputAdornment position='start'>
                          <Lock style={{ color: '#6D43FD' }} />
                        </InputAdornment>
                      }
                    />
                    <span className='error'>{error.password}</span>
                    {/* <FormHelperText id='form-layouts-basic-password-helper'>
                      Use 8 or more characters with a mix of letters, numbers & symbols
                    </FormHelperText> */}
                  </FormControl>
                </Grid>
                <Grid item xs={12} style={{ textAlign: 'right', paddingTop: 20 }}>
                  <Typography style={{ color: '#848AA4', cursor: 'pointer' }}>Forgot Password?</Typography>
                </Grid>
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                  <Box
                    sx={{
                      gap: 5,
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Button type='submit' variant='contained' fullWidth
                      style={{ height: 64, backgroundColor: '#6D43FD',textTransform: 'none' }}
                      sx={{ borderRadius: '15px', fontSize: 20,color:'#fff' }}
                      onClick={() => onLogin()}
                    >
                      Log In
                    </Button>
                  </Box>
                </Grid>
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography style={{ color: state.theme === 'dark' ? '#fff':'#848AA4', marginRight: 10 }}>Don’t have an account?{" "}
                    </Typography>
                    <Link passHref href='/register'>
                      <Typography style={{ color: '#6D43FD', cursor: 'pointer' }}>Sign Up</Typography>
                    </Link>
                  </div>
                </Grid>
              </Grid>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

Login.layout = AppLayout
