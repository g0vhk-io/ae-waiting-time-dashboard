import React, {Component} from 'react';
import {render} from 'react-dom';

export default class RankContainer extends Component {
    render() {
        return (<div><h2>等侯時間排名榜</h2>
        <table border={1} align="center">
          <tr>
            <th>排名</th><th>醫院</th><th>等候時間</th>
          </tr>
          <tr>
            <td>1</td><td>廣華醫院</td><td>5.81</td>
          </tr><tr>
            <td>2</td><td>北區醫院</td><td>5.74</td>
          </tr><tr>
            <td>3</td><td>將軍澳醫院</td><td>5.40</td>
          </tr><tr>
            <td>4</td><td>基督教聯合醫院</td><td>4.91</td>
          </tr><tr>
            <td>5</td><td>威爾斯親王醫院</td><td>4.84</td>
          </tr>
        </table></div>);
	}
}
