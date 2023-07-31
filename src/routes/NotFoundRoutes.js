import { NavLink } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';

const NotFoundRoutes = () => {
    return <>
        <Alert variant="danger">
            <Alert.Heading>Page not found.</Alert.Heading>
            <p>
                Back to Home Page: <NavLink to="home" className='nav-link'>Home</NavLink>
            </p>
            <hr />
        </Alert>
    </>
}

export default NotFoundRoutes;