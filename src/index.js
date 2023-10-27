// import React from 'react';
// import ReactDOM from "react-dom/client";
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import './index.css';
// import App from './App';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import SensorTabs from './SensorTabs';
// import KibanaDashboard from './KibanaDashboard';
// import KibanaDashboard3 from './KibanaDashboard3';

// const root = ReactDOM.createRoot(document.getElementById("root"));
// ReactDOM.render(
//   <React.StrictMode>
//     <Router>
//       <Switch>
//         <Route exact path="/" component={App} /> {/* Главная страница */}
//         <Route path="/monitoring" component={SensorTabs} /> {/* Страница мониторинга датчиков */}
//         <Route path="/kibana" component={KibanaDashboard} /> {/* Будущая страница с дашбордами Kibana */}
//         <Route path="/kibana3" component={KibanaDashboard3} /> {/* Будущая страница с дашбордами Kibana */}
//       </Switch>
//     </Router>
//   </React.StrictMode>,
//   document.getElementById('root')
// );
import React from "react";
import * as ReactDOMClient from "react-dom/client";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import Monitoring from "./SensorTabs";
import Kibana from "./KibanaDashboard3";

const container = document.getElementById("root");

const root = ReactDOMClient.createRoot(container);

root.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/monitoring" component={Monitoring} />
      <Route path="/kibana" component={Kibana} />
    </Switch>
  </BrowserRouter>
);
