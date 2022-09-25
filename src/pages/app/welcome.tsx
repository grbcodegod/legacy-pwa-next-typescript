import { Global } from '@emotion/react'
import { cookies } from 'lib/shared/config'
import Cookies from 'js-cookie'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { Box, Paper, Typography, Card, CardContent, TextField, Button, 
  FormControl, OutlinedInput, InputLabel, Grid,InputAdornment,
  IconButton, FormHelperText } from '@mui/material'
// import '../../public/assets/css/custom.css'

export default function Index() {
  const router = useRouter()
  const goHome = () => {
    router.push('/app')
  }

  return (
    <>
      <div
        css={{
          display: 'flex',
          flexFlow: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          backgroundColor:'#0E1446'
        }}
      >
        <div
          css={{
            maxWidth: '300px',
            '& img': {
              width: '100%',
              height: 'auto'
            }
          }}
        >
          {/* <Image alt="" src='../../../legacy-logo.png' width={168} height={51} /> */}
        </div>
      </div>
      <Grid container>
        <Grid item xs={12} style={{textAlign: 'center'}}>
          <Box
            sx={{
              // gap: 5,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 24
            }}
          >
            <Button type='submit' variant='contained'
              style={{height: 64, width:311, backgroundColor: '#FC8440', borderRadius: 20}}
              sx={{ borderRadius: '15px', fontSize: 20}}
              onClick={()=>goHome()}
            >
              Go to Home
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
