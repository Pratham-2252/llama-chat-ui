import "bootstrap/dist/css/bootstrap.min.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./App.css";
import { Persistor, Store } from "./reduxstate/Store";
import Routes from "./routes";

function App() {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={Persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
}

export default App;
