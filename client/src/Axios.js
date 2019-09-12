import Axios from "axios";

export default Axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    Authorization: localStorage.getItem("auth-token"),
  },
});
