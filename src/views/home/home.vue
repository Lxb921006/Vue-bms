<template>
    <div class="box">
        <el-container class="home" v-loading="permsLoad">
            <el-aside :width="isCollapse ? '65px' : '200px'">
                <el-menu
                    :default-active="editableTabsValue"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    :router="true"
                    :collapse="isCollapse"
                    :collapse-transition="false"
                    background-color="#304156"
                    text-color="rgb(191, 203, 217)"
                    active-text-color="#ffd04b">
                    <el-menu-item index="/" @click.native="TabsHome('/')">
                        <i class="el-icon-s-home"></i>
                        <span slot="title">้ฆ้กต</span>
                    </el-menu-item>
                    <!-- ่ๅ -->
                    <el-submenu v-for="(item1, index1) in permissionList" :key="index1" :index="item1.path">
                        <template slot="title">
                            <i :class="item1.meta.icon"></i>
                            <span slot="title">{{ item1.meta.name }}</span>
                        </template>
                        <template v-if="item1.children && item1.children.length > 0">
                            <template v-for="(item2, index2) in item1.children">
                                <el-menu-item  v-if="item2.hidden"
                                            :key="index2"
                                            :index="item2.path"
                                            :is="'el-menu-item'"
                                            @click.native="addTabs(item2.meta.name, item2.path)"
                                >
                                    <i :class="item2.meta.icon"></i>{{ item2.meta.name }}
                                </el-menu-item>
                            </template>
                        </template>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header>
                    <el-tag size="mini" class="switch1" type="success" v-if="isCollapse"  @click="toggleHandle">ๅฑๅผ<i class="el-icon-caret-right"></i></el-tag>
                    <el-tag size="mini" class="switch1" type="warning" v-else @click="toggleHandle"><i class="el-icon-caret-left"></i>ๆๅ?</el-tag>
                    <el-breadcrumb separator="/" class="c-el-bread">
                        <el-breadcrumb-item :to="{ path: '/' }">้ฆ้กต</el-breadcrumb-item>
                        <el-breadcrumb-item v-for="(item, index) in this.$route.meta.title" :key="index">{{ item }}</el-breadcrumb-item>
                    </el-breadcrumb>
                    <el-dropdown trigger="click">
                        <span class="el-dropdown-link">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon008-saving"></use>
                            </svg>
                            {{ user }}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item icon="el-icon-user" @click.native="userCenterActive('user')">ไธชไบบไธญๅฟ</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-key" @click.native="userCenterActive('pwd')">ๅฏ็?ไฟฎๆน</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-lock" @click.native="logout">้ๅบ</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-header>
                <el-tabs v-model="editableTabsValue" type="card" @tab-click="tabChange" @tab-remove="removeTab">
                    <el-tab-pane label="้ฆ้กต" name="/" :closable="false" :lazy="true"></el-tab-pane>
                    <el-tab-pane
                        :closable="true"
                        v-for="item in editableTabs"
                        :key="item.path"
                        :label="item.title"
                        :name="item.path"
                    >
                    </el-tab-pane>
                </el-tabs>
                <el-main>
                    <vue-page-transition name="fade-in-right">
                        <keep-alive>
                            <router-view v-if="this.$route.meta.keepAlive"></router-view>
                        </keep-alive>
                    </vue-page-transition>
                    <router-view v-if="!this.$route.meta.keepAlive"></router-view>
                </el-main>
            </el-container>
        </el-container>
        <el-dialog
            class="dialog-h"
            title="ไธชไบบไธญๅฟ"
            :visible.sync="userCenterDialogVisible"
            width="800px"
            center
            ref="dia"
            @close="handlediaclose"
            >
            <!-- ็จๆท่ฏฆๆๅๅฏ็?ไฟฎๆน -->
            <userCenter :active="activeTabName" v-if="userCenterDialogVisible"></userCenter>
        </el-dialog>
    </div>
    
</template>

<script>
import { logout } from '../../api'
import { mapState } from 'vuex'
import store from '../../store/index'
import  userCenter  from '../user/userCenter'

