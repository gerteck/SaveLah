import axios from "axios";

//Encrypt this LOL, put in .config
const API_BASE_URL = 'https://savelah-server.onrender.com/api/v1';


export const request = ( { url, method, data } ) => {
    return axios( {
        method: method || 'get',
        url: `${API_BASE_URL}${url}`,
        data,
    })
};

// Send a POST request
// request({url, data})


export const addTokenToAxios = (token) => {
    axios.defaults.headers.authorization = token;
};