import { createRoot } from "react-dom/client";
import { Provider } from "@app/providers";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <Provider />,
);
