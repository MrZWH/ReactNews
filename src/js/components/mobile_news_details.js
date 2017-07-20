import React from 'react';
import {Row, Col, BackTop} from 'antd';
import MobileHeader from './mobile_header';
import MobileHeaderFooter from './mobile_footer';
export default class MobileNewsDetails extends React.Component{
  constructor() {
    super();
    this.state = {
        newsItem: ''
    };
  };

  componentDidMount() {
    var myFetchOptions = {
      method: 'GET'
    };

    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey="+this.props.match.params.uniquekey, myFetchOptions)
    .then(Response=>Response.json())
    .then(json=>{
      this.setState({newsItem: json});
      document.title = this.state.newsItem.title+ "- React News | React 驱动的新闻平台"
    })
    
  };

  createMarkup() {
    return {__html: this.state.newsItem.pagecontent}
  };

  render() {
    return (
      <div id="mobileDetailContainer">
        <MobileHeader></MobileHeader>
        <div className="ucmobileList">
            <Row>
            <Col span={2}></Col>
            <Col span={24} className="container">
                <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}>
                </div>
            </Col>
            </Row>
            <MobileHeaderFooter></MobileHeaderFooter>
        </div>
        <BackTop></BackTop>
      </div>
    );
  }
}