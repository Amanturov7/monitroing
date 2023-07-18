import React from 'react';
import { Link } from 'react-router-dom'; // Импортируем компонент Link для создания ссылок

import './App.css';

function App() {
  return (
    <div className="container">
      <h1 className="text-center">Мониторинг</h1>
      <div className="button-container">
        <Link to="/monitoring"> {/* Переход на страницу мониторинга датчиков */}
          <button className="main-button">Мониторинг датчиков</button>
        </Link>
        <Link to="/kibana"> {/* Переход на страницу будущих дашбордов Kibana */}
          <button className="main-button">Kibana Dashboard</button>
        </Link>
      </div>
    </div>
  );
}

export default App;
