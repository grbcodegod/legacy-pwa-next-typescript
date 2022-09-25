import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import {
  Box, Typography, Card, CardContent, TextField, Button, Slide,
  FormControl, OutlinedInput, Grid, InputAdornment, IconButton, Avatar, Switch, styled 
} from '@mui/material'
import { ShellTitle } from 'components'
import { AppLayout } from 'components/layout'
import Logout from 'mdi-material-ui/Logout'
import WestIcon from '@mui/icons-material/West';
import axios from 'axios'
import config from '../../config'
import rootReducer from 'store/rootReducer'
import { MobileBottomNav } from 'components'
import { useSnackbar } from 'notistack';

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#FC8440',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,//#FC8440
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

export default function Settings() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar();
  const [auth, setAuth] = useState({
    _id: undefined,
    fullname: '',
    email: '',
    password: '',
    wallet: '',
    register_referral_code: '',
    phone: ''
  })

  const logout = () => {
    window.localStorage.removeItem('accessAuth')
    router.push('/login')
  }

  useEffect(() => {
    let accessAuth = window.localStorage.getItem('accessAuth') || '';
    let tmp = JSON.parse(accessAuth)
    setAuth({...tmp, register_referral_code: tmp.referral_code})
  }, [])

  return (
    <>
      <ShellTitle title="Settings" />
      <div className='main' style={{minHeight: 667}}>
        <div>
        <Card className='main_card' style={{height:667}}>
          <CardContent>
            <Box sx={{ mb: 2 }}>
              <div style={{ transform: 'translateY(38px)', textAlign: 'left' }}>
                <WestIcon style={{ color: '#0E1446', cursor: 'pointer', fontSize: 24, fontWeight: 600 }} onClick={() => router.push('/app/profile')} />
              </div>
              <Typography className='p_title' style={{ color: '#0E1446', fontSize: 24, fontWeight: 600 }}>
                Settings
              </Typography>
            </Box>
            <div style={{ marginTop: 40, width: '100%' }}>
              <Grid container spacing={2}>
                {/* <Grid item xs={10}>
                  <div style={{display: 'flex', paddingTop: 10}}>
                    <Typography style={{fontSize: 16, fontWeight: 600}}>Face ID</Typography>
                  </div>
                </Grid>
                <Grid item xs={2}>
                  <div style={{float: 'right'}}>
                    <IOSSwitch sx={{ m: 1 }} defaultChecked />
                  </div>
                </Grid> */}
                <Grid item xs={10}>
                  <div style={{display: 'flex', paddingTop: 10}}>
                    <Typography style={{fontSize: 16, fontWeight: 600}}>Dark mode</Typography>
                  </div>
                </Grid>
                <Grid item xs={2}>
                  <div style={{float: 'right'}}>
                    <IOSSwitch sx={{ m: 1 }} defaultChecked />
                  </div>
                </Grid>
                <Grid item xs={10}>
                  <div style={{display: 'flex', paddingTop: 10}}>
                    <Typography style={{fontSize: 16, fontWeight: 600}}>Notifications</Typography>
                  </div>
                </Grid>
                <Grid item xs={2}>
                  <div style={{float: 'right'}}>
                    <IOSSwitch sx={{ m: 1 }} defaultChecked />
                  </div>
                </Grid>
                <Grid item xs={10}>
                  <div style={{display: 'flex', paddingTop: 10}}>
                    <Typography style={{fontSize: 16, fontWeight: 600}}>Logout</Typography>
                  </div>
                </Grid>
                <Grid item xs={2}>
                  <div style={{float: 'left', marginTop: 10}}>
                    <Logout style={{color: '#6D43FD', cursor:'pointer'}} onClick={()=>logout()}/>
                  </div>
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

Settings.layout = AppLayout
