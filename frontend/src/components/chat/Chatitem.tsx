import { Avatar, Box, Typography } from '@mui/material';
import React from 'react'
import { useAuth } from '../../context/AuthContext';

const Chatitem = ({content,role}:{content:string,role:"user"|"assistant";}) => {
    const auth=useAuth();
  return role==="assistant" ? (
  <Box sx={{display:"flex",p:2,bgcolor:"#004d5612",my:2,gap:2}}>
    <Avatar sx={{ml:"0",}}>
        <img src="openai.jpg" alt="openai" width={"30px"}/>
    </Avatar>
    <Box>
        <Typography footsize={"20px"}>{content} </Typography>
    </Box>
     </Box>)
  :(<Box sx={{display:"flex",p:2,bgcolor:"#004d56",gap:2}}>
  <Avatar sx={{ml:"0",bgcolor:"white",color:'black'}}>
  {auth?.user?.name[0]}
  </Avatar>
  <Box>
      <Typography footsize={"20px"}>{content} </Typography>
  </Box>
   </Box>)
};

export default Chatitem;
