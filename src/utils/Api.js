import axios from 'axios';

const hostName = 'http://localhost:5000/api';
let axiosAPI = {
  fetchProjectNames: () => {
    const url = `${hostName}/getProjectNames`;
    return axios.get(url);
  },
  fetchProjectVariables: (params) => {
    const url = `${hostName}/getProjectVariables`;
    return axios.post(url,{
      selectedProjects: params
    });
  },
  fetchSingleProjectVariables: (project) => {
    const url = `${hostName}/getSingleProjectVariables/${project}`;
    return axios.get(url);
  }
}

export default axiosAPI;


