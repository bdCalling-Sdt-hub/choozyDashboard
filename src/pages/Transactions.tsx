import React from 'react'
import TransactionsStatus from '../component/Transactions/TransactionStatus'
import TransactionChart from '../component/Transactions/TransactionsChart'

type Props = {}

const Transactions = (props: Props) => {
  return (
    <div>
      <TransactionsStatus />
      <TransactionChart />
    </div>
  )
}

export default Transactions