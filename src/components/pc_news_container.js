import React from "react"
import {Row,Col} from "antd";
import { Carousel,Tabs } from 'antd';
const TabPane=Tabs.TabPane;
import NewsBlock from "./pc_news_block"
import NewsImgBlock from "./pc_news_image_block"
import PCproduct from "./pc_product"

export default class PCNewContainer extends React.Component{
    render(){
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
            <Row>
                <Col span={1}></Col>
                <Col span={22} class="container">
                    <div class="leftContainer">
                        <div class="carousel">
                            <Carousel autoplay>
                                <div><img src="src/assets/images/banner1.jpg" /></div>
                                <div><img src="src/assets/images/banner2.jpg" /></div>
                                <div><img src="src/assets/images/banner3.jpg" /></div>
                                <div><img src="src/assets/images/banner4.jpg" /></div>
                                <div><img src="src/assets/images/banner5.jpg" /></div>
                            </Carousel>
                        </div>
                        {<NewsImgBlock count={9} type="guoji" cartTitle="国际头条" imageWidth="112px" />}
                        
                    </div>
                    <Tabs class="tabs_news">
                        <TabPane tab="头条" key="1" >
                            <NewsBlock type="top" count={22} width="100%" bordered="false"></NewsBlock>
                       </TabPane>
                        <TabPane tab="社会" key="2">
                            <NewsBlock type="shehui" count={22} width="100%" bordered="false" />
                        </TabPane>  
                         
                   </Tabs>
                    <Tabs class="tabs_product">
                        <TabPane tab="ReactNews 产品" key="3">
                            <PCproduct />
                        </TabPane> 
                   </Tabs>
                    {<NewsImgBlock count={8} type="guonei" width="100%" cartTitle="国内新闻" imageWidth="132px" />}
                    {<NewsImgBlock count={16} type="yule" width="100%" cartTitle="娱乐新闻" imageWidth="132px" />}
                </Col>
               
                  
               
                <Col span={1}></Col>
            </Row>
           
        )
    }
}