import { useContext } from "react";
import { authContext } from "./context/AuthContext";
import Layout from "./layout/layout";
import Login from "./login/Login";

function App() {
  const { user } = useContext(authContext);

  return user ? <Layout /> : <Login />;
}

export default App;
