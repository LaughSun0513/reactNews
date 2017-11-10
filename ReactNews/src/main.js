import React from "react";
import ReactDom from "react-dom"

import 'antd/dist/antd.css';

import PcIndex from "./components/pc_index"
import MobileIndex from "./components/mobile_index"

import MediaQuery from "react-responsive"

import PcNewsDetails from "./components/pc_news_details"
import MobileNewsDetails from "./components/mobile_news_details"

import PCUserCenter from "./components/pc_usercenter"
import MobileUserCenter from "./components/mobile_usercenter"

import {Router,Route,hashHistory} from "react-router"
export default class Main extends React.Component{
  render(){
    return (
        <div>
          <MediaQuery query="(min-device-width:1224px)">

            <Router history={hashHistory}>
              <Route path="/" component={PcIndex}></Route>
              <Route path="/details/:uniquekey" component={PcNewsDetails}></Route>
              <Route path="/usercenter" component={PCUserCenter}></Route>
            </Router>

          </MediaQuery>
          
          <MediaQuery query="(max-device-width:1224px)">
            
            <Router history={hashHistory}>
            <Route path="/" component={MobileIndex}></Route>
              <Route path="/details/:uniquekey" component={MobileNewsDetails}></Route>
              <Route path="/usercenter" component={MobileUserCenter}></Route>
            </Router>
          </MediaQuery>
      
        </div>
    )
  }
}
ReactDom.render(
  <Main/>,
  document.querySelector("#app")
)
