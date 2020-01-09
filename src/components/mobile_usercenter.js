import React from "react"
import {Row,Col} from "antd"

import { Tabs, Modal} from "antd"
const TabPane = Tabs.TabPane;
import MobileHeader from "./mobile_header"
import MobileFooter from "./mobile_footer"

import { Upload, Icon, message, Card } from 'antd';
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}
export default class MobileUserCenter extends React.Component{
    constructor() {
        super();
        this.state = {
            previewImage: '',
            previewVisible: false,
            usercollection: '',
            usercomments: ''

        }
    }
    componentDidMount() {
        var myFetchOptions = {
            method: 'GET'
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" + localStorage.userid, myFetchOptions)
            .then(response => response.json())
            .then(json => {
                this.setState({ usercollection: json });
            });
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" + localStorage.userid, myFetchOptions)
            .then(response => response.json())
            .then(json => {
                this.setState({ usercomments: json });
            });
    };
    handleChange = (info) => {
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
        }
    }
   ;
    render(){
        const imageUrl = this.state.imageUrl;
        const props = {
            action: 'http://newsapi.gugujiankong.com/handler.ashx',
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            listType: 'picture-card',
            defaultFileList: [
                {
                    uid: -1,
                    name: 'touxiang',
                    state: 'done',
                    url: '../assets/images/1.jpg',
                    thumbUrl: '../assets/images/1.jpg'
                }
            ],
            onPreview: (file) => {
                this.setState({ previewImage: file.url, previewVisible: true });
            }
        }
        const { usercollection, usercomments } = this.state;
        const usercollectionList = usercollection.length ?
            usercollection.map((uc, index) => (
                <Card key={index} title={uc.uniquekey} extra={<a href={`/#/details/${uc.uniquekey}`}>查看</a>}>
                    <p>{uc.Title}</p>
                </Card>
            ))
            :
            "没有收藏"

        const usercommentsList = usercomments.length ?
            usercomments.map((comment, index) => (
                <Card key={index} title={`于 ${comment.datetime}`} extra={<a target="_blank" href={`/#/details/${comment.uniquekey}`}>查看</a>}>
                    <p>{comment.Comments}</p>
                </Card>
            ))
            :
            '您还没有发表过任何评论。';
        return(
            <div>
                <MobileHeader />
                <Row>
                    <Col span={24}>
                        <Tabs>
                            <TabPane tab="我的收藏列表" key="1">
                                <div>
                                    <Row>
                                        <Col span={24}>
                                            {usercollectionList}
                                        </Col>
                                    </Row>
                                </div>
                            </TabPane>
                            <TabPane tab="我的评论列表" key="2">
                                <Row>
                                    <Col span={24}>
                                        {usercommentsList}
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tab="头像设置" key="3">
                                <Upload
                                    className="avatar-uploader"
                                    {...props}
                                    showUploadList={false}
                                    beforeUpload={beforeUpload}
                                    onChange={this.handleChange}
                                >
                                    {
                                        imageUrl ?
                                            <img src={imageUrl} alt="" className="avatar" /> :
                                            <Icon type="plus" className="avatar-uploader-trigger" />
                                    }
                                </Upload>
                                <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                                    <img alt="预览" src={this.state.previewImage} />
                                </Modal>
                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
                <MobileFooter />
            </div>
        )
        
      
    }
}