export default {
    name:"home",
    data () {
        return {
            isCollapse: false,
            userCenterDialogVisible: false,
            pwdDialogVisible: false,
            editableTabs: [],
            editableTabsValue: '',
            activeName: 'second',
            user: '',
            activeTabName:"",
        }
    },
    components: {
        userCenter,
    },
    computed: {
        ...mapState({
            'permissionList': state => state.addRouters.permissionList,
            'permsLoad': state => state.addRouters.permsLoad,
        })
    },
    watch: {
        active(val) {
            this.activeTabName = val;
        },
    },
    methods: {
        async logout() {
            var params = new URLSearchParams();
            params.append('user', this.user);
            await logout(params, sessionStorage.getItem("user"), this.callMethod);
            sessionStorage.clear();
            store.commit('CLEAR_PERMISSION', null);
            location.reload();
            this.$router.replace('/login').catch((err) => err);
        },
        addTabs (title, path) {
            let data = {title, path};
            let tabs = this.editableTabs.filter(item => item.title === data.title);
            if (tabs.length === 0) {
                this.editableTabs.push(data);
            }
            this.editableTabsValue = data.path;
        },
        removeTab (targetName) {
            let tabs = this.editableTabs;
            let activeName = this.editableTabsValue;
            if (activeName === targetName) {
                tabs.forEach((tab, index) => {
                    if (tab.path === targetName) {
                        let nextTab = tabs[index + 1] || tabs[index - 1];
                        if (nextTab) {
                            activeName = nextTab.path;
                        } else {
                            activeName = '/';
                        }
                    }
                });
            }
            this.editableTabsValue = activeName;
            this.editableTabs = tabs.filter(tab => tab.path !== targetName);
            this.$router.replace(this.editableTabsValue,
                onComplete => {},
                onAbort => {});
        },
        tabChange(tab) {
            this.$router.replace(tab.name,
                onComplete => {},
                onAbort => {}
            )
        },
        TabsHome (path) {
            this.editableTabsValue = path
        },
        toggleHandle() {
            this.isCollapse = !this.isCollapse
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        handlediaclose() {
            this.userCenterDialogVisible = false;
        },
        toggleHandle () {
            this.isCollapse = !this.isCollapse
        },
        userCenterActive(active) {
            this.userCenterDialogVisible = true;
            this.activeTabName = active;
        },
        callMethod() {},
    },
    beforeMount() {
        store.dispatch("GetUserDetail");
    },
    mounted () {
        if (this.$route.meta.name !== '้ฆ้กต') {
            this.editableTabs.push({
                title: this.$route.meta.name,
                path: this.$route.path
            });
        }
        this.editableTabsValue = this.$route.path;
        this.user = window.sessionStorage.getItem('user');
    },
}
</script>

<style lang="scss" scoped>
.box {
    height: 100%;
  }
:deep .boxc {
    height: 342px;
}
.home {
    height: 100%;
}
.user {
    float: right;
}
:deep .el-dropdown {
    color: #fff;
}
:deep .el-menu-vertical-demo {
    height: 100%;
}
:deep .el-menu {
text-align: left;
}
.el-header {
    line-height: 60px;
    background-color: #fff;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
}
.el-header > * {
    display: block;
    float: left;
}
.el-footer {
    // background-color: rgb(48, 65, 86);
    color: #fff;
    text-align: left;
    line-height: 60px;
}
.el-aside {
  background-color: #545c64;
  text-align: left;
  overflow-y: auto;
  overflow-x: hidden;
}

.el-main {
    overflow: hidden;
    overflow-y: auto;
}
body > .el-container {
    margin-bottom: 40px;
}
:deep .el-container {
    overflow: hidden;
    overflow-y: auto;
}
:deep .el-submenu .el-menu-item {
    min-width: 199px;
}
:deep .el-breadcrumb {
  line-height: 60px;
  padding: 0 20px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
.el-icon-caret-left, .el-icon-caret-right {
    line-height: 20px;
}
:deep .el-tag--mini {
    line-height: 20px;
}
.switch1 {
    cursor: pointer;
    margin-top: 20px;
}
.drop-min-width {
  min-width: 98px;
}
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
}
.el-icon-arrow-down {
    font-size: 12px;
}
.el-dropdown {
  float: right;
  margin: 0 10px;
  font-size: 16px;
}
:deep .el-dialog__header {
    background-color: rgb(48, 65, 86);
    padding: 16px 20px 16px;
}
:deep .el-dialog__title {
    color: #fff;
    font-size: 16px;
}
:deep .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
}
:deep .el-dialog__headerbtn .el-dialog__close:hover {
    color: rgb(187, 160, 102);
}
:deep .el-dialog__body {
    // height: 340px;
    background-color: #f9f9f9;
}
.el-dropdown-menu .el-popper {
    min-width: 117px;
}
.icon {
  position: relative;
  height: 38px;
  width: 38px;
  margin: 0 8px;
  top: 12px;
  background-color: #00BCD4;
  border-radius: 50%;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>