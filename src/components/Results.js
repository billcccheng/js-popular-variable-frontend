import React, { Component } from 'react';
import Api from '../utils/Api';
import Spinner from 'react-spinkit';
import './Results.css'

class Results extends Component {
  constructor(){
    super();
    this.state = {
      results: {},
      showResults: false
    }
  }

  componentWillMount(){
    this.fetchVariableData(this.props.selectedProjects);
  }

  componentWillReceiveProps(nextProps){
    this.fetchVariableData(nextProps.selectedProjects);
  }

  shouldComponentUpdate(nextProp, nextState){
    if(nextProp.update)
      return true;
    return false;
  }

  fetchVariableData(selectedProjects){
    this.setState({
      showResults: false
    });
    Api.fetchProjectVariables(selectedProjects)
      .then(res => {
        this.setState({
          results: res.data,
          showResults: true
        });
      })
      .catch((err) => {
        this.setState({
          showResults: 'error'
        });
      });
  }

  render() {
    if(!this.state.showResults){
      return(<Spinner className="loading-symbol" name="ball-scale-multiple" color="grey"/>);
    }else if(this.state.showResults === 'error'){
      return(<div style={{color:'red'}}>An Error Occured...Please try again later.</div>);
    }else{
      //let numberOfData = 0;
      let keys = [];
      let varResults = this.state.results;
      Object.keys(varResults).forEach(key => {
        keys.unshift(key);
      });
      return(
        <div>
          {keys.map(key =>
              <div key={key}>
                {key}
                <ol>
                  {
                    Object.keys(varResults[key]).map(varName =>
                      <li key={varName}>{varName}</li>
                    )
                  }
                </ol>
              </div>
            )
          }
        </div>
      );
    }
  }
}

export default Results;
