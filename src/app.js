/* global window, fetch */
import React, {Component} from 'react';
import {render} from 'react-dom';
import MapGL, {StaticMap, Marker} from 'react-map-gl';
import ControlPanel from './control-panel';
import {defaultMapStyle, dataLayer} from './map-style.js';
import {updatePercentiles} from './utils';
import {fromJS} from 'immutable';
import {json as requestJson} from 'd3-request';
import RankContainer from './RankContainer';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Octicon from 'react-component-octicons';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import TabPane from 'react-bootstrap/TabPane';

const MAPBOX_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;


export default class App extends Component {

  state = {
    key: 1,
    mapStyle: defaultMapStyle,
    year: 2015,
    data: null,
    hoveredFeature: null,
    viewport: {
      latitude: 22.32552,
      longitude: 114.15769,
      zoom: 10,
      bearing: 0,
      pitch: 0
    }
  };

  componentDidMount() {
    requestJson('https://raw.githubusercontent.com/sbma44/uber-cities/master/geojson/hong-kong.geojson', (error, response) => {
      if (!error) {
        this._loadData(response);
      }
    });
  }

  _loadData = data => {

    const mapStyle = defaultMapStyle;

    this.setState({data, mapStyle});
  };

  _onViewportChange = viewport => this.setState({viewport});


  markers() {
    const status = [{
  "ENAME": "Alice Ho Miu Ling Nethersole Hospital",
  "CNAME": "大埔那打素",
  "lat": 22.4586,
  "long": 114.1748,
  "WeekMeanTime": "2.64655172413793",
  "PtgChange": "0.0891828348724901",
  "offsetLeft": -20,
  "offsetTop": -20
}, {
  "ENAME": "Caritas Medical Centre",
  "CNAME": "明愛",
  "lat": 22.3415,
  "long": 114.151,
  "WeekMeanTime": "2.3448275862069",
  "PtgChange": "0.00771936033266223",
  "offsetLeft": -20,
  "offsetTop": -40
}, {
  "ENAME": "Pamela Youde Nethersole Eastern Hospital",
  "CNAME": "東區那打素",
  "lat": 22.27,
  "long": 114.2367,
  "WeekMeanTime": "4.13505747126437",
  "PtgChange": "0.205084169528981",
  "offsetLeft": 20,
  "offsetTop": -20
}, {
  "ENAME": "Ruttonjee Hospital",
  "CNAME": "律敦治",
  "lat": 22.2759,
  "long": 114.1753,
  "WeekMeanTime": "2.81609195402299",
  "PtgChange": "0.0226458586424944",
  "offsetLeft": -20,
  "offsetTop": 20
}, {
  "ENAME": "St John Hospital",
  "CNAME": "長洲",
  "lat": 22.2081,
  "long": 114.0315,
  "WeekMeanTime": "0.543103448275862",
  "PtgChange": "-0.0270606675271989",
  "offsetLeft": -20,
  "offsetTop": -20
}, {
  "ENAME": "Queen Mary Hospital",
  "CNAME": "瑪麗",
  "lat": 22.2704,
  "long": 114.1305,
  "WeekMeanTime": "2.45402298850575",
  "PtgChange": "-0.130055342699021",
  "offsetLeft": -100,
  "offsetTop": -20
}, {
  "ENAME": "Kwong Wah Hospital",
  "CNAME": "廣華",
  "lat": 22.3152,
  "long": 114.1724,
  "WeekMeanTime": "5.8132183908046",
  "PtgChange": "0.117285232885565",
  "offsetLeft": 20,
  "offsetTop": -30
}, {
  "ENAME": "Queen Elizabeth Hospital",
  "CNAME": "伊利沙伯",
  "lat": 22.3091,
  "long": 114.1746,
  "WeekMeanTime": "4.06609195402299",
  "PtgChange": "-0.229340421726902",
  "offsetLeft": -20,
  "offsetTop": 12
}, {
  "ENAME": "Tin Shui Wai Hospital",
  "CNAME": "天水圍",
  "lat": 22.4587,
  "long": 113.9958,
  "WeekMeanTime": "1.81896551724138",
  "PtgChange": "-0.00105992085924252",
  "offsetLeft": -40,
  "offsetTop": -20
}, {
  "ENAME": "Tseung Kwan O Hospital",
  "CNAME": "將軍澳",
  "lat": 22.3183,
  "long": 114.2702,
  "WeekMeanTime": "5.39942528735632",
  "PtgChange": "0.14084356434208",
  "offsetLeft": 60,
  "offsetTop": -20
}, {
  "ENAME": "Yan Chai Hospital",
  "CNAME": "仁濟",
  "lat": 22.3695,
  "long": 114.1194,
  "WeekMeanTime": "2.43965517241379",
  "PtgChange": "0.102204292324505",
  "offsetLeft": -40,
  "offsetTop": -60
}, {
  "ENAME": "Tuen Mun Hospital",
  "CNAME": "屯門",
  "lat": 22.4072,
  "long": 113.9762,
  "WeekMeanTime": "3.91379310344828",
  "PtgChange": "0.155172413793104",
  "offsetLeft": -20,
  "offsetTop": -20
}, {
  "ENAME": "United Christian Hospital",
  "CNAME": "聯合",
  "lat": 22.3222,
  "long": 114.2279,
  "WeekMeanTime": "4.91091954022988",
  "PtgChange": "-0.0186948726650694",
  "offsetLeft": 10,
  "offsetTop": -40
}, {
  "ENAME": "North District Hospital",
  "CNAME": "北區",
  "lat": 22.4968,
  "long": 114.1246,
  "WeekMeanTime": "5.73850574712644",
  "PtgChange": "0.378064104148642",
  "offsetLeft": -20,
  "offsetTop": -20
}, {
  "ENAME": "North Lantau Hospital",
  "CNAME": "北大嶼山",
  "lat": 22.2826,
  "long": 113.9391,
  "WeekMeanTime": "1.37068965517241",
  "PtgChange": "0.0804259634888436",
  "offsetLeft": -20,
  "offsetTop": -20
}, {
  "ENAME": "Pok Oi Hospital",
  "CNAME": "博愛",
  "lat": 22.4454,
  "long": 114.0414,
  "WeekMeanTime": "1.77298850574713",
  "PtgChange": "-0.415402411982985",
  "offsetLeft": 20,
  "offsetTop": -20
}, {
  "ENAME": "Princess Margaret Hospital",
  "CNAME": "瑪嘉烈",
  "lat": 22.3401,
  "long": 114.1347,
  "WeekMeanTime": "2.47126436781609",
  "PtgChange": "-0.374245228104013",
  "offsetLeft": -60,
  "offsetTop": 20
}, {
  "ENAME": "Prince of Wales Hospital",
  "CNAME": "威爾斯",
  "lat": 22.3797,
  "long": 114.2012,
  "WeekMeanTime": "4.83620689655172",
  "PtgChange": "-0.0547670301372067",
  "offsetLeft": -20,
  "offsetTop": -20
}];
    const elements = status.map(s => {
      const meanTime = parseFloat(s.WeekMeanTime).toFixed(1);
      const pctChange = (parseFloat(s.PtgChange) * 100).toFixed(0);
      let meanTimeElement = (<span class="black">{meanTime}</span>);
      let alert = null;
      if (meanTime <= 2.0) {
        meanTimeElement = (<span class="green">{meanTime}</span>);
        alert = (<span class="green"><Octicon name="check" /></span>);
      }
      if (meanTime >= 5.0) {
        meanTimeElement = (<span class="red">{meanTime}</span>);
        alert = (<span class="red"><Octicon name="alert" /></span>);
      }
      let pctChangeElement = (<span class="black">{pctChange}</span>);
      if (pctChange >= 10) {
        pctChangeElement = (<span class="red">{pctChange}</span>)
      }
      if (pctChange <= -10) {
        pctChangeElement = (<span class="green">{pctChange}</span>)
      }
      return (<Marker latitude={s.lat} longitude={s.long} offsetLeft={s.offsetLeft} offsetTop={s.offsetTop}>
        <div class='marker'><Octicon name="search" />&nbsp;<b>{s.CNAME}</b> {alert}<br/>
          {meanTimeElement}&nbsp;小時&nbsp;
          {pctChangeElement}%
        </div>
      </Marker>);
    });
    return (
      <div>
        {elements}
      </div>
    );
  }

