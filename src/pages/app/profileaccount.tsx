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
import KeyVariant from 'mdi-material-ui/KeyVariant'
import Phone from 'mdi-material-ui/Phone'
import WestIcon from '@mui/icons-material/West';
import axios from 'axios'
import config from '../../config'
import rootReducer from 'store/rootReducer'
import { useSnackbar } from 'notistack';
import { MobileBottomNav } from 'components'

export default function ProfileAccount() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar();
  const [auth, setAuth] = useState({
    _id: undefined,
    fullname: '',
    email: '',
    // password: '',
    wallet: '',
    register_referral_code: '',
    phone: ''
  })
  const [password,setPassword]=useState('')
  const [showPassword, setShowPassword] = useState(false)

  const saveAuth = async () => {
    try {
      const response = await axios.post(`${config.API_URL}/appuser/upsert`, auth)
      if (response.data.result) {
        if (password) {
          const resp = await axios.post(`${config.API_URL}/appuser/changePassword`, {email:auth.email,new_password:password})
          if (resp.data.result) {
            
          } else {
            enqueueSnackbar(resp.data.data, { variant: 'error' })
          }
        }
        const respp = await axios.post(`${config.API_URL}/appuser/info`, {app_user_id:auth._id})
        if (respp.data.result) {
          window.localStorage.setItem('accessAuth', JSON.stringify(respp.data.data));
          enqueueSnackbar('Successfully saved!', { variant: 'success' })
        } else {
          enqueueSnackbar(respp.data.data, { variant: 'error' })
        }
      } else {
        enqueueSnackbar(response.data.data, { variant: 'error' })
      }
    } catch (e) {
      enqueueSnackbar('Failed', { variant: 'error' })
      console.log(e)
    }
  }

  useEffect(() => {
    let accessAuth = window.localStorage.getItem('accessAuth') || '';
    let tmp = JSON.parse(accessAuth)
    setAuth({...tmp, register_referral_code: tmp.referral_code})
  }, [])

  return (
    <>
      <ShellTitle title="My Account" />
      <div className='main'>
        <div>
          <Card className='main_card'>
            <CardContent>
              <Box sx={{ mb: 2 }}>
                <div style={{ transform: 'translateY(38px)', textAlign: 'left' }}>
                  <WestIcon style={{ color: '#0E1446', fontSize: 24, fontWeight: 600, cursor: 'pointer' }} onClick={() => router.push('/app/profile')} />
                </div>
                <Typography className='p_title' style={{ color: '#0E1446', fontSize: 24, fontWeight: 600 }}>
                  My Account
                </Typography>
              </Box>
              {/* <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
                <Avatar alt="Remy Sharp" sx={{ width: '80px', height: '80px' }}>
                  <img src='../../../profile.png' width={45} height={50} />
                </Avatar>
                <PencilCircle style={{color: 'rgb(65 98 255)'}}/>
              </div> */}
              <div style={{ marginTop: 50 }}>
                <Grid container spacing={5}>
                  <Grid item xs={12} style={{ paddingTop: 20 }}>
                    <Typography className='input_title'>User Name</Typography>
                    <TextField
                      fullWidth
                      type='text'
                      placeholder=''
                      disabled
                      value={auth.fullname || ''}
                      onChange={(e) => setAuth({ ...auth, fullname: e.target.value })}
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
                      value={auth.email || ''}
                      onChange={(e) => setAuth({ ...auth, email: e.target.value })}
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
                      <Typography className='input_title'>Phone</Typography>
                      <OutlinedInput
                        id='form-layouts-basic-password'
                        type='text'
                        aria-describedby='form-layouts-basic-password-helper'
                        value={auth.phone || ''}
                        onChange={(e) => setAuth({ ...auth, phone: e.target.value })}
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
                  <Grid item xs={12} style={{ paddingTop: 20 }}>
                    <FormControl fullWidth>
                      <Typography className='input_title'>USDT TRC20 (RECEIVER) Wallet Address</Typography>
                      <OutlinedInput
                        id='form-layouts-basic-password'
                        type='text'
                        aria-describedby='form-layouts-basic-password-helper'
                        value={auth.wallet || ''}
                        onChange={(e) => setAuth({ ...auth, wallet: e.target.value })}
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
                              <KeyVariant style={{ color: '#6D43FD' }} />
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
                      <Typography className='input_title'>Password</Typography>
                      <OutlinedInput
                        id='form-layouts-basic-password'
                        type={showPassword ? 'text' : 'password'}
                        aria-describedby='form-layouts-basic-password-helper'
                        value={password || ''}
                        onChange={(e) => setPassword(e.target.value )}
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
                        onClick={() => saveAuth()}
                      >
                        Save
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </div>
            </CardContent>
          </Card>
          {/* <MobileBottomNav selIndex={5}/> */}
          </div>
      </div>
    </>
  )
}

ProfileAccount.layout = AppLayout
