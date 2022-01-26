import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';

function Nav (){

  const [scroll, setScroll] = useState(0);
  const updateScroll = () => {
    setScroll(window.scrollY || document.documentElement.scrollTop);
  }

  useEffect(()=>{
    window.addEventListener('scroll', updateScroll);
  })

    return (
      <header>
        <div className={scroll < 20 ? 'navbar' : 'navbar-black'}>
          <a href="/"> 
            <img src="https://assets.coupangplay.com/images/logo.png" className='logo'></img>
          </a>
          <ul className='genre'>
            <li>액션</li>
            <li>멜로</li>
            <li>공포</li>
            <li>코미디</li>
            <li>SF 판타지</li>
            <li>한국</li>
          </ul>
          <div className='nav-search'>
            <input className='search' type="text" placeholder='제목으로 검색해보세요'></input>
            <img src="https://assets.coupangplay.com/images/svg/search.svg"></img>
          </div>
          <FontAwesomeIcon icon={faBars} className='nav-bars' size='2x'/>
        </div>
      </header>
    )
}

export default Nav;