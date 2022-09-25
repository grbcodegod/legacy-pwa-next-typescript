import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Typography, Card, Grid, Avatar,Button, Box } from '@mui/material'
import { ShellTitle } from 'components'
import { AppLayout } from 'components/layout'
import {
  CircularProgressbar,
  buildStyles,
  CircularProgressbarWithChildren
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from 'axios'
import config from '../../config'
import { useSnackbar } from 'notistack';
import { MobileBottomNav, } from 'components'
import Link from 'next/link'

export default function Home() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar();
  const [project, setProject] = useState({ fund_raised: 0, fund_target: 0 })
  const [accessAuth, setAccessAuth] = useState('')
  const [auth, setAuth] = useState('')
  const [percentage, setPercentage] = useState(0)

  const goPledge = () => {
    router.push('/app/pledge')
  }
  useEffect(() => {
    var accessAuth = window.localStorage.getItem('accessAuth')
    setAccessAuth(accessAuth)
    setAuth(JSON.parse(accessAuth))
  }, []);

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
      <ShellTitle title="Home" />
      <div style={{backgroundColor: '#EBF0FF', minWidth: 375, maxWidth: 520, minHeight: 667, position: 'absolute', left: '50%', transform: 'translateX(-50%)'}}>
        <div style={{padding: '40px 40px 20px 40px'}}>
        <div style={{ display: 'flex' }}>
          <Avatar alt="Remy Sharp" style={{ width: 52, height: 52 }}>
            <img src='../../../user.png' width={50} height={50} />
          </Avatar>
          <div style={{ paddingLeft: 20 }}>
            <Typography style={{ paddingTop: 10, fontSize: 20, fontWeight: 600, lineHeight: '30px', color: '#0E1446' }}>{auth.fullname}</Typography>
          </div>
        </div>
        </div>
        <div>
          {/* <Box display='flex' justifyContent='center' alignItems='center'> */}
            {/* <CircularProgressbar */}
              {/* // value={percentage}
              // text={`${percentage}%`}
              // strokeWidth={9}
              // styles={buildStyles({
              //   textSize: 26,
                // pathColor: '#6D43FD',
                // textColor: '#FC8440',
              //   backgroundColor: '#3e98c7',
              //   rotation: 0.5 + (1 - percentage / 100) / 2
              // })}
            // />
            {/* <div style={{position: 'absolute', color: '#FC8440', fontSize: 48, fontWeight: 600}}>{percentage}%</div> */}
          {/* </Box> */}
          <div style={{display:'flex',justifyContent:'center'}}>
          <div style={{width:215,height:215}}>
          <CircularProgressbarWithChildren value={percentage}
            styles={buildStyles({
              pathColor: '#6D43FD',
              textColor: '#FC8440',
            })}
          >
            <div className='pro_back'>
              <span style={{position: 'absolute', color: '#FC8440', fontSize: 48, fontWeight: 600, padding: 43}}>{percentage}%</span>
            </div>
          </CircularProgressbarWithChildren>
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <Grid container>
            <Grid item xs={6}>
              <div style={{ textAlign: 'center', padding: 30 }}>
                <Typography style={{ color: '#0E1446', fontSize: 25, fontWeight: 600 }}>${project.fund_target.toLocaleString()}</Typography>
                <Typography style={{ color: '#8A8A8A', fontSize: 14, fontWeight: 400 }}>Target</Typography>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div style={{ textAlign: 'center', padding: 30 }}>
                <Typography style={{ color: '#0E1446', fontSize: 25, fontWeight: 600 }}>${project.fund_raised.toLocaleString()}</Typography>
                <Typography style={{ color: '#8A8A8A', fontSize: 14, fontWeight: 400 }}>Balance</Typography>
                <Typography></Typography>
              </div>
            </Grid>
          </Grid>
        </div>
        <Card sx={{ background: '#FBFCFF', padding: '30px 24px 50px 24px', borderRadius: '30px', textAlign: 'center', borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0 }}>
          {/* <Grid container>
            <Grid item xs={6}>
              <Card style={{ border: '1px solid #0E1446', borderRadius: 20, height: 150, marginRight: 10, cursor: 'pointer' }} onClick={()=>router.push('/app/terms')}>
                <img src='../../../contract.png' width={40} style={{ marginTop: 20 }} />
                <Typography style={{ color: '#0E1446', fontSize: 20, fontWeight: 600 }}>Contract Agreement</Typography>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card style={{ border: '1px solid #FC8440', borderRadius: 20, height: 150, marginLeft: 10, cursor: 'pointer' }} onClick={() => goPledge()}>
                <img src='../../../pledge.png' width={40} style={{ marginTop: 20 }} />
                <Typography style={{ color: '#0E1446', fontSize: 20, fontWeight: 600, padding: '0 20px 0 20px' }}>Pledge Money</Typography>
              </Card>
            </Grid>
          </Grid> */}
          <Grid container>
            <Grid item xs={12}>
              <div style={{margin: '40px 34px 0px 34px'}}>
                <Button type='submit' variant='contained' fullWidth
                  style={{ height: 64, backgroundColor: '#FC8440',textTransform:'none' }}
                  sx={{ borderRadius: '15px', fontSize: 18, fontWeight: 600 }}
                  onClick={()=>router.push('/app/pledge')}
                >
                  PLEDGE
                </Button>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div style={{margin: '24px 34px 0px 34px'}}>
              <a href="agreement1.pdf" target="_blank" style={{textDecoration: 'none'}}>
                <Button type='submit' variant='contained' fullWidth
                  style={{ height: 64, backgroundColor: '#6D43FD',textTransform: 'none' }}
                  sx={{ borderRadius: '15px', fontSize: 18, fontWeight: 600 }}
                >
                  SOUTHONE AGREEMENT
                </Button></a>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div style={{margin: '24px 34px 30px 34px'}}>
              <a href="agreement2.pdf" target="_blank" style={{textDecoration: 'none'}}>
                <Button type='submit' variant='contained' fullWidth
                  style={{ height: 64, backgroundColor: '#6D43FD',textTransform: 'none' }}
                  sx={{ borderRadius: '15px', fontSize: 18, fontWeight: 600 }}
                >
                  USER AGREEMENT
                </Button></a>
              </div>
            </Grid>
          </Grid>
        </Card>
        {/* <MobileBottomNav selIndex={1}/> */}
        </div>
      </div>
    </>
  )
}

Home.layout = AppLayout
