import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Tabs, Tab } from 'react-mdl/lib/Tabs';
import Home from './Home';
import Search from './Search';
import WordCloud from './WordCloud';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
		<h1 className="App-title"> Find JavaScript Variables </h1>
        <div className="App-note"> Note: API server is hosted on HEROKU so it may take some time to boot up the server if the server is sleeping.</div>
       <Router>
          <div>
            <div>
              <Tabs ripple>
                <Tab component={Link} to="/home">Home</Tab>
                <Tab component={Link} to="/search">Filter</Tab>
              </Tabs>
            </div>
            <div className="navigation-link-box">
              <Link className="navigation-link" to="/home">Home</Link>
              <Link className="navigation-link" to="/search">Filter</Link>
              <Link className="navigation-link" to="/wordcloud">Word Cloud</Link>
            </div>
            <Route path="/home" component={Home}/>
            <Route path="/search" component={Search}/>
            <Route path="/wordcloud" component={WordCloud}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
