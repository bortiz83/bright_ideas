import React from 'react';
import './styles/styles.css';
import Register from './Register';
import Login from './Login';

const Main = props => {
    return(
        <div>
            <h1 className="welcome_label">Welcome to Bright Ideas!</h1>
            <div className="main_div">
                <div> 
                    <img src="https://icdn2.digitaltrends.com/image/digitaltrends/incandescent-bulbs-768x768.jpg" alt="Candle" className="image"/>
                </div>
                <Register />
                <Login />
            </div>
        </div> 
    )
}

export default Main;           