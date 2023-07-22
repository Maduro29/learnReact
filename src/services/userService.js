// import axios from 'axios';
import axios from "./cus-axios";

const fetchAllUsers = (page) => {
    return axios.get(`/api/users?page=${page}`);
}

export {
    fetchAllUsers
};