import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Typography, Card, Grid, Avatar, Button, Box } from '@mui/material'
import { ShellTitle } from 'components'
import { AppLayout } from 'components/layout'
import {
  CircularProgressbar,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import WestIcon from '@mui/icons-material/West';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import axios from 'axios'
import config from '../../config'
import { useSnackbar } from 'notistack';
import { useQRCode } from 'next-qrcode';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { MobileBottomNav } from 'components'

export default function Profile() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar();
  const { Canvas } = useQRCode();
  const [auth, setAuth] = useState({
    _id: undefined,
    fullname: '',
    email: '',
    wallet: '',
    referral_code: ''
  })
  const [data, setData]=useState({
    pledges_sum: 0,
		pledges: [],
		investor_payout_sum: 0,
		investor_payouts: [],
		referral_payout_sum: 0,
		referral_payouts: [],
		additional_payout_sum: 0,
		additional_payouts: []
  })

  useEffect(() => {
    let accessAuth = window.localStorage.getItem('accessAuth') || '';
    let tmp = JSON.parse(accessAuth)
    setAuth(tmp)
  }, [])

  useEffect(() => {
    (async () => {
      try {
        if (!auth._id) return
        const response = await axios.post(`${config.API_URL}/account/info`, {
          app_user_id: auth._id
        })
        if (response.data.result) {
          if (response.data.data)
            setData(response.data.data)
        } else {
          enqueueSnackbar(response.data.data, { variant: 'error' })
        }
      } catch (e) {
        console.log(e)
        enqueueSnackbar('Failed', { variant: 'error' })
      }
    })();
  }, [auth._id]);

  const copyCode = async() => {
    try {
      await navigator.clipboard.writeText(`https://legacy1.co.uk/register?referral=${auth.referral_code}`);
      enqueueSnackbar('Copied!', { variant: 'success' })
    } catch (err) {
      enqueueSnackbar('Failed to copy!', { variant: 'error' })
    }
  }

  return (
    <>
      <ShellTitle title="Profile" />
      <div style={{
        backgroundColor: '#eaeaea', minWidth: 375, maxWidth: 520, minHeight: 819, position: 'absolute', left: '50%',
        transform: 'translateX(-50%)', textAlign: 'center'
      }}>
        <div>
          <Box sx={{ mb: 2, mt: 3}}>
            <div style={{textAlign: 'center'}}>
              <p className='p_title' style={{color: '#0E1446'}}>Profile</p>
            </div>
          </Box>
        </div>
        <div>
          <Grid container>
            <Grid item xs={12}>
              <div style={{margin: '0 34px 10px 34px', display: 'flex', justifyContent: 'center'}}>
                <Avatar alt="Remy Sharp" style={{ width: 112, height: 112 }}>
                  <img src='../../../profile.png' width={112} height={112} />
                </Avatar>
              </div>
            </Grid>
            <Grid item xs={12} sx={{margin: '0 20px'}}>
              <div style={{margin: 20, cursor: 'pointer'}} onClick={()=>router.push('/app/profileaccount')}>
                <Grid container>
                  <Grid item xs={10}>
                    <div style={{display: 'flex'}}>
                      <PersonIcon style={{color: '#6D43FD'}}/>
                      <Typography style={{paddingLeft: 20, fontSize: 16, fontWeight: 600}}>My Account</Typography>
                    </div>
                  </Grid>
                  <Grid item xs={2}>
                    <div style={{float: 'right'}}>
                      <div style={{paddingTop: 5}}>
                        <ArrowForwardIosIcon style={{color: '#B7BAC2', fontSize: 'medium', cursor: 'pointer'}} onClick={()=>router.push('/app/profileaccount')}/>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item xs={12} sx={{margin: '0 20px'}}>
              <div style={{margin: '10px 20px', cursor: 'pointer'}} onClick={()=>router.push('/app/settings')}>
                <Grid container>
                  <Grid item xs={10}>
                    <div style={{display: 'flex'}}>
                      <SettingsIcon style={{color: '#6D43FD'}}/>
                      <Typography style={{paddingLeft: 20, fontSize: 16, fontWeight: 600}}>Settings</Typography>
                    </div>
                  </Grid>
                  <Grid item xs={2}>
                    <div style={{float: 'right'}}>
                      <div style={{paddingTop: 5}}>
                        <ArrowForwardIosIcon style={{color: '#B7BAC2', fontSize: 'medium', cursor: 'pointer'}} onClick={()=>router.push('/app/settings')}/>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </div>
        <Card sx={{ background: '#FBFCFF', padding: '30px 24px 50px 24px', borderRadius: '30px', textAlign: 'center', borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0, marginTop: '100px' }}>
          <Grid container>
            <Grid item xs={12}>
              <Typography style={{ color: '#0E1446', fontSize: 20, fontWeight: 600 }}>Referral ID</Typography>
            </Grid>
            {/* <Grid item xs={12}>
              <Typography style={{ color: '#0E1446', fontSize: 18, fontWeight: 600 }}>Scan this QR code with your device camera.</Typography>
            </Grid> */}
            <Grid item xs={12}>
              <div style={{display: 'flex', justifyContent: 'center', marginTop: 24}}>
                <Card style={{ border: '1px solid #0E1446', borderRadius: 20, width: 104, height: 104, cursor: 'pointer' }}>
                  <div style={{paddingTop: 11}}>
                    {auth.referral_code && <Canvas
                      text={`https://legacy1.co.uk/register?referral=${auth.referral_code}`}
                      options={{
                        type: 'image/jpeg',
                        quality: 0.3,
                        level: 'M',
                        margin: 1,
                        scale: 4,
                        width: 80,
                        color: {
                          dark: '#0E1446',
                          light: '#fff',
                        }
                      }}
                    />}
                  </div>
                </Card>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div style={{ padding: 24, display: 'flex', justifyContent: 'center' }}>
                <div style={{paddingTop: 10}}>
                  <Avatar alt="Remy Sharp" style={{ width: 40, height: 40 }}>
                    <img src='../../../profile.png' width={40} height={40} />
                  </Avatar>
                </div>
                <div style={{padding: '0 12px'}}>
                  <div style={{width: '100%'}}>
                  <span style={{ paddingTop: 0, fontSize: 15, fontWeight: 600, lineHeight: '30px', color: '#0E1446' }}>{auth.referral_code}</span>
                  </div>
                  <div style={{width: '100%'}}>
                  <span style={{ paddingTop: 0, fontSize: 12, fontWeight: 600, lineHeight: '30px', color: '#93989F' }}>{auth.referral_code}</span>
                  </div>
                </div>
                <div style={{paddingTop: 10}}>
                  <div style={{ width: 36, height: 36, borderRadius: 4, float: 'left', backgroundColor: '#0E1446' }}>
                    <ContentCopyOutlinedIcon style={{color:'#fff', marginTop: 6, cursor: 'pointer'}} onClick={()=>copyCode()}/>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Card>
        {/* <MobileBottomNav selIndex={5}/> */}
      </div>
    </>
  )
}

Profile.layout = AppLayout
