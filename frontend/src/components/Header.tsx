import React from 'react'
import { AppBar,Toolbar } from '@mui/material'
import Logo from './shared/Logo'
import NavigationLink from './shared/NavigationLink';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const auth=useAuth();
  return <AppBar sx={{bgcolor:"transparent",position:"static",bpxShadow:"none"}}>
    <Toolbar sx={{display:"flex"}}>
     <Logo />
     <div>
       {auth.isLoggedIn?(
       <>
       <NavigationLink bg="#00fffc" to="/chat" text="Go to Chat" textcolor="black" />
       <NavigationLink  bg="#51538f" textcolor="white" to="/" text="logout" onClick={auth.logout}/>
       </>):(<>
        <NavigationLink bg="#00fffc" to="/login" text="login" textcolor="black" />
       <NavigationLink  bg="#51538f" textcolor="white" to="/signup" text="signup" onClick={auth.logout}/>
       </>
    )}
     </div>
    </Toolbar>
  </AppBar>
}

export default Header
