import Login from "./Login.js";
import "bootstrap/dist/css/bootstrap.min.css";
const code = new URLSearchParams(window.location.search).get("code");
function App() {
  return <Login />;
}

export default App;
