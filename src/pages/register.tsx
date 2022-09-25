import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import {
  Box, Typography, Card, CardContent, TextField, Button, Slide,
  FormControl, OutlinedInput, Grid, InputAdornment, IconButton, Avatar
} from '@mui/material'
import { ShellTitle } from 'components'
import { AppLayout } from 'components/layout'
import Email from 'mdi-material-ui/Email'
import PencilCircle from 'mdi-material-ui/PencilCircle'
import Lock from 'mdi-material-ui/Lock'
import Check from 'mdi-material-ui/Check'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import Account from 'mdi-material-ui/Account'
import AccountMultiple from 'mdi-material-ui/AccountMultiple'
import Phone from 'mdi-material-ui/Phone'
import WestIcon from '@mui/icons-material/West';
import axios from 'axios'
import config from '../config'
import rootReducer from 'store/rootReducer'
import { useSnackbar } from 'notistack';

export default function Register() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar();
  const [user, setUser] = useState({
    fullname: '',
    email: '',
    password: '',
    password1: '',
    register_referral_code: "",
    phone: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const goHome = () => {
    router.push('/login')
  }

  useEffect(() => {
    let params = (new URL(document.location)).searchParams;
    let referral = params.get("referral");
    setUser({ ...user, register_referral_code: referral, })
  }, [])

  const saveUser = async () => {
    try {
      if (user.password === user.password1 && user.password) {
        const response = await axios.post(`${config.API_URL}/appuser/register`, user)
        if (response.data.result) {
          // dispatch(setUser(response.data.data))
          window.localStorage.setItem('accessAuth', JSON.stringify(response.data.data));
          enqueueSnackbar('Successfully registered!', { variant: 'success' })
          enqueueSnackbar('Welcome', { variant: 'success' })
          setUser({
            fullname: '',
            email: '',
            password: '',
            password1: '',
            register_referral_code: '',
            phone: ''
          })
          router.push('/app')
        } else {
          enqueueSnackbar(response.data.data, { variant: 'error' })
        }
      } else {
        enqueueSnackbar('Confirm password again', { variant: 'warning' })
      }
    } catch (e) {
      enqueueSnackbar('Failed', { variant: 'error' })
      console.log(e)
    }
  }

  return (
    <>
      <ShellTitle title="Register" />
      <div className='main'>
        <Card className='main_card'>
          <CardContent>
            <Box sx={{ mb: 2 }}>
              <div style={{ transform: 'translateY(40px)', textAlign: 'left' }}>
                <WestIcon style={{ color: '#93989F', cursor: 'pointer' }} onClick={() => goHome()} />
              </div>
              <Typography className='p_title' style={{ color: '#0E1446' }}>
                Sign Up
              </Typography>
            </Box>
            <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
              <Avatar alt="Remy Sharp" sx={{ width: '80px', height: '80px' }}>
                <img src='../../../profile.png' width={80} height={80} />
              </Avatar>
              {/* <PencilCircle style={{color: 'rgb(65 98 255)'}}/> */}
            </div>
            <div style={{ marginTop: 50 }}>
              <Grid container spacing={5}>
                <Grid item xs={12} style={{ paddingTop: 20 }}>
                  <Typography className='input_title'>User Name</Typography>
                  <TextField
                    fullWidth
                    type='text'
                    placeholder=''
                    value={user.fullname || ''}
                    onChange={(e) => setUser({ ...user, fullname: e.target.value })}
                    // helperText='You can use letters, numbers & periods'
                    sx={{
                      '& legend': { display: 'none' },
                      '& fieldset': { top: 0, borderRadius: '10px' },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <Account style={{ color: '#6D43FD' }} />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12} style={{ paddingTop: 20 }}>
                  <Typography className='input_title'>Email</Typography>
                  <TextField
                    fullWidth
                    type='email'
                    value={user.email || ''}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    // helperText='You can use letters, numbers & periods'
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
                </Grid>
                <Grid item xs={12} style={{ paddingTop: 20 }}>
                  <FormControl fullWidth>
                    <Typography className='input_title'>Password</Typography>
                    <OutlinedInput
                      id='form-layouts-basic-password'
                      type={showPassword ? 'text' : 'password'}
                      aria-describedby='form-layouts-basic-password-helper'
                      value={user.password || ''}
                      required
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
                    {/* <FormHelperText id='form-layouts-basic-password-helper'>
                      Use 8 or more characters with a mix of letters, numbers & symbols
                    </FormHelperText> */}
                  </FormControl>
                </Grid>
                <Grid item xs={12} style={{ paddingTop: 20 }}>
                  <FormControl fullWidth>
                    <Typography className='input_title'>Confirm Password</Typography>
                    <OutlinedInput
                      id='form-layouts-basic-password'
                      type={showConfirm ? 'text' : 'password'}
                      aria-describedby='form-layouts-basic-password-helper'
                      value={user.password1 || ''}
                      onChange={(e) => setUser({ ...user, password1: e.target.value })}
                      sx={{
                        '& legend': { display: 'none' },
                        '& fieldset': { top: 0, borderRadius: '10px' },
                      }}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            aria-label='toggle password visibility'
                            onClick={() => setShowConfirm(!showConfirm)}
                          >
                            {showConfirm ? <EyeOffOutline style={{ color: '#6D43FD' }} /> : <EyeOutline style={{ color: '#6D43FD' }} />}
                          </IconButton>
                        </InputAdornment>
                      }
                      startAdornment={
                        <InputAdornment position='start'>
                          <Lock style={{ color: '#6D43FD' }} />
                        </InputAdornment>
                      }
                    />
                    {/* <FormHelperText id='form-layouts-basic-password-helper'>
                      Use 8 or more characters with a mix of letters, numbers & symbols
                    </FormHelperText> */}
                  </FormControl>
                </Grid>
                <Grid item xs={12} style={{ paddingTop: 20 }}>
                  <FormControl fullWidth>
                    <Typography className='input_title'>Referral Code</Typography>
                    <OutlinedInput
                      id='form-layouts-basic-password'
                      type='text'
                      aria-describedby='form-layouts-basic-password-helper'
                      value={user.register_referral_code}
                      onChange={(e) => setUser({ ...user, register_referral_code: e.target.value })}
                      sx={{
                        '& legend': { display: 'none' },
                        '& fieldset': { top: 0, borderRadius: '10px' },
                      }}
                      startAdornment={
                        <InputAdornment position='start'>
                          <IconButton
                            edge='start'
                            aria-label='toggle password visibility'
                          >
                            <AccountMultiple style={{ color: '#6D43FD' }} />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {/* <FormHelperText id='form-layouts-basic-password-helper'>
                      Use 8 or more characters with a mix of letters, numbers & symbols
                    </FormHelperText> */}
                  </FormControl>
                </Grid>
                <Grid item xs={12} style={{ paddingTop: 20 }}>
                  <FormControl fullWidth>
                    <Typography className='input_title'>Phone</Typography>
                    <OutlinedInput
                      id='form-layouts-basic-password'
                      type='text'
                      aria-describedby='form-layouts-basic-password-helper'
                      value={user.phone || ''}
                      onChange={(e) => setUser({ ...user, phone: e.target.value })}
                      sx={{
                        '& legend': { display: 'none' },
                        '& fieldset': { top: 0, borderRadius: '10px' },
                      }}
                      startAdornment={
                        <InputAdornment position='start'>
                          <Phone style={{ color: '#6D43FD' }} />
                        </InputAdornment>
                      }
                    />
                    {/* <FormHelperText id='form-layouts-basic-password-helper'>
                      Use 8 or more characters with a mix of letters, numbers & symbols
                    </FormHelperText> */}
                  </FormControl>
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
                      sx={{ borderRadius: '15px', fontSize: 20 }}
                      onClick={() => saveUser()}
                    >
                      Sign Up
                    </Button>
                  </Box>
                </Grid>
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography style={{ color: '#848AA4', paddingRight: 10 }}>Already have an account?
                    </Typography>
                    <Link passHref href='/login'>
                      <Typography style={{ color: '#6D43FD', cursor: 'pointer' }}>Sign In</Typography>
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

Register.layout = AppLayout
