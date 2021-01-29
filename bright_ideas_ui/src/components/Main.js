import React from 'react';
import './styles/styles.css';
import Register from './Register';
import Login from './Login';

const Main = props => {
    return(
        <div>
            <h1 className="welcome_label">Welcome!</h1>
            <div className="main_div">
                <Register />
                <Login />
            </div>
        </div> 
    )
}

export default Main;           