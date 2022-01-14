import logo from './logo.svg';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './component/header.js';
import List from './component/list.js';
import Content from './component/content.js'
import React, { useState, createContext } from 'react';
import Data from './component/data.js';

export const tabContext = React.createContext();

function App() {

  const [exercise, setExercise] = useState(Data);
  const [tab, setTab] = useState('all');
  

  return (
    <div className="App">
      <Header></Header>
      <tabContext.Provider value={tab}>
        <List setTab={setTab}></List>
        <Content exercise={exercise}></Content>
      </tabContext.Provider>
    </div>
  );
}



export default App;
