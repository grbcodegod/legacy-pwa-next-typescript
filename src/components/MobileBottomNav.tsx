import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LanguageIcon from '@mui/icons-material/Language';
import PersonIcon from '@mui/icons-material/Person';

function getSelected(path: string, paths: string[]) {
  for (let i = 0; i < paths.length; i++) {
    if (path.startsWith(paths[i])) {
      return i
    }
  }

  return -1
}

export function MobileBottomNav(selIndex, { className = '' }: { className?: string }) {
  const router = useRouter()
  const [selected, setSelected] = useState(-1)
  const menuItems = useMemo(
    () => [
      {
        label: ``,
        icon: selIndex.selIndex===1 ? <HomeIcon style={{color: '#6D43FD'}}/>:<HomeIcon style={{color: '#DADFE7'}}/>,
        path: '/app',
        key: 0
      },
      { 
        label: ``, 
        icon: selIndex.selIndex===2 ? <MarkEmailUnreadIcon style={{color:'#6D43FD'}}/>:<MarkEmailUnreadIcon style={{color:'#DADFE7'}}/>, 
        path: '/app/support', 
        key: 1 
      },
      { 
        label: ``, 
        icon: selIndex.selIndex===3 ? <AssessmentIcon  style={{color: '#6D43FD'}}/>:<AssessmentIcon  style={{color: '#DADFE7'}}/>, 
        path: '/app/account', 
        key: 2 
      },
      { 
        label: ``, 
        icon: selIndex.selIndex===4 ? <LanguageIcon style={{color:'#6D43FD'}}/>:<LanguageIcon style={{color:'#DADFE7'}}/>, 
        path: '/app/terms', 
        key: 3 
      },
      { 
        label: ``, 
        icon: selIndex.selIndex===5 ? <PersonIcon style={{color:'#6D43FD'}} />:<PersonIcon style={{color:'#DADFE7'}} />, 
        path: '/app/profile',
        key: 4 
      }
    ],
    []
  )

  useEffect(() => {
    const currSelected = getSelected(
      router.asPath,
      menuItems.map((item) => item.path)
    )

    if (currSelected !== -1) {
      setSelected(currSelected)
    }
  }, [selIndex,router.asPath, menuItems])

  return (
    <BottomNavigation
      value={selected}
      onChange={(_event, newValue) => {
        setSelected(newValue)
        router.push(menuItems[newValue].path)
      }}
      showLabels
      sx={{
        '&.MuiBottomNavigation-root': {
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          width: '100%',
          color: (theme) => theme.palette.text.primary
        }
      }}
      className={className}
    >
      {menuItems.map((item) => (
        <BottomNavigationAction
          // key={item.path}
          key={item.key}
          sx={{
            '&.MuiBottomNavigationAction-root': {
              // color: (theme) => theme.palette.text.primary
              color: '#6D43FD'
            },
            '&:hover': {
              color: '#6D43FD'
              // bgcolor: (theme) => theme.palette.action.hover
              // bgcolor: '#DADFE7'
            },
            '&.Mui-selected': {
              color: '#6D43FD'
              // bgcolor: (theme) => theme.palette.action.selected
              // bgcolor: '#6D43FD'
            }
          }}
          label={item.label}
          icon={item.icon}
        />
      ))}
    </BottomNavigation>
  )
}
