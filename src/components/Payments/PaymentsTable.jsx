import React from "react";
import getSymbolFromCurrency from "currency-symbol-map";

const PaymentsTable = (props) => {
  const { transactions } = props;

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
    return (
      <tbody>
        {transactions?.map((transaction, index) => {
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
      <table className='table table-bordered table-hover'>
        {renderTableHead()}
        {renderTableBody()}
      </table>
    </>
  );
};

export default PaymentsTable;
