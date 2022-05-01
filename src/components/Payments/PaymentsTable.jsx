import React, { useState } from "react";
import getSymbolFromCurrency from "currency-symbol-map";
import { PENDING_PAYMENT_STATUS } from "../../utils/constants";

const PaymentsTable = (props) => {
  const { transactions } = props;
  const [isPendingFilterEnabled, setIsPendingFilterEnabled] = useState(false);

  const headers = [
    "From",
    "To",
    "Currency",
    "Amount",
    "Type",
    "Date",
    "Status",
  ];

  const maskify = (cc) => {
    return cc.replace(/.(?=.{4})/g, "*");
  };

  const renderTableHead = () => {
    return (
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
    );
  };

  const renderTableBody = () => {
    const transactionsToDisplay = isPendingFilterEnabled
      ? transactions?.filter(
          (transaction) => transaction.paymentStatus === PENDING_PAYMENT_STATUS
        )
      : transactions;

    return (
      <tbody>
        {transactionsToDisplay?.map((transaction, index) => {
          return (
            <tr key={index}>
              <td>
                <div>{transaction.fromAccount.accountName}</div>
                <div>{maskify(transaction.fromAccount.accountNumber)}</div>
              </td>
              <td>
                <div>{transaction.toAccount.accountName}</div>
                <div>{maskify(transaction.toAccount.accountNumber)}</div>
              </td>
              <td>{transaction.paymentCurrency}</td>
              <td>
                {`${getSymbolFromCurrency(transaction.paymentCurrency)}${
                  transaction.paymentAmount
                }`}
              </td>
              <td>{transaction.paymentType}</td>
              <td>{transaction.paymentDate}</td>
              <td>{transaction.paymentStatus}</td>
            </tr>
          );
        })}
      </tbody>
    );
  };

  return (
    <>
      <div className='form-check'>
        <input
          className='form-check-input'
          type='checkbox'
          value={isPendingFilterEnabled}
          onChange={function () {
            setIsPendingFilterEnabled((currentVal) => !currentVal);
          }}
        />
        <label className='form-check-label'>
          View Pending Transactions Only.
        </label>
      </div>
      <table className='table table-bordered table-hover'>
        {renderTableHead()}
        {renderTableBody()}
      </table>
    </>
  );
};

export default PaymentsTable;