  handleSelect = (key) => {
    this.setState({key})
  }

  render() {

    const {viewport, mapStyle} = this.state;
    const markers = this.markers();
    return (
      <div>
      <div class="row">
        <div class="indexJumbotron">
          <h2>急症室等候時間儀表板 <Button variant="primary" href="https://www.facebook.com/g0vhk.io" target="_blank">Learn More</Button> </h2>
            本網站運用<a href="https://data.gov.hk">「資料一線通」</a>的數據並視覺化症室等候時間，網站主要用途為數據分析及比較各間醫院情況，<b>並非緊急醫療服務</b>。網站數據每日更新一次，如有任何查詢，請電郵<a href="mailto:info@g0vhk">info@g0vhk.io</a>。
        </div>
        <div>
           <Tabs activeKey={this.state.key} onSelect={this.handleSelect}>
             <Tab eventKey={0} title="  " class="tab" />
             <Tab eventKey={1} title="地圖" class="tab" >
              <div  class="tabPane">
                <StaticMap
                  width="100%"
                  height="100%"
                  {...viewport}
                  mapStyle={mapStyle}
                  onViewportChange={this._onViewportChange}
                  mapboxApiAccessToken={MAPBOX_TOKEN}
                  class="tabPane">
                  {markers}
                </StaticMap>
              </div>
             </Tab>
             <Tab title="排名榜"  eventKey={2}>
              <div class="tabPane">
                  <RankContainer />
              </div>
             </Tab>
             <Tab title="關於"  eventKey={3}>
              <div class="tabPane">
                  <RankContainer />
              </div>
             </Tab>
           </Tabs>
        </div>
        
        
      </div>
      </div>
    );
  }

}

export function renderToDom(container) {
  render(<App/>, container);
}