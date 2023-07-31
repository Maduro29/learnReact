import { useContext } from "react";
import { UserContext } from "../context/userContext";
import Alert from 'react-bootstrap/Alert';

const PrivateRoutes = (props) => {
    const { user } = useContext(UserContext);

    if (user && !user.auth) {
        return <>
            <Alert variant="danger">
                <Alert.Heading>You do not have permission to access this page.</Alert.Heading>
                <p>
                    Please log in to continue.
                </p>
                <hr />
            </Alert>
        </>
    } else {
        return <>
            {props.children}
        </>
    }
}


export default PrivateRoutes;

// return like above cuz a Route have to render a JSX element.