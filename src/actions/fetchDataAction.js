import axios from 'axios';

const hostName = 'http://localhost:5000/api';

export function fetchProjectNames() {
  return (dispatch) => {
    /*LOCAL TESTING USE*/
    const url = `${hostName}/getProjectNames`;
    dispatch({type: "FETCH_PROJECT_NAMES", payload: axios.get(url)});
  }
}
