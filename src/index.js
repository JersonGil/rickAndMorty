import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './components/Skeleton/skeleton.css';
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from './reportWebVitals';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom"; 
import Character from './Character'
import App from './App'
import Locations from './components/Location'
import Header from './components/Header'

const client = new ApolloClient ({
  cache: new InMemoryCache(),
	uri: 'https://rickandmortyapi.com/graphql/' 
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
    <Header />
    <Router>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route path="/character/:id" children={<Character />} />
        <Route exact path="/locations">
          <Locations />
        </Route>
      </Switch>
    </Router>
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
