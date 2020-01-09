import React from "react"
import {Row,Col} from "antd"

import {Tabs} from "antd"
const TabPane = Tabs.TabPane;
import PCHeader from "./pc_header"
import PCFooter from "./pc_footer"
import { Upload, Icon, message, Modal,Card} from 'antd';

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
export default class PCUserCenter extends React.Component{
    constructor() {
        super();
        this.state = {
            previewImage: '',
            previewVisible: false,
            usercollection:'',
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
            getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
        }
    }
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
        };
        const { usercollection, usercomments } = this.state;
        const usercollectionList = usercollection.length ?
            usercollection.map((uc, index) => (
                <Card key={index} title={uc.uniquekey} extra={<a target="_blank" href={`/#/details/${uc.uniquekey}`}>查看</a>}>
                    <p>{uc.Title}</p>
                </Card>
            ))
            
            :
            "没有收藏";

        const usercommentsList = usercomments.length ?
            usercomments.map((comment, index) => (
                <Card key={index} title={`于 ${comment.datetime} 评论了文章 ${comment.uniquekey}`} extra={<a target="_blank" href={`/#/details/${comment.uniquekey}`}>查看</a>}>
                    <p>{comment.Comments}</p>
                </Card>
            ))
            :
            '您还没有发表过任何评论。';
        return(
            <div>
                <PCHeader />
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
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
                                <div>
                                  <Row>
                                    <Col span={24}>
                                        {usercommentsList}
                                    </Col>
                                </Row>  
                                </div>
                                
                            </TabPane>
                            <TabPane tab="头像设置" key="3">
                                <Upload
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    beforeUpload={beforeUpload}
                                    onChange={this.handleChange}
                                    {...props}
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
                    <Col span={2}></Col>
                </Row>
                <PCFooter />
            </div>
        )
        
      
    }
}

