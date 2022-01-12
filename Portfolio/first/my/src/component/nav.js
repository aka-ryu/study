import React from 'react';
import { Navbar,Nav,Container,NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';


function NavBarC() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
  <FontAwesomeIcon href="home" icon={faDumbbell} className='logo' size='2x'/>
  <Navbar.Brand href="">웨이트 트레이닝</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
      <Nav.Link href="#chest">가슴</Nav.Link>
      <Nav.Link href="#back">등</Nav.Link>
      <Nav.Link href="#leg">하체</Nav.Link>
      <Nav.Link href="#arm">팔</Nav.Link>
      <Nav.Link href="#shoulder">어깨</Nav.Link>
    </Nav>
    <Nav>
        <Nav.Link href="#login">로그인</Nav.Link>
        <Nav.Link href="#join">회원가입</Nav.Link>
      
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
    )
}

export default NavBarC;