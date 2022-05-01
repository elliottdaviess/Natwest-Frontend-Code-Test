import React, { useEffect, useState } from "react";
import { getPaymentsData } from "./services/paymentsService";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.scss";
import PaymentsTable from "./components/Payments/PaymentsTable";

const App = () => {
  const [paymentsData, setPaymentsData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [hasErrorOccured, setHasErrorOccured] = useState(false);

  const getPayments = async () => {
    if (isInitialLoad || paymentsData?.metaDatal.hasMoreElements) {
      try {
        const response = await getPaymentsData(
          isInitialLoad,
          paymentsData?.metaDatal.nextPageIndex
        );
        if (response.data) {
          if (!isInitialLoad)
            response.data.results.unshift(...paymentsData.results); // not modifying const value, just the array it points to
          setPaymentsData(response.data);
          if (isInitialLoad) setIsInitialLoad(false);
        }
      } catch (e) {
        console.error(e);
        setHasErrorOccured(true);
        setIsLoading(false);
      } finally {
        if (isLoading) setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    getPayments();
  }, []);

  return (
    <>
      {isLoading && <h1>Loading...</h1>}
      {hasErrorOccured && (
        <h1>Oops...something went wrong. Try refreshing the tab.</h1>
      )}
      {!isLoading && !hasErrorOccured && paymentsData?.results && (
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
