import React from 'react';
import {Row, Col, BackTop, Form} from 'antd';
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
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid="+localStorage.userid+"&uniquekey="+this.props.uniquekey+"&commnet=", myFetchOptions)
    .then(Response=>Response.json())
    .then(json=>{
      this.setState({comments: json});
    })
	};

  componentDidMount() {
    var myFetchOptions = {
      method: 'GET'
    };

    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey="+this.props.match.uniquekey, myFetchOptions)
    .then(Response=>Response.json())
    .then(json=>{
      this.setState({comments: json});
    })
    
	};
	
	render() {
		let {getFieldProps} = this.props.form;
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
								<Input type="textarea" placeholder="anyword" {...getFieldProps('remark', {initialValue: ''})}></Input>
							</FormItem>
							<Button type="primary" htmlType="submit">提交评论</Button>
						</Form>
					</Col>
				</Row>
			</div>
		)
	}
};

export default CommonComments = Form.create()(CommonComments);