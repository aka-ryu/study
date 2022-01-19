import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Nav from './component/nav.js';
import Slide from './component/slide.js';
import Contents from './component/contents';

import Data from './data.js';

function App() {

  
  
  return (
    <div className="App">
      <Nav></Nav>
      <Slide></Slide>
      <Contents></Contents>
    </div>
  );
}

export default App;
