import React, { Component } from "react";
import { Route } from 'react-router-dom';
import "./App.css";
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import List from './components/Lists/List';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faSquare, faEdit } from '@fortawesome/free-solid-svg-icons'

library.add(faCheckSquare);
library.add(faSquare);
library.add(faEdit);

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
