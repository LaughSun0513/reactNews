import React from "react";

import { Row, Col } from 'antd';
import { Menu, Icon, Modal, Button, message } from 'antd';
import { Tabs } from 'antd';
import { Form, Input, Checkbox,Tooltip, Cascader, Select, AutoComplete } from 'antd';
 
import { Router, Route, Link, browserHistory } from 'react-router'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;


class PCHeader extends React.Component {
    constructor() {
        super();
        this.state={
            current: 'top',
            hasLogined: "false",
            userNickName: "",
            userid: "",
            visible: false,
            confirmDirty: false,
            action: 'login'
        }
    }
    componentWillMount() {
        if (localStorage.userid != '') {
            this.setState({ hasLogined: true });
            this.setState({ userNickName: localStorage.userNickName, userid: localStorage.userid });
        }
    };
    showModal = (val) => {
        this.setState({
            visible: val,
        });
    }
    handleClick = (e) => {
        if (e.key =="logout"){
            this.setState({ current:"logout"})
            this.showModal(true)
        }else if(e.key=="register"){
            this.setState({ current: "register" })
            this.showModal(true)
        }else{
            {
                this.setState({current: e.key});    
            } 
        }   
             
    }
    callback(key) {
        if (key == 1) {
            this.setState({ action: 'login' });
        } else if (key == 2) {
            this.setState({ action: 'register' });
        }
    };
    handleSubmit = (e) => {
        e.preventDefault();
        var myFetchOptions = {
            method: 'GET'
        };
        let formData = this.props.form.getFieldsValue();

        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action="
            + this.state.action
            + "&username=" + formData.username
            + "&password=" + formData.password
            + "&r_userName=" + formData.r_username
            + "&r_password=" + formData.r_password
            + "&r_confirmPassword=" + formData.confirm, myFetchOptions).
            then(res => res.json()).then(json => {
                this.setState({ userNickName: json.NickUserName, userid: json.UserId })
                localStorage.userid = json.UserId;
                localStorage.userNickName = json.NickUserName;
            })

        if (this.state.action == "login") {
            this.setState({hasLogined: true});  
        }
        message.success("提交成功！");
        this.showModal(false);
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('r_password')) {
            callback('两次密码不一致');
        } else {
            callback();
        }
    }
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();

        
    }
    logout() {
        localStorage.userid = '';
        localStorage.userNickName = '';
        this.setState({ hasLogined: false });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };
        const userShow = this.state.hasLogined==true ?
          <Menu.Item key="logout" class="register">          
            <Button type="primary" htmlType="button">{this.state.userNickName}</Button>
            <Link to={`/usercenter`} target="_blank">
                    <Button type="dashed" htmlType="button">个人中心</Button>
            </Link>
                        
            <Button type="danger" htmlType="button" onClick={this.logout.bind(this)}>退出</Button> 
          </Menu.Item>
          :
            <Menu.Item key="logout" class="register">
                <Icon type="bars"/>注册/登录
            </Menu.Item>
        return (
        <div>
            <header>
                <Row>
                    <Col span={1}></Col>
                    <Col span={5}>
                        <a href="/" class="logo">
                            <img src="./src/assets/images/logo.png" alt="logo"/>
                        </a>
                    </Col>
                    <Col span={17}>
                            <Menu mode="horizontal" selectedKeys={[this.state.current]}
                                onClick={this.handleClick.bind(this)}
                            >
                                <Menu.Item key="top">
                                    <Icon type="bars" />头条
                                </Menu.Item>
                                <Menu.Item key="shehui">
                                    <Icon type="bars" />社会
                                </Menu.Item>
                                <Menu.Item key="guoji">
                                    <Icon type="bars" />国际
                                </Menu.Item>
                                <Menu.Item key="guonei">
                                    <Icon type="bars" />国内
                                </Menu.Item>
                                <Menu.Item key="yule">
                                    <Icon type="bars" />娱乐
                                </Menu.Item>
                                <Menu.Item key="tiyu">
                                    <Icon type="bars" />体育
                                </Menu.Item>
                                <Menu.Item key="keji">
                                    <Icon type="bars" />科技
                                </Menu.Item>
                                <Menu.Item key="shishang">
                                    <Icon type="bars" />时尚
                                </Menu.Item>
                                {userShow}
                            </Menu>
                            <Modal
                                title="用户中心"
                                visible={this.state.visible}
                                onOk={() => this.showModal(false)}
                                onCancel={() => this.showModal(false)}
                                okText="关闭"
                            >
                                <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
                                    <TabPane tab="登录" key="1">
                                        <Form className="login-form" onSubmit={this.handleSubmit.bind(this)}>
                                            <FormItem>
                                                {getFieldDecorator('username', {
                                                    rules: [{ required: true, message: '请输入用户名' }],
                                                })(
                                                    <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                                                    )}
                                            </FormItem>
                                            <FormItem>
                                                {getFieldDecorator('password', {
                                                    rules: [{ required: true, message: '请输入密码' }],
                                                })(
                                                    <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                                                    )}
                                            </FormItem>
                                            <FormItem>
                                                {getFieldDecorator('remember', {
                                                    valuePropName: 'checked',
                                                    initialValue: true,
                                                })(
                                                    <Checkbox>请记住我</Checkbox>
                                                    )}
                                                
                                                <Button type="primary" htmlType="submit" className="login-form-button">
                                                   登录
                                                 </Button>
                                               
                                            </FormItem>
                                        </Form>
                                    </TabPane>
                                    <TabPane tab="注册" key="2">
                                        <Form  onSubmit={this.handleSubmit.bind(this)}>
                                            <FormItem
                                                {...formItemLayout}
                                                label={(
                                                    <span> 用户名</span>)}
                                                hasFeedback
                                            >
                                                {getFieldDecorator('r_username', {
                                                    rules: [{ required: true, message: '请输入你的用户名', whitespace: true }],
                                                })(
                                                    <Input />
                                                    )}
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="密码"
                                                hasFeedback
                                            >
                                                {getFieldDecorator('r_password', {
                                                    rules: [{
                                                        required: true, message: '请输入你的密码',
                                                    }, {
                                                        validator: this.checkConfirm,
                                                    }],
                                                })(
                                                    <Input type="password" />
                                                    )}
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="确认密码"
                                                hasFeedback
                                            >
                                                {getFieldDecorator('confirm', {
                                                    rules: [{
                                                        required: true, message: '再次输入密码',
                                                    }, {
                                                        validator: this.checkPassword,
                                                    }],
                                                })(
                                                    <Input type="password" onBlur={this.handleConfirmBlur}  />
                                                    )}
                                            </FormItem>
                                            <FormItem {...tailFormItemLayout}>
                                                <Button type="primary" htmlType="submit">注册</Button>
                                            </FormItem>
                                        </Form>
                                    </TabPane>
                                </Tabs>
                            </Modal>
                    </Col>
                    <Col span={1}></Col>
                </Row>
            </header> 
        </div>
        )
    }
}  
export default PCHeader = Form.create()(PCHeader);