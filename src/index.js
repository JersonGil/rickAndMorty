import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './components/Skeleton/skeleton.css';
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from './reportWebVitals';
import { store } from '../src/store/index'
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom"; 
import Character from './Character'
import App from './App'
import Locations from './components/Location'
import Header from './components/Header'
import Residents from './components/Residents'


ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
    <Header />
    <Router>
      <Switch>
        <Route path="/character/:id" component={Character} />
        <Route exact path="/locations" component={Locations} />
        <Route exact path="/residents/:id" component={Residents} />
        <Route exact path="/" component={App} />
      </Switch>
    </Router>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
