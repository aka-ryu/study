import logo from './logo.svg';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './component/header.js';
import List from './component/list.js';
import Content from './component/content.js'
import React, { useState } from 'react';
import Data from './component/data.js';

function App() {

  const [exercise, setExercise] = useState(Data);
  const [tab, setTab] = useState('all');
  

  return (
    <div className="App">
      <Header></Header>
      <List tab={tab} setTab={setTab}></List>
      <Content exercise={exercise}></Content>
    </div>
  );
}



export default App;
