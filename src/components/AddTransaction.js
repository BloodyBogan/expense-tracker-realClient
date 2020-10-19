import React, { useState, useContext, useRef } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const AddTransaction = () => {
  const textInput = useRef(null);
  const amountInput = useRef(null);

  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);

  const { addTransaction } = useContext(GlobalContext);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (text.trim() === '') {
      clearState(true);
      return;
    }

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: Number(amount),
    };

    addTransaction(newTransaction);

    clearState(false);
  };

  const clearState = (error) => {
    setText('');
    setAmount(0);

    if (error) {
      textInput.current.focus();
    } else {
      amountInput.current.blur();
    }
  };

  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={handleFormSubmit}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            ref={textInput}
            id="text"
            placeholder="Enter text..."
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount <br />
            (negative - expense, positive - income)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            ref={amountInput}
            id="amount"
            placeholder="Enter amount..."
          />
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>
  );
};
