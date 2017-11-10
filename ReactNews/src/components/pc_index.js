import React from "react";
import '../assets/css/pc.css'
import PCHeader from "./pc_header"
import PCFooter from "./pc_footer"
import PCNewContainer from "./pc_news_container"

export default class PcIndex extends React.Component{
    render(){
        return (
            <div>
                <PCHeader/>
                <PCNewContainer/>
                <PCFooter/> 
            </div>
            
        )
    }
}