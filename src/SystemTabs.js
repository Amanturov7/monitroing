import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

const SystemTabs = ({ systems }) => {
  const { id } = useParams();

  if (!id) {
    return null;
  }

  const system = systems.find((s) => s.id.toString() === id);
  if (!system) {
    return <div>System not found</div>;
  }

  return (
    <Tabs defaultActiveKey="info" id="system-tabs">
      <Tab eventKey="info" title="Info">
        <div>
          <h2>{system.display_name}</h2>
          <p>System Info: Add system-specific information here</p>
        </div>
      </Tab>
      <Tab eventKey="children" title="Children">
        <ul>
          {system.children.map((child) => (
            <li key={child.id}>
              <Link to={`/system/${child.id}`}>{child.display_name}</Link>
            </li>
          ))}
        </ul>
      </Tab>
    </Tabs>
  );
};

export default SystemTabs;
