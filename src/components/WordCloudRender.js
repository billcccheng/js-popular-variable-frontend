import React, { Component } from 'react';
import Api from '../utils/Api';
import WordCloud from 'react-d3-cloud';
import Select from 'react-select';
import Spinner from 'react-spinkit';
import 'react-select/dist/react-select.css';
import './WordCloudRender.css';

class WordCloudRender extends Component {
  constructor(){
    super();
    this.state = {
      projectNames: [],
      selectedProject: "",
      results: {},
      openSelections: false,
      openWordCloud: false
    };

    this.onSelectChange = this.onSelectChange.bind(this);
  }
  componentWillMount(){
    Api.fetchProjectNames()
      .then((res) => {
        this.setState({
          projectNames: res.data.reduce((res, itm) => {
            return res.concat({'value': itm, 'label': itm});
          },[]),
          openSelections: true
        });
      })
      .catch((err) => {
        this.setState({
          openSelections: 'error'
        });
      });
  }

  fetchSingleProjectVariables(selected){
    Api.fetchSingleProjectVariables(selected)
      .then((res) => {
        this.setState({
          results: res.data,
          openWordCloud: true
        });
      })
      .catch((err) => {
        this.setState({
          results: "erro",
          openWordCloud: false
        });
      });
  }

  onSelectChange(selected){
    this.setState({
      selectedProject: selected.value
    });
    this.fetchSingleProjectVariables(selected.value);
  }

  render(){
    const fontSizeMapper = word => Math.log2(word.value) * 6;
    const rotate = word => Math.random() * 20;

    if(!this.state.openSelections){
      return(<Spinner className="loading-symbol" name="ball-scale-multiple" color="grey"/>);
    }else if(this.state.openCheckBox === 'error'){
      return(<div style={{color:'red'}}>An Error Occured...Please try again later.</div>);
    }else{
      return(
        <div>
          <Select
            className="project-select"
            placeholder="Select a JavaScript Project"
            value={this.state.selectedProject}
            options={this.state.projectNames}
            onChange={this.onSelectChange}
            clearable={false}
            deleteRemoves={false}
            backspaceRemoves={false}
          />
          {this.state.openWordCloud ? <WordCloud data={this.state.results} fontSizeMapper={fontSizeMapper} rotate={rotate}/>: null}
        </div>
      );
    }
  }
}

export default WordCloudRender;
