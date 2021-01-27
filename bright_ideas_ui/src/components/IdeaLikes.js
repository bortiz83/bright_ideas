import React, { useEffect, useState } from 'react';
import {navigate, Link} from '@reach/router';
import axios from 'axios';
import './styles/styles.css';

const IdeaLikes = props => {
    const [idea, setIdea] = useState(null);
    const [users, setUsers] = useState([]);

    const gotoUserProfile = (userId) => {
        navigate('/users/' + props.userid);
    }

    const goToBrightIdeas = () => {
        navigate('/bright_ideas/' + props.userid);
    }

    const doLogout = () => {
        navigate('/');
    }

    const fetchData = () => {
        if (idea == null) {
            axios.get('http://localhost:8000/api/idea/' + props.ideaid)
            .then(function (response) {
                console.log(response.data.idea);
                setIdea(response.data.idea);
                let whoLiked = response.data.idea.whoLiked;
                setUsers(whoLiked == null ? [] : whoLiked);
            })
            .catch(err => {
                console.log("Something went wrong", err);
            });
        }
    }

    useEffect(() => {
        fetchData();
     })

    return(
        <div>
            <div className="buttons_div_logout">
                <button className="link_button" onClick={goToBrightIdeas}>Bright Ideas</button>&nbsp;&nbsp;
                <button className="link_button" onClick={doLogout}>Logout</button>
            </div>
            <div className="list_item_wrapper space_up_left">
                <span className="idea_label_span">
                    <a href="#0" onClick={gotoUserProfile} className="link_button">{idea == null ? "" : idea.whoPosted.alias}</a> says:
                </span>
                <div className="idea_box_span">{idea == null ? "" : idea.ideaText}</div>
            </div>
            <div className="space_up">
                <h3>People who likd this post:</h3><p/>
                <table className="table_style">
                    <thead className="cell_gray_bg">
                        <tr>
                            <th>Alias</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, i) => {
                            return (
                                <tr key={i}>
                                    <td className={i%2 === 0 ? "cell_white_bg" : "cell_gray_bg"}><Link to={"/users/" + user._id}>{user.alias}</Link></td>
                                    <td className={i%2 === 0 ? "cell_white_bg" : "cell_gray_bg"}>{user.name}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default IdeaLikes;