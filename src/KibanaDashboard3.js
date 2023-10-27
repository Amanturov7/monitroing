import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabContent } from 'react-bootstrap';
import './KibanaDashboard.css';

const SystemTree = () => {
  const [systems, setSystems] = useState([]);
  const [selectedSystem, setSelectedSystem] = useState(null);
  const [hydroPosts, setHydroPosts] = useState([]);

  const buildSystemTree = (data, parentId = null) => {
    const result = [];
    for (const system of data) {
      if (system.parent_system_id === parentId) {
        const children = buildSystemTree(data, system.id);
        if (children.length > 0) {
          system.children = children;
        }
        result.push(system);
      }
    }
    return result;
  };

  const url = 'http://10.22.22.21:5601/app/dashboards#/view/cde75150-2160-11ee-9292-4514b0406ee9?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-30d%2Cto%3Anow))&show-time-filter=true'

  const handleSystemSelect = (system) => {
    setSelectedSystem(system);
  };

  const renderTree = (data) => (
    <ul>
      {data.map((system) => (
        <li key={system.id}>
          <a href="#" onClick={() => handleSystemSelect(system)}>
            {system.display_name}
          </a>
          {system.children && system.children.length > 0 && (
            <ul>
              {renderTree(system.children)}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );


  const renderHydro = (system) => (
    <ul>
      {hydroPosts.map((hydro) => {
        if (hydro.system_id === system.id) {
          return (
            <div>
            <div className="dashboard-columns">
              <div className="dashboard-block">
                <div className="buttonHydropost">{hydro.hp_name}</div>
              </div>
          </div>
            </div> );
        }
        return null;
      })}
    </ul>
  );


  async function fetchData() {
    try {
      const response = await fetch('http://localhost:8080/api/systems', {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/118.0',
          'Accept': 'text/plain, */*; q=0.01',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate, br',
          'X-Requested-With': 'XMLHttpRequest',
          'DNT': '1',
          'Connection': 'keep-alive',
          'Referer': 'https://blue-water.asia/',
          'Cookie': 'lcid=1049; authtoken=17b17e4105b944ac891895dcd89aa55e9152f3b76e9d711d703f31d14875bd9b22c321ec7676e5b8fa97b4b21296dfe9da9da8ca0ea09dcdfaa3f068eaeb78b4',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const treeData = buildSystemTree(data);
      setSystems(treeData);
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  }

  useEffect(() => {
    fetchData();
    fetchHydroPosts()
  }, []);


  const fetchHydroPosts = async (systemId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/hydroposts?system_id=${systemId}`, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/118.0',
          'Accept': 'text/plain, */*; q=0.01',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate, br',
          'X-Requested-With': 'XMLHttpRequest',
          'DNT': '1',
          'Connection': 'keep-alive',
          'Referer': 'https://blue-water.asia/',
          'Cookie': 'lcid=1049; authtoken=17b17e4105b944ac891895dcd89aa55e9152f3b76e9d711d703f31d14875bd9b22c321ec7676e5b8fa97b4b21296dfe9da9da8ca0ea09dcdfaa3f068eaeb78b4',
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      setHydroPosts(data);
    } catch (error) {
      console.error('Ошибка при получении данных о гидропостах:', error);
    }
  };

  return (
    <div>
      <h1>Древовидная структура систем:</h1>
      <div className="system-tree">
        {renderTree(systems)}
      </div>
      <div className="system-details">
      <Tabs defaultActiveKey="details" id="system-tabs">
  <Tab eventKey="details" title="Details">
    {selectedSystem && (
      <div>
        <h2>{selectedSystem.display_name}</h2>
        {renderHydro(selectedSystem)}
        {selectedSystem.children && selectedSystem.children.length > 0 && (
          <ul>
            {selectedSystem.children.map((system) => (
              <li key={system.id}>
                <a href="#" onClick={() => handleSystemSelect(system)}>
                <div className="dashboard-columns">
              <div className="dashboard-block">
                <div className="buttonHydropost">{system.display_name}</div>
                <iframe title={system.display_name} src={url} height="400" width="1200" />

              </div>
              </div>
                </a>
              </li>

            ))}           

          </ul>
        )}
      </div>
    )}
  </Tab>
</Tabs>
      </div>
    </div>
  );
};

export default SystemTree;
