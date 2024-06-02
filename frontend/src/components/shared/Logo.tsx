import { Typography } from '@mui/material'
import React from 'react'
import {Link} from 'react-router-dom'
const Logo = () => {
  return <div style={
    {display:'flex',marginRight:"auto",alignItems:'center',gap:'8px'}
  }
  >
    <Link to={"/"}>
        <img src="movies-logo.png" alt="Ai" width={'60px'} height={"60px"} className='image-inverted'/>
       
    </Link>
    <Typography sx={{
            display:{md:"block",sm:"none",xs:"none"}, 
            mr:"auto",
            fontWeight:"1500",textShadow:"8px 8px 38px #000",
            }}>
                <span style={{fontSize:"20px"}}>Movies Hub</span>
        </Typography>
  </div>
}

export default Logo
