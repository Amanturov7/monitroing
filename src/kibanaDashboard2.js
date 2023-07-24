import React, { useState, useEffect } from 'react';
import './KibanaDashboard.css';
import { Link } from 'react-router-dom';

const urlTemplate = `http://10.22.22.21:5601/app/dashboards#/view/82970e70-29f8-11ee-851e-230344ead74c?_g=()&_a=(columns:!(),filters:!(),index:'22bc06c0-2167-11ee-9292-4514b0406ee9',interval:auto,query:(language:kuery,query:'{{field}}.keyword :{{value}}'),sort:!(!(date,desc)))`;
const changeFilterKibana = (url, key, value) => {
    const updatedURL = url.replace('{{field}}', key).replace('{{value}}', value);
    return updatedURL;
  };
  

function KibanaDashboard() {
  const [arrayObjects, setArrayObjects] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedHydro, setSelectedHydro] = useState(null);
  const [selectedSystem, setSelectedSystem] = useState(null);
  const [currentLevel, setCurrentLevel] = useState('region');

  useEffect(() => {
    const fetchObjectsData = async () => {
      try {
        const response = await fetch('http://localhost:8080/dashboard/objects');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setArrayObjects(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchObjectsData();
  }, []);

  const handleRegionClick = (region) => {
    setSelectedRegion(region);
    setSelectedHydro(null);
    setSelectedSystem(null);
    setCurrentLevel('hydro');
  };

  const handleHydroClick = (hydro) => {
    setSelectedHydro(hydro);
    setSelectedSystem(null);
    setCurrentLevel('system');
  };

  const handleSystemClick = (system) => {
    setSelectedSystem(system);
    setCurrentLevel('dashboard');
  };

  const handleBackClick = () => {
    if (currentLevel === 'hydropost') {
      setCurrentLevel('system');
    } else if (currentLevel === 'dashboard') {
      setSelectedSystem(null);
      setCurrentLevel('system');
    } else if (currentLevel === 'system') {
      setSelectedHydro(null);
      setCurrentLevel('hydro');
    }
  };

  return (
    <div className="dashboard-container">
      <div className="region-list-container">
        <h2>Список районов:</h2>
        <ul className="region-list">
          {arrayObjects.map((objects, index) => (
            <li key={index} className="region-item" onClick={() => handleRegionClick(objects.name)}>
              {objects.name}
            </li>
          ))}
        </ul>
        {currentLevel === 'region' ? (
          <div></div>
        ) : (
          <div>
            {currentLevel === 'hydro' && (
              <div>
                <button onClick={handleBackClick} className="hydro-button">
                  <h2>{selectedRegion} район</h2>
                </button>
                <div className="dashboard-columns">
                  {arrayObjects
                    .find((objects) => objects.name === selectedRegion)
                    .hydro.map((hydro, index) => (
                      <div key={index} className="dashboard-block">
                        <div>
                          <button onClick={() => handleHydroClick(hydro)} className="hydro-button">
                            {hydro.title}
                          </button>
                        </div>
                        <iframe title={hydro.title} src={changeFilterKibana(urlTemplate, hydro.title,hydro.id)} height="500" width="830" />
                      </div>
                    ))}
                </div>
              </div>
            )}
            {currentLevel === 'system' && (
              <div>
                <button onClick={handleBackClick} className="hydro-button">
                  <h2>{selectedHydro.title}</h2>
                </button>
                <div className="dashboard-columns">
                  {selectedHydro.systems.map((system, index) => (
                    <div key={index} className="dashboard-block">
                      <div>
                        <button onClick={() => handleSystemClick(system)} className="hydro-button">
                          {system.title}
                        </button>
                      </div>
                      <iframe title={system.title} src={changeFilterKibana(urlTemplate, system.title,system.id)} height="400" width="830" />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {currentLevel === 'dashboard' && (
              <div>
                <button onClick={handleBackClick} className="hydro-button">
                  <h2>{selectedSystem.title}</h2>
                </button>
                <div className="dashboard-columns">
                  {selectedSystem.hydroposts.map((hydropost, index) => (
                    <div key={index} className="dashboard-block">
                      <div className="buttonHydropost">{hydropost.title}</div>
                      <iframe title={hydropost.title} src={changeFilterKibana(urlTemplate, hydropost.title,hydropost.id)} height="400" width="830" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <Link to="/">Вернуться на главную</Link>
    </div>
  );
}

export default KibanaDashboard;

// ориентировачная структура данных
// [
//     {
//       "name": "Район 1",
//       "hydro": [
//         {
//           "id": "идентификатор_гидроучастка_1",
//           "title": "Гидроучасток 1",
//           "systems": [
//             {
//               "id": "идентификатор_системы_1",
//               "title": "Система 1",
//               "hydroposts": [
//                 {
//                   "id": "идентификатор_гидропоста_1",
//                   "title": "Гидропост 1"
//                 },
//                 {
//                   "id": "идентификатор_гидропоста_2",
//                   "title": "Гидропост 2"
//                 }
//               ]
//             },
//             {
//               "id": "идентификатор_системы_2",
//               "title": "Система 2",
//               "hydroposts": [
//                 {
//                   "id": "идентификатор_гидропоста_3",
//                   "title": "Гидропост 3"
//                 }
//               ]
//             }
//           ]
//         }
//       ]
//     },
//     {
//       "name": "Район 2",
//       "hydro": [
//         {
//           "id": "идентификатор_гидроучастка_2",
//           "title": "Гидроучасток 2",
//           "systems": [
//             {
//               "id": "идентификатор_системы_3",
//               "title": "Система 3",
//               "hydroposts": [
//                 {
//                   "id": "идентификатор_гидропоста_4",
//                   "title": "Гидропост 4"
//                 }
//               ]
//             }
//           ]
//         }
//       ]
//     }
//   ]
  