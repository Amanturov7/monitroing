import SensorTabs from './SensorTabs';
import Hydrosection from './Hydrosection.js';

import './App.css';

function App() {
  return (
    
    <div className="container">
      <h1 className="text-center">Мониторинг датчиков</h1>
      <SensorTabs />
      <Hydrosection />
    </div>
    
  );
}

export default App;
