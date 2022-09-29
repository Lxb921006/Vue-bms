<template>
    <div class="box">
        <el-card>
            <el-row :gutter="10" class="content">
                <el-col>
                    <h3 class="title">谷歌认证登录</h3>
                </el-col>
            </el-row>
            <el-row :gutter="10" class="content" v-if="isShowQr == 1">
                <el-col>
                    <vue-qr 
                        :logo-src="appSrc"
                        :size="191"
                        :margin="0"
                        :auto-color="true"
                        :dot-scale="1"
                        :text="url"
                    />
                    <p class="notice">打开谷歌验证器Authenticator扫码</p>
                </el-col>
            </el-row>
            <el-row :gutter="10" class="content">
                <el-col>
                    <el-input v-model="gacode" placeholder="请输入谷歌认证码" suffix-icon="el-icon-edit" clearable @keyup.enter.native="GaLogin()"></el-input>
                </el-col>
            </el-row>
            <el-row :gutter="10" class="content">
                <el-col>
                    <el-button type="success" plain @click="GaLogin()" :loading="submitLoad">{{ logintext }}</el-button>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
import { gaLogin } from '../../api'
import VueQr from 'vue-qr'
import { Message } from 'element-ui'

export default {
    name:"ga",
    data () {
        return {
            user: "",
            appSrc:"",
            gacode:"",
            hidden: true,
            isShowQr:2,
            submitLoad: false,
            logintext:"确定",
            url: "otpauth://totp/lxb?secret=NR4GEYLMNRQTAMLMNNQWI&issuer=cmdb&algorithm=SHA1&digits=6&period=30",
        }
    },
    components: {
        VueQr
    },
    methods: {
        async GaLogin() {
            if (!this.gacode) {
                return Message.error("请输入谷歌验证码");
            }
            this.logintext = "确定..."

            this.submitLoad = true;
            const resp = await gaLogin({code: this.gacode, user: this.user}, this.callMethod).catch(err => {this.submitLoad = false;});
            sessionStorage.setItem("token", resp.data.data.token);
            sessionStorage.setItem("user", resp.data.data.name);
            sessionStorage.setItem("uid", resp.data.data.uid);
            this.$router.replace('/').catch((err) => err);
            this.submitLoad = false;
        },
        callMethod() {},

    },
    created () {
        this.user = this.$route.params.user;
        this.isShowQr =  this.$route.params.qr;
        if (this.isShowQr == 1) {
            this.url = this.$route.params.url;
        }
    },
}
</script>

<style lang="scss" scoped>
.box {
    margin: 150px auto;
    width: 400px;
}
.title {
    position: relative;
    width: 398px;
    height: 45px;
    line-height: 45px;
    color: #fff;
    right: 20px;
    bottom: 30px;
    background-color: #1ab395;
}
.content {
    margin-top: 10px;
}
.notice {
    font-size: 12px;
    color: #c78282;
}
:deep .el-button--success.is-plain {
    width: 100%;
}
</style>