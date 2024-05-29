import { useRoutes } from "react-router-dom";
import { router } from "./router";
import { ConfigProvider } from "antd";
import themeConfig from "./themeConfig";
import "./index.css";

function App() {
  return (
    <ConfigProvider theme={themeConfig}>{useRoutes(router)}</ConfigProvider>
  );
}

export default App;
