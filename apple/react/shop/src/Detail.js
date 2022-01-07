import { clear } from "@testing-library/user-event/dist/clear";
import { useContext, useEffect, useState } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import styled from "styled-components";
import { countContext } from "./App.js";
import { Navbar, Button, Container, Nav, NavDropdown } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";
import './Detail.css';

let 박스 = styled.div`
  padding: 20px;
`;

let 제목 = styled.h4`
  font-size: 25px;
  color: ${(props) => props.색상};
`;

function Detail(props) {
  let [alert, alertC] = useState(true);
  let count = useContext(countContext);

  let [tab, tabC] = useState(0);
  let [on, onC] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => {
      alertC(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  let [inputData, inputDataC] = useState("");

  let { id } = useParams();
  let targetProduct = props.shoes.find(function (product) {
    return product.id == id;
  });
  let history = useHistory();

  return (
    <div className="container">
      <박스>
        <제목 색상="red">Detail</제목>
      </박스>

      {inputData}
      <input
        onChange={(e) => {
          inputDataC(e.target.value);
        }}
      />

      {alert === true ? (
        <div className="my-alert2">
          <p>재고가 얼마 남지 않았습니다.</p>
        </div>
      ) : null}

      <div className="row">
        <div className="col-md-6">
          <img
            src="https://codingapple1.github.io/shop/shoes1.jpg"
            width="100%"
          />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{targetProduct.title}</h4>
          <p>{targetProduct.content}</p>
          <p>{targetProduct.price}원</p>
          <Info count={props.count}></Info>
          <button
            className="btn btn-danger"
            onClick={() => {
              props.countC();
            }}
          >
            주문하기
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              history.goBack();
            }}
          >
            뒤로가기
          </button>
        </div>
      </div>

      <Nav className="mt-5" variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link eventKey="link-0" onClick={()=>{ onC(false); tabC(0) }}>Active</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" onClick={()=>{ onC(false); tabC(1) }}>Option 2</Nav.Link>
        </Nav.Item>
      </Nav>
      
      <CSSTransition in={on} classNames="wow" timeout={500}>
        <TabContent tab={tab} onC={onC}/>
      </CSSTransition>

    </div>
  );
}

function TabContent(props) {
  
  useEffect(()=>{
    props.onC(true);
  });

  if (props.tab === 0) {
    return <div>0번째</div>
  } else if (props.tab === 1) {
    return <div>1번재</div>
  } else if (props.tab === 2) {
    return <div>2번재</div>
  }

}

function Info(props) {
  return <p>재고 : {props.count[0]}</p>;
}

export default Detail;
