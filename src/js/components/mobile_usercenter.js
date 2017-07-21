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
  Menu,
  Icon,
  Tabs,
  message,
  Form,
  Input,
  Tooltip,
  Button,
  Checkbox,
  Modal
} from 'antd';
import Login from './login'
import Register from './register';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';

const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;

export default class MobileUsercenter extends React.Component {
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
        };
    };

    componentDidMount() {
        var myFetchOptions = {
            method: 'GET'
        };
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid='+localStorage.userId, myFetchOptions)
        .then(response => response.json())
        .then(json => {
            this.setState({usercollection: json})
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
        })
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
            action: '//jsonplaceholder.typicode.com/posts/',
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            listType: 'picture-card'
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
                    extra={<a href={`/#/detai9ls/${uc.unqiuekey}`}></a>}
                    >
                    查看
                    <p>{uc.Title}</p>
                </Card>
            ))
            :
            '您还没有收藏任何的新闻快去收藏一些新闻吧！';
        const usercommentsList = usercomments.length
        ? usercomments.map((comment, index) => (
            <Card
            key={index}
            title={`您于${comment.datetime} 评论了文章`}
            extra={<a href = {
            `/#/details/${comment.uniquekey}`
            }
            target = '_blank' > 查看 </a>}>
            <p>{comment.Comments}</p>
            </Card>
        ))
        : '您还没有发表过任何评论！';

        return(
            <div>
                <MobileHeader></MobileHeader>
                <Row>
                    <Col span={24}>
                        <Tabs>
                            <TabPane tab="我的收藏列表" key="1">
                                <Row>
                                    <Col span={24}>
                                        {usercollectionList}
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tab="我的评论列表" key="2">
                                <Row>
                                    <Col span={24}>
                                        {usercommentsList}
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tab="头像设置" key="3">
                                <div className='clearfix'>
                                    <Upload
                                        {...props}
                                        fileList={this.state.fileList}
                                        onPreview={this.handlePreview}
                                        onChange={this.handleChange}>
                                        {this.state.fileList.length >= 3
                                        ? null
                                        : uploadButton}
                                    </Upload>
                                    <Modal
                                        visible={this.state.previewVisible}
                                        footer={null}
                                        onCancel={this.handleCancle}>
                                        <img alt='预览' width='100%' src={this.state.previewImage}/>
                                    </Modal>
                                </div>
                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
                <MobileFooter></MobileFooter>
            </div>
        );
    }
}