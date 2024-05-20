import { useRoutes } from "react-router-dom";
import { router } from "./router";

function App() {
  return <div>{useRoutes(router)}</div>;
}

export default App;
