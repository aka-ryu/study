import logo from './logo.svg';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './component/header.js';
import List from './component/list.js';
import Content from './component/content.js'
import React, { useState, createContext } from 'react';
import Data from './component/data.js';
import { Link, Route, Switch} from 'react-router-dom';

export const tabContext = React.createContext();

function App() {

  const [exercise, setExercise] = useState(Data);
  const [tab, setTab] = useState('all');
  

  return (
    <div className="App">
      <Header></Header>
      <Route exact path="/">
        <tabContext.Provider value={tab}>
          <List setTab={setTab}></List>
          <Content exercise={exercise}></Content>
        </tabContext.Provider>
        <div className='footer'>
          <Link to="/detail">
            <button>만들면서...</button>
          </Link>
        </div>
      </Route>

      <Route path="/detail">
      <div className='detail'>
        <div className='detail_content'>
          <h1>aka-ryu</h1>
          <div>
            <p>제작기간 : 2022/01/14 ~ 2022/01/15 </p>
            <p>처음으로 혼자 만들어본 사이트</p>
            <br/>
            <div className='me_box'>
              <p className='me'>
                제작전 인터페이스 구상을 완료하고 제일 고민했던 부분은 <br/>
                리엑트를 사용하지도 않고도 만들수 있는 페이지 인데<br/>
                어떻게 리엑트의 기능들을 이용하며 만들어야 할까 였습니다.<br/>
                나름대로 리엑트를 이용했다고 생각하지만 잘 했는지는 모르겠습니다.<br/><br/>

                최대한 컴포넌트화 시켜서 개별적인 컴포넌트로 관리했고<br/>
                props와 Context.Provider를 이용해 값을 공유했습니다.<br/><br/>

                useState로 tab을 선언하여 신체부위(kinds)를 담고<br/>
                목록에서 버튼을 클릭시 kinds가 해당 버튼으로 변경되고<br/>
                map,if 를 이용해 tab의 kinds와 일치하는 데이터만 출력되도록 만들었습니다.<br/><br/>

                개인적으로 목록에서 모두,가슴,등,어깨 버튼을 눌렀을때<br/>
                active를 유지해 보이는 부분에서 애를 먹었고<br/><br/>

                또 부트스트랩을 이용해서 스타일링 시간을 최대한 단축시키려고 했으나<br/>
                부트스트랩 css만 임포트하면 이상한 점선이 생기고<br/>
                해당 포인트를 찾지 못해서 애를 먹었었네요..<br/>
                다 만들어가고 나서야... 특정div에 border가 선언된것을 찾았습니다.<br/><br/>

                부트스트랩이 없으니 반응형 사이즈 조절하는부분도 어려웠고<br/>
                실제로 개발자도구로 보면 굉장히 조잡하네요<br/>
                다음에는 부트스트랩을 이용해서 제작해볼 예정입니다.<br/><br/>

                강의를 보며 공부할때는 적성에 안맞나... 고민이 많았는데<br/>
                직접 만들어보니 그렇지 않다는게 정말 다행이었습니다.<br/><br/>

                2022/01/15 조잡한 첫 사이트를 만들며...
              </p>
            </div>
          </div>
          
        </div>
          <Link to="/">
            <button>돌아가기</button>
          </Link>
        </div>
      </Route>
    </div>
  );
}



export default App;
