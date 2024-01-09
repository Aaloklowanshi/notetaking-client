import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import {Card, Typography} from "@mui/material";
import {useState} from "react";
import axios from "axios";
import {useDispatch, useSelector} from 'react-redux'
import { signup } from './../actions/userActions';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userSignup = useSelector((state) => state.userSignup);
    const { loading, error, token } = userSignup;
  
    useEffect(() => {
      if (token) {
        navigate('/');
      }
    }, [token , navigate]);

      const [username , setUsername] = useState('');
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const SubmitHandler = async (e) => {
      e.preventDefault();
      dispatch(signup(username, email, password));
    }



    return <div>
            <div style={{
                paddingTop: 150,
                marginBottom: 10,
                display: "flex",
                justifyContent: "center"
            }}>
                <Typography variant={"h6"}>
                Welcome to Note Taking App Sign up below
                </Typography>
            </div>
        <div style={{display: "flex", justifyContent: "center"}}>
            <Card varint={"outlined"} style={{width: 400, padding: 20}}>
                <TextField
                value={username}
                    onChange={(event) => {
                        setUsername(event.target.value);
                    }}
                    fullWidth={true}
                    label="username"
                    variant="outlined"
                />
                <br/><br/>
                <TextField
                    onChange={(event) => {
                        setEmail(event.target.value);
                    }}
                    fullWidth={true}
                    label="Email"
                    variant="outlined"
                />
                <br/><br/>
                <TextField
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    fullWidth={true}
                    label="Password"
                    variant="outlined"
                    type={"password"}
                />
                <br/><br/>

                <Button justifyContent= "center"
                    size={"large"}
                    variant="contained"
                    onClick={SubmitHandler}
                > Signup</Button>
            </Card>
        </div>
    </div>
}

export default Signup;