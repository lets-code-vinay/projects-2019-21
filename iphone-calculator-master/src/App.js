import React, {useState, useEffect, useRef} from 'react';
import './App.css';

function App() {
  const [result, setResult] = useState(" ");
  return (
    <div className="calc-app">
      <form className="calc-form">
        <input type="text" />
      </form>
      <div className="keypad">
        <button className="clear" id="clear"></button>
        <button id="backspace"></button>
        <button></button>
        <button></button>
        <button></button>
        <button></button>
        <button></button>
        <button></button>
        <button></button>
        <button></button>
        <button></button>

      </div>
    <h1> Calculator</h1>  

    </div>
  );
}

export default App;
