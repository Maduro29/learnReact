// import axios from 'axios';
import axios from "./cus-axios";

const fetchAllUsers = (page) => {
    return axios.get(`/api/users?page=${page}`);
}

const addNewUser = (name, job) => {
    return axios.post('api/users', { name: name, job: job });
}

const editUser = (name, job) => {
    return axios.put('api/users/2', { name: name, job: job });
}

const deleteUser = () => {
    return axios.delete('api/users/2');
}

export {
    fetchAllUsers, addNewUser, editUser, deleteUser
};