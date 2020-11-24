import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { BaseProvider } from "./BaseContext";

import Main from "./Main";


import "antd/dist/antd.css";
import "./App.scss";
function App() {
  return (
    <BaseProvider>
      <Router>
        <Main />             
      </Router>
    </BaseProvider>
  );
}

export default App;
