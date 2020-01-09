import React from "react"
import {Row,Col,BackTop} from "antd"
import MobileHeader from "./mobile_header"
import MobileFooter from "./mobile_footer"
import MobileList from "./mobile_list"
import CommonComments from "./common_comments"
export default class MobileNewsDetails extends React.Component{
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
                    console.log(data)
                    this.setState({newsItem:data})
                    document.title = this.state.newsItem.title + " - React News | React 驱动的新闻平台";
            })
        })
    }
    render(){ 
        const {newsItem}=this.state;
        return (
            <div id="mobileDetailsContainer">
                <MobileHeader />
                <div>
                    <Row>
                        <Col span={24} className="container">
                            <div dangerouslySetInnerHTML={{ __html: newsItem.pagecontent}}></div>
                            <CommonComments uniquekey={this.props.params.uniquekey}/>
                        </Col>  
                    </Row>
                </div>
                
                <MobileFooter /> 
                <BackTop></BackTop>
            </div>
        )
    }
}