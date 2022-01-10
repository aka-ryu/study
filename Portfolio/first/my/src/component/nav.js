import React from 'react';
import { Navbar,Nav,Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';


function NavBarC() {
    return (
        <Navbar bg="dark" variant="dark" className="navbar"> 
            <Container>
            <FontAwesomeIcon icon={ faDumbbell } className="dumbbell"/>
            <Navbar.Brand href="#home">웨이트 트레이닝</Navbar.Brand>
            <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
            </Container>
        </Navbar>
    )
}

export default NavBarC;