import React, { useState, useEffect } from 'react';
import ContentDetail from './ContentDetail';
import {navigate} from '@reach/router';
import axios from 'axios';
import './styles/styles.css';

const Login = props => {
    const[ideaText, setIdeaText] = useState('Post something witty here');
    const[errorLabel, setErrorLabel] = useState('');
    const[ideas, setIdeas] = useState([]);
    const[loggedUser, setLoggedUser] = useState(null);
   
   const createIdea = props => {
       if (ideaText.length < 5 ) {
           setErrorLabel('Pwd and pwd confirmation min lenght is 8 chars');
           return;
       }
       axios.post('http://localhost:8000/api/idea', {
           "whoPosted": {
               "_id": loggedUser._id,
               "email": loggedUser.email,
               "alias": loggedUser.alias,
               "name": loggedUser.name
           },
           "ideaText": ideaText,
           "numberOfLikes": 0,
           "whoLiked": []
       })
         .then(function (response) {
            setErrorLabel('');
         })
         .catch(err => {console.log("Something went wrong when creating an idea.", err)});
   }

   const populateIdeas = () => {
       axios.get('http://localhost:8000/api/idea')
         .then(function (response) {
            if (response.data.ideas != null && response.data.ideas.length > 0) {
                setIdeas(response.data.ideas);
                setErrorLabel('');
            }
         })
         .catch(err => {
             console.log("Something went wrong", err);
             setErrorLabel('There was an error retrieving ideas.');
           });
   }

   useEffect(() => {
        axios.get('http://localhost:8000/api/user/' + props.id)
            .then(function (response) {
            setLoggedUser(response.data.user);
            setErrorLabel('');
            populateIdeas();
            })
            .catch(err => {
                console.log("Something went wrong", err);
                setErrorLabel('There was an error retrieving ideas.');
            }, null);
    }, []);

    const doLogout = () => {
        navigate('/');
    }

    return(
        <div className="content_div">
            <div className="content_div_header">
                <h2>Hi {loggedUser == null ? "" : loggedUser.name}!</h2>
                <button className="link_button" onClick={doLogout}>Logout</button>
            </div>
            <br />
            <div>
                <form onSubmit={createIdea}>
                    <div className="create_idea_div">
                        <input type="text" className="idea_input_text" onChange={e => setIdeaText(e.target.value)} value={ideaText} required/>
                        <button type="submit" className="idea_btn">Idea !</button>
                    </div>
                </form>
            </div>
            <br/>
            <label className="error_label">{errorLabel}</label>
            <div className="project_list_style">
                <form>
                    {ideas.map((idea)=>{
                        return <ContentDetail key={idea._id} loggedUser={loggedUser} mappedIdea={idea}/>
                    })}
                </form>
            </div>
        </div>
    )
}

export default Login;  