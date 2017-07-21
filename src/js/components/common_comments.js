import React from 'react';
import {
	Row, 
	Col, 
	BackTop, 
	Form,
	Icon,
	message,
	Input,
	Button,
	CheckBox,
	Modal,
	Card,
	notification,
} from 'antd';

const FormItem = Form.Item;
class CommonComments extends React.Component{
	constructor() {
		super();
		this.state = {
			comments: ''
		};
	};

	handleSubmit() {
		e.preventDefault();
    var myFetchOptions = {
      method: 'GET'
		};
		var formdata = this.props.form.getFieldsValue();
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid="+
		localStorage.userId+
		"&uniquekey="+this.props.uniquekey+
		"&commnet="+formdata.remark, myFetchOptions)
    .then(Response=>Response.json())
    .then(json=>{
      this.setState({comments: json});
    })
	};

	addUserCollection() {
		var myFetchOptions = {
			method: 'GET'
		};

		fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid='+localStorage.userId+'&uniquekey='+this.props.uniquekey,myFetchOptions)
		.then(response => response.json())
		.then(json => {
			// 收藏成功以后进行全局提醒
			notification['success']({message: 'ReactNews提醒', description: '收藏此文章成功'});
		});
	}

  componentDidMount() {
    var myFetchOptions = {
      method: 'GET'
    };

		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey="+
		this.props.uniquekey, myFetchOptions)
    .then(Response=>Response.json())
    .then(json=>{
      this.componentDidMount();
    })
    
	};
	
	render() {
		let {getFieldDecorator} = this.props.form;
		const {comments} = this.state;
		const commentList = comments.length?
		comments.map((comment, index)=>(
			<Card key={index} title={comment.UserName} extra={<a href="#">发表于{comment.datetime}</a>}>
			<p>{comment.Comments}</p>
			</Card>
		))
		: 
		'没有加载到任何评论';
		return(
			<div className="comment">
				<Row>
					<Col span={24}>
						{commentList}
						<Form onSubmit={this.handleSubmit.bind(this)}>
							<FormItem label="您的评论">
								{getFieldDecorator('remark', {
									rules: [
										{
											required: true,
											message: '内容不能为空！',
											whitespace: true,
										}
									]
								})(<Input type="textarea" placeholder="anyword"></Input>)}
							</FormItem>
							<Button type="primary" htmlType="submit">提交评论</Button>
							&nbsp;&nbsp;
							<Button type="primary" htmlType="button" onClick={this.addUserCollection.bind(this)}>收藏该文章</Button>
						</Form>
					</Col>
				</Row>
			</div>
		)
	}
};

export default CommonComments = Form.create()(CommonComments);