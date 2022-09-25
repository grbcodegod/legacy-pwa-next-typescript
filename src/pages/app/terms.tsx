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

export default function Support() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar();
  const [project, setProject] = useState({ fund_raised: 0, fund_target: 0 })
  const [accessAuth, setAccessAuth] = useState('')
  const [auth, setAuth] = useState('')
  const [percentage, setPercentage] = useState(0)

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
      <ShellTitle title={`Terms ${'&'} Conditions`} />
      <div style={{
        backgroundColor: 'rgb(244 244 244)', minWidth: 375, maxWidth: 520, height: 667, position: 'absolute', left: '50%',
        transform: 'translateX(-50%)'
      }}>
        <div style={{height:640}}>
          <div style={{padding: 20, textAlign: 'center'}}>
            <p className='p_title' style={{color: '#0E1446'}}>Terms {'&'} Conditions</p>
          </div>
          <div style={{padding: '0 30px'}}>
            <p style={{color: '#0E1446', fontSize: 18, fontWeight: 700}}>Terms</p>
            <p style={{color: '#8A8A8A', fontSize: 15, fontWeight: 400}}>A Privacy Policy is a legal statement that specifies what the business owner does with the personal data collected from users, along with how the data is processed.</p>
          </div>
          <div style={{padding: '0 30px'}}>
            <p style={{color: '#0E1446', fontSize: 18, fontWeight: 700}}>Service</p>
            <p style={{color: '#8A8A8A', fontSize: 15, fontWeight: 400}}>A Privacy Policy is a legal statement that specifies what the business owner does with the personal data collected from users, along with how the data is processed.</p>
          </div>
        </div>
        {/* <MobileBottomNav selIndex={4} /> */}
      </div>
    </>
  )
}

Support.layout = AppLayout
