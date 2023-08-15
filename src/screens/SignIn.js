import React from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { CartContext } from '../CartContext';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { Button, FormControl, InputLabel, OutlinedInput } from '@mui/material';

export function SignInPage() {
    const navigate = useNavigate();
  const [email, setEmail] = React.useState('9999');
  const [otp, setOtp] = React.useState('');
  const [msg, setMsg] = React.useState('');
  const [minutes, setMinutes] = React.useState(1);
  const [seconds, setSeconds] = React.useState(30);
  const [open, setOpen] = React.useState(false); 

  const {auth, setAuth} = React.useContext(CartContext);

  const customConfig = {
    headers: {
    'Content-Type': 'application/json'
    }
  };

  React.useEffect(() => {
    auth!=='' && navigate("/consumer");

    const interval = setInterval(() => {
        if (seconds > 0) {
            setSeconds(seconds - 1);
        }
    
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(interval);
            } else {
                setSeconds(59);
                setMinutes(m => m - 1);
            }
        }
        }, 1000);
    
        return () => {
            clearInterval(interval);
        };
    }, [seconds,minutes,auth,navigate,open]);

    const sendOtp = () => {
        const otpData = {
            MobileNo: email
        }
        axios
            .post("http://localhost:5000/otpData", 
                    JSON.stringify(otpData), 
                    customConfig)
            .then(res => console.log(res.data))
        setMinutes(0);
        setSeconds(10);
    }

  const handleMobileSubmit = (event) => {
    event.preventDefault();
    sendOtp();
    setOpen(true);
  };

  const resendOtp = () => {
    sendOtp();
    setOtp('')
    setMsg('')
  }

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        if(minutes===0 && seconds===0) { 
            setMsg('OTP Expired')
            setOtp('')
        }else {
            const otpVerify = {
                MobileNo: email,
                EnteredOtp: otp
            }
            axios
                .post("http://localhost:5000/otpVerify", 
                        JSON.stringify(otpVerify), 
                        customConfig)
                .then((res) => {
                    if(res.data.OtpStatus==='isVerified'){
                        setOpen(false)
                        setAuth(email)
                        console.log('Moving to next page')
                    }else{
                        setMsg('Wrong OTP')
                    }
                })
            setOtp('')
        }
    }

    const handleClose = (e) => {
        e.preventDefault();
        setOpen(false)
    };

  return (
    <Box sx={{ 
        width: '50%',
        height: '50%',
        position: 'absolute', 
        boxShadow: 2,
        borderRadius: 2,
        left: '25%', 
        top: '25%',
        backgroundColor: 'primary.light', }}>
    <Card sx={{ 
        margin:2,
        column:'flex',
        // width: '90%',
        // height: '50%',
        bgcolor:'lightgrey' }} >    
        <CardContent >
            <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="mobileNo">Enter Mobile No.</InputLabel>
                <OutlinedInput
                id="email"
                // defaultValue={'9999'}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                />
            </FormControl>
        </CardContent>
        <CardActions disableSpacing>
            <br />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Verify OTP</DialogTitle>
                <DialogContent>
                    <TextField required
                    id="otp" 
                    label="Enter OTP" 
                    defaultValue={otp} 
                    variant="standard" 
                    onChange={({ target }) => {
                        setOtp(target.value);
                    }}
                />
                <Typography component="div" variant="h6">
                    Otp send to {email}
                </Typography>
                <div className="countdown-text">
                    {seconds > 0 || minutes > 0 ? (
                        <p>
                        Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                        {seconds < 10 ? `0${seconds}` : seconds}
                        </p>
                    ) : (
                        <p>Didn't recieve code?</p>
                    )}
                    <div>
                        <button
                            disabled={seconds > 0 || minutes > 0}
                            style={{
                            color: seconds > 0 || minutes > 0 ? "#DFE3E8" : "#FF5630",
                            }}
                            onClick={resendOtp}
                        >
                            Resend OTP
                        </button>
                        <p>{msg}</p>
                    </div>
                    
                </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleOtpSubmit} size="small">SUBMIT</Button>
                </DialogActions>
            </Dialog>
            <Button type="submit" 
                variant="contained" 
                color="primary"
                onClick={handleMobileSubmit}>
                    Sign In
            </Button>
        </CardActions>
    </Card>
    </Box>
  );
}
