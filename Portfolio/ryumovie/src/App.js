// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Nav from './component/nav.js';
import Slide from './component/slide.js';
import Contents from './component/contents';
import Footer from './component/footer';
import {Link, Route, Switch} from 'react-router-dom';
import List from './component/list';
import React, {useState, createContext}  from 'react';


function App() {

  const [genre, setGenre] = useState('');

  return (
    <div className="App">
      
      <Nav setGenre={setGenre} genre={genre}></Nav>
      
      <Switch>
        <Route exact path="/">
          <Slide></Slide>
          <Contents></Contents>
        </Route>

        <Route path="/list/:id">
          <List></List>
        </Route>
      </Switch>
      
    </div>
  );
}

export default App;
