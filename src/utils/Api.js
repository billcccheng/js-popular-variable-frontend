import axios from 'axios';

let axiosAPI = {
  fetchProjectNames: (params) => {
    const url = 'http://localhost:5000/api/getProjectNames';
    return axios.get(url);
  }
}

export default axiosAPI;


