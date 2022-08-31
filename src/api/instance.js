import axios from "axios";

const URL = `https://jsonplaceholder.typicode.com/`

const axiosInstance = axios.create({
    baseURL: URL,
})

export const apiInstance = {
    get: (url, params) => {
        return new Promise((resolve, reject) => {
            axiosInstance.get(url, params)
                .then(resolve)
                .catch((error) => {
                    alert(error)
                })
        })
    },
    post: (url, body) => {
        return new Promise((resolve, reject) => {
            axiosInstance.post(url, body)
                .then(resolve)
                .catch((error) => {
                    alert(error)
                })
        })
    },
}