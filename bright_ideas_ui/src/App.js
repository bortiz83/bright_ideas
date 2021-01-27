import './App.css';
import { Router } from '@reach/router';
// import Main from './components/Main';
import Content from './components/Content';
import Main from './components/Main';
import UserProfile from './components/UserProfile';
import IdeaLikes from './components/IdeaLikes';

function App() {
  return (
    <Router>
      <Content path="/bright_ideas/:id" />
      <Main path="/" />
      <UserProfile path="/users/:id"/>
      <IdeaLikes path="/likes/:ideaid/:userid" />
    </Router>    
  );
}

export default App;
