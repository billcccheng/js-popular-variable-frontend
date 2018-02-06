import React, { Component } from 'react';
import '../css/Home.css';

class Home extends Component {
  render(){
    return(
      <div id="home">
        <h5>Why I Started This Project</h5>
        <hr/>
        <p>
        This project extracted the top ten most popular (most stars) JavaScript repo on GitHub and pulled out the function names and variable names. Instructions on how to use this app is on GitHub but believe me - the app is self-explanatory.
        </p>
        <p>
				It's great to use programs like JavaScript and Python which are dynamically typed but sometimes it's just painful when you don't use it the right way. I started this project to help developers who are having difficulties naming there varibles (yes...I've been there a lot of time). Good variable names helps code reviews and produces better software qualities. Below are two real life example that good naming would benefit every software developers in the long run.
        </p>
        <p>
        There was this day when I was code reviewing one of the tickets that was assigned to me. It was a huge ticket and lots of code refactoring. Along the way, I saw this function named <i>checkNextBillingDate</i>. At first I assumed this meant returning back a string or date object. However, diving deeper into the code I found out that variable was returning back a boolean value. WHAT?!?! How does <i>checkNextBillingDate</i> return a boolean? Even if it did, how would I know what it was checking. Well after digging into the function, I finally figured out it was trying to check to check if the date passed in was a future. A better naming would have maybe been <i>isDateInFuture</i> or something like that.
        </p>
        <p>
        The last reason and the most important reason: Since I am not a native English speaker and believe me...naming variable is painful for non native speaker since we don't have the vocabulary size as a native speaker. During my undergraduate years in Taiwan, I had a lot of friends who were naming their variables in all sorts of strange name. To make matters worse: they had invented or misspelled a variable name they thought was something. Reading those code was a nightmare, not saying code reviewing them.
        </p>
        <p>
          To sum it up, I wish the app can be useful for people to reference how popoular repos name their variables or functions. In the end, all good software developer learn from the best codes and I believe that the most popular repos are always a good place to start.
        </p>
        Bill Cheng
      </div>);
  }
}

export default Home;
