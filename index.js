/**
 * 上传组件
 */

import React, { Component } from 'react';
import { Modal, Button, Icon, Upload, Message, Loading, Table, Popconfirm, ProgressBar } from 'tinper-bee';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css'
import PropTypes from 'prop-types';
import lang from  '../lang/index';

import './index.css';

class ImgUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            imgFlag:false,
            src:''//上传的图片
        }
        this.cropImage = this.cropImage.bind(this);
        this.onChange = this.onChange.bind(this);
        this.submitUpload = this.submitUpload.bind(this);
    }
    // componentWillReceiveProps = (newProps) => {
    //     this.setState({
    //         historyData: newProps.defaultFileList
    //     });
    // }

    //显示自身模态
    showModeHandler = (e) => {
        if (e) e.stopPropagation();
        this.setState({
            show: true,
            imgFlag:false
        });
    }
    //隐藏自身模态
    hideModelHandler = () => {
        this.setState({
            show: false
        });
    }
    handleCancel = () => {
        this.setState({
            show: false
        });
    }
    fileClick(){
        $("#fileSelect").trigger("click")
    }
    //图片上传
    onChange(e) {
	    e.preventDefault();
	    let files;
	    if (e.dataTransfer) {
	      	files = e.dataTransfer.files;
	    } else if (e.target) {
	      	files = e.target.files;
        }
        let maxsize = 5*1024;
        if(files[0].size/1024>= maxsize){
            //图片超过5M
            return false;
        }
	    let reader = new FileReader();
	    reader.onload = () => {
	      this.setState({
            src: reader.result,
            imgFlag:true
	      });
	    };
        reader.readAsDataURL(files[0]);
	}
    cropImage = () => {
	    if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
	      return;
	    }
	    let img64Data = this.cropper.getCroppedCanvas().toDataURL();
	    let imgblobDate = this.convertBase64UrlToBlob(img64Data);
	    this.submitUpload(imgblobDate);
    }
    //base64转二进制文件格式
	convertBase64UrlToBlob(urlData) {
		var bytes=window.atob(urlData.split(',')[1]);//去掉url的头，并转换为byte     
	    //处理异常,将ascii码小于0的转换为大于0  
	    var ab = new ArrayBuffer(bytes.length);  
	    var ia = new Uint8Array(ab);  
	    for (var i = 0; i < bytes.length; i++) {  
	        ia[i] = bytes.charCodeAt(i);  
	    }  	  
	    return new Blob( [ab] , {type : 'image/png'});
    }
    //上传图片
    submitUpload(imgBlob) {
		let self = this;
		let fd = new FormData();
        fd.append('file', imgBlob);
        //添加上传参数
		for(let key in this.props.data) {
			fd.append(key, this.props.data[key]);
		}	
		$.ajax({
		    url: self.props.action,
		    type: 'POST',
		    data: fd,
		    contentType: false,
		    processData: false,
		    dataType: 'json',
		    success: function (data) {
	    		if(self.props.onSuccess) {
	    			self.props.onSuccess(data.data);
	    		}
	    		self.setState({
                    show: false,
                    imgFlag:false,
	    			src: ''
                })
		    },
		    error: function(err) {
		    	self.props.onError(err)
		    }
		});
	}
    render() {
        let self = this;
        return (
            <span className="img-upload-wrap">
                <span onClick={this.showModeHandler}>
                    {this.props.children}
                </span>
                <Modal
                    dialogClassName="img-upload-modal"
                    backdrop={false}
                    autoFocus={false}
                    enforceFocus={false}
                    show={this.state.show}
                    onHide={this.hideModelHandler} >
                    <Modal.Header
                        closeButton>
                        <Modal.Title>{this.props.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="img-upload-wrap">
                            <div className="img-left-area">
                            {
                                this.state.imgFlag==true?
                                <div>
                                    <Cropper
                                        key = {this.state.src}
                                        ref={cropper => this.cropper = cropper}
                                        src={this.state.src}
                                        style={{height: '358px', width: '100%'}}
                                        aspectRatio={98/128}
                                        guides={false}
                                        preview = ".image-wrapper"
                                    />
                                </div>
                                :
                                <div class="image-container target" id="cropper-target">
                                    <input type="file" id="fileSelect" onChange={this.onChange} accept="image/*" key = {this.state.src} style={{"opacity":"0"}}/>
                                    <Button type="button" class="u-button button" style={{"position": "relative","left": "-40px"}}onClick={this.fileClick}>{lang.template("选择文件")}</Button>
                                    <p><span>{lang.template("只支持JPG、PNG、GIF，大小不超过5M")}</span></p>
                                </div>
                            }
                            </div>
                            <div className="img-right-area">
                                <p>{lang.template("预览")}</p>
                                <div class="image-container large" id="preview-large">
                                    <div class="image-wrapper">
                                        <img src="//cdn.yonyoucloud.com/pro/baseData/org-center/images/head-portrait3.png" className="noavatar" style={{height: '128px', width: '91.4px', display: 'none'}}/>
                                        <img src="//cdn.yonyoucloud.com/pro/baseData/org-center/images/head-portrait3.png" className="previewimg" style={{height: '128px',width: '91.4px'}}/>
                                    </div>
                                </div>
                                <p>92px x 128px</p>
                                <div class="image-container medium" id="preview-medium">
                                    <div class="image-wrapper">
                                        <img src="//cdn.yonyoucloud.com/pro/baseData/org-center/images/head-portrait3.png" className="noavatar" style={{height: '64px', width: '45.7px', display: 'none'}}/>
                                        <img src="//cdn.yonyoucloud.com/pro/baseData/org-center/images/head-portrait3.png" className="previewimg" style={{height: '64px',width: '45.7px'}}/>
                                    </div>
                                </div>
                                <p>46px x 64px</p>
                                <div class="image-container small" id="preview-small">
                                    <div class="image-wrapper">
                                        <img src="//cdn.yonyoucloud.com/pro/baseData/org-center/images/head-portrait3.png" className="noavatar" style={{height: '32px', width: '22.9px', display: 'none'}}/>
                                        <img src="//cdn.yonyoucloud.com/pro/baseData/org-center/images/head-portrait3.png" className="previewimg" style={{height: '32px',width: '22.9px'}}/>
                                    </div>
                                </div>
                                <p>23px x 32px</p>
                            </div>
                            <div className="img-footer-area">
                                <Button type="button" class="u-button button brand_btn " color="brand" onClick={this.cropImage}>{lang.template("确定")}</Button>
                                <Button type="button" class="u-button button default_btn " color="default" onClick={this.handleCancel}>{lang.template("取消")}</Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </span>
        );
    }
}

export default ImgUpload;
