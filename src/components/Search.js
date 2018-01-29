import React, { Component } from 'react';
import './Search.css';
import Api from '../utils/Api';
import { Button } from 'react-mdl';
import Spinner from 'react-spinkit';
import Results from './Results';

class Search extends Component {
  constructor(){
    super();
    this.state = {
      openSearchResults: false,
      openCheckBox: false,
      updateResultsComp: false,
      projectNames: [],
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
        updateResultsComp: true,
        openSearchResults: true
      });
    }
  }

  toggleChange(checkedProject){
    if(this.state.updateResultsComp){
      this.setState({
        updateResultsComp: false
      });
    }
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
            <h4>Popluar Javascript Repo:</h4>
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
            <Button raised ripple id="checkBox-submit" onClick={this.submitCheckedBox}>
              Submit
            </Button>
          </ul>
          {this.state.openSearchResults ? <Results update={this.state.updateResultsComp} selectedProjects={this.state.selectedProjects}/> : null}
        </div>
      );
    }
  }
}

export default Search;
