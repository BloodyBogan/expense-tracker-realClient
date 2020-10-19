import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { motion } from 'framer-motion';
import { numberWithCommas } from '../utils/format';

export const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext);

  const sign = transaction.amount < 0 ? '-' : '+';

  return (
    <motion.li
      key={transaction._id}
      initial={{ opacity: 0, x: '-50%' }}
      animate={{ opacity: 1, x: 0 }}
      transaction={transaction}
      className={transaction.amount < 0 ? 'minus' : 'plus'}
    >
      {transaction.text}
      <span>
        {sign}&euro;{numberWithCommas(Math.abs(transaction.amount))}
      </span>
      <button
        onClick={() => deleteTransaction(transaction._id)}
        className="delete-btn"
      >
        x
      </button>
    </motion.li>
  );
};
