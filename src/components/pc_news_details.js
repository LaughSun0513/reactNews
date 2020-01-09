import React from "react"
import {Row,Col,BackTop} from "antd"
import PCHeader from "./pc_header"
import PCFooter from "./pc_footer"
import NewsImgBlock from "./pc_news_image_block"
import CommonComments from "./common_comments"
export default class PcNewsDetails extends React.Component{
    constructor(){
        super();
        this.state={
            newsItem:""
        }
    }
    componentDidMount(){
        let url = "http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + this.props.params.uniquekey
        fetch(url).then((res)=>{
           
            res.json().then((data)=>{
                    this.setState({newsItem:data})
                    document.title = this.state.newsItem.title + " - React News | React 驱动的新闻平台";
            })
        })
    }
    render(){ 
        const {newsItem}=this.state;
        return (
            <div>
                <PCHeader />
                <Row>
                    <Col span={2}></Col>
                    <Col span={14} className="container">
                        <div dangerouslySetInnerHTML={{ __html: newsItem.pagecontent}}></div>
                        <CommonComments uniquekey={this.props.params.uniquekey}/>
                    </Col>
                    <Col span={1}></Col>
                    <Col span={6}>
                        <NewsImgBlock count={40} type="top" width="100%" cardTitle="相关新闻" imageWidth="150px"/>
                    </Col>
                    <Col span={1}></Col>
                </Row>
                <PCFooter /> 
                <BackTop></BackTop>
            </div>
        )
    }
}