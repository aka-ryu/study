import React from 'react';
// import { Navbar,Nav,Container,NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';


function Header() {
    return (
      <div className='header'>
        <FontAwesomeIcon icon={faDumbbell} size="4x" className='logo'/>
        <h1>모두의 운동</h1>
      </div>
    )
}

export default Header;