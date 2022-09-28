import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Typography, Card, Grid, Avatar, Button, Box } from '@mui/material'
import { ShellTitle } from 'components'
import { AppLayout } from 'components/layout'
import "react-circular-progressbar/dist/styles.css";
import WestIcon from '@mui/icons-material/West';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import axios from 'axios'
import config from '../../config'
import { useSnackbar } from 'notistack';
import { MobileBottomNav, } from 'components'
import { useQRCode } from 'next-qrcode';
import Link from 'next/link'
import { useAppShell } from 'components/providers/AppShellProvider'

export default function Support() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar();
  const { Canvas } = useQRCode();
  const { state } = useAppShell()
  const [project, setProject] = useState({ fund_raised: 0, fund_target: 0 })
  const [accessAuth, setAccessAuth] = useState('')
  const [auth, setAuth] = useState({
    _id: undefined,
    fullname: '',
    email: '',
    wallet: '',
    referral_code: ''
  })
  const [percentage, setPercentage] = useState(0)

  const contactUs=()=>{
    window.location.href = "mailto:contact@legacy1.co.uk?subject=Subject&body=message%20goes%20here";
  }

  const goTelegram=()=>{
    window.location.href = "https://t.me/+6U2jXYg7nAVjZTI0";
  }

  const copyCode = async() => {
    try {
      await navigator.clipboard.writeText(`https://legacy1.co.uk/register?referral=${auth.referral_code}`);
      enqueueSnackbar('Copied!', { variant: 'success' })
    } catch (err) {
      enqueueSnackbar('Failed to copy!', { variant: 'error' })
    }
  }

  useEffect(() => {
    let accessAuth = window.localStorage.getItem('accessAuth') || '';
    let tmp = JSON.parse(accessAuth)
    setAuth(tmp)
  }, [])

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post(`${config.API_URL}/project/get`)
        if (response.data.result) {
          var project = response.data.data;
          setProject(project);

          var percentage = Math.round(project.fund_raised / project.fund_target * 100)
          setPercentage(percentage)
        } else {
          enqueueSnackbar(response.data.data, { variant: 'error' })
        }
      } catch (e) {
        console.log(e)
        enqueueSnackbar('Failed', { variant: 'error' })
      }
    })();
  }, []);

  return (
    <>
      <ShellTitle title="Support" />
      <div style={{
        backgroundColor: state.theme === 'dark' ? '#0F0F0F':'rgb(244 244 244)', minWidth: 375, maxWidth: 520, minHeight: 819, position: 'absolute', left: '50%',
        transform: 'translateX(-50%)', textAlign: 'center'
      }}>
        <div style={{padding: 20}}>
          <Box sx={{ mb: 2}}>
            <p className='p_title' style={{color: state.theme === 'dark' ? '#fff':'#0E1446'}}>Support</p>
          </Box>
        </div>
        <div style={{padding: '10px 24px 150px 24px'}}>
          <Grid container>
            <Grid item xs={12}>
              <Card sx={{marginBottom: '10px', padding: '20px 30px', borderRadius: '12px', fontSize: 13, fontWeight: 600, color:'#454446', boxShadow: 'none', cursor:'pointer'}}
                onClick={()=>contactUs()}>
                <div style={{display: 'flex'}}>
                  <img src='../../../contact.png' width={40} style={{ marginTop: 10 }} />
                  <Typography style={{ paddingLeft: 20, marginTop: 17, color: state.theme === 'dark' ? '#fff':'#0E1446', fontSize: 17, fontWeight: 600 }}>Contact Us</Typography>
                </div>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card sx={{marginBottom: '10px', padding: '20px 30px', borderRadius: '12px', fontSize: 13, fontWeight: 600, color:'#454446', boxShadow: 'none', cursor:'pointer'}}
                onClick={()=>goTelegram()}
                >
                <div style={{display: 'flex'}}>
                  <img src='../../../telegram.png' width={40} style={{ marginTop: 10 }} />
                  <Typography style={{ paddingLeft: 20, marginTop: 17, color: state.theme === 'dark' ? '#fff':'#0E1446', fontSize: 18, fontWeight: 600 }}>Telegram</Typography>
                </div>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <a href="../southone_overview.pdf" target="_blank" style={{textDecoration: 'none'}}>
                <Card sx={{marginBottom: '10px', padding: '20px 30px', borderRadius: '12px', fontSize: 13, fontWeight: 600, color:'#454446', boxShadow: 'none', cursor:'pointer'}}>
                  <div style={{display: 'flex'}}>
                    <img src='../../../contact_agree.png' width={40} style={{ marginTop: 10 }} />
                    <Typography style={{ paddingLeft: 20, marginTop: 17, color: state.theme === 'dark' ? '#fff':'#0E1446', fontSize: 17, fontWeight: 600 }}>SouthOne Overview</Typography>
                  </div>
                </Card>
              </a>
            </Grid>
            <Grid item xs={12}>
              <a href="../southone_agreement.pdf" target="_blank" style={{textDecoration: 'none'}}>
                <Card sx={{marginBottom: '10px', padding: '20px 30px', borderRadius: '12px', fontSize: 13, fontWeight: 600, color:'#454446', boxShadow: 'none', cursor:'pointer'}}>
                  <div style={{display: 'flex'}}>
                    <img src='../../../contact_agree.png' width={40} style={{ marginTop: 10 }} />
                    <Typography style={{ paddingLeft: 20, marginTop: 17, color: state.theme === 'dark' ? '#fff':'#0E1446', fontSize: 17, fontWeight: 600 }}>SouthOne Agreement</Typography>
                  </div>
                </Card>
              </a>
            </Grid>
            <Grid item xs={12}>
              <a href="../user_agreement.pdf" target="_blank" style={{textDecoration: 'none'}}>
                <Card sx={{marginBottom: '10px', padding: '20px 30px', borderRadius: '12px', fontSize: 13, fontWeight: 600, color:'#454446', boxShadow: 'none', cursor:'pointer'}}>
                  <div style={{display: 'flex'}}>
                    <img src='../../../contact_agree.png' width={40} style={{ marginTop: 10 }} />
                    <Typography style={{ paddingLeft: 20, marginTop: 17, color: state.theme === 'dark' ? '#fff':'#0E1446', fontSize: 17, fontWeight: 600 }}>User Agreement</Typography>
                  </div>
                </Card>
              </a>
            </Grid>
            <Grid item xs={12}>
              <a href="../terms_conditions.pdf" target="_blank" style={{textDecoration: 'none'}}>
                <Card sx={{marginBottom: '10px', padding: '20px 30px', borderRadius: '12px', fontSize: 13, fontWeight: 600, color:'#454446', boxShadow: 'none', cursor:'pointer'}}
                  // onClick={()=>router.push('/app/terms')}
                  >
                  <div style={{display: 'flex'}}>
                    <img src='../../../term.png' width={40} style={{ marginTop: 10 }} />
                    <Typography style={{ paddingLeft: 20, marginTop: 17, color: state.theme === 'dark' ? '#fff':'#0E1446', fontSize: 18, fontWeight: 600 }}>Terms & Conditions</Typography>
                  </div>
                </Card>
              </a>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  )
}

Support.layout = AppLayout
