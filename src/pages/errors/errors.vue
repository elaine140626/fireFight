<template>
  <div class="errors">
    <div class="errors-type">
      <span>请选择反馈类型</span>
      <div>
        <span
          class="tag box"
          :class="activeIndex == index ?'active' :''"
          @click="select(index)"
        >设备问题</span>  
        <span
          class="tag box"
          @click="select(index)"
        >客服问题</span>  
        <span
          class="tag box"
          @click="select(index)"
        >其他问题</span>
      </div>
    </div>
    <div class="errors-iphone">
      请输入手机号码
      <input
        class="input grow"
        maxlength="11"
        type="number"
        placeholder="请输入手机号码，仅用于我们向您核实问题"
        :value="form.phoneNumber"
        @input="bindPhoneNumber"
      >
      <textarea
        bindblur="bindTextAreaBlur"
        auto-height
        class="textArea"
        maxlength="5000"
        cursor-spacing="30"
        :value="form.content"
        placeholder="在此输入您遇见的问题，很抱歉给您带来不好的体验，我们将尽快和您联系…"
        @input="bindTextAreaInput"
      />
    </div>
    <div class="photos flex  row j-start">
      <div
        v-for="item in imgs"
        :key="item"
      >
        <image
          class="photo"
          :mode="item.mode"
          :src="item.src"
        />
      </div>

      <div class="photoDiv">
        <image
          class="addPhoto"
          src="/static/png/photo.png"
          @click="upFile"
        />
      </div>
    </div>
    <div class="flex column errors-logout center">
      <div
        class="loginImg"
        @click="toBanner(item)"
      >
        退出登陆
      </div>
    </div>
  </div>
</template>

<script>
import {
  getParams
} from "@/utils/index";
export default {
  data() {
    return {
      form:{
        phoneNumber: '', //手机号码
        content: ''  // 内容
      },
      imgs:[]
    };
  },
  methods: {
    bindPhoneNumber(){
      let params = getParams(this.params);
      const value2 = wx.getStorageSync("userId");

      params[fuserid] = value2;
      params[ofbWay] = this.form.ofbWay;
      params[fcontent] = this.form.fcontent;
      params[fimage] = this.form.fimage;
      params[fvideo] = this.form.fvideo;
      this.$request
      .post("/user/addUserFeedbackInfo.do ",params)
      .then(res => {
       this.places = res.list
      })
      .catch(err => {
        return wx.showToast({
          title: "获取失败",
          icon: "none"
        });
      });
      
    },
    bindTextAreaInput(e) {
      this.form.content = e.detail.value;
    },
    upFile(){
      let sourceType = [];
      const that = this;
      wx.showActionSheet({
      itemList: ['从相册选择新头像', '拍个新头像'],
        success(res) {
          if(res.tapIndex === 0){
            sourceType = ['album']
          }
          if(res.tapIndex === 1){
            sourceType = ['camera']
          }
          if(res.tapIndex === 2){
            return;
          } 
          that.getPhoto = true;
          wx.chooseImage({
            count: 1,
            sizeType: ["compressed"],
            sourceType: sourceType,
            success: function(res) {
              wx.showLoading({
                title: "上传中",
                mask: true
              });
              const tempFilePaths = res.tempFilePaths;
              that.$request.uploadFile(tempFilePaths[0]).then(
                function(res) {
                  let data = JSON.parse(res.data);
                  let user = this.user;
                  user.aliasPortrait = data.data;
                  this.user = user;
                  const { aliasName, aliasPortrait } = this.user;
                  this.$request.put("/user", {
                    aliasName,
                    aliasPortrait
                  });
                  wx.hideLoading();
                }.bind(that)
              );
            }.bind(this),
            fail(e) {
              wx.hideLoading();
            }
          });
        },
        fail(res) {
          console.log(res.errMsg)
        }
      })
    }
  },
  onLoad() {},
  onShow() {}
};
</script>

<style lang="less" scoped>
.errors {
  padding: 30rpx;
}
.total {
  font-size: 40rpx;
  padding: 20rpx;
}
.line {
  margin-bottom: 20rpx;
}
.input{
  border-style:dashed;
  margin: 30rpx 0rpx;
  background: transparent;
  background-color: rgba(189, 189, 192, 0.05);
  border-width: 1rpx;
}
.tag {
  display: inline-block;
  height: 64rpx;
  line-height: 64rpx;
  text-align: center;
  border-radius: 4rpx;
  border-style:dashed;
  color: #bdbdc0;
  background: transparent;
  background-color: rgba(189, 189, 192, 0.05);
  margin-right: 24rpx;
  margin-bottom: 24rpx;
  padding: 0 26rpx;
  font-size: 32rpx;
  border: 2rpx transparent solid;
  &.active {
    border: 2rpx #ffc86d solid;
  }
  &.focus {
    border: 2rpx #ffc86d solid;
  }
}
.textArea {
  min-height: 400rpx;
  padding: 40rpx;
  background-color: #ffffff;
  width: 100%;
  color: #4D495B;
  font-size: 28rpx;
  box-sizing: border-box;
  line-height:52rpx;
  background: transparent;
  background-color: rgba(189, 189, 192, 0.05);
  border-width: 1rpx;
  border-style:dashed;

}
.photos{
  margin:60rpx 0;
  .photo{
    width: 120rpx;
    height: 120rpx;
    margin-right: 30rpx; 
    background-color: #eeeeee;
  }
  .photoDiv{
    width:120rpx;
    height:120rpx;
    text-align: center;
    line-height: 130rpx;
    border-width: 1rpx;
    border-style:dashed;
    .addPhoto{
      width:52rpx;
      height: 43rpx;
    }
  }

}

.errors-logout {
  padding-bottom: 60rpx;
}

.loginImg{
  background:url(data:image/png;base64,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);
  background-size: 100% 100%;
  width:479rpx;
  height:80rpx;
  border: none;
  border-radius: 5px;
  text-align: center;
  line-height: 80rpx;
  font-color: #eeeeee;
  color: #ffffff;

}
</style>
