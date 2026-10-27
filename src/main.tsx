import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app/App";
import { ThemeProvider } from "./app/theme-provider";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
    <App />
  </ThemeProvider>,
);
