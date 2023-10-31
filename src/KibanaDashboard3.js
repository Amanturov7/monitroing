import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabContent } from 'react-bootstrap';
import './KibanaDashboard.css';

const SystemTree = () => {
  const [systems, setSystems] = useState([]);
  const [selectedSystem, setSelectedSystem] = useState(null);
  const [hydroPosts, setHydroPosts] = useState([]);
  const [sensors, setSensors] = useState([]);


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
                <iframe src={`http://10.22.22.21:5601/app/dashboards#/view/99b2e350-7646-11ee-9996-65749f62dc8a?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-30d%2Cto%3Anow))&show-time-filter=true&hide-filter-bar=true&_a=(filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'73d733a0-7701-11ee-9996-65749f62dc8a',key:hpid,negate:!f,params:(query:14),type:phrase),query:(match_phrase:(hpid:${hydro.id})))),linked:!f,query:(language:kuery,query:''),uiState:(),vis:(aggs:!((enabled:!t,id:'1',params:(field:flow),schema:metric,type:avg),(enabled:!t,id:'2',params:(drop_partials:!f,extendToTimeRange:!f,extended_bounds:(),field:utc,interval:d,min_doc_count:1,scaleMetricValues:!f,timeRange:(from:now-30d,to:now),useNormalizedEsInterval:!t,used_interval:'1d'),schema:segment,type:date_histogram)),params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,categoryAxes:!((id:CategoryAxis-1,labels:(filter:!t,show:!t,truncate:100),position:bottom,scale:(type:linear),show:!t,style:(),title:(),type:category)),detailedTooltip:!t,grid:(categoryLines:!f),labels:(show:!f),legendPosition:right,maxLegendLines:1,palette:(name:default,type:palette),radiusRatio:0,seriesParams:!((circlesRadius:1,data:(id:'1',label:'Average%20flow'),drawLinesBetweenPoints:!t,interpolate:linear,lineWidth:2,mode:stacked,show:!t,showCircles:!t,type:histogram,valueAxis:ValueAxis-1)),thresholdLine:(color:%23E7664C,show:!f,style:full,value:10,width:1),times:!(),truncateLegend:!t,type:histogram,valueAxes:!((id:ValueAxis-1,labels:(filter:!t,rotate:0,show:!t,truncate:100),name:LeftAxis-1,position:left,scale:(mode:normal,type:linear),show:!t,style:(),title:(text:'Average%20flow'),type:value))),title:'',type:histogram))`} height="600" width="1200"></iframe>
              </div>
          </div>
            </div> );
        }
        return null;
      })}
    </ul>
  );

  const renderSensor = (hydropost) => (
    <ul>
      {sensors.map((sensor) => {
        if (sensor.hpid === hydropost.system_id) {
          return (
            <div>
            <div className="dashboard-columns">
              <div className="dashboard-block">
                <div className="buttonHydropost">{sensor.sensor_name}</div>

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


 async function fetchedSensors (){
    try {
      const response = await fetch('http://localhost:8080/api/sensors', {
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
      setSensors(treeData);
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  }

  useEffect(() => {
    fetchData();
    fetchHydroPosts()
    fetchedSensors()
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
                <iframe
                title={system.display_name}
                src={`http://10.22.22.21:5601/app/dashboards#/view/b3511630-7649-11ee-9996-65749f62dc8a?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-30d%2Cto%3Anow))&show-time-filter=true&hide-filter-bar=true&_a=(filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'4cdfa730-770d-11ee-9996-65749f62dc8a',key:system_id,negate:!f,params:(query:10),type:phrase),query:(match_phrase:(system_id:${system.id})))),linked:!f,query:(language:kuery,query:''),uiState:(),vis:(aggs:!((enabled:!t,id:'5',params:(customLabel:Водоподача,field:supply),schema:metric,type:avg),(enabled:!t,id:'6',params:(customLabel:Водозабор,field:intake),schema:metric,type:avg),(enabled:!t,id:'7',params:(customLabel:Сброс,field:discard),schema:metric,type:avg),(enabled:!t,id:'8',params:(customLabel:Дата,drop_partials:!f,extendToTimeRange:!f,extended_bounds:(),field:utc,interval:d,min_doc_count:1,scaleMetricValues:!f,timeRange:(from:now-30d,to:now),useNormalizedEsInterval:!t,used_interval:'1d'),schema:segment,type:date_histogram)),params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,categoryAxes:!((id:CategoryAxis-1,labels:(filter:!t,show:!t,truncate:100),position:bottom,scale:(type:linear),show:!f,style:(),title:(),type:category)),detailedTooltip:!t,grid:(categoryLines:!f,valueAxis:''),labels:(show:!f),legendPosition:right,maxLegendLines:1,palette:(name:default,type:palette),radiusRatio:0,seriesParams:!((circlesRadius:1,data:(id:'5',label:Водоподача),drawLinesBetweenPoints:!t,interpolate:linear,lineWidth:2,mode:stacked,show:!t,showCircles:!t,type:histogram,valueAxis:ValueAxis-1),(circlesRadius:1,data:(id:'6',label:Водозабор),drawLinesBetweenPoints:!t,interpolate:linear,lineWidth:2,mode:stacked,show:!t,showCircles:!t,type:histogram,valueAxis:ValueAxis-1),(circlesRadius:1,data:(id:'7',label:Сброс),drawLinesBetweenPoints:!t,interpolate:linear,lineWidth:2,mode:stacked,show:!t,showCircles:!t,type:histogram,valueAxis:ValueAxis-1)),thresholdLine:(color:%23E7664C,show:!f,style:full,value:10,width:1),times:!(),truncateLegend:!t,type:histogram,valueAxes:!((id:ValueAxis-1,labels:(filter:!t,rotate:0,show:!t,truncate:100),name:LeftAxis-1,position:left,scale:(mode:normal,type:linear),show:!f,style:(),title:(text:'Average supply'),type:value))),title:'Сток систем Блевота',type:histogram))
`}
                height="550"
                width="1200"
              />
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
