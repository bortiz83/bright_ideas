import React from 'react';
import {navigate} from '@reach/router';
import axios from 'axios';
import './styles/styles.css';

const ContentDetail = props => {
    const updateIdea = () => {
        let incrementLikes = props.mappedIdea.numberOfLikes + 1;
        let idea = props.mappedIdea;
        idea.numberOfLikes = incrementLikes;
        let likedBy = {
            "_id": props.loggedUser._id,
            "email": props.loggedUser.email,
            "alias": props.loggedUser.alias,
            "name": props.loggedUser.name
        }

        if (idea.whoLiked == null) {
            idea.whoLiked = [];
        }

        idea.whoLiked.push(likedBy);
        let json = {
            "userid": props.loggedUser._id,
            "idea": idea
        };
        axios.put('http://localhost:8000/api/idea/' + idea._id, json)
          .then(function (response) {
              console.log("Updated successfully idea: " + response.data.idea._id);
        })
          .catch(err => {console.log("Something went wrong when updating idea", err)});
    }

    const goToLikesVisualization = () => {
        navigate('/likes/' + props.mappedIdea._id + '/' + props.loggedUser._id);
    }

    const gotoUserProfile = () => {
        navigate('/users/' + props.mappedIdea.whoPosted._id);
    }

    return(
        <div className="content_detail_div">
            <div className="list_item_wrapper">
                <span className="idea_label_span">
                    <a href="#0" onClick={gotoUserProfile} className="link_button">{props.mappedIdea.whoPosted.alias}</a> says:
                </span>
                <div className="idea_box_span">{props.mappedIdea.ideaText}</div>
            </div>
            <div className="list_item_wrapper list_item_wrapper_spacing">
                <button type="submit" className="link_button link_button_space" onClick={updateIdea}>Like</button>
                <a href="#0" onClick={goToLikesVisualization} className="link_button">{props.mappedIdea.numberOfLikes} people</a>&nbsp; like this.
            </div>
        </div>
    )
}

export default ContentDetail;