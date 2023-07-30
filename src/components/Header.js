// import { Nav, NavDropdown, Navbar, Container } from "react-bootstrap";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Logo from '../assets/images/logo192.png';
import { NavLink } from 'react-router-dom';


const Header = (props) => {
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
                            <NavLink to="/login" className='nav-link'>Login</NavLink>
                            <NavLink to="action/3.2" className='nav-link'>Logout</NavLink>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar></>
    )
}

export default Header;