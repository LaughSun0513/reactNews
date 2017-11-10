import React from "react";
import { Row, Col,Card} from 'antd';
import { Form, Input, Button } from 'antd';

const { TextArea } = Input;
import { notification } from 'antd';
const FormItem = Form.Item;
 class CommonComments extends React.Component{
    constructor(){
        super();
        this.state={
            comments:""
        }
    }
    componentDidMount(){
        let url = "http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + this.props.uniquekey
        fetch(url).then((res) => {
            res.json().then((data) => {
              
                this.setState({ comments: data })
              
            })
        })
    }
    handleSubmit(e) {
       e.preventDefault();
       var myFetchOptions = {
           method: 'GET'
       };
       var formdata = this.props.form.getFieldsValue();
       fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid="+localStorage.userid+"&uniquekey=" + this.props.uniquekey + "&commnet=" + formdata.remark, myFetchOptions)
       .then(response => response.json()).then(json => { 
           this.componentDidMount();
       })
    };
    collect(){
        let url = "http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid="+localStorage.userid+"&uniquekey="+this.props.uniquekey
        fetch(url).then(res=>res.json()).then(data=>{
            notification["success"]({
                message: '文章收藏+1',
                description: '感谢关注',
            });
        })
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const { comments } = this.state;

        const commentsList = comments.length>0
            ? comments.map((comment, index) => (
                <Card key={index} title={comment.UserName} extra={<a href="#">发布于 {comment.datetime} </a>}>
                    <p>{comment.Comments}</p>
                </Card>           
            ))
            :
            "没有任何评论"
        return (
            <div>
                <Row>
                    <Col span={24}>
                        <hr />
                        {commentsList}
                    
                       <Form onSubmit={this.handleSubmit.bind(this)}>
                            <FormItem label="您的评论">
                                {getFieldDecorator('remark')(
                                    <Input type="textarea" placeholder="请输入你的评论"/>
                                )} 
                           </FormItem>
                           <Button type="primary" htmlType="submit">提交</Button>
                           &nbsp; &nbsp;
                           <Button type="primary" htmlType="button" onClick={this.collect.bind(this)}>收藏</Button>                       
                       </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default CommonComments = Form.create()(CommonComments);