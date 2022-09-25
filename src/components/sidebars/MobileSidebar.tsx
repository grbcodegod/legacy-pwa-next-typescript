import { Box, List, Typography, useMediaQuery, useTheme } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { Actions, useAppShell } from 'components/providers/AppShellProvider'
import { DefaultMenuItems } from 'components/sidebars'
import { NextApplicationPage } from 'pages/_app'
import { memo, useCallback, useEffect,useState } from 'react'
import { useRouter } from 'next/router'

export const MobileSidebar = memo(function MobileSidebar({
  sidebar
}: {
  sidebar?: NextApplicationPage['mobileSidebar']
}) {
  const { state, dispatch } = useAppShell()
  const theme = useTheme()
  const router = useRouter()

  const closeDrawer = useCallback(() => {
    dispatch({ type: Actions.MOBILE_DRAWER_IS_OPEN, payload: false })
  }, [dispatch])

  const openDrawer = () => {
    dispatch({ type: Actions.MOBILE_DRAWER_IS_OPEN, payload: true })
  }

  const matches = useMediaQuery(theme.breakpoints.up('md'), {
    ssrMatchMedia: () => {
      return {
        matches: false
      }
    }
  })

  const defaultItems = (
    <DefaultMenuItems onClick={closeDrawer}></DefaultMenuItems>
  )

  const menuItems = sidebar ? (
    sidebar(defaultItems)
  ) : (
    <List>{defaultItems}</List>
  )

  return (<>
    {(router.pathname!=='/login' && router.pathname!=='/register') && <Box
      sx={{
        width: { md: state.mobileDrawerWidth },
        flexShrink: { md: 0 },
      }}
    >
      <SwipeableDrawer
        disableBackdropTransition={!state.isIOS}
        disableDiscovery={state.isIOS}
        variant="temporary"
        anchor="left"
        transitionDuration={400}
        open={state.mobileDrawerIsOpen}
        onClose={closeDrawer}
        onOpen={openDrawer}
        sx={{
          '.MuiDrawer-paper': {
            width: state.mobileDrawerWidth,
            backgroundColor: (theme) => theme.palette.background.default,
            backgroundImage: 'none'
          },
        }}
        ModalProps={{
          keepMounted: true
        }}
      >
        <div style={{paddingTop: 70, textAlign:'center'}}>
          <img src='../../../logo.png' width={50} height={50}/>
        </div>
        <div style={{paddingTop: 20}}>
          {menuItems}
        </div>
      </SwipeableDrawer>
    </Box>}</>
  )
})
