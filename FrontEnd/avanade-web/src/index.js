// Libs
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

// Services
import {parseJwt, userAuthentication} from './services/Auth';

// Styles
import './assets/styles/index.css';

// Pages
import Login from './pages/Login/Login';
import DashTemperature from './pages/Dashboards/DashTemperature';
import DashPeople from './pages/Dashboards/DashPeople';
import DashAlerts from './pages/Dashboards/DashAlerts';
import Alerts from './pages/Alerts/Alerts';
import Camera from './pages/Camera/Camera';
import NotFound from './pages/NotFound/NotFound';


const Restrict = ({component : Component}) => (
  <Route 
    render = {props =>
      userAuthentication() && parseJwt().role === "Administrator" || userAuthentication() && parseJwt().role === "Guest" ?
      <Component {...props} /> :
      <Redirect to="/" />
    }
  />
)

const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Restrict exact path="/dashboard/temperature" component={DashTemperature} />
        <Restrict exact path="/dashboard/people" component={DashPeople} />
        <Restrict exact path="/dashboard/alerts" component={DashAlerts} />
        <Restrict exact path="/alerts" component={Alerts} />
        <Restrict exact path="/camera" component={Camera} />
        <Route exact path="/notfound" component={NotFound} />
        <Redirect to="/notfound" />
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));