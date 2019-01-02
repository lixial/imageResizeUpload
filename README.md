# imageResizeUpload
主要是使用react-cropper实现员工头像的剪裁、预览和上传功能

实现功能如图：

第一步：
引入插件和相应样式文件：
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css'

第二步：
提供上传按钮，实现onchange方法获取图片文件地址，传递给Cropper组件
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
  onChange实现方法如下：
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
  
  第三步：
  设置右侧预览区域
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
                            
  第4步：
  增加上传和取消按钮
                              <div className="img-footer-area">
                                <Button type="button" class="u-button button brand_btn " color="brand" onClick={this.cropImage}>{lang.template("确定")}</Button>
                                <Button type="button" class="u-button button default_btn " color="default" onClick={this.handleCancel}>{lang.template("取消")}</Button>
                            </div>
