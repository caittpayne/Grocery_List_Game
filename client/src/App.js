import React, { Component } from "react";
import { Route, Link } from 'react-router-dom';
import "./App.css";
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Lists from './components/Lists/Lists';
import Items from './components/Items/Items';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <h1>Grocery List Game</h1>
        </header>
        <main>
            <Route exact path='/' component={SignIn} />
            <Route path="/register" component={Register} />
            <Route path='/lists' component={Lists} />
            <Route path='/lists/items' component={Items} />
        </main>
      </div>
    );
  }
}

export default App;
