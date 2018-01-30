import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Tabs, Tab } from 'react-mdl/lib/Tabs';
import Home from './Home';
import Search from './Search';
import WordCloudRender from './WordCloudRender';
import './App.css';

class App extends Component{
  constructor(){
    super();
    this.state = {
      active: 0
    }
  }

  onChange(id){
    this.setState({ active: id });
  }

  render(){
    const tabs = [
      {"ActivateComponent": React.createFactory(Home)},
      {"ActivateComponent": React.createFactory(Search)},
      {"ActivateComponent": React.createFactory(WordCloudRender)}
    ];
    return (
      <div className="App">
		<h1 className="App-title"> Find JavaScript Variables </h1>
        <div className="App-note"> Note: API server is hosted on HEROKU so it may take some time to boot up the server if the server is sleeping.</div>
          <div>
            <Tabs ripple onChange = {this.onChange.bind(this)}>
              <Tab>Home</Tab>
              <Tab>Filter</Tab>
              <Tab>Word Cloud</Tab>
              <Tab>Intersection</Tab>
            </Tabs>
          </div>
        {tabs[this.state.active].ActivateComponent()}
      </div>
    );
  }
}

export default App;
