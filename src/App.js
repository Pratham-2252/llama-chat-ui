import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./App.css";
import { Persistor, Store } from "./reduxstate/Store";
import Routes from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";

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
