import React, { useState } from 'react';
import {navigate} from '@reach/router';
import axios from 'axios';
import './styles/styles.css';

const Login = props => {
    const[password, setPassword] = useState('');
    const[email, setEmail] = useState('');
    const[errorMessage, setErrorMessage] = useState('');

    const doLogin = props => {
        axios.post('http://localhost:8000/api/user/login', {
            "email": email,
            "password": password
        })
          .then(function (response) {
            console.log(response);
            if (response === null || response.data.user === null) {
                setErrorMessage('Failed to Authenticate')
            }
            setErrorMessage('');
            navigate('/bright_ideas/' + response.data.user._id);
          })
          .catch(err => {
              console.log("Something went wrong", err)
              setErrorMessage('Could not Authenticate with given credentials');
            });
    }

    return(
        <div className="login_div">
            <span className="overlap_label overlap_label_login">
                <center><label>Login</label></center><br/>
            </span>
            <label className="error_label">{errorMessage}</label>
            <div className="line_item_div"><br/>
                <label className="label_style">Email:</label><input type="text" className="input_text" onChange={e => setEmail(e.target.value)} required/><br/>
            </div>
            <br/>
            <div className="line_item_div">
                <label className="label_style">Password:</label><input type="password" className="input_text" onChange={e => setPassword(e.target.value)} required/>
            </div>
            <center><button className="create_btn" onClick={doLogin}>Login</button></center>
        </div>
    )
}

export default Login;           