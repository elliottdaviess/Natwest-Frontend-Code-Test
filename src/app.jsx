import React, { useEffect, useState } from "react";
import { getAllPayments } from "./services/paymentsService";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.scss";
import PaymentsTable from "./components/Payments/PaymentsTable";

const App = () => {
  const [paymentsData, setPaymentsData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getPaymentsData = async () => {
    const response = await getAllPayments();
    setPaymentsData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getPaymentsData();
  }, []);

  return (
    <>
      {isLoading && <h1>Loading...</h1>}
      {!isLoading && !paymentsData.results && (
        <h1>Oops...something went wrong</h1>
      )}
      {!isLoading && paymentsData.results && (
        <div className='container'>
          <h1>Payment Transactions</h1>
          <PaymentsTable transactions={paymentsData.results}></PaymentsTable>
        </div>
      )}
    </>
  );
};

export default App;
