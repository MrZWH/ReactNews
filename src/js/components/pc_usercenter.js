import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  HashRouter,
  Link,
  hashHistory,
} from 'react-router-dom';
import {
  Row,
  Col,
  Card,
  Menu,
  Icon,
  Tabs,
  message,
  Form,
  Input,
  Tooltip,
  Button,
  Checkbox,
  Modal,
  Upload,
} from 'antd';
import Login from './login'
import Register from './register';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';

const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;

export default class PCUsercenter extends React.Component {
    constructor() {
        super();
        this.state = {
            usercollection: '',
            usercomments: '',
            previewImage: '',
            previewVisible: false,
            fileList: [
                {
                uid: -1,
                name: 'xxx.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
                }
            ]
        }
    };

    componentDidMount() {
        var myFetchOptions = {
            method: 'GET'
        };

        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=' + localStorage.userId, myFetchOptions)
        .then(response => response.json())
        .then(json => {
          this.setState({usercollection: json});
        })
        .catch(error => {
          console.log(error);
        });

        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=' + localStorage.userId, myFetchOptions)
        .then(response => response.json())
        .then(json => {
            this.setState({usercomments: json});
        })
        .catch(error => {
            console.log(error);
        });
    };

    handlePreview (file) {
        console.log(file);
        this.setState({
        previewImage: file.url || file.thumbUrl,
        previewVisible: true
        });
    };

    handleCancel () {
        this.setState({previewVisible: false});
    };

    handleChange ({fileList}) {
        this.setState({fileList: fileList});
    };

    render() {

        const props = {
            action: 'http://newsapi.gugujiankkong.com/handler.ashx',
            header: {
                "Access-Control-Allow-Origin":"*"
            },
            listType: 'pictrue-card',
        };

        const uploadButton = (
            <div>
                <Icon type='plus'/>
                <div className='ant-upload-text'>上传照片</div>
            </div>
        );
        const {usercollection, usercomments} = this.state;
        const usercollectionList = usercollection.length ?
            usercollection.map((uc, index)=>(
                <Card 
                    key={index} 
                    title={uc.unqiuekey} 
                    extra={<a target="_blank" href={`/#/detai9ls/${uc.unqiuekey}`}></a>}
                    >
                    查看
                    <p>{uc.Title}</p>
                </Card>
            ))
            :
            '您还没有收藏任何的新闻快去收藏一些新闻吧！';

        const usercommentsList = usercomments.length ?
            usercomments.map((comment, index) => (
                <Card 
                    key={index}
                    title={`您于${comment.datetime}评论了该文章${comment.uniquekey}`}
                    extra={<a href={`/#/details/${comment.uniquekey}`} target='_blank'>查看</a>}
                    >
                    <p>{comment.Comments}</p>
                </Card>
            ))
            :
            '您还没有发表过任何评论！';

        return(
            <div>
                <PCHeader></PCHeader>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <Tabs>
                            <TabPane tab="我的收藏列表" key="1">
                                <div className="comment">
                                    <Row>
                                        <Col span={24}>
                                            {usercollectionList}
                                        </Col>
                                    </Row>
                                </div>
                            </TabPane>
                            <TabPane tab="我的评论列表" key="2">
                                <Row>
                                    <Col span={24}>
                                        {usercommentsList}
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tab="头像设置" key="3">
                                <div className="clearfix">
                                    <Upload {...props}
                                        fileList={this.state.fileList}
                                        onPreview={this.handlePreview.bind(this)}
                                        onChange={this.handleChange.bind(this)}
                                        >
                                        {this.state.fileList.length >= 3
                                        ? null
                                        : uploadButton}
                                    </Upload>
                                    <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
                                        <img width='100%' src={this.state.previewImage} alt="预览"/>
                                    </Modal>
                                </div>
                            </TabPane>
                        </Tabs>
                    </Col>
                    <Col span={2}></Col>
                </Row>
                <PCFooter></PCFooter>
            </div>
        );
    }
}