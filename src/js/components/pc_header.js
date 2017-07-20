import React from 'react';
import Login from './login';
import Register from './register';
import { 
    Row, 
    Col,
    Menu,
    Icon,
    Tabs,
    Form,
    Input,
    Tooltip,
    Button,
    Checkbox,
    Modal
} from 'antd';

const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;

export default class PCHeader extends React.Component{
    constructor(){
        super();
        this.state = {
            current: 'top',
            modalVisible: false,
            action: 'login',
            hasLogined: false,
            userNickName: '',
            userid: 0,
        }
    };

    componentWillMount() {
        const userInfo = localStorage.getItem('userInfo') || '';
        if (userInfo != '' && localStorage.hasLogined == '1') {
            this.setState({hasLogined: true});
            this.setState({
                userNickName: JSON.parse(userInfo).r_userName,
                userId: localStorage.userId
            });
        }
    }

    setModalVisible(value) {
        this.setState({modalVisible: value})
    };

    handleClick(e) {
        if (e.key == "register") {
            this.setState({current: 'register'});
            this.setModalVisible(true);
        } else {
            this.setState({current: e.key})
        }
    };

    callback(key) {
        if (key == 1) {
        this.setState({action: 'login'});
        } else if (key == 2) {
        this.setState({action: 'register'});
        }
    };

    setSet(obj) {
        this.setState(obj);
    }

    logout() {
        localStorage.userInfo = '';
        this.setState({hasLogined: false});
    }

    handleSubmit(e) {
        e.preventDefault();
        var myFetchOptions = {
            methodL: 'GET'
        };
        this.props.form.validateFields((err, values) => {
        if (!err) {
           fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=register&username=username&password=password&r_username="+values.r_userName+"&r_password="+values.r_password+"&r_confirmPassword="+values.r_confirmPassword,myFetchOptions)
           .then(response=>response.json()).then(json=>{
                this.setState({userNickName:json.NickUserName,userid:json.UserId});
           });
            message.success("请求成功！");
            this.setModalVisible(false);
        }
        });
    };
    render(){
        const userShow = this.state.hasLogined
        ?
        <Menu.Item key="logout" className="register">
            <Button type="primary" htmlType="button">{this.state.userNickName}</Button>
            &nbsp;&nbsp;
            <Link to={`/usercenter`} target="_blank">
                <Button type="dashed" htmlType="button">个人中心</Button>
            </Link>
            &nbsp;&nbsp;
            <Button type="ghost" htmlType="button" onClick={this.logout.bind(this)}>退出</Button>
        </Menu.Item>
        :
        <Menu.Item key="register" className="register">
            <Icon type="appstore"/>登录/注册
        </Menu.Item>;

        const formItemLayout = {
            labelCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 6
                }
            },
            wrapperCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 14
                }
            }
        };

        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0
                },
                sm: {
                    span: 14,
                    offset: 6
                }
            }
        };
        return(
            <header>
                <Row>
                    <Col span={2}></Col>
                    <Col span={4}>
                        <a href="/" className="logo">
                            <img src="./src/images/logo.png" alt="logo"/>
                            <span>ReactNews</span>
                        </a>
                    </Col>
                    <Col span={16}>
                        <Menu 
                            mode="horizontal" 
                            onClick={this.handleClick.bind(this)} 
                            selectedKeys={[this.state.current]}>
                            <Menu.Item key="top">
                                <Icon type="appstore"/> 头条
                            </Menu.Item>
                            <Menu.Item key="shehui">
                                <Icon type="appstore"/> 社会
                            </Menu.Item>
                            <Menu.Item key="guonei">
                                <Icon type="appstore"/> 国内
                            </Menu.Item>
                            <Menu.Item key="guoji">
                                <Icon type="appstore"/> 国际
                            </Menu.Item>
                            <Menu.Item key="yvle">
                                <Icon type="appstore"/> 娱乐
                            </Menu.Item>
                            <Menu.Item key="tiyv">
                                <Icon type="appstore"/> 体育
                            </Menu.Item>
                            <Menu.Item key="toutiao">
                                <Icon type="appstore"/> 头条
                            </Menu.Item>
                            <Menu.Item key="keji">
                                <Icon type="appstore"/> 科技
                            </Menu.Item>
                            <Menu.Item key="shishang">
                                <Icon type="appstore"/> 时尚
                            </Menu.Item>
                            {userShow}
                        </Menu>
                        <Modal 
                            title="用户中心" 
                            wrapClassName="vartical-center-modal" 
                            visible={this.state.modalVisible}
                            onCancel={()=>this.setModalVisible(false)} 
                            onOk={()=>this.setModalVisible(false) }
                            okText="关闭">
                            <Tabs type="card" onChange={this.callback.bind(this)}>
                                <TabPane tab="登录" key="1">
                                    <Login
                                        formItemLayout={formItemLayout}
                                        tailFormItemLayout={tailFormItemLayout}
                                        setModalVisible={this
                                        .setModalVisible
                                        .bind(this)}
                                        action={this.state.action}
                                        setSet={this
                                        .setSet
                                        .bind(this)}>
                                    </Login>
                                </TabPane>
                                <TabPane tab="注册" key="2">
                                    <Register
                                        formItemLayout={formItemLayout}
                                        tailFormItemLayout={tailFormItemLayout}
                                        setModalVisible={this
                                        .setModalVisible
                                        .bind(this)}
                                        action={this.state.action}>
                                    </Register>
                                </TabPane>
                            </Tabs>
                        </Modal>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </header>
        )
    }
}
