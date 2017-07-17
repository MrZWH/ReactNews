import React from 'react';
import { Row, Col} from 'antd';
import { 
    Menu,
    Icon, 
    Tabs, 
    message, 
    Form, 
    Input, 
    Button, 
    Checkbox,
    Modal
} from 'antd';
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;

class PCHeader extends React.Component{
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
        let { getFieldDecorator } = this.props.form;
        const userShow = this.state.hasLogined
        ?
        <Menu.Item key="logout" className="register">
            <Button type="primary" htmlType="button">{this.state.userNickName}</Button>
            &nbsp;&nbsp;
            <Link target="_blank">
                <Button type="dashed" htmlType="button">个人中心</Button>
            </Link>
            &nbsp;&nbsp;
            <Button type="ghost" htmlType="button">退出</Button>
        </Menu.Item>
        :
        <Menu.Item key="register" className="register">
            <Icon type="appstore"/>登录/注册
        </Menu.Item>;
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
                        <Menu mode="horizontal" onClick={this.handleClick.bind(this)} selectedKeys={[this.state.current]}>
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
                        <Modal title="用户中心" wrapClassName="vartical-center-modal" visible={this.state.modalVisible}
                        onCancel={()=>this.setModalVisible(false)} onOk={()=>this.setModalVisible(false) }okText="关闭">
                            <Tabs type="card">
                                <TabPane tab="注册" key="2">
                                    <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
                                        <FormItem label="账户">
                                            {getFieldDecorator('r_userName', {
                                                rules: [{ required: true, message: 'Please input your username!' }],
                                            })(
                                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                                            )}
                                        </FormItem>
                                        <FormItem label="密码">
                                            {getFieldDecorator('r_password', {
                                                rules: [{ required: true, message: 'Please input your password!' }],
                                            })(
                                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                                            )}
                                        </FormItem>
                                        <FormItem label="确认密码">
                                            {getFieldDecorator('r_confirmPassword', {
                                                rules: [{ required: true, message: '请再次输入您的密码!' }],
                                            })(
                                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请再次输入您的密码" />
                                            )}
                                        </FormItem>
                                        <Button type="primary" htmlType="submit">注册</Button>
                                    </Form>
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

export default PCHeader = Form.create()(PCHeader);