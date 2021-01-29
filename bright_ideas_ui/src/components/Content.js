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
   
    // Aqui creamos la idea, si la validacion pasa, se hace submit de la forma y la info se va al servidor, si no, la validacion
    // truena el envio de la forma.
   const createIdea = () => {
       if (ideaText.length < 5 ) {
           setErrorLabel('Idea Text needs to be at least 5 characters long');
           return false;
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
            document.forms['idea-form'].submit();
         })
         .catch(err => {console.log("Something went wrong when creating an idea.", err)});
   }

   // Cada vez que la pagina se carga, este metodo trae todas las ideas de la base de datos
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

   // En este hook, busca los datos del usuario en base al id en la ruta /bright_ideas/:id (cualquier)
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
                <form id="idea-form" onSubmit={e =>{e.preventDefault(); createIdea()}}>
                    <div className="create_idea_div">
                        <input type="text" className="idea_input_text" onChange={e => setIdeaText(e.target.value)} value={ideaText} required/>
                        <button className="idea_btn">Idea !</button>
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