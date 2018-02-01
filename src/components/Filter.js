import React, { Component } from 'react';
import Results from './Results';
import { connect } from 'react-redux';
import { Button } from 'react-mdl';
import { fetchProjectNames } from '../actions/fetchDataAction';
import { DoubleBounce } from 'better-react-spinkit';
import '../css/Search.css';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      selectedProjects: [],
      showResultsComponent: false
    };
    this.submitCheckbox = this.submitCheckbox.bind(this);
  }

  componentWillMount() {
    this.props.fetchProjectNames();
  }

  submitCheckbox() {
    if(this.state.selectedProjects.length > 0) {
      this.setState({
        showResultsComponent: true
      });
    }
  }

  toggleChange(checkedProject) {
    const indexOfProject = this.state.selectedProjects.indexOf(checkedProject.name);
    if(indexOfProject !== -1) {
      this.setState({
        selectedProjects: this.state.selectedProjects.filter((itm, i) => i !== indexOfProject)
      });
    } else {
      this.setState({
        selectedProjects: this.state.selectedProjects.concat(checkedProject.name)
      });
    }
  }

  render() {
    if(this.props.isProjectNamesLoading) {
      return(<DoubleBounce size={50} />);
    } else if(this.props.projectNameError) {
      return(<div style={{color:'red'}}>An Error Occured...Please try again later.</div>);
    } else {
      const projectNames = this.props.projectNames;
      return(
        <div className="Search">
          <ul className="checkbox-grid">
            <h4>Popluar Javascript Repo</h4>
            {projectNames.map(name => (
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
          {this.state.showResultsComponent ? <Results selectedProjects={this.state.selectedProjects}/> : null}
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    projectNames: state.fetchProjNamesReducer.projectNames,
    isProjectNamesLoading: state.fetchProjNamesReducer.projectNamesIsLoading,
    projectNameError: state.fetchProjNamesReducer.fetchProjectNameHasError
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProjectNames: () => dispatch(fetchProjectNames()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
