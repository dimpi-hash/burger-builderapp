import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-burger-app-8d708-default-rtdb.firebaseio.com/",
});

export default instance;
