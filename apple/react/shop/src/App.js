/* eslint-disable */
import './App.css';
import { Navbar,Button,Container,Nav,NavDropdown } from 'react-bootstrap';
import React, { useContext, useState } from 'react';
import Data from './data.js';
import Detail from './Detail';
import axios from 'axios';
import { Link, Route, Switch} from 'react-router-dom';

export let countContext = React.createContext();

function App() {

  let [shoes, shoesC] = useState(Data);
  let [count, countC] = useState([10,11,12]);

  return (
    <div className="App">
      
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/Detail">Detail</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>


      <Switch>

        <Route exact path="/">
          
        <div className="jumbotron background">
          <h1>20% Season Off</h1>
          <p> 
          Normally components will render a HTML element. 
          However you can render whatever you'd like, 
          adding a href prop will automatically render an element. 
          You can use the as prop to render whatever your heart desires. 
          React Bootstrap will take care of the proper ARIA roles for you.
          </p>
          <p>
            <Button variant="primary">Learn more</Button>{' '}
          </p>
        </div>


        <div className="container">

          <countContext.Provider value={count}>
            <div className="row">
              {
                shoes.map((a,i)=>{
                  return <Card shoes={a} i={i}/>
                })
              }
            </div>
          </countContext.Provider>



          <button className="btn btn-primary" onClick={()=>{
            
            axios.get('https://codingapple1.github.io/shop/data2.json')
            .then((result) => { 
              shoesC( [...shoes, ...result.data] );  
            })
            .catch(() => { 
              console.log('실패')
             })

          }}>더보기</button>
        </div>

        </Route>



        <Route path="/detail/:id">
          <countContext.Provider value={count}>
            <Detail shoes={shoes} count={count} countC={countC}/>
          </countContext.Provider>
        </Route>

        
        <Route path="/:id">
            <div>아무거나</div>
        </Route>

      </Switch>      
      
    </div>
  );
}


function Card(props) {

  let count = useContext(countContext);

  return(
    <div className="col-md-4">
      <img src={'https://codingapple1.github.io/shop/shoes'+ (props.i+1) + '.jpg'} width="100%" />
      <h4> {props.shoes.title} </h4>
      <p> {props.shoes.content} & {props.shoes.price} </p>
      <Test></Test>
    </div>
  )
}


function Test(){
  let count = useContext(countContext);

  return <p> 재고 : {count} </p>
}

export default App;

