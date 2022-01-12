import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Nav from './component/nav.js';
import Main from './component/main.js';

function App() {
  return (
    <div className="App">
      <Nav></Nav>
      <Main></Main>
    </div>
  );
}

export default App;
