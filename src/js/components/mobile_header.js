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

const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;

export default class MobileHeader extends React.Component{
    constructor(){
        super();
        this.state = {
            current: 'top',
            modalVisible: false,
            action: 'login',
            hasLogined: false,
            userNickName: '',
            userId: 0,
        }
    };

    componentWillMount() {
        const userInfo = localStorage.getItem('userInfo') || '';
        if (userInfo != '' && localStorage.hasLogined == 1) {
            this.setState({hasLogined :true});
            this.setState({
                userNickName: JSON.parse(userInfo).r_userName,
                userId: localStorage.userId
            });
        }
    }

    setModalVisible(value) {
        this.setState({modalVisible: value});
    };

    handleClick(e) {
        if (e.key == "register") {
            this.setState({current: 'register'});
            this.setModalVisible(true);
        } else {
            this.setState({current: e.key})
        }
    };

    handleSubmit(e) {
        e.preventDefault();
        var myFetchOptions = {
            method: 'GET'
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

    login() {
        this.setModalVisible(true);
    };

    callback(key) {
        if (key == 1) {
            this.setState({action: 'login'});
        } else if (key == 2) {
            this.setState({action: 'register'});
        }
    }

    setSet(obj) {
        this.setState(obj);
    }

    render(){
        const userShow = this.state.hasLogined 
            ? <Link to={`/usercenter`}>
                <Icon type="Inbox"/>
              </Link>
            : <Icon type="setting" onClick={this.login.bind(this)}/>
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

        return (
            <div id="mobileheader">
                <header>
                    <a href="/">
                        <img src="./src/images/logo.png" alt="logo"/>
                    </a>
                    <span>ReactNews</span>
                    {userShow}
                </header>
                <Modal 
                    title="用户中心" 
                    wrapClassName="vartical-center-modal" 
                    visible={this.state.modalVisible}
                    onCancel={()=>this.setModalVisible(false)} 
                    onOk={()=>this.setModalVisible(false) }
                    okText="关闭">
                    <Tabs 
                        type="card"
                        onChange={this.callback.bind(this)}>
                        <TabPane tab="登录" key="1">
                            <Login
                                formItemLayout={formItemLayout}
                                tailFormItemLayout={tailFormItemLayout}
                                setModalVisible={this.setModalVisible.bind(this)}
                                action={this.state.action}
                                setSet={this.setSet.bind(this)}>
                            </Login>
                        </TabPane>
                        <TabPane tab="注册" key="2">
                            <Register
                                formItemLayout={formItemLayout}
                                tailFormItemLayout={tailFormItemLayout}
                                setModalVisible={this.setModalVisible.bind(this)}
                                action={this.state.action}>                                
                            </Register>
                        </TabPane>
                    </Tabs>
                </Modal>
            </div>
        );
    };
}
