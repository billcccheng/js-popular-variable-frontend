import React, { Component } from 'react';
import './Search.css';
import Api from '../utils/Api';
import Spinner from 'react-spinkit';
import Results from './Results';

class Search extends Component {
  constructor(){
    super();
    this.state = {
      openSearchResults: false,
      openCheckBox: false,
      projectNames: [],
      checkedAll: false,
      selectedProjects: []
    }
    this.submitCheckedBox = this.submitCheckedBox.bind(this);
  }

  componentWillMount() {
    Api.fetchProjectNames()
      .then((res) => {
        this.setState({
          projectNames: res.data,
          openCheckBox: true
        });
      })
      .catch((err) => {
        this.setState({
          openCheckBox: 'error'
        });
      })
  }

  submitCheckedBox(){
    if(this.state.selectedProjects.length > 0){
      this.setState({
        openSearchResults: true
      });
    }
  }

  toggleChange(checkedProject){
    const indexOfProject = this.state.selectedProjects.indexOf(checkedProject.name);
    if(indexOfProject !== -1){
      this.setState({
        selectedProjects: this.state.selectedProjects.filter((_,i) => i !== indexOfProject)
      });
    }else{
      this.setState({
        selectedProjects: this.state.selectedProjects.concat(checkedProject.name)
      });
    }
  }

  render(){
    if(!this.state.openCheckBox){
      return(<Spinner className="loading-symbol" name="ball-scale-multiple" color="grey"/>);
    }else if(this.state.openCheckBox === 'error'){
      return(<div style={{color:'red'}}>An Error Occured...Please try again later.</div>);
    }else{
      return(
        <div className="Search">
          <ul className="checkbox-grid">
            {this.state.projectNames.map(name => (
                <li key={name}><label>
                  <input
                    name={name}
                    type="checkbox"
                    onChange={this.toggleChange.bind(this,{name})}
                  />
                  {name}
                </label></li>
                )
              )
            }
          </ul>
          <button onClick={this.submitCheckedBox}>
            Submit
          </button>
          {this.state.openSearchResults ? <Results selectedProjects={this.state.selectedProjects}/> : null}
        </div>
      );
    }
  }
}

export default Search;
