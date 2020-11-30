import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import LandingPage from './views/LandingPage/LandingPage'
import LoginPage from './views/LoginPage/LoginPage'
import RegisterPage from './views/RegisterPage/RegisterPage'
import Auth from '../hoc/auth'
import MovieDetail from './views/MovieDetail/MovieDetail'
import FavoritePage from './views/FavoritePage/FavoritePage'
import VideoLandingPage from './views/Video/VideoLandingPage'
import VideoUploadPage from './views/Video/VideoUploadPage/VideoUploadPage'

function App() {
  return (
    <Router>
    <div>

      {/*
        A <Switch> looks through all its children <Route>
        elements and renders the first one whose path
        matches the current URL. Use a <Switch> any time
        you have multiple routes, but you want only one
        of them to render at a time
      */}
      <Switch>
        <Route exact path="/" component={Auth(LandingPage, null)} />
        <Route exact path="/login" component={Auth(LoginPage, false)} />
        <Route exact path="/register" component={Auth(RegisterPage, false)} />
        <Route exact path="/movie/:movieId" component={Auth(MovieDetail, null)} />
        <Route exact path="/favorite" component={Auth(FavoritePage, true)} />
        <Route exact path="/video" component={Auth(VideoLandingPage, null)} />
        <Route exact path="/video/upload" component={Auth(VideoUploadPage, true)} />
      </Switch>
    </div>
  </Router>
  );
}


export default App;
