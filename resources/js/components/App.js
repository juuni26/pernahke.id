import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { BaseProvider } from "./BaseContext";

import Main from "./Main";
import Home from "./Page/Home";
import Layout from './Layout';


import "antd/dist/antd.css";
import "./App.scss";
function App() {
  return (
    <BaseProvider>
      <Router>
        {/* <Layout>
        <Home/>
        </Layout> */}
        <Main />             
      </Router>
    </BaseProvider>
  );
}

export default App;
