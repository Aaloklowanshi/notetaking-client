// import React, { useState } from 'react';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Card from '@mui/material/Card';
// import Typography from '@mui/material/Typography';
// import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../actions/userActions';
// import { useNavigate } from 'react-router-dom';


// export const Login = () => {
//     const navigate = useNavigate()
//     const dispatch = useDispatch();
//     const userLogin = useSelector((state) => state.userLogin);
//     const { loading, error, token } = userLogin;
  
//     useEffect(() => {
//       if(token) {
//         console.log("token is there");
//         navigate('/');
//       }
//     }, [token ,navigate]);

//   // Check if the user is logged in and navigate accordingly
//   if (token) {
//     navigate('/');
//   }

//     return <div>
//             <div style={{
//                 paddingTop: 150,
//                 marginBottom: 10,
//                 display: "flex",
//                 justifyContent: "center"
//             }}>
//                 <Typography variant={"h6"}>
//                 Welcome to Note Taking App
//                 </Typography>
//             </div>
//         <div style={{display: "flex", justifyContent: "center"}}>
//             <Card varint={"outlined"} style={{width: 400, padding: 20}}>
//                 <TextField
//                     onChange={(evant11) => {
//                         let elemt = evant11.target;
//                         setEmail(elemt.value);
//                     }}
//                     fullWidth={true}
//                     label="Email"
//                     variant="outlined"
//                 />
//                 <br/><br/>
//                 <TextField
//                     onChange={(e) => {
//                         setPassword(e.target.value);
//                     }}
//                     fullWidth={true}
//                     label="Password"
//                     variant="outlined"
//                     type={"password"}
//                 />
//                 <br/><br/>

//                 <Button
//                     size={"large"}
//                     variant="contained"
//                     onClick={SubmitHandler}
//                 > Signin</Button>
//                           {error && (
//             <div style={{ color: 'red', marginTop: '10px' }}>
//               Invalid credentials. Please check your email and password.
//             </div>
//           )}
//             </Card>
//         </div>
//     </div>
//   );
// };
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './../actions/userActions';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, token } = userLogin;
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle form submission
  const handleSubmit = () => {
    // Dispatch the login action here
    dispatch(login(email, password));
  };

  const handleSignUpClick = () => {
    navigate('/signup'); // Redirect to the sign-up page
  };

  useEffect(() => {
    if (token) {
      console.log("Token is available");
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <div>
      <div style={{ paddingTop: 150, marginBottom: 10, display: "flex", justifyContent: "center" }}>
        <Typography variant="h6">
          Welcome to Note Taking App.
        </Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h6">
          Don&apos;t have an account? Sign up below.
        </Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card variant="outlined" style={{ width: 400, padding: 20 }}>
          <TextField
            onChange={(event) => setEmail(event.target.value)}
            fullWidth
            label="Email"
            variant="outlined"
          />
          <br /><br />
          <TextField
            onChange={(event) => setPassword(event.target.value)}
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
          />
          <br /><br />

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              size="large"
              variant="contained"
              onClick={handleSubmit}
            >
              Sign in
            </Button>

            <Button
              size="large"
              variant="contained"
              onClick={handleSignUpClick}
            >
              Sign Up
            </Button>
          </div>

          {error && (
            <div style={{ color: 'red', marginTop: '10px' }}>
              Invalid credentials. Please check your email and password.
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
