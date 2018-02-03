import axios from 'axios';

/*LOCAL TESTING USE*/
const hostName = 'http://localhost:5000/api';

export function fetchProjectNames() {
  return (dispatch) => {
    const url = `${hostName}/getProjectNames`;
    dispatch({type: "FETCH_PROJECT_NAMES", payload: axios.get(url)});
  }
}

export function fetchProjectVariables(selectedProjects, filters, unFetchedProjects) {
  return (dispatch, getState) => {
    const thisState = getState().fetchProjVarReducer;
    const url = `${hostName}/getProjectVariables`;
    dispatch({type: "FETCH_PROJECT_VARIABLES_PENDING"});

    if(unFetchedProjects.length === 0) {
        const filteredResults = filterResults(thisState.results, selectedProjects, filters);
        dispatch({
          type: "FETCH_PROJECT_VARIABLES_FULFILLED",
          filtered: filteredResults,
          results: thisState.results
        });
    } else {
      axios.post(url,{
        selectedProjects: unFetchedProjects
      }).then((res) => {
        const newResults = {...thisState.results, ...res.data}
        const filteredResults = filterResults(newResults, selectedProjects, filters);
        dispatch({
          type: "FETCH_PROJECT_VARIABLES_FULFILLED",
          filtered: filteredResults,
          results: newResults
        });
      }).catch((err) => {
        dispatch({type: "FETCH_PROJECT_VARIABLES_REJECTED"});
      });
    }
  }
}

function filterResults(results, selectedProjects, filterInput) {
  const userInput = filterInput.toLowerCase();
  let filteredResults = {};
  selectedProjects.forEach(projectName => {
    projectName = projectName.charAt(0).toLowerCase() + projectName.slice(1);
    filteredResults[projectName] = {};
    if(projectName in results){
      const variableNames = Object.keys(results[projectName]);
      variableNames.filter(variableName => {
        return variableName.toLowerCase().includes(userInput);
      }).map((variableName) => {
        filteredResults[projectName][variableName] = results[projectName][variableName];
        return filteredResults;
      });
    }
  });
  return filteredResults;
}
