import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import TableUsers from "../components/TableUsers";
import Login from "../components/Login";
import PrivateRoutes from "./PrivateRoute";

const AppRoutes = () => {
    return <>
        <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/users' element={
                <PrivateRoutes>
                    <TableUsers />
                </PrivateRoutes>
            } />
        </Routes>
    </>
}

export default AppRoutes;