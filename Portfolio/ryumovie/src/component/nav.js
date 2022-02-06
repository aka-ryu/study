import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState, useContext } from 'react';


function Nav (props){


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
            <a href="/list/action" onClick={() => props.setgenre("action")}>
              <li  >액션</li>
            </a>
            <a href="/list/mellow" onClick={() => props.setgenre('romance')}>
              <li>멜로</li>
            </a>
            <a href="/list/horror" onClick={() => props.setgenre('fear')}>
              <li>공포</li>
            </a>
            <a href="/list/comedy" onClick={() => props.setgenre('comedy')}>
              <li>코미디</li>
            </a>
            <a href="/list/sf" onClick={() => props.setgenre('sf')}>
              <li>SF 판타지</li>
            </a>
          </ul>
          <div className='user'>
            <a href="/login">로그인</a>
            <a href="/register">회원가입</a>
          </div>
        </div>
        
      </header>
      
    )
    
}

export default Nav;