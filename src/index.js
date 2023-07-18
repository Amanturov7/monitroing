
import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import SensorTabs from './SensorTabs'; // Импортируем компонент для страницы мониторинга датчиков
import KibanaDashboard from './KibanaDashboard'; // Импортируем компонент для будущей страницы с дашбордами Kibana

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/" component={App} /> {/* Главная страница */}
        <Route path="/monitoring" component={SensorTabs} /> {/* Страница мониторинга датчиков */}
        <Route path="/kibana" component={KibanaDashboard} /> {/* Будущая страница с дашбордами Kibana */}
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
