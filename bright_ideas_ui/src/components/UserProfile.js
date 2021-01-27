import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {navigate} from '@reach/router';
import './styles/styles.css';

const UserProfile = props => {
    const [user, setUser] = useState(null);
    const [errorLabel, setErrorLabel] = useState('');

    const fetchUser = () => {
        if (props.id == null) {
            navigate("/");
        }

        if (user == null) {
            axios.get('http://localhost:8000/api/user/' + props.id)
            .then(function (response) {
                if (response.data.user == null) {
                    setUser(null);
                    setErrorLabel('Could not find the specified user');
                }
                console.log(response.data.user);
                setUser(response.data.user);
            })
            .catch(err => {
                console.log("Something went wrong", err);
                setErrorLabel('There was an error retrieving ideas.');
            });
        }
    }

    const goToBrightIdeas = () => {
        navigate('/bright_ideas/' + user._id);
    }

    const doLogout = () => {
        setUser(null);
        navigate('/');
    }

    useEffect(() => {
        fetchUser();
     })

    return(
        <div className="up_div">
            <div className="buttons_div_logout">
                <button className="link_button" onClick={goToBrightIdeas}>Bright Ideas</button>&nbsp;&nbsp;
                <button className="link_button" onClick={doLogout}>Logout</button>
            </div>
            <div>
                <label>Name: {user == null ? "" : user.name}</label><p />
                <label>Alias: {user == null ? "" : user.alias}</label><p />
                <label>Email: {user == null ? "" : user.email}</label><p />
            </div>
            <hr />
            <div>
                <label>Total Number of Posts: {user == null || user.ideasLiked == null ? "0" : user.posts.length}</label><br /><p/>
                <label>Total Number of Likes: {user == null || user.ideasLiked == null ? "0" : user.ideasLiked.length}</label><br />
                <label className="error_label">{errorLabel == null || errorLabel === "" ? "" : errorLabel}</label>
            </div>
        </div>
    )
}

export default UserProfile;