// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Nav from './component/nav.js';
import Slide from './component/slide.js';
import Contents from './component/contents';

import Footer from './component/footer';

function App() {

  
  
  return (
    <div className="App">
      <Nav></Nav>
      <Slide></Slide>
      <Contents></Contents>
      <Footer></Footer>
    </div>
  );
}

export default App;
