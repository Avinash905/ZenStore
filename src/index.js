import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AppProvider } from "./context/productContext";
import { FilterProvider } from "./context/filterContext";
import { CartProvider } from "./context/cartContext";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
const domain = process.env.REACT_APP_AUTH_DOMAIN;
const clientId = process.env.REACT_APP_CLIENT_ID;

root.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
  >
    <React.StrictMode>
      <AppProvider>
        <FilterProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </FilterProvider>
      </AppProvider>
    </React.StrictMode>
  </Auth0Provider>
);

reportWebVitals();
