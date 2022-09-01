import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store/store";
import { StateProvider} from './store/StateProvider'
import './index.css'

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <StateProvider>
        <App />
      </StateProvider>
    </Provider>
  </StrictMode>
);
