import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { BaseProvider } from "./BaseContext";

import Main from "./Main";
import Home from "./Page/Home";
import Layout from './Layout';
import Routes from './Routes';



import "antd/dist/antd.css";
import "./App.scss";
function App() {
  return (
    <BaseProvider>
      <Router>
        <Layout>
          <Routes/>        
        </Layout>
        {/* <Main />              */}
      </Router>
    </BaseProvider>
  );
}

export default App;
