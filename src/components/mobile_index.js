import React from "react";
import "../assets/css/mobile.css"

import MobileHeader from "./mobile_header"
import MobileFooter from "./mobile_footer"
import MobileList from "./mobile_list"
import { Tabs,Carousel} from 'antd';
const TabPane = Tabs.TabPane;
export default class MobileIndex extends React.Component{
    render(){
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
            <div>
                <MobileHeader/>            
                <Tabs>
                    <TabPane tab="头条" key="1">
                        <div class="carousel">
                            <Carousel autoplay>
                                <div><img src="src/assets/images/banner1.jpg" /></div>
                                <div><img src="src/assets/images/banner2.jpg" /></div>
                                <div><img src="src/assets/images/banner3.jpg" /></div>
                                <div><img src="src/assets/images/banner4.jpg" /></div>
                                <div><img src="src/assets/images/banner5.jpg" /></div>
                            </Carousel>
                        </div>
                        <MobileList count={20} type="top" />
                    </TabPane>
                    <TabPane tab="社会" key="2">
                        <MobileList count={20} type="shehui" />
                    </TabPane>
                    <TabPane tab="国际" key="3">
                        <MobileList count={20} type="guoji" />
                    </TabPane>
                    <TabPane tab="国内" key="4">
                        <MobileList count={20} type="guonei" />
                    </TabPane>
                    <TabPane tab="娱乐" key="5">
                        <MobileList count={20} type="yule" />
                    </TabPane>
                    <TabPane tab="体育" key="6">
                        <MobileList count={20} type="tiyu" />
                    </TabPane>
                </Tabs>
                
                <MobileFooter />
            </div>

        )
    }
}