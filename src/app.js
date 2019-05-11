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
import Button from 'react-bootstrap/Button';


const MAPBOX_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;


export default class App extends Component {

  state = {
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
  "CNAME": "雅麗氏何妙齡那打素醫院",
  "lat": 22.4586,
  "long": 114.1748,
  "WeekMeanTime": "2.64655172413793",
  "PtgChange": "0.0891828348724901"
}, {
  "ENAME": "Caritas Medical Centre",
  "CNAME": "明愛醫院",
  "lat": 22.3415,
  "long": 114.151,
  "WeekMeanTime": "2.3448275862069",
  "PtgChange": "0.00771936033266223"
}, {
  "ENAME": "Pamela Youde Nethersole Eastern Hospital",
  "CNAME": "東區尤德夫人那打素醫院",
  "lat": 22.27,
  "long": 114.2367,
  "WeekMeanTime": "4.13505747126437",
  "PtgChange": "0.205084169528981"
}, {
  "ENAME": "Ruttonjee Hospital",
  "CNAME": "律敦治醫院",
  "lat": 22.2759,
  "long": 114.1753,
  "WeekMeanTime": "2.81609195402299",
  "PtgChange": "0.0226458586424944"
}, {
  "ENAME": "St John Hospital",
  "CNAME": "長洲醫院",
  "lat": 22.2081,
  "long": 114.0315,
  "WeekMeanTime": "0.543103448275862",
  "PtgChange": "-0.0270606675271989"
}, {
  "ENAME": "Queen Mary Hospital",
  "CNAME": "瑪麗醫院",
  "lat": 22.2704,
  "long": 114.1305,
  "WeekMeanTime": "2.45402298850575",
  "PtgChange": "-0.130055342699021"
}, {
  "ENAME": "Kwong Wah Hospital",
  "CNAME": "廣華醫院",
  "lat": 22.3152,
  "long": 114.1724,
  "WeekMeanTime": "5.8132183908046",
  "PtgChange": "0.117285232885565"
}, {
  "ENAME": "Queen Elizabeth Hospital",
  "CNAME": "伊利沙伯醫院",
  "lat": 22.3091,
  "long": 114.1746,
  "WeekMeanTime": "4.06609195402299",
  "PtgChange": "-0.229340421726902"
}, {
  "ENAME": "Tin Shui Wai Hospital",
  "CNAME": "天水圍醫院",
  "lat": 22.4587,
  "long": 113.9958,
  "WeekMeanTime": "1.81896551724138",
  "PtgChange": "-0.00105992085924252"
}, {
  "ENAME": "Tseung Kwan O Hospital",
  "CNAME": "將軍澳醫院",
  "lat": 22.3183,
  "long": 114.2702,
  "WeekMeanTime": "5.39942528735632",
  "PtgChange": "0.14084356434208"
}, {
  "ENAME": "Yan Chai Hospital",
  "CNAME": "仁濟醫院",
  "lat": 22.3695,
  "long": 114.1194,
  "WeekMeanTime": "2.43965517241379",
  "PtgChange": "0.102204292324505"
}, {
  "ENAME": "Tuen Mun Hospital",
  "CNAME": "屯門醫院",
  "lat": 22.4072,
  "long": 113.9762,
  "WeekMeanTime": "3.91379310344828",
  "PtgChange": "0.155172413793104"
}, {
  "ENAME": "United Christian Hospital",
  "CNAME": "基督教聯合醫院",
  "lat": 22.3222,
  "long": 114.2279,
  "WeekMeanTime": "4.91091954022988",
  "PtgChange": "-0.0186948726650694"
}, {
  "ENAME": "North District Hospital",
  "CNAME": "北區醫院",
  "lat": 22.4968,
  "long": 114.1246,
  "WeekMeanTime": "5.73850574712644",
  "PtgChange": "0.378064104148642"
}, {
  "ENAME": "North Lantau Hospital",
  "CNAME": "北大嶼山醫院",
  "lat": 22.2826,
  "long": 113.9391,
  "WeekMeanTime": "1.37068965517241",
  "PtgChange": "0.0804259634888436"
}, {
  "ENAME": "Pok Oi Hospital",
  "CNAME": "博愛醫院",
  "lat": 22.4454,
  "long": 114.0414,
  "WeekMeanTime": "1.77298850574713",
  "PtgChange": "-0.415402411982985"
}, {
  "ENAME": "Princess Margaret Hospital",
  "CNAME": "瑪嘉烈醫院",
  "lat": 22.3401,
  "long": 114.1347,
  "WeekMeanTime": "2.47126436781609",
  "PtgChange": "-0.374245228104013"
}, {
  "ENAME": "Prince of Wales Hospital",
  "CNAME": "威爾斯親王醫院",
  "lat": 22.3797,
  "long": 114.2012,
  "WeekMeanTime": "4.83620689655172",
  "PtgChange": "-0.0547670301372067"
}];
    const elements = status.map(s => {
      const meanTime = parseFloat(s.WeekMeanTime).toFixed(2);
      const pctChange = (parseFloat(s.PtgChange) * 100).toFixed(0);
      let meanTimeElement = (<span class="black">
          {meanTime}
        </span>);
      if (meanTime <= 2.0) {
        meanTimeElement = (<span class="green">{meanTime}</span>);
      }
      if (meanTime >= 5.0) {
        meanTimeElement = (<span class="red">{meanTime}</span>);
      }
      let pctChangeElement = (<span class="black">{pctChange}</span>);
      if (pctChange >= 10) {
        pctChangeElement = (<span class="red">{pctChange}</span>)
      }
      if (pctChange <= -10) {
        pctChangeElement = (<span class="green">{pctChange}</span>)
      }
      return (<Marker latitude={s.lat} longitude={s.long} offsetLeft={-20} offsetTop={-10}>
        <div class='marker'>{s.CNAME}<br/>
          {meanTimeElement}小時&nbsp;
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

  render() {

    const {viewport, mapStyle} = this.state;
    const markers = this.markers();
    return (
      <div>
      <div class="row">
        <div class="indexJumbotron">
          <h2>急症室等候時間儀表板 <Button variant="primary" href="https://www.facebook.com/g0vhk.io" target="_blank">Learn More</Button> </h2>
          <p>
            本網站運用<a href="https://data.gov.hk">「資料一線通」</a>的數據並視覺化症室等候時間，網站主要用途為數據分析及比較各間醫院情況，<b>並非緊急醫療服務</b>。網站數據每日更新一次，如有任何查詢，請電郵<a href="mailto:info@g0vhk">info@g0vhk.io</a>。
          </p>
        </div>
        <div id="map">
          <StaticMap
            {...viewport}
            width="100%"
            height="100%"
            mapStyle={mapStyle}
            onViewportChange={this._onViewportChange}
            mapboxApiAccessToken={MAPBOX_TOKEN} >
            {markers}
          </StaticMap>
        </div>
        <div id="rank">
          <RankContainer />
        </div>
      </div>
      </div>
    );
  }

}

export function renderToDom(container) {
  render(<App/>, container);
}