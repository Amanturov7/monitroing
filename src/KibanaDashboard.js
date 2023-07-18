import React, { useState, useEffect } from 'react';
import './KibanaDashboard.css';
import { Link } from 'react-router-dom';
import regionsData from './regionsData.json';

function KibanaDashboard() {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedHydro, setSelectedHydro] = useState(null);
  const [selectedSystem, setSelectedSystem] = useState(null);
  const [currentLevel, setCurrentLevel] = useState('region');

  // Set "Чуйский" region as the default selection on page load
  useEffect(() => {
    setSelectedRegion('Чуйский');
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
          {Object.keys(regionsData).map((region, index) => (
            <li key={index} className="region-item" onClick={() => handleRegionClick(region)}>
              {region}
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
                  {regionsData[selectedRegion].map((hydro, index) => (
                    <div key={index} className="dashboard-block">
                      <div>
                        <button onClick={() => handleHydroClick(hydro)} className="hydro-button">
                          {hydro.name}
                        </button>
                      </div>
                      <iframe title={hydro.name} src={hydro.url} height="500" width="830" />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {currentLevel === 'system' && (
              <div>
                <button onClick={handleBackClick} className="hydro-button">
                  <h2>{selectedHydro.name}</h2>
                </button>
                <div className="dashboard-columns">
                  {selectedHydro.systems.map((system, index) => (
                    <div key={index} className="dashboard-block">
                      <div>
                        <button onClick={() => handleSystemClick(system)} className="hydro-button">
                          {system.title}
                        </button>
                      </div>
                      <iframe title={system.title} src={system.url} height="400" width="830" />
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
                      <iframe title={hydropost.title} src={hydropost.url} height="400" width="830" />
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
