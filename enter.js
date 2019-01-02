                  <ImgUpload
                        title={lang.template("证件照")}
                        action="/staff/staff/staff_fe/v1/uploadImage"
                        data={{ "staffId": this.state.currentSelectObj.id }}
                        accept="image/*"
                        multiple={false}
                        // downloadUrl="/staff1/downloadStaffPhoto"
                        onError={(err) => console.log(err)}
                        onSuccess={(data) => this.imgUploadCallback(data)}
                    >
                      <Button ><i class="uf uf-pencil-s"></i></Button>
                  </ImgUpload>
