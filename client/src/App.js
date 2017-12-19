import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';
import Home from './home';
import Results from './results';
import { Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'


class App extends Component {
/*
  state = {users: []}

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }
*/
  render() {
    return (
/*
      <div className="App">
        <h1>Users</h1>
        {this.state.users.map(user =>
          <div key={user.id}>{user.username}</div>
        )}
      </div>
*/
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/results' component={Results}/>
          <Route path='/node_module' />
        </Switch>
      </BrowserRouter>
      
    );
  }
}

export default App;