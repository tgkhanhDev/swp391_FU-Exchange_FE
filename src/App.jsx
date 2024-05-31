import { useRoutes } from "react-router-dom";
import { router } from "./router";
import { ConfigProvider } from "antd";
import themeConfig from "./themeConfig";
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import "./index.css";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <ConfigProvider theme={themeConfig}><ScrollToTop />{useRoutes(router)}</ConfigProvider>
  );
}

export default App;
