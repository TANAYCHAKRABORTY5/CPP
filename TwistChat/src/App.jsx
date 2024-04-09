import Register from "./Register";
import axios from "axios";

function App() {
  axios.defaults.baseURl = "http://localhost:7080";
  axios.defaults.withCredentials = true;
  return <Register />;
}

export default App;
