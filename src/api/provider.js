import {apiInstance} from "./instance"

export const DataProvider = {
    getPosts() {
        return apiInstance.get(`posts`)
    },
    getUsers() {
        return apiInstance.get(`users`)
    }
}