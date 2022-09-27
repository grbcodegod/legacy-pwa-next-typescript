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
import { MobileBottomNav } from 'components'
import { useAppShell } from 'components/providers/AppShellProvider'

export default function Account() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar();
  const { state } = useAppShell()
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
		additional_payouts: [],
    referral_volume:0

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

  const goPledge = () => {
    router.push('/app/pledge')
  }

  const goProfit = () => {
    router.push('/app/profit')
  }

  const goMonthlyCommission = () => {
    router.push('/app/monthlycommission')
  }

  const goReferralCommission = () => {
    router.push('/app/referralcommission')
  }

  const goReferrals = () => {
    router.push('/app/referrals')
  }

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
      <ShellTitle title="Account" />
      <div style={{
        backgroundColor: state.theme === 'dark' ? '#0F0F0F':'#eaeaea', minWidth: 375, maxWidth: 520, minHeight: 819, position: 'absolute', left: '50%',
        transform: 'translateX(-50%)', textAlign: 'center'
      }}>
        <div>
          <Box sx={{ mb: 2, mt: 4}}>
            {/* <div style={{ transform: 'translateY(15px)', float: 'left' }}>
              <WestIcon style={{ color: '#93989F', marginLeft: 35, cursor: 'pointer' }} />
            </div> */}
            <div style={{textAlign: 'center'}}>
              <p className='p_title' style={{color: state.theme === 'dark' ? '#fff':'#0E1446'}}>Account</p>
            </div>
          </Box>
        </div>
        <div>
          <Grid container>
            <Grid item xs={6}>
              <Card style={{ border: '1px solid #FC8440', borderRadius: 20, width: 150, height: 150, marginLeft: 34, marginRight: 12, cursor: 'pointer' }} onClick={()=>goProfit()}>
                <img src='../../../balance.png' width={40} style={{ marginTop: 20 }} />
                <Typography style={{ color: state.theme === 'dark' ? '#fff':'#0E1446', fontSize: 26, fontWeight: 600 }}>${data.pledges_sum.toLocaleString()}</Typography>
                <Typography style={{ color: state.theme === 'dark' ? '#fff':'#0E1446', fontSize: 13, fontWeight: 600 }}>My Capital</Typography>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card style={{ border: '1px solid #0E1446', borderRadius: 20, width: 150, height: 150, marginLeft: 12, marginRight: 24, cursor: 'pointer' }} onClick={() => goReferrals()}>
                <img src='../../../referral_balance.png' width={40} style={{ marginTop: 20 }} />
                {/* <Typography style={{ color: '#0E1446', fontSize: 26, fontWeight: 600 }}>${data.referral_payout_sum.toLocaleString()}</Typography> */}
                <Typography style={{ color: state.theme === 'dark' ? '#fff':'#0E1446', fontSize: 26, fontWeight: 600 }}>${data.referral_volume.toLocaleString()}</Typography>
                <Typography style={{ color: state.theme === 'dark' ? '#fff':'#0E1446', fontSize: 13, fontWeight: 600 }}>Total Referral Capital</Typography>
              </Card>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <div style={{margin: '40px 34px 0px 34px'}}>
                <Button type='submit' variant='contained' fullWidth
                  style={{ height: 64, backgroundColor: '#FC8440',textTransform:'none',color:'#fff' }}
                  sx={{ borderRadius: '15px', fontSize: 18, fontWeight: 600 }}
                  onClick={()=>goProfit()}
                >
                  Profits
                </Button>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div style={{margin: '24px 34px 0px 34px'}}>
                <Button type='submit' variant='contained' fullWidth
                  style={{ height: 64, backgroundColor: '#6D43FD',textTransform: 'none',color:'#fff' }}
                  sx={{ borderRadius: '15px', fontSize: 18, fontWeight: 600 }}
                  onClick={()=>goMonthlyCommission()}
                >
                  Monthly Commissions
                </Button>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div style={{margin: '24px 34px 30px 34px'}}>
                <Button type='submit' variant='contained' fullWidth
                  style={{ height: 64, backgroundColor: '#6D43FD',textTransform: 'none',color:'#fff' }}
                  sx={{ borderRadius: '15px', fontSize: 18, fontWeight: 600 }}
                  onClick={()=>goReferralCommission()}
                >
                  {/* Referrals / Commissions */}
                  Commissions Breakdown
                </Button>
              </div>
            </Grid>
          </Grid>
        </div>
        <Card sx={{ background: state.theme === 'dark' ? '#0D0D0D':'#FBFCFF', padding: '30px 24px 50px 24px', borderRadius: '30px', textAlign: 'center', borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0 }}>
          <Grid container>
            <Grid item xs={12}>
              <Typography style={{ color: state.theme === 'dark' ? '#fff':'#0E1446', fontSize: 20, fontWeight: 600 }}>Referral ID</Typography>
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
              <Grid item xs={2}>
                <div style={{float: 'right', paddingTop:15}}>
                  <Avatar alt="Remy Sharp" style={{ width: 40, height: 40 }}>
                    <img src='../../../profile.png' width={40} height={40} />
                  </Avatar>
                </div>
              </Grid>
              <Grid item xs={8}>
                <Typography style={{ paddingTop: 5, fontSize: 20, fontWeight: 600, lineHeight: '30px', color: state.theme === 'dark' ? '#fff':'#0E1446' }}>{auth.fullname}</Typography>
                <Typography style={{ paddingTop: 5, fontSize: 12, fontWeight: 500, lineHeight: '30px', color: '#93989F' }}>{auth.referral_code}</Typography>
              </Grid>
              <Grid item xs={2}>
                <div style={{ marginTop:15,width: 36, height: 36, borderRadius: 4, float: 'left', backgroundColor: state.theme === 'dark' ? '#1A1919':'#0E1446' }}>
                  <ContentCopyOutlinedIcon style={{color:'#fff', marginTop: 6, cursor: 'pointer'}} onClick={()=>copyCode()}/>
                </div>
              </Grid>
              </div>
            </Grid>
          </Grid>
        </Card>
        {/* <MobileBottomNav selIndex={3}/> */}
      </div>
    </>
  )
}

Account.layout = AppLayout
