import React, { useEffect, useState } from "react";
import { getPaymentsData } from "./services/paymentsService";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.scss";
import PaymentsTable from "./components/Payments/PaymentsTable";

const App = () => {
  const [paymentsData, setPaymentsData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const getPayments = async () => {
    if (isInitialLoad || paymentsData?.metaDatal.hasMoreElements) {
      const response = await getPaymentsData(
        isInitialLoad,
        paymentsData?.metaDatal.nextPageIndex
      );
      if (response.data) {
        if (!isInitialLoad)
          response.data.results.unshift(...paymentsData.results);
        setPaymentsData(response.data);
        if (isInitialLoad) setIsInitialLoad(false);
      }
      if (isLoading) setIsLoading(false);
    }
  };

  useEffect(() => {
    getPayments();
  }, []);

  return (
    <>
      {isLoading && <h1>Loading...</h1>}
      {!isLoading && !paymentsData?.results && (
        <h1>Oops...something went wrong</h1>
      )}
      {!isLoading && paymentsData.results && (
        <div className='container'>
          <h1>Payment Transactions</h1>
          <PaymentsTable transactions={paymentsData.results}></PaymentsTable>
          <button
            className='btn btn-primary btn-lg btn-block'
            onClick={function () {
              getPayments();
            }}
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
};

export default App;
