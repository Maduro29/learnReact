// import axios from 'axios';
import axios from "./cus-axios";

const fetchAllUsers = () => {
    return axios.get("/api/users");
}

export {
    fetchAllUsers
};