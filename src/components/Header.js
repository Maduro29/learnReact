// import { Nav, NavDropdown, Navbar, Container } from "react-bootstrap";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Logo from '../assets/images/logo192.png';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Header = (props) => {

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <><Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="home">
                    <img
                        src={Logo}
                        width='30'
                        height='30'
                        className='d-inline-block align-top'
                        alt='React Boostrap Logo'
                    /> ReactByMaduro
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="home" className='nav-link'>Home</NavLink>
                        <NavLink to="users" className='nav-link'>Users</NavLink>
                    </Nav>
                    <Nav>
                        <NavDropdown title="Account" id="basic-nav-dropdown">
                            <NavDropdown.Item as={NavLink} to="/login">Login</NavDropdown.Item>
                            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar ></>
    )
}

export default Header;