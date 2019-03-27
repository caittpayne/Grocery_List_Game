import React, { Component } from "react";
import { Route } from 'react-router-dom';
import "./App.css";
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import List from './components/Lists/List';

class App extends Component {
  render() {
    return (
      <div className="App">
        <main>
            <Route exact path='/' component={SignIn} />
            <Route path="/register" component={Register} />
            <Route path='/lists' component={List} />
        </main>
      </div>
    );
  }
}

export default App;
