import React, { Component } from 'react';
import '../css/Home.css';

class Home extends Component {
  render(){
    return(
      <div id="home">
        <h5>How I Started This Project</h5>
        <hr/>
        <p>
          So there was this day when I was code reviewing one of the tickets that was assigned to me. It was a huge ticket and lots of code refactoring...
        </p>
        <p>
          This is a project I started to help developers who are having difficulties naming there varibles (yes...I've been there a lot of time). Good variable names helps code reviews and better software qualities.
        </p>
      </div>);
  }
}

export default Home;
