import React, { useState } from 'react';
import axios from 'axios';
import './styles/styles.css';
import { navigate } from '@reach/router';

const Register = props => {
    const[nameText, setName] = useState('');
    const[aliasText, setAlias] = useState('');
    const[emailText, setEmail]= useState('');
    const[passwordText, setPassword]= useState('');
    const[confirmPwText, setConfirmPw]= useState('');
    const[errorLabel, setErrorLabel] = useState('');

    const registerUser = props => {
        if (passwordText.length < 6 || confirmPwText.length < 6) {
            setErrorLabel('Pwd and pwd confirmation min lenght is 8 chars');
            return;
        }

        if (passwordText !== confirmPwText) {
            setErrorLabel('Password and confirmation do not match');
            return;
        }

        if (nameText.length < 3) {
            setErrorLabel('Name min lenght is 3 chars');
            return;
        }

        if (aliasText.length < 2) {
            setErrorLabel('Alias min lenght is 3 chars');
            return;
        }

        if (emailText.length < 6) {
            setErrorLabel('Email min legth is 6 chars');
        }
        
        axios.post('http://localhost:8000/api/user/register', {
            "name": nameText,
            "alias": aliasText,
            "email": emailText,
            "password": passwordText,
            "posts":[],
            "ideasLiked":[]
        })
        .then(function(response) {
            console.log(response);
            setErrorLabel('The user was registered succesfully');
            setAlias('');
            setConfirmPw('');
            setPassword('');
            setEmail('');
            setName('');
            navigate('/bright_ideas/' + response.data.user._id);
        })
        .catch(err => { 
            console.log ("Something went wrong creating the user");
            setErrorLabel("There was an error registering the user: " + err);
        });

    }

    const validatePassword = input => {
        if (input.length < 8) {
            setErrorLabel('Pwd needs to be at least 8 characters.');
        } else {
            setErrorLabel('');
        }

        setPassword(input);
    }

    const validatePwdConfirmation = input => {
        if (input.length < 8) {
            setErrorLabel('Confirm Pwd needs to be at least 8 characters.');
        } else {
            setErrorLabel('');
        }

        setConfirmPw(input);
    }

    return(
        <div className="register_div">
            <span className="overlap_label overlap_label_register">
                <center><label>Register</label></center><br/>
            </span>
            <div className="line_item_div"><br/>
                <label className="label_style">Name:</label><input type="text" className="input_text" onChange={e => setName(e.target.value)} required/>
            </div><br/>
            <div className="line_item_div">
                <label className="label_style">Alias:</label><input type="text" className="input_text" onChange={e => setAlias(e.target.value)} required/>
            </div>
            <div className="line_item_div">
                <label className="label_style">Email:</label><input type="text" className="input_text" onChange={e => setEmail(e.target.value)} required/>
            </div>
            <div className="line_item_div">
                <label className="label_style">Password:</label><input type="password" className="input_text" onChange={e => validatePassword(e.target.value)} required/>
            </div>
            <div className="line_item_div">
                <label className="label_style">Confirm PW:</label><input type="password" className="input_text" onChange={e => validatePwdConfirmation(e.target.value)} required/>
            </div>
            <div><label className="error_label">{errorLabel}</label></div>
            <center><button className="register_btn" onClick={registerUser}>Register</button></center>
        </div>
    )
}

export default Register;  