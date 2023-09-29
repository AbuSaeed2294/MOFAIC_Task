import React, { useState } from "react";
import { Provider } from "react-redux";
import "./App.css";
import Header from "./Components/Header";
import Admin from "./Components/Admin";
import Registrar from "./Components/Registrar";
import store from "./Redux/Store";

function App() {
  const [userType, setUserType] = useState("");

  return (
    <div className="App">
      <Provider store={store}>
        <Header userType={userType} setUserType={setUserType} />
        {userType == "Admin" ? <Admin /> : <Registrar />}
      </Provider>
    </div>
  );
}

export default App;
