import React, { Component } from 'react';
import Search from './Search';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
		<h1 className="App-title"> Find JavaScript Variables </h1>
        <h5 className="App-note"> Note: API server is hosted on HEROKU so it may take some time to boot up the server if the server is sleeping.</h5>
        <Search/>
      </div>
    );
  }
}

export default App;
