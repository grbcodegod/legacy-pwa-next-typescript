import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import {
  Box, Typography, Card, CardContent, TextField, Button, Dialog, DialogActions,
  DialogTitle, DialogContent, DialogContentText, Grid, Container
} from '@mui/material'
import { ShellTitle } from 'components'
import { AppLayout } from 'components/layout'
import WestIcon from '@mui/icons-material/West';
import axios from 'axios'
import config from '../../config'
import { useSnackbar } from 'notistack';
import { MobileBottomNav, } from 'components'

const month = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

export default function MonthlyCommission() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar();
  const [auth, setAuth] = useState({
    _id: undefined,
    fullname: '',
    email: '',
    wallet: ''
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
  const [referral_payouts, setReferral_payouts]=useState([{
    createdAt: '',
    base_amount: 0,
    amount: 0,
    percentage: 0
  }])

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
          if (response.data.data) {
            setData(response.data.data)
            setReferral_payouts(response.data.data.referral_payouts)
          }
        } else {
          enqueueSnackbar(response.data.data, { variant: 'error' })
        }
      } catch (e) {
        console.log(e)
        enqueueSnackbar('Failed', { variant: 'error' })
      }
    })();
  }, [auth._id]);

  return (
    <div className='main'>
      <ShellTitle title="Monthly Commission" />
      <div style={{ width: '100%', backgroundImage: 'url(../../../app/back_blue.png)', height: '150px' }}>
        <div>
          <Box sx={{ mb: 2 }}>
            <div style={{ transform: 'translateY(35px)' }}>
              <WestIcon style={{ color: '#fff', marginLeft: 24, cursor: 'pointer' }} onClick={()=>router.push('/app/account')} />
            </div>
            <Typography className='p_title' style={{fontSize: 20, fontWeight: 600}}>Monthly Commission</Typography>
          </Box>
          <Card className='main_card' sx={{background: '#f2f3f6'}} style={{height: 700, borderTopLeftRadius: 30, borderTopRightRadius: 30}}>
            <Grid container>
              <Grid item xs={12}>
                <div style={{margin: '12px 18px 0 12px'}}>
                  <Card sx={{borderRadius: '20px', height: '102px', border: '1px solid #6D43FD'}}>
                    <Grid container>
                      <Grid item xs={3}>
                        <div style={{float: 'right'}}>
                          <img src='../../../referral_balance.png' width={40} style={{ marginTop: 25 }} />
                        </div>
                      </Grid>
                      <Grid item xs={9}>
                        <div style={{paddingTop: 12}}>
                          <Typography style={{ color: '#0E1446', fontSize: 30, fontWeight: 600 }}>${data.referral_payout_sum.toLocaleString()}</Typography>
                          <Typography style={{ color: '#0E1446', fontSize: 14, fontWeight: 600 }}>Total Commissions To </Typography>
                        </div>
                      </Grid>
                    </Grid>
                  </Card>
                  <div style={{color: '#2F394E', fontSize: 14, fontWeight: 700}}>
                    <Grid container>
                      <Grid item xs={3}>
                        <p>Month</p>
                      </Grid>
                      <Grid item xs={2}>
                        <p>%</p>
                      </Grid>
                      <Grid item xs={3}>
                        <p>Profit</p>
                      </Grid>
                      <Grid item xs={4}>
                        <p>Commission</p>
                      </Grid>
                    </Grid>
                  </div>
                </div>
                <div style={{padding: 12}}>
                  {referral_payouts.map((p, index)=>
                    <Card sx={{marginBottom: '10px', borderRadius: '12px', fontSize: 13, fontWeight: 600, color:'#454446', boxShadow: 'none'}}>
                      <Grid container>
                        <Grid item xs={3}>
                          <div style={{paddingTop: 10}}>
                            <span>{p.profit_name}</span>
                          </div>
                          <div id='profit_year'>
                            <span>{new Date(p.createdAt).getFullYear()}</span>
                          </div>
                        </Grid>
                        <Grid item xs={2}>
                          <p style={{paddingTop: 13}}>{p.percentage}%</p>
                        </Grid>
                        <Grid item xs={3}>
                          <p style={{paddingTop: 13}}>${(p.amount*5).toFixed(2).toLocaleString()}</p>
                        </Grid>
                        <Grid item xs={4}>
                          <p style={{paddingTop: 13}}>${p.amount.toFixed(2).toLocaleString()}</p>
                        </Grid>
                      </Grid>
                    </Card>
                  )}
                </div>
              </Grid>
            </Grid>
          </Card>
        </div>
        {/* <MobileBottomNav selIndex={3} /> */}
      </div>
    </div>
  )
}

MonthlyCommission.layout = AppLayout
