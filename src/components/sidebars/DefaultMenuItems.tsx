import { AppMenuItem } from 'components/sidebars'
import HomeIcon from '@mui/icons-material/Home';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LanguageIcon from '@mui/icons-material/Language';
import PersonIcon from '@mui/icons-material/Person';

export function DefaultMenuItems({
  onClick
}: {
  onClick?: (...args: any[]) => void
}) {
  return (
    <>
      <AppMenuItem link={{ href: '/app' }} onClick={onClick}>
        <div className='ms_con'>
          <div><HomeIcon/></div>
          <div className='ms_ml_10'>
            <span>Home</span>
          </div>
        </div>
      </AppMenuItem>
      <AppMenuItem link={{ href: '/app/support' }} onClick={onClick}>
        <div className='ms_con'>
          <div><MarkEmailUnreadIcon/></div>
          <div className='ms_ml_10'>
            <span>Support</span>
          </div>
        </div>
      </AppMenuItem>
      <AppMenuItem link={{ href: '/app/account' }} onClick={onClick}>
        <div className='ms_con'>
          <div><AssessmentIcon/></div>
          <div className='ms_ml_10'>
            <span>Account</span>
          </div>
        </div>
      </AppMenuItem>
      <AppMenuItem link={{ href: '/app/news' }} onClick={onClick}>
        <div className='ms_con'>
          <div><LanguageIcon/></div>
          <div className='ms_ml_10'>
            <span>News</span>
          </div>
        </div>
      </AppMenuItem>
      <AppMenuItem link={{ href: '/app/profile' }} onClick={onClick}>
        <div className='ms_con'>
          <div><PersonIcon/></div>
          <div className='ms_ml_10'>
            <span>Profile</span>
          </div>
        </div>
      </AppMenuItem>
      {/* <AppMenuItem link={{ href: '/app/settings' }} onClick={onClick}>
        Settings
      </AppMenuItem>
      <AppMenuItem link={{ href: '/onboarding' }} onClick={onClick}>
        Onboarding
      </AppMenuItem> */}
    </>
  )
}
