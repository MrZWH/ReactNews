import React from 'react';
import {Card} from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router';

export default class PCNewsBlock extends React.Component{
    constructor(){
        super();
        this.state = {
            news: ''
        }
    };

    componentWillMount(){
        var myFetchOptions = {
            method: 'GET'
        };
        fetch("http")
    }

    render(){
        return(
            <div className="topNewsList">
                <Card>
                    <ul>

                    </ul>
                </Card>
            </div>
        )
    }
}
