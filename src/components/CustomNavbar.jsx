// Navbar.js
import { Navbar, Nav } from 'react-bootstrap';

const CustomNavbar = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
                <Nav className="mr-auto">
                    <Nav.Link href="#home" style={{ fontSize: '20px', fontWeight: 'bold' }}>
                        Home
                    </Nav.Link>
                    <Nav.Link href="#link" style={{ fontSize: '20px', fontWeight: 'bold' }}>
                        Link
                    </Nav.Link>
                    <Nav.Link href="#link" style={{ fontSize: '20px', fontWeight: 'bold' }}>
                        Link
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default CustomNavbar;
