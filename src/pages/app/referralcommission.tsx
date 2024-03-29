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
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

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

export default function ReferralCommission() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar();
  const [auth, setAuth] = useState({
    _id: undefined,
    fullname: '',
    email: '',
    wallet: ''
  })
  const [data, setData]=useState([{
    amount: 0,
    investor_name: "",
    createdAt: '',
    confirmed_amount:0,
    fullname:'',
    investor_payouts:0,
    app_user_name:'',
    base_amount:0
  }])
  const [filters, setFilters]=useState([{
    amount: 0,
    investor_name: "",
    createdAt: '',
    confirmed_amount:0,
    fullname:'',
    investor_payouts:0,
    app_user_name:'',
    base_amount:0
  }])
  const [curMonth, setCurMonth] = useState(new Date())
  const [prevMonth, setPrevMonth] = useState(0)
  const [nextMonth, setNextMonth] = useState(0)
  // const [year,setYear]=useState(0)
  // const [month,setMonth]=useState(0)

  const changeDatePicker = (date) => {
    const curY = new Date(date).getFullYear()
    const curM = new Date(date).getMonth()
    setCurMonth(date)
    setPrevMonth(curM === 0 ? month[11] : month[curM - 1])
    setNextMonth(curM === 11 ? month[0] : month[curM + 1])
    setFilters(data.filter(p => (p.year === curY) && (p.month-1 === curM) ))
  }

  const selMonth = (pn) => {
    let curY = new Date(curMonth).getFullYear()
    let curM = new Date(curMonth).getMonth()
    if (pn === -1) {
      if (curM === 0) {
        curM = 11
        curY -= 1
      } else {
        curM -= 1
      }
    } else if (pn === 1) {
      if (curM === 11) {
        curM = 0
        curY += 1
      } else {
        curM += 1
      }
    }
    changeDatePicker(new Date(`${curY}-${curM + 1}-1`))
  }

  useEffect(() => {
    let accessAuth = window.localStorage.getItem('accessAuth') || '';
    let tmp = JSON.parse(accessAuth)
    setAuth(tmp)
  }, [])

  useEffect(() => {
    (async () => {
      try {
        if (!auth._id) return
        const response = await axios.post(`${config.API_URL}/account/referrals`, {
          app_user_id: auth._id
        })
        if (response.data.result) {
          if (response.data.data) {
            console.log(response.data.data,'-------data')
            setData(response.data.data)

            let params = (new URL(document.location)).searchParams;
            let year = params.get("year");
            let mm = params.get("month");
            console.log(`year=${year}   month=${mm}`)
            if(year && mm){
              setCurMonth(new Date(`${year}-${mm}-1`))
              console.log(new Date(`${year}-${mm}-1`))
              setPrevMonth(mm === 1 ? month[11] : month[mm - 2])
              setNextMonth(mm === 12 ? month[0] : month[mm])
              setFilters(response.data.data.filter(p => (p.year === year) && (p.month === new Number(mm)) ))
            } else {
              const curY = new Date().getFullYear()
              const curM = new Date().getMonth()
              setCurMonth(new Date())
              setPrevMonth(curM === 0 ? month[11] : month[curM - 1])
              setNextMonth(curM === 11 ? month[0] : month[curM + 1])
              setFilters(response.data.data.filter(p => p.year === curY && p.month-1 === curM ))
            }
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

  // useEffect(()=>{
  //   let params = (new URL(document.location)).searchParams;
  //   let year = params.get("year");
  //   let mm = params.get("month");
  //   setCurMonth(new Date(`${year}-${mm}-1`))
  //   console.log(new Date(`${year}-${mm}-1`))
  //   setPrevMonth(mm === 1 ? month[11] : month[mm - 1])
  //   setNextMonth(mm === 12 ? month[0] : month[mm + 1])
  //   setFilters(data.filter(p => p.year === year && p.month === mm ))
  // },[])

  return (
    <div className='main'>
      <ShellTitle title="Commissions Breakdown" />
      <div style={{ width: '100%', backgroundImage: 'url(../../../app/back_blue.png)', height: '150px' }}>
        <div>
          <Box sx={{ mb: 2 }}>
            <div style={{ transform: 'translateY(35px)' }}>
              <WestIcon style={{ color: '#fff', marginLeft: 24, cursor: 'pointer' }} onClick={()=>router.push('/app/account')} />
            </div>
            <Typography className='p_title' style={{fontSize: 20, fontWeight: 600}}>Commissions Breakdown</Typography>
          </Box>
          <Card className='main_card' sx={{background: '#f2f3f6'}} style={{height: 700, borderTopLeftRadius: 30, borderTopRightRadius: 30}}>
            <Grid container>
              <Grid item xs={12}>
                <div style={{margin: '12px 18px 0 12px'}}>
                  <Grid container>
                    <Grid item xs={3}>
                      {/* <div style={{paddingTop: 20, cursor: 'pointer'}} onClick={()=>selMonth(-1)}>
                        <Typography style={{ color: '#0E1446', fontSize: 14, fontWeight: 600 }}>{prevMonth}</Typography>
                      </div> */}
                    </Grid>
                    <Grid item xs={6}>
                      {/* <Card sx={{borderRadius: '15px', height: '60px', border: '1px solid #6D43FD', cursor: 'pointer'}} onClick={()=>selMonth(mons[1], 1)}>
                        <div style={{paddingTop: 20}}>
                          <Typography style={{ color: '#0E1446', fontSize: 14, fontWeight: 600 }}>{mons[1]}</Typography>
                        </div>
                      </Card> */}
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                       <DatePicker
                        views={['year', 'month']}
                        openTo="month"
                        // label="Year and Month"
                        minDate={dayjs('2012-03-01')}
                        maxDate={dayjs('2023-06-01')}
                        value={curMonth}
                        onChange={(newValue) => changeDatePicker(newValue)}
                        renderInput={(params) => <TextField {...params} helperText={null} />}
                      />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={3}>
                      {/* <div style={{paddingTop: 20, cursor: 'pointer'}} onClick={()=>selMonth(1)}>
                        <Typography style={{ color: '#0E1446', fontSize: 14, fontWeight: 600 }}>{nextMonth}</Typography>
                      </div> */}
                    </Grid>
                  </Grid>
                  <div style={{color: '#2F394E', fontSize: 14, fontWeight: 700}}>
                    <Grid container>
                      <Grid item xs={4}>
                        <p>Referrals</p>
                      </Grid>
                      <Grid item xs={4}>
                        <p>Profit</p>
                      </Grid>
                      <Grid item xs={4}>
                        <p>Commission</p>
                      </Grid>
                    </Grid>
                  </div>
                </div>
                <div style={{padding: 12}}>
                  {filters.map((p, index)=>
                    <Card sx={{marginBottom: '10px', borderRadius: '12px', fontSize: 13, fontWeight: 600, color:'#454446', boxShadow: 'none'}} key={index}>
                      <Grid container>
                        <Grid item xs={4}>
                          <div style={{paddingTop: 10}}>
                            <span>{p.app_user_name || ''}</span>
                          </div>
                          <div id='profit_amount'>
                            <span>${p.base_amount?parseFloat(p.base_amount.toFixed(2)).toLocaleString() : ''}</span>
                          </div>
                        </Grid>
                        <Grid item xs={4}>
                          <p style={{paddingTop: 13}}>${p.amount?parseFloat(p.amount.toFixed(2)).toLocaleString() : ''}</p>
                        </Grid>
                        <Grid item xs={4}>
                          <p style={{paddingTop: 13}}>${p.amount?parseFloat((p.amount/5).toFixed(2)).toLocaleString() : ''}</p>
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

ReferralCommission.layout = AppLayout
