import axios from 'axios';

export const axiosInstance = axios.create({
    headers: {
        'content-type': 'application/json',
    },
});

export default () => {
    let isRefreshing = false;
    let failedQueue = [];

    const processQueue = (error, token = null) => {
        failedQueue.forEach(prom => {
            if (error) {
                prom.reject(error);
            } else {
                prom.resolve(token);
            }
        });

        failedQueue = [];
    };

    // predicts baseURL from request.url
    axiosInstance.interceptors.request.use(
        config => {
            config.baseURL = process.env.REACT_APP_BASE_URL;

            return config;
        },
        error => Promise.reject(error),
    );

    // handles invalidated authorization token
    axiosInstance.interceptors.response.use(
        response => {
            return response;
        },
        err => {
            const originalRequest = err.config;
            // console.log(err.config);
            if (err.response.status === 401 && !originalRequest._retry) {
                if (isRefreshing) {
                    return new Promise(function (resolve, reject) {
                        failedQueue.push({ resolve, reject });
                    })
                        .then(data => {
                            originalRequest.headers['Authorization'] = 'Bearer ' + data.token;
                            return axiosInstance(originalRequest);
                        })
                        .catch(err => {
                            return Promise.reject(err);
                        });
                }

                originalRequest._retry = true;
                isRefreshing = true;

                return new Promise(function (resolve, reject) {
                    const refreshToken = localStorage.getItem('userRefreshToken');

                    axiosInstance
                        .get(`/token/refresh/${refreshToken}`)
                        .then(data => {
                            const { token, type, refreshToken } = data.data.result.data;
                            // localStorage.setItem('userToken', token);
                            // localStorage.setItem('userRefreshToken', refreshToken);
                            // localStorage.setItem('type', type);
                            axiosInstance.defaults.headers.common['Authorization'] =
                                type + ' ' + token;
                            originalRequest.headers['Authorization'] = type + ' ' + token;
                            processQueue(null, data.data.result.data);
                            resolve(axiosInstance(originalRequest));
                        })
                        .catch(err => {
                            reject(err);
                        })
                        .then(() => {
                            isRefreshing = false;
                        });
                });
            }
            return Promise.reject(err);
        },
    );
};