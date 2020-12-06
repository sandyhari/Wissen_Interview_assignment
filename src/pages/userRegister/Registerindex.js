import React,{useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import "./styles.css"
import {SERVER_URL} from "../../utils/SERVERURL"
import axios from "axios";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { Button } from '@material-ui/core';
import { Link, NavLink, useHistory } from 'react-router-dom';
import routes from '../../utils/routes';
import Paper from '@material-ui/core/Paper';
import { useToasts } from 'react-toast-notifications'

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    paper: {
        padding: theme.spacing(2),
        margin:theme.spacing(2), 
        color: theme.palette.text.secondary,
        width:'500px'
      },
      header:{
          color:'#111',
          fontFamily:'helvetica'
      }
  }));

const Registerindex = ()=> {

    const [firstName, setfirstName] = useState("")
    const [lastName, setlastName] = useState("")
    const [phoneNumber, setphoneNum] = useState("")
    const [address, setaddress] = useState("")
    const [SSN, setSSN] = useState("")
    const [loading,setLoading] = useState(false);

    const [errorMessages,seterrorMessages] = useState([]);

    const history = useHistory();
    const { addToast } = useToasts();

    function validate(firstName,lastName, phoneNumber, SSN) {
        const errors = [];
        console.log(SSN.length);
        if (firstName.length === 0 ||lastName.length === 0||phoneNumber.length === 0||SSN.length === 0) {
          errors.push("One or more Fields are empty");
        }
        if (phoneNumber.length > 10 || phoneNumber < 10) {
          errors.push("Phone number should be 10 digits");
        }
        if (SSN.length !== 9) {
            errors.push("SSN number should be 9 digits");
          }     
        return errors;
      }

    const onsubmit=(e)=>{
        e.preventDefault();
        try{
            const errors = validate(firstName,lastName,phoneNumber,SSN);
            if (errors.length > 0) {
                seterrorMessages(errors)
                console.log(errorMessages);
                return;
            }
            else{
                setLoading(true);
                const requestBody = {firstName,lastName,phoneNumber,address,SSN};
                console.log(requestBody);
                axios.post(`${SERVER_URL}/api/userRegister`,{
                    ...requestBody
                })
                .then((response)=>console.log(response))
                .then(()=>addToast(`Successfully registered`, {
                    appearance: 'success',
                    autoDismiss: true,
                  }))
                .catch(function (error) {
                    console.log(error);
                })
            }
            
        }
        catch{
            addToast(`There seems to be some problem`, {
                appearance: 'danger',
                autoDismiss: true,
              });
        }
        finally{
            setLoading(false);
        }
    }
    const handleReset=()=>{
        try{
            setfirstName("")
            setlastName("")
            setphoneNum("")
            setSSN("")
            setaddress("")
        }
        catch(error){
            console.error()
            addToast(`There seems to be some problem`, {
                appearance: 'danger',
                autoDismiss: true,
              })
            setTimeout(()=>{
                history.push(routes.landingPage)
            },1000)
        }
    }
    const classes = useStyles();
    return (
            
            <Container component="main" maxWidth="xs">
                <Paper className={classes.paper} elevation={3}>
                <CssBaseline />
                <div className="errorHandlers">
                    {errorMessages.map(error => (
                         <p key={error}>Error: {error}</p>
                     ))}
                </div>
                <h2 className="user__header">User Registration Form!</h2>
                <form  noValidate autoComplete="off" onSubmit={onsubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <TextField variant="outlined" margin="normal" type="text" name="Firstname" label="Firstname" value={firstName} onChange={(e)=>{setfirstName(e.target.value)}} required/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField variant="outlined" margin="normal" type="text" name="Lastname" label="Lastname" value={lastName} onChange={(e)=>{setlastName(e.target.value)}} required/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField variant="outlined" margin="normal" type="tel" name="PhoneNumber" label="Phone Number" value={phoneNumber} onChange={(e)=>{setphoneNum(e.target.value)}} required/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField variant="outlined" margin="normal" type="number" name="SSN" label="SSN" value={SSN} maxLength="9" onChange={(e)=>{setSSN(e.target.value)}} required inputProps={{maxLength :10}}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="outlined-multiline-static"
                                label="Full Address"
                                multiline
                                rows={4}
                                variant="outlined"
                                value={address} onChange={(e)=>{setaddress(e.target.value)}}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" type="button" onClick={onsubmit}>{!loading?"Register":"Signing up...."}</Button>
                        </Grid>
                        <hr style={{borderTop:"1px dashed black"}}/>
                        <Grid item xs>
                            <Button variant="contained" color="default" type="button" onClick={handleReset}>
                                Add new member
                            </Button>
                        </Grid>
                        <Grid item>
                            <NavLink exact to={routes.landingPage}>
                                {"Go to home Page"}
                            </NavLink>
                        </Grid>
                    </Grid>
                </form>
                </Paper>
            </Container>
    )
}

export default Registerindex
