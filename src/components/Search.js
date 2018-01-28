import React, { Component } from 'react';
import './Search.css';
import Api from '../utils/Api'

class Search extends Component {
  constructor(){
    super();
    this.state = {
      openUI: false,
      projectNames: []
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount() {
    this.getProjectNames();
  }

  getProjectNames(){
    Api.fetchProjectNames().then((res)=>{
      this.setState({
        projectNames: res.data
      })
    });
  }

  handleInputChange(event){

  }

  render(){
    return (
        <ul className="checkbox-grid">
          {this.state.projectNames.map(name => (
              <li key={name}><label>
                <input
                  name="isGoing"
                  type="checkbox"
                  onChange={this.handleInputChange}
                />
                {name}
              </label></li>
              )
            )
          }
        </ul>
    );
  }
}

export default Search;
