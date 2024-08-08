import axios from "axios";
import { BACKEND_URL } from "../environment/config";

const axiosPublic = axios.create({
  baseURL: BACKEND_URL,
});

export default axiosPublic;
