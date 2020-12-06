import React,{useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'
import routes from '../../utils/routes';
import axios from "axios";
import {SERVER_URL} from "../../utils/SERVERURL"
import Paper from '@material-ui/core/Paper';
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import { Button } from '@material-ui/core';
import { useToasts } from 'react-toast-notifications'
import "./styles.css"

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        width: '25ch',
      },
    },
    paper: {
        padding: theme.spacing(2),
        margin:theme.spacing(2), 
        color: theme.palette.text.secondary, 
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
      },
      form: {
        width: "100%", // For IE 11 issue.
        marginTop: theme.spacing(1)
      },
      submit: {
        margin: theme.spacing(3, 0, 2)
      }
  }));

const LoginIndex = () => {
    const history = useHistory();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [loading, setloading] = useState(false);
    const [errorMessages,seterrorMessages] = useState([]);
    const { addToast } = useToasts();

    function validate(email,password) {
      const errors = [];
      if (email.length === 0 || password.length === 0) {
        errors.push("One or more Fields are empty");
      }
      if (email.split("").filter(x => x === "@").length !== 1) {
        errors.push("Email should contain a @");
      }
      if (email.indexOf(".") === -1) {
        errors.push("Not a valid Email format");
      }  
      return errors;
    }

    const onSubmit = (event) => {
      event.preventDefault();
      const errors = validate(email,password);
            if (errors.length > 0) {
                seterrorMessages(errors)
                console.log(errorMessages);
                return;
            }
            else{
              seterrorMessages([]);
              setloading(true);
              const requestBody = { email, password };
      
              axios.post(`${SERVER_URL}/api/adminLogon`,{
                  ...requestBody
              })
              .then((response)=>console.log(response))
              .then(()=>{
                  history.push(routes.home)
              })
              .catch((err) => {
                // addToast(`Bad Credentials`, {
                //   appearance: 'danger',
                //   autoDismiss: true,
                // });
                // alert("Bad Credentials")
                seterrorMessages(["Bad Credentials"]);
                setloading(false);
              })
            }
      }
    const classes = useStyles();
    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <Paper className={classes.paper} elevation={3}>
            <div className="errorHandlers">
                    {errorMessages.length !==0 && errorMessages.map(error => (
                         <p key={error}>Error: {error}</p>
                     ))}
                </div>
                <div className="admin__main">
                  <h2 className="admin__header">Login</h2>
                </div>
            <form autoComplete="off" onSubmit={onSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus value={email} onChange={(e)=>setEmail(e.target.value)}></TextField>
                <TextField variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password" value={password} onChange={(e)=>setPassword(e.target.value)}></TextField>
                <Button type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit} onClick={onSubmit}>{!loading?"Login":"Logging in..."}</Button>
            </form>
            </Paper>
        </Container>
    )
}

export default LoginIndex
