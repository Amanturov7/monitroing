import React, { useState, useEffect } from 'react';
import './KibanaDashboard.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import regionsData from './regionsData.json';
import {
  faBatteryFull,
  faBatteryHalf,
  faBatteryEmpty,
  faBatteryThreeQuarters,
  faBatteryQuarter,
  faSignal,
  faClock,
  faToggleOn,
  faToggleOff,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
function KibanaDashboard() {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedHydro, setSelectedHydro] = useState(null);
  const [selectedSystem, setSelectedSystem] = useState(null);
  const [currentLevel, setCurrentLevel] = useState('region');
  const [selectedHydropost, setSelectedHydropost] = useState(null);
  // Set "Чуйский" region as the default selection on page load
  useEffect(() => {
    setSelectedRegion('Чуйский');
  }, []);

  const handleRegionClick = (region) => {
    setSelectedRegion(region);
    setSelectedHydro(null);
    setSelectedSystem(null);
    setSelectedHydropost(null);
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

  const handleHydropostClick = (hydropost) => {
    setSelectedHydropost(hydropost);   
    setCurrentLevel('hydropost');
  };

  const handleBackClick = () => {
    if (currentLevel === 'hydropost') {
      setCurrentLevel('dashboard');
    } else if (currentLevel === 'dashboard') {
      setSelectedSystem(null);
      setCurrentLevel('system');
    } else if (currentLevel === 'system') {
      setSelectedHydro(null);
      setCurrentLevel('hydro');
    }
  };

  function getBatteryIcon(power) {
    if (power >= 95) {
      return faBatteryFull;
    } else if (power >= 90) {
      return faBatteryThreeQuarters;
    } else  if (power >= 60){
      return faBatteryHalf;}
      else if (power >= 40){
      return faBatteryQuarter;
      }
      else if (power >= 10){
        return faBatteryEmpty;
        }
    }


function getStatusIcon(status) {
  if (status === 'Активен') {
    return faToggleOn;
  } else if (status === 'Неактивен') {
    return faToggleOff;
  } else if (status === 'Вышел из строя') {
    return faTriangleExclamation;
  } 
}


    // Обновляем списки датчиков в зависимости от их статуса
    // useState(() => {
    //   setActiveSensors(sensorsData.filter((sensor) => sensor.status === 'Активен'));
    //   setInactiveSensors(sensorsData.filter((sensor) => sensor.status === 'Неактивен'));
    //   setFaultySensors(sensorsData.filter((sensor) => sensor.status === 'Вышел из строя'));
    // }, []);
  
  
  // const [arraySensors, setArraySensors] = useState([])

  // const fetchedSensors = fetch(`http//localhost:8080/api/dashboard/sensors`).then((response =>  setArraySensors(response)))

  // const changeFilterKubana = (url) => {
  //   return url;
  // }



  // arraySensors.map(it -> it.url = changeFilterKubana(url) )

  // const url = `http://10.22.22.21:5601/app/dashboards#/view/82970e70-29f8-11ee-851e-230344ead74c?_g=()&_a=(columns:!(),filters:!(),index:'22bc06c0-2167-11ee-9292-4514b0406ee9',interval:auto,query:(language:kuery,query:'hydro_post.keyword :"Hydropost 1" '),sort:!(!(date,desc)))`




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
        <Link to="/">Вернуться на главную</Link>

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
                      <iframe title={hydro.name} src={hydro.url} height="500" width="1200" />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {currentLevel === 'system' && (
              <div>
                <button  className="hydro-button">
                  <h2>{selectedHydro.name}</h2>
                </button>
                <button onClick={handleBackClick} className="hydro-button">
                  <h5 className="return"> Вернуться назад</h5>
                </button>
                <div className="dashboard-columns">
                  {selectedHydro.systems.map((system, index) => (
                    <div key={index} className="dashboard-block">
                      <div>
                        <button onClick={() => handleSystemClick(system)} className="hydro-button">
                          {system.title}
                        </button>
                      </div>
                      <iframe title={system.title} src={system.url} height="400" width="1200" />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {currentLevel === 'dashboard' && (
              <div>
                <button className="hydro-button">
                  <h2>{selectedSystem.title}</h2>
                </button>
                <button onClick={handleBackClick} className="hydro-button">
                  <h5 className="return"> Вернуться назад</h5>
                </button>
                <div className="dashboard-columns">
                  {selectedSystem.hydroposts.map((hydropost, index) => (
                    <div key={index} className="dashboard-block">
                          <div>
                        <button onClick={() => handleHydropostClick(hydropost)} className="hydro-button">
                       {hydropost.title} 
                        </button>
                      </div>

                      {/* <div className="buttonHydropost">{hydropost.title}</div> */}
                      <iframe title={hydropost.title} src={hydropost.url} height="400" width="1200" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentLevel === 'hydropost' && (
              <div>
              <button  className="hydro-button">
                <h2>{selectedHydropost.title}</h2>
              </button>
              <button onClick={handleBackClick} className="hydro-button">
                  <h5 className="return"> Вернуться назад</h5>
                </button>
              <div className="dashboard-columns">
                {selectedHydropost.sensor.map((sensor, index) => (
                  <div key={index} className="sensor-block1">
                    <div className="buttonHydropost"> Датчик {sensor.sensor_name}</div>
                          {/* <div className="sensor-block1"> */}
                            {/* <div className="sensor-info"> */}
                              <h6 className="sensor-item-title">{sensor.sensor_name}</h6>
                              <p className="sensor-item-status">
                                <FontAwesomeIcon icon={getStatusIcon(sensor.status)} style={{ marginRight: '10px' }}/>
                                {sensor.status}
                              </p>
                              <p className="sensor-item-last-updated">
                                <FontAwesomeIcon icon={faClock} style={{ marginRight: '10px' }}/>
                                Последнее обновление: {sensor.last_transmission}
                              </p>
                              <p className="sensor-item-battery">
                              <FontAwesomeIcon icon={getBatteryIcon(sensor.power)}style={{ marginRight: '10px' }} />                      
                              Заряд: {sensor.power}%
                              </p>
                              <p className="sensor-item-signal">
                                <FontAwesomeIcon icon={faSignal} style={{ marginRight: '10px' }} />
                                Уровень сигнала: {sensor.signal}%
                              </p>
                              <p className="sensor-item-signal">
                              {}
                              </p>
                              
                            {/* </div>
                          </div> */}
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
