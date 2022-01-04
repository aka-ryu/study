/* eslint-disable */

import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  let [글제목, 글제목변경] = useState(['남자 코트 추천', '강남 우동 맛집', '노량진 버스']);
  let posts = '강남 고기 맛집';
  let [따봉,따봉변경] = useState(0);
  let [modal, modalChange] = useState(false);
  let [누른제목, 누른제목변경] = useState(0);
  let [입력값, 입력값변경] = useState('');
  

  

  return (
    <div className="App">
      <div className="black-nav">
        <div>개발 Blog</div>
      </div>
      
      {
        글제목.map(function(a, i){
          return (
          <div className="list" key={i}>
            <h3 onClick={ ()=>{ 누른제목변경(i) } }> { a } </h3>
            <p>2월 17일 발행</p>
          <hr/>
          </div>
          )
        })
      }
      

      {/* <input onChange={ (e)=> { 입력값변경(e.target.value) } }/> */}
      
      <div className="publish">
        <input onChange={ (e) => {입력값변경(e.target.value)}}/>
        <button onClick={ ()=>{  
          var arrayCopy = [...글제목];
          arrayCopy.unshift(입력값);
          글제목변경(arrayCopy);
        }}>저장</button>
      </div>
       

      <button onClick={ ()=> {modalChange(!modal)} }>on/off</button>
      
      {
        modal === true
        ? <Modal 글제목={글제목} 누른제목={누른제목}></Modal>
        : null
      }
      
      <Profile></Profile>

    </div>
  );
}

function Modal(props){
  return (
    <>
    <div className="modal">
        <h2>{props.글제목[props.누른제목]}</h2>
        <p>날짜</p>
        <p>상세내용</p>
    </div>
    </>
  )
}

class Profile extends React.Component {
  constructor(){
    super();
    this.state = { name: 'kim' }
  }

  changeName() {
    this.setState( { name : 'Park' } )
  }

  render(){
    return(
      <div>
        <h3>프로필 입니다.</h3>
        <p>저는 { this.state.name } 입니다.</p>
        <button onClick={ this.changeName.bind(this) }>이름변경버튼</button>
      </div>
    )
  }
}


export default App;
