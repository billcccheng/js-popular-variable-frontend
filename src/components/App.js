import React, { Component } from 'react';
import Search from './Search';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
				<h1 className="App-title"> Find JavaScript Variables </h1>
        <Search></Search>
      </div>
    );
  }
}

export default App;
