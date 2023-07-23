// import axios from 'axios';
import axios from "./cus-axios";

const fetchAllUsers = (page) => {
    return axios.get(`/api/users?page=${page}`);
}

const addNewUser = (name, job) => {
    return axios.post('api/users', { name: name, job: job });
}

export {
    fetchAllUsers, addNewUser
};