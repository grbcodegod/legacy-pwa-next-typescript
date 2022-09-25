import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import {
  Box, Typography, Card, CardContent, TextField, Button, Dialog, DialogActions,
  DialogTitle, DialogContent, DialogContentText,InputSuffix,InputAdornment
} from '@mui/material'
import { ShellTitle } from 'components'
import { AppLayout } from 'components/layout'
import WestIcon from '@mui/icons-material/West';
import axios from 'axios'
import config from '../../config'
import { useSnackbar } from 'notistack';
import { MobileBottomNav, } from 'components'

export default function Pledge() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar();
  const [auth, setAuth] = useState({
    _id: undefined,
    fullname: '',
    email: '',
    wallet: ''
  })
  const [project, setProject] = useState({
    deposit_address: ''
  })
  const [pledge, setPledge] = useState({
    _id: undefined,
    fullname: '',
    investor_id: '',
    transaction: '',
    amount: ''
  })
  const [transaction, setTransaction] = useState('')
  const [wallet, setWallet] = useState('')
  const [openAmount, setOpenAmount] = useState(false)
  const [openTx, setOpenTx] = useState(false)
  const [openWallet, setOpenWallet] = useState(false)
  const [isStepTwo, setIsStepTwo] = useState(false)
  const [error,setError]=useState({
    amount:'',
    txid:'',
    wallet:''
  })
  const [disableAmount,setDisableAmount]=useState(false)
  const [disableTx, setDisableTx]=useState(false)
  const [disableWallet, setDisableWallet]=useState(false)
  const [successMsg,setSuccessMsg]=useState('')

  useEffect(() => {
    let accessAuth = window.localStorage.getItem('accessAuth') || '';
    let tmp = JSON.parse(accessAuth)
    setPledge({
      _id: undefined,
      fullname: tmp.fullname,
      investor_id: tmp._id,
      transaction: '',
      amount: ''
    })
    setAuth(tmp)
  }, [])

  // project/get
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post(`${config.API_URL}/project/get`)
        if (response.data.result) {
          if (response.data.data) setProject(response.data.data)
        } else {
          enqueueSnackbar(response.data.data, { variant: 'error' })
        }
      } catch (e) {
        console.log(e)
        enqueueSnackbar('Failed', { variant: 'error' })
      }
    })();
  }, []);

  const goHome = () => {
    router.push('/app')
  }

  const submitAmount = async () => {
    (async () => {
      try {
        if (Number(pledge.amount) < 500) {
          // enqueueSnackbar('Please submit more than $500', { variant: 'error' })
          setError({...error,amount:'Please submit more than $500'})
          return
        }
        let _id = pledge._id
        const response = await axios.post(`${config.API_URL}/pledge/upsert`, { amount: pledge.amount, investor_id: auth._id })
        if (response.data.result) {
          if (response.data.data) {
            setPledge({ ...pledge, _id: _id ? _id : response.data.data })
            enqueueSnackbar('Suceessfully operated', { variant: 'success' })
            setIsStepTwo(true)
            setDisableTx(false)
            setDisableWallet(false)
            setError({...error,amount:''})
            setDisableAmount(true)
            setDisableTx(false)
          }
        } else {
          setError({...error,amount:response.data.data})
          // enqueueSnackbar(response.data.data, { variant: 'error' })
        }
      } catch (e) {
        console.log(e)
        setError({...error,amount:'Failed'})
        // enqueueSnackbar('Failed', { variant: 'error' })
      }
    })();
  }

  const sendTx = () => {
    (async () => {
      try {
        if (transaction==='') {
          setError({...error,txid:'Please input txId'})
          return
        }
        const response = await axios.post(`${config.API_URL}/pledge/upsert`,
          { _id: pledge._id, investor_id: pledge.investor_id, amount: pledge.amount, transaction }
        )
        if (response.data.result) {
          setDisableTx(true)
          enqueueSnackbar('Suceessfully operated', { variant: 'success' })
          setError({...error,txid:''})
        } else {
          // enqueueSnackbar(response.data.data, { variant: 'error' })
          setError({...error,txid:response.data.data})
        }
      } catch (e) {
        console.log(e)
          setError({...error,txid:'Failed'})
          // enqueueSnackbar('Failed', { variant: 'error' })
      }
    })();
  }

  const sendWallet = () => {
    (async () => {
      try {
        if (wallet==='') {
          setError({...error,wallet:'Please input wallet address'})
          return
        }const response = await axios.post(`${config.API_URL}/appuser/upsert`, { ...auth, wallet })
        if (response.data.result) {
          if (response.data.data) {
            setAuth({ ...auth, wallet })
            setError({...error,wallet:''})
            setDisableAmount(false)
            setDisableTx(false)
            enqueueSnackbar('Suceessfully operated', { variant: 'success' })
            setSuccessMsg('You have already submitted your pledge, TXID and Wallet address.Please wait for admin to approve your submission.You may also submit a new pledge.')
            goHome()
          }
        } else {
          setError({...error,wallet:response.data.data})
          // enqueueSnackbar(response.data.data, { variant: 'error' })
        }
      } catch (e) {
        console.log(e)
        setError({...error,wallet:'Failed'})
          // enqueueSnackbar('Failed', { variant: 'error' })
      }
    })();
  }

  // pledge/get
  useEffect(() => {
    (async () => {
      try {
        if (!auth._id) return
        const response = await axios.post(`${config.API_URL}/pledge/get`, {
          investor_id: auth._id
        })
        if (response.data.result) {
          var data = response.data.data;
          if (data && !data.transaction) { setPledge(data); setIsStepTwo(true); }
          else { setIsStepTwo(false); }
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
    <div className='main' style={{minHeight: 780}}>
      <ShellTitle title="Pledge" />
      <div style={{ width: '100%', backgroundImage: 'url(../../../app/back.png)', height: '150px' }}>
        <div>
          <Box sx={{ mb: 2 }}>
            <div style={{ transform: 'translateY(35px)' }}>
              <WestIcon style={{ color: '#fff', marginLeft: 24, cursor: 'pointer' }} onClick={() => goHome()} />
            </div>
            <Typography className='p_title'>Pledge</Typography>
          </Box>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Card className='content' sx={{ background: '#FBFCFF', marginBottom:0 }}>
              <CardContent>
                <span className='error'>{successMsg}</span>
                <Typography className='pledge_title' sx={{ pt: 2 }}>
                  My Pledge
                </Typography>
                <Typography className='pledge_desc'>
                  How much would you like to Pledge? Min $500
                </Typography>
                <div style={{ margin: '12px' }}>
                  <TextField fullWidth id="outlined-basic" variant="outlined" value={pledge ? pledge.amount : 0}
                    type='number'
                    inputProps={{ style: { textAlign: 'center' } }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderRadius: `12px`
                        },
                        fontSize: '24px',
                        color: '#17172C',
                        fontWeight: 600,
                      },
                      '& legend': { display: 'none' },
                      input: { "&::placeholder": { fontSize: 13 }}
                    }}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>
                    }}
                    disabled={isStepTwo}
                    onChange={(e) => setPledge({ ...pledge, amount: e.target.value })}
                  />
                  <span className='error'>{error.amount}</span>
                </div>
                <div className='cnt'>
                  <Typography className='pay_desc'>All Payments in USDT  TRC20 Only</Typography>
                  <div style={{ margin: '12px', textAlign: 'right' }}>
                    <Button variant="contained"
                      sx={{
                        width: '103px',
                        height: '48px',
                        background: '#0E1446',
                        borderRadius: '10px',
                        '& legend': { display: 'none' }
                      }}
                      style={{textTransform: 'none'}}
                      // disabled={disableAmount}
                      disabled={isStepTwo}
                      onClick={() => setOpenAmount(true)}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
                <div className='cnt'>
                  {(isStepTwo && !disableTx) &&
                    <><p className='pay_desc'>Once you submit your pledge, we will email our wallet address to your registered email ID. <br />Please confirm the last 6 digits on the wallet address are: <span style={{textTransform:'none'}}>{project.deposit_address ? project.deposit_address.substr(-6) : ''}</span></p></>
                  }
                </div>
                <div className='cnt'>
                  <Typography className='pay_desc1'>Once Payment is sent please submit your TXID below</Typography>
                  <Typography className='pay_desc'>(Without this we cannot verify your payment)</Typography>
                </div>
                <div style={{ margin: '12px' }}>
                  <TextField fullWidth id="outlined-basic" placeholder="TXID" variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderRadius: `12px`
                        },
                        fontSize: '24px',
                        color: '#17172C',
                        fontWeight: 600,
                      },
                      '& legend': { display: 'none' },
                      input: { "&::placeholder": { fontSize: 13 }}
                    }}
                    disabled={!isStepTwo || disableTx}
                    value={transaction}
                    onChange={(e) => setTransaction(e.target.value)}
                  />
                  <span className='error'>{error.txid}</span>
                  <div style={{ marginTop: '12px', textAlign: 'right' }}>
                    <Button variant="contained"
                      sx={{
                        width: '103px',
                        height: '48px',
                        background: '#0E1446',
                        borderRadius: '10px'
                      }}
                      style={{textTransform: 'none'}}
                      // disabled={disableTx}
                      disabled={!isStepTwo || disableTx}
                      onClick={() => setOpenTx(true)}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
                <div style={{ margin: '12px' }}>
                  <Typography className='pay_desc1'>Please supply a USDT TRC20 (RECEIVER) Wallet Address</Typography>
                  <TextField fullWidth id="outlined-basic" placeholder="USDT TRC20 Address" variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderRadius: `12px`
                        },
                        fontSize: '24px',
                        color: '#17172C',
                        fontWeight: 600,
                        input: { "&::placeholder": { fontSize: 13 }}
                      }
                    }}
                    // InputLabelProps={{style: {fontSize: 13}}}
                    // disabled={disableWallet}
                    disabled={!isStepTwo}
                    value={wallet}
                    onChange={(e) => setWallet(e.target.value)}
                  />
                  <span className='error'>{error.wallet}</span>
                  <div style={{ marginTop: '12px', textAlign: 'right' }}>
                    <Button variant="contained"
                      sx={{
                        width: '103px',
                        height: '48px',
                        background: '#0E1446',
                        borderRadius: '10px'
                      }}
                      style={{textTransform: 'none'}}
                      // disabled={disableWallet}
                      disabled={!isStepTwo}
                      onClick={() => (setOpenWallet(true))}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        {/* <MobileBottomNav selIndex={1}/> */}
        </div>
      </div>
      <Dialog
        open={openAmount}
        onClose={() => setOpenAmount(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Confirm your Pledge to send ${pledge.amount}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            style={{textTransform: 'none'}}
            onClick={() => setOpenAmount(false)}>Cancel</Button>
          <Button 
            style={{textTransform: 'none'}}
            onClick={() => {
            submitAmount()
            setOpenAmount(false)
          }} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openTx}
        onClose={() => setOpenTx(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Is your TXID {transaction}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            style={{textTransform: 'none'}}
            onClick={() => setOpenTx(false)}>Cancel</Button>
          <Button 
            style={{textTransform: 'none'}}
            onClick={() => {
            sendTx()
            setOpenTx(false)
          }} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openWallet}
        onClose={() => setOpenWallet(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Is this USDT TRC20 wallet address?<br/>
            We will send your payments to this wallet.<br/>
            You can change it in settings.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style={{textTransform: 'none'}} onClick={() => setOpenWallet(false)}>Cancel</Button>
          <Button style={{textTransform: 'none'}} onClick={() => {
            sendWallet()
            setOpenWallet(false)
          }} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

Pledge.layout = AppLayout
