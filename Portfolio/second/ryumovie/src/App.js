import './App.css';
import { Link, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <navbar>
        <div>
          <h1>RyuMovie</h1>
        </div>
        <div>
          <div>한국</div>
          <div>액션</div>
          <div>멜로</div>
          <div>공포</div>
        </div>
        <div></div>
      </navbar>
    </div>
  );
}

export default App;
