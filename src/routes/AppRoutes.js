import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import TableUsers from "../components/TableUsers";
import Login from "../components/Login";
import PrivateRoutes from "./PrivateRoute";
import NotFoundRoutes from "./NotFoundRoutes";

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
            <Route path='*' element={<NotFoundRoutes />} />
        </Routes>
    </>
}

export default AppRoutes;