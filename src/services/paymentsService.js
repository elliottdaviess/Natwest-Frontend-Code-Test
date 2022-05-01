import axios from "axios";
import { PAYMENTS_URL, ADDITIONAL_PAYMENTS_URL } from "../utils/constants";

const getPaymentsData = async (isInitialLoad, nextPageIndex) => {
  const url = isInitialLoad
    ? PAYMENTS_URL
    : `${ADDITIONAL_PAYMENTS_URL}${nextPageIndex}`;
  return await axios.get(url);
};

export { getPaymentsData };
