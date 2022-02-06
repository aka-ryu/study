import logo from './logo.svg';
import './App.css';
import Customer from './components/Customer.js'

const customer = {
  'id' :1,
  'img': 'https://placeimg.com/64/64/any',
  'name': '홍길동',
  'birth' : '910912',
  'gender' : '남자',
  'job' : '대학생'
}

function App() {
  return (

    <div className="gray-background">
      <img src={logo} lat="logo" />
      <h2>Let's develop management system!</h2>
      <Customer 
        id={customer.id}
        image={customer.img}
        name={customer.name}
        birth={customer.birth}
        gender={customer.gender}
        job={customer.job}
      />
    </div>
    
  );
}

export default App;
