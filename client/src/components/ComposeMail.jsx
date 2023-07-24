import { useState } from 'react';

import { Dialog, styled, Typography, Box, InputBase, TextField, Button } from '@mui/material'; 
import { Close, DeleteOutline } from '@mui/icons-material';
import useApi from '../hooks/useApi';
import { API_URLS } from '../services/api.urls';

const dialogStyle={
    maxWidth:'100%',
    maxHeight:'100%',
    height:'90%',
    width:'80%',
    boxShadow:'none',
    borderRadius:'10px 10px 0 0'
  }
  
  const Header=styled(Box)({
    display:'flex',
    justifyContent:'space-between',
    padding:'10px 15px',
    background:'#f2f6fc',
    '& > p':{
      fontSize:14,
      fontWeight:500
    }
  })
  
  const RecipientWrapper = styled(Box)({
    display:'flex',
    flexDirection:'column',
    padding:'0 15px',
    '& > div':{
      fontSize:14,
      borderBottom:'1px solid #F5F5F5',
      marginTop:10
    }
  })
  
  
  const Footer=styled(Box)({
     display:'flex',
     justifyContent:'space-between',
     padding:'10px 15px',
     alignItems:'center'
  })
  
  const SendButton=styled(Button)({
    background:'#0B57D0',
    color:'#fff',
    fontWeight:500,
    textTransform:'none',
    borderRadius:18,
    width:100
  })

  const ComposeMail = ({openDialog,setOpenDialog}) =>{

    const[data,setData]=useState({});
  
    const sentEmailService = useApi(API_URLS.saveSentEmail);
  
    const config={
      Host : "smtp.elasticemail.com",
      Username : process.env.REACT_APP_USERNAME,
      Password : process.env.REACT_APP_PASSWORD,
      Port : 2525,
    }
  
    const closeComposeMail=(e)=>{
     // e.preventDefault();
    //  e.preventDefault() is used to prevent the default form submission behavior and stop the page from reloading
     setOpenDialog(false);
    }
  
    const sendMail=(e)=>{
       e.preventDefault();
      if(window.Email){
         window.Email.send({
              ...config,
            To : data.to,
            From : 'kajal rai',
            Subject : data.subject,
            Body : data.body
          }).then(
            message => alert(message),
            error => alert(error) // Add an error callback
          );
      }
  
        //we need to make a payload when send button is clicked
       const payload={
        to:data.to,
        from:'raikajal0207@gmail.com',
        subject:data.subject,
        body:data.body,
        date:new Date(),
        image:'',
        name:'kajal rai', //the person who send the mail
        starred:false,
        type:'sent'
       }
       
      sentEmailService.call(payload);
  
      if(!sentEmailService.error){ //if no error occured while sending the email
        setOpenDialog(false);// error
        setData({}); //data is reinitialized to its initial value for new email
      }
      setOpenDialog(false);
    }
  
    const onValueChange=(e)=>{
         setData({...data,[e.target.name]:e.target.value});
    }
 
    return(
        <Dialog open={openDialog}
        PaperProps={{sx:dialogStyle}}>
           <Header>
            <Typography>New Message</Typography>
            <Close fontSize="small" onClick={(e)=>closeComposeMail()}/>
            </Header> 
            <RecipientWrapper>
              <InputBase placeholder='Recipients' name="to" onChange={(e)=>onValueChange(e)}/>
              <InputBase placeholder='Subject' name="subject" onChange={(e)=>onValueChange(e)}/>
            </RecipientWrapper> 
            <TextField multiline  rows={14}
            sx={{'& .MuiOutlinedInput-notchedOutline':{border:'none'},fontSize:10} }
            onChange={(e)=>onValueChange(e)}
            name="body"
            />
              <Footer>
                <SendButton onClick={(e)=>sendMail(e)}>Send</SendButton>    {/* even sendMail function can be written as below */}
                <DeleteOutline onClick={()=>setOpenDialog(false)}/>
              </Footer> 
        </Dialog>
      )
    }
    
    export default  ComposeMail;