import React, { Component } from 'react';
import '../css/Home.css';

class Home extends Component {
  render(){
    return(
      <div id="home">
        <h5>How I Started This Project</h5>
        A better version is on Medium.
        <hr/>
        <p>
        This project extracted the top ten most popular (most stars) JavaScript repo on GitHub and pulled out the function names and variable names. Instructions on how to use this app is on GitHub but believe the app is self-explanatory.
        </p>
        <p>
				It's great to use programs like JavaScript and Python which are dynamically typed but sometimes it's just painful when you don't use it the right way. I started this project to help developers who are having difficulties naming there varibles (yes...I've been there a lot of time). Good variable names helps code reviews and better software qualities. Below are two real life example that good naming would benefit every software developers in the long run.
        </p>
        <p>
          There was this day when I was code reviewing one of the tickets that was assigned to me. It was a huge ticket and lots of code refactoring. Along the way, I saw this function named <i>checkNextBillingDate</i>. At first I assumed this meant returning back a string or date object. However, diving deeper into the code I found out that variable was returning back a boolean value. WTF? How does <i>checkNextBillingDate</i> return a boolean? Even if it did, how would I know what it was checking. Well after digging into the function, it was checking to see if the date passed in was a date in the future. A better naming I would have thought of would be <i>isDateInFutre</i> or something like that.
        </p>
        <p>
           Another reason is that since I am not a native English speaker and believe me...naming variable is painful for non native speaker since we don't have the vocabulary size as an native speaker. During my undergraduate years in Taiwan, I had a lot of friends who were naming their variables in all sorts of strange name or to make matters worse: they had invented or misspelled a variable name they thought was something. Reading those code was a nightmare, not saying code reviewing them.
        </p>
      </div>);
  }
}

export default Home;
