import axios from "axios";
import { PAYMENTS_URL } from "../utils/constants";

const getAllPayments = async () => {
  const res = await axios.get(PAYMENTS_URL);
  return res;
};

export { getAllPayments };
