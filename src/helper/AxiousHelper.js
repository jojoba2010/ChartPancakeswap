import axios from 'axios'
const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    // headers: {
    //     'content-type': 'application/json',
    //     // 'Host':Host
    // },
});

export default {
    getData: (token) =>
        instance({
            'method': 'GET',
            'url': token,
        }),
}