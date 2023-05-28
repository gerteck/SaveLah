import { defineAnimation } from "react-native-reanimated";
import { Platform } from "react-native-web";

let baseURL = 'https://savelah-server.onrender.com/api/v1/';

// let baseURL = '';

// {Platform.OS == 'android'
// ? baseURL = 'http://10.0.2.2:3000/api/v1/'
// : baseURL = 'http://localhost:3000/api/v1/'
// }

export default baseURL;