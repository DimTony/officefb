import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "./components/ui/provider";
import { UserProvider } from "./contexts/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <Provider>
        <App />
      </Provider>
    </UserProvider>
  </StrictMode>
);
