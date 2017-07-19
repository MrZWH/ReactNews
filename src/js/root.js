import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, HashRouter} from 'react-router-dom';
import {Button} from 'antd';
import PCIndex from './components/pc_index';
import MobileIndex from './components/mobile_index'
import 'antd/dist/antd.css';
import MediaQuery from 'react-responsive';

export default class Root extends React.Component{
    render(){
        return (
            <div>
                <MediaQuery query='(min-device-width: 1224px)'>
                    <HashRouter>
                        <PCIndex/>
                    </HashRouter>
                </MediaQuery>
                <MediaQuery query='(max-device-width: 1224px)'>
                    <HashRouter>
                        <MobileIndex/>
                    </HashRouter>
                </MediaQuery>
            </div>
        )
    }
}

ReactDOM.render(<Root/>,document.getElementById('mainContainer'));