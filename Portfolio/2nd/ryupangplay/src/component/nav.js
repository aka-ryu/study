import React from 'react';

function Nav (){
    return (
        <div className='navbar'>
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
          <input className='search' type="text" placeholder='제목, 배우로 검색해보세요'></input>
          <img src="https://assets.coupangplay.com/images/svg/search.svg"></img>
        </div>
      </div>
    )
}

export default Nav;