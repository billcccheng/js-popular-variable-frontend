import React, { Component } from 'react';
import './Search.css';
import Api from '../utils/Api';
import { Button } from 'react-mdl';
import { DoubleBounce } from 'better-react-spinkit'
import Results from './Results';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      showResultsComponent: false,
      showCheckBox: false,
      updateResults: false,
      projectNames: [],
      selectedProjects: []
    }
    this.submitCheckbox = this.submitCheckbox.bind(this);
  }

  componentWillMount() {
    Api.fetchProjectNames()
      .then((res) => {
        this.setState({
          projectNames: res.data,
          showCheckBox: true
        });
      })
      .catch((err) => {
        this.setState({
          showCheckBox: 'error'
        });
      })
  }

  submitCheckbox() {
    if(this.state.selectedProjects.length > 0) {
      this.setState({
        updateResults: true,
        showResultsComponent: true
      });
    }
  }

  toggleChange(checkedProject) {
    if(this.state.updateResults) {
      this.setState({
        updateResults: false
      });
    }
    const indexOfProject = this.state.selectedProjects.indexOf(checkedProject.name);
    if(indexOfProject !== -1) {
      this.setState({
        selectedProjects: this.state.selectedProjects.filter((_,i) => i !== indexOfProject)
      });
    } else {
      this.setState({
        selectedProjects: this.state.selectedProjects.concat(checkedProject.name)
      });
    }
  }

  render() {
    if(!this.state.showCheckBox) {
      return(<DoubleBounce size={50} />);
    } else if(this.state.showCheckBox === 'error') {
      return(<div style={{color:'red'}}>An Error Occured...Please try again later.</div>);
    } else {
      return(
        <div className="Search">
          <ul className="checkbox-grid">
            <h4>Popluar Javascript Repo</h4>
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
            <Button raised ripple id="checkBox-submit" onClick={this.submitCheckbox}>
              Submit
            </Button>
          </ul>
          {this.state.showResultsComponent ? <Results update={this.state.updateResults} selectedProjects={this.state.selectedProjects}/> : null}
        </div>
      );
    }
  }
}

export default Search;
