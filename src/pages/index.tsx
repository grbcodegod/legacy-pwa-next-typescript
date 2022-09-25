import { Global } from '@emotion/react'
import { cookies } from 'lib/shared/config'
import Cookies from 'js-cookie'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Login from './login'
// import forceScreenSize from '../src/lib/fix/forceScreenSize'

export default function Index() {
  const router = useRouter()
  const handleAppLaunch = (e: React.MouseEvent) => {
    // if (!Cookies.get(cookies.slideshowShown.name) || e.ctrlKey) {
    // Cookies.set(cookies.slideshowShown.name, '1')
    // router.push('/onboarding')
    // } else {
    router.push('/login')
    // }
  }

  useEffect(() => {
    setTimeout(function () {
      router.push('/login')
    }, 3000);
  }, [])

  return (
    <>
      <Global
        styles={{
          body: {
            // fontFamily: 'system-ui, sans-serif',
            fontFamily: 'system-ui, Poppins',
            backgroundColor: '#0E1446',
            margin: 0,
            color: '#4c4a4a'
          },
          '@media (prefers-color-scheme: dark)': {
            body: {
              backgroundColor: '#0E1446',
              color: '#fff'
            }
          }
        }}
      />
      <div
        css={{
          display: 'flex',
          flexFlow: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          minWidth: 375,
          minHeight: 667
        }}
        onClick={handleAppLaunch}
      >
        <div
          css={{
            maxWidth: '340px',
            '& img': {
              width: '100%',
              height: 'auto'
            }
          }}
        >
          <img src='logo.png' width={50} height={50} />
        </div>
      </div>
    </>
  )
}
