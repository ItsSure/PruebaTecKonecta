import { createRoot } from "react-dom/client";
import Routes from './Router/Routes'
import "./index.css";
import { AuthProvider } from "./auth/AuthContext";
import { ConfigProvider, theme } from "antd";
import "antd/dist/reset.css";

const root = document.getElementById("root");

createRoot(root).render(
  <ConfigProvider
    theme={{
      algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
    }}
  >
    <AuthProvider>
      <Routes />
    </AuthProvider>
  </ConfigProvider>,
)
