import React, { useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
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
import './App.css';
import 'react-tabs/style/react-tabs.css';

const sensorsData = [
  { name: 'Датчик 1', status: 'Активен', lastUpdated: '2023-07-12 10:30', battery: 40, signal: 90 },
  { name: 'Датчик 2', status: 'Неактивен', lastUpdated: '2023-07-12 11:15', battery: 70, signal: 85 },
  { name: 'Датчик 3', status: 'Вышел из строя', lastUpdated: '2023-07-12 09:45', battery: 50, signal: 75 },
  { name: 'Датчик 1', status: 'Активен', lastUpdated: '2023-07-12 10:30', battery: 30, signal: 90 },
  { name: 'Датчик 2', status: 'Неактивен', lastUpdated: '2023-07-12 11:15', battery: 70, signal: 85 },
  { name: 'Датчик 3', status: 'Вышел из строя', lastUpdated: '2023-07-12 09:45', battery: 50, signal: 75 },
  { name: 'Датчик 1', status: 'Активен', lastUpdated: '2023-07-12 10:30', battery: 20, signal: 90 },
  { name: 'Датчик 2', status: 'Неактивен', lastUpdated: '2023-07-12 11:15', battery: 70, signal: 85 },
  { name: 'Датчик 3', status: 'Вышел из строя', lastUpdated: '2023-07-12 09:45', battery: 50, signal: 75 },
  { name: 'Датчик 1', status: 'Активен', lastUpdated: '2023-07-12 10:30', battery: 80, signal: 90 },
  { name: 'Датчик 2', status: 'Неактивен', lastUpdated: '2023-07-12 11:15', battery: 70, signal: 85 },
  { name: 'Датчик 3', status: 'Вышел из строя', lastUpdated: '2023-07-12 09:45', battery: 50, signal: 75 },
  { name: 'Датчик 1', status: 'Активен', lastUpdated: '2023-07-12 10:30', battery: 80, signal: 90 },
  { name: 'Датчик 2', status: 'Неактивен', lastUpdated: '2023-07-12 11:15', battery: 70, signal: 85 },
  { name: 'Датчик 3', status: 'Вышел из строя', lastUpdated: '2023-07-12 09:45', battery: 50, signal: 75 },
  { name: 'Датчик 1', status: 'Активен', lastUpdated: '2023-07-12 10:30', battery: 20, signal: 90 },
  { name: 'Датчик 2', status: 'Неактивен', lastUpdated: '2023-07-12 11:15', battery: 70, signal: 85 },
  { name: 'Датчик 3', status: 'Вышел из строя', lastUpdated: '2023-07-12 09:45', battery: 30, signal: 75 },
  { name: 'Датчик 1', status: 'Активен', lastUpdated: '2023-07-12 10:30', battery: 80, signal: 90 },
  { name: 'Датчик 2', status: 'Неактивен', lastUpdated: '2023-07-12 11:15', battery: 70, signal: 85 },
  { name: 'Датчик 3', status: 'Вышел из строя', lastUpdated: '2023-07-12 09:45', battery: 10, signal: 75 },

  // Добавьте остальные датчики с соответствующими статусами
];

function getBatteryIcon(battery) {
  if (battery >= 95) {
    return faBatteryFull;
  } else if (battery >= 90) {
    return faBatteryThreeQuarters;
  } else  if (battery >= 60){
    return faBatteryHalf;}
    else if (battery >= 40){
    return faBatteryQuarter;
    }
    else if (battery >= 10){
      return faBatteryEmpty;
      }
  }


// function getSignalIcon(signal) {
//   if (signal >= 95) {
//     return faBatteryFull;
//   } else if (signal >= 90) {
//     return faBatteryThreeQuarters;
//   } else  if (signal >= 60){
//     return faBatteryHalf;}
//     else if (signal >= 40){
//     return faBatteryQuarter;
//     }
//     else if (signal >= 10){
//       return faBatteryEmpty;
//       }
// }

function getStatusIcon(status) {
  if (status === 'Активен') {
    return faToggleOn;
  } else if (status === 'Неактивен') {
    return faToggleOff;
  } else if (status === 'Вышел из строя') {
    return faTriangleExclamation;
  } 
}

function SensorTabs() {
  const [activeSensors, setActiveSensors] = useState([]);
  const [inactiveSensors, setInactiveSensors] = useState([]);
  const [faultySensors, setFaultySensors] = useState([]);

  // Обновляем списки датчиков в зависимости от их статуса
  useState(() => {
    setActiveSensors(sensorsData.filter((sensor) => sensor.status === 'Активен'));
    setInactiveSensors(sensorsData.filter((sensor) => sensor.status === 'Неактивен'));
    setFaultySensors(sensorsData.filter((sensor) => sensor.status === 'Вышел из строя'));
  }, []);

  return (
    <div className="sensor-tabs-container">
    <Tabs>
      <TabList>
        <Tab>Активные датчики</Tab>
        <Tab>Неактивные датчики</Tab>
        <Tab>Датчики, вышедшие из строя</Tab>
      </TabList>

      <div className="tab-content">
        <TabPanel>
          <div className="row">
            {activeSensors.map((sensor, index) => (
              <div className="col-md-3" key={index}>
                <div className="sensor-block">
                  
                  <div className="sensor-info">
                    <h6 className="sensor-item-title">{sensor.name}</h6>
                    <p className="sensor-item-status">
                      <FontAwesomeIcon icon={getStatusIcon(sensor.status)} style={{ marginRight: '10px' }} />
                      {sensor.status}
                    </p>
                    <p className="sensor-item-last-updated">
                      <FontAwesomeIcon icon={faClock} style={{ marginRight: '10px' }}/>
                      Последнее обновление: {sensor.lastUpdated}
                    </p>
                    <p className="sensor-item-battery">
                      <FontAwesomeIcon icon={getBatteryIcon(sensor.battery)} style={{ marginRight: '10px' }} />
                      Заряд: {sensor.battery}%
                    </p>
                    <p className="sensor-item-signal">
                      <FontAwesomeIcon icon={faSignal} style={{ marginRight: '10px' }}/>
                      Уровень сигнала: {sensor.signal}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabPanel>

        <TabPanel>
          <div className="row">
            {inactiveSensors.map((sensor, index) => (
              <div className="col-md-3" key={index}>
                <div className="sensor-block">
                 
                  <div className="sensor-info">
                    <h6 className="sensor-item-title">{sensor.name}</h6>
                    <p className="sensor-item-status">
                      <FontAwesomeIcon icon={getStatusIcon(sensor.status)} style={{ marginRight: '10px' }}/>
                      {sensor.status}
                    </p>
                    <p className="sensor-item-last-updated">
                      <FontAwesomeIcon icon={faClock} style={{ marginRight: '10px' }}/>
                      Последнее обновление: {sensor.lastUpdated}
                    </p>
                    <p className="sensor-item-battery">
                     <FontAwesomeIcon icon={getBatteryIcon(sensor.battery)}style={{ marginRight: '10px' }} />
                      Заряд: {sensor.battery}%
                    </p>
                    <p className="sensor-item-signal">
                      <FontAwesomeIcon icon={faSignal} style={{ marginRight: '10px' }}/>
                      Уровень сигнала: {sensor.signal}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabPanel>

        <TabPanel>
          <div className="row">
            {faultySensors.map((sensor, index) => (
              <div className="col-md-3" key={index}>
                <div className="sensor-block">
            
                  <div className="sensor-info">
                    <h6 className="sensor-item-title">{sensor.name}</h6>
                    <p className="sensor-item-status">
                      <FontAwesomeIcon icon={getStatusIcon(sensor.status)} style={{ marginRight: '10px' }}/>
                      {sensor.status}
                    </p>
                    <p className="sensor-item-last-updated">
                      <FontAwesomeIcon icon={faClock} style={{ marginRight: '10px' }}/>
                      Последнее обновление: {sensor.lastUpdated}
                    </p>
                    <p className="sensor-item-battery">
                     <FontAwesomeIcon icon={getBatteryIcon(sensor.battery)}style={{ marginRight: '10px' }} />                      
                     Заряд: {sensor.battery}%
                    </p>
                    <p className="sensor-item-signal">
                      <FontAwesomeIcon icon={faSignal} style={{ marginRight: '10px' }} />
                      Уровень сигнала: {sensor.signal}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabPanel>
      </div>
    </Tabs>
    <Link to="/">Вернуться на главную</Link>
    </div>
  );
}

export default SensorTabs;
