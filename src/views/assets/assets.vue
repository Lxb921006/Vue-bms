<template>
    <div class="box">
        <!-- <div class="section-1">
            <el-card>
                <div class="process-info">
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <div>
                                <el-statistic title="进行中的任务">
                                    <template slot="formatter"> {{ runningNum }} </template>
                                </el-statistic>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div>
                                <el-statistic title="已完成的任务">
                                    <template slot="formatter"> {{ finishedNum }} </template>
                                </el-statistic>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div>
                                <el-statistic title="失败的任务">
                                    <template slot="formatter"> {{ failedNum }} </template>
                                </el-statistic>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-card>
        </div> -->
        <!-- <div class="section-1-2">
            <el-card>
                <div class="operate">
                    <el-row :gutter="10">
                        <template v-for="data in processList">
                            <template>
                                <el-col :span="1.9" :key="data.pid">
                                    <el-button v-if="data.action==2" type="warning" size="mini" icon="el-icon-basketball" @click="runProcess('sin', data.name)">{{ data.name }}</el-button>
                                </el-col>
                            </template>
                        </template>
                    </el-row>
                </div>
            </el-card>
        </div> -->
        <div class="section-4">
            <el-card>
                <el-divider><i class="el-icon-upload"></i>上传文件</el-divider>
                <div class="upload">
                    <el-row :gutter="10">
                        <el-upload
                            class="upload-demo"
                            ref="upload"
                            :action="uploadUrl()"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :limit="10"
                            :on-success="handleSuccess"
                            :on-change="handleChange"
                            :on-error="handleError"
                            :on-exceed="handleExceed"
                            :file-list="fileList"
                            multiple
                            :auto-upload="false">
                            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload2">分发到指定服务器</el-button>
                            <div slot="tip" class="el-upload__tip size">这里可以上传文件, 系统会批量的分发到勾选的服务器然后再点击对应按钮更新或重启</div>
                        </el-upload>
                    </el-row>
                </div>
            </el-card>
        </div>
        <div class="section-2">
            <el-card>
                <el-divider><i class="el-icon-s-tools"></i>操作</el-divider>
                <div class="operate">
                    <el-row :gutter="10">
                        <template v-for="data in processList">
                            <template>
                                <el-col :span="1.9" :key="data.pid">
                                    <el-button v-if="data.type==1" type="primary" size="mini" icon="el-icon-basketball" @click="runProcess('sin', data.name)">{{ data.name }}</el-button>
                                    <el-button v-else-if="data.type==2" type="warning" size="mini" icon="el-icon-basketball" @click="runProcess('sin', data.name)">{{ data.name }}</el-button>
                                </el-col>
                            </template>
                        </template>
                    </el-row>
                </div>
            </el-card>
        </div>
        <div class="section-3">
            <el-card>
                <el-divider><i class="el-icon-s-platform"></i>服务器列表</el-divider>
                <div class="search">
                    <el-row :gutter=10>
                        <el-col :span="3.9">
                            <el-input v-model="searchData" placeholder="请输入" size="mini" clearable>
                                <el-button slot="append" icon="el-icon-search" size="mini"></el-button>
                            </el-input>
                        </el-col>
                        <div class="mul-op">
                        <el-col :span="3.9">
                            <el-select v-model="selectVal" placeholder="更多操作" size="mini" clearable
                                multiple
                                filterable
                                allow-create
                                default-first-option
                            >
                                <el-option
                                    v-for="item in processList"
                                    :key="item.name"
                                    :label="item.name"
                                    :value="item.name">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="3.9">
                            <el-button type="primary"  size="mini" @click="runProcess('mul', '')">提交</el-button>
                        </el-col>
                        <el-col :span="3.9">
                            <el-button type="primary"  size="mini" icon="el-icon-circle-plus-outline" @click="runProcess('mul', '')">新建</el-button>
                        </el-col>
                        <el-col :span="2" class="c1">
                            <el-link type="primary" @click="oc">{{ detailContent }}<i :class="detailICon"></i> </el-link>
                        </el-col>
                    </div>
                    </el-row>
                </div>
                <div class="table">
                    <transition name="el-zoom-in-center">
                        <div class="detail" v-show="detailView">
                            <el-row :gutter="10">
                                <h3 class="title-2">更新设置</h3>
                            </el-row>
                            <el-row :gutter="10" class="detail-content">
                                <el-col :span="4">
                                   <label class="detail-2">是否查看更新过程(默认关闭):</label> <el-switch v-model="isJump" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                                </el-col>
                            </el-row>
                            <!-- <el-row :gutter="10" class="detail-content">
                                <el-col :span="1.9">
                                   <label class="detail-2">是否打开更新日志:</label> <el-switch v-model="isJump" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                                </el-col>
                            </el-row>
                            <el-row :gutter="10" class="detail-content">
                                <el-col :span="1.9">
                                   <label class="detail-2">是否删除更新日志:</label> <el-switch v-model="isJump" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                                </el-col>
                            </el-row> -->
                        </div>
                    </transition>
                    
                    <el-table v-loading="tableLoad" stripe  :data="dataList" @selection-change="handleSelectionChange"
                    element-loading-text="拼命加载中"
                >
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="id" label="id"></el-table-column>
                    <el-table-column prop="project" label="项目"></el-table-column>
                    <el-table-column prop="ip" label="服务器"></el-table-column>
                    
                    <el-table-column prop="start" label="添加时间">
                        <template slot-scope="scope">
                            <i class="el-icon-time"></i>
                            <span style="margin-left: 10px">{{ scope.row.start | formatDate }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="operate" label="操作" width="250">
                        <template slot-scope="scope">
                            <el-button size="mini" icon="el-icon-edit">编辑</el-button>
                            <el-popconfirm :title="'确定删除'+scope.row.ip+'吗?'"
                                icon="el-icon-info"
                                icon-color="red"
                                confirm-button-text='删除'
                                @confirm="handleDelete(scope.row)"
                            >
                                <el-button size="mini" type="danger" slot="reference" icon="el-icon-delete-solid" plain>删除</el-button>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
                </div>
                <div class="page">
                    <el-pagination
                    background
                    small
                    @current-change="handleCurrentChange"
                    :current-page.sync="pages.curPage"
                    :page-size="pages.pageSize"
                    layout="prev, pager, next, total"
                    :total="total"
                    >
                    </el-pagination>
                </div>
            </el-card>
        </div>
        <div class="section-5">
            <el-card>
                <el-divider><i class="el-icon-s-help"></i>更新记录列表</el-divider>
                <div class="search">
                    <el-row :gutter=10>
                        <el-col :span=3.9>
                            <el-button-group>
                                <!-- <el-button type="primary"  size="mini">全部</el-button> -->
                                <el-button type="warning"  size="mini" @click="getUpdateList('search','进行中')">进行中</el-button>
                                <el-button type="success" size="mini" @click="getUpdateList('search','完成')">完成</el-button>
                                <el-button type="danger"  size="mini" @click="getUpdateList('search','失败')">失败</el-button>
                            </el-button-group>
                        </el-col>
                        <!-- <el-col :span="3.9">
                            <el-input v-model="updateListSeach" placeholder="请输入" size="mini" clearable @clear="getUpdateList(100, '')">
                                <el-button slot="append" icon="el-icon-search" size="mini" @click="getUpdateList(100, '')"></el-button>
                            </el-input>
                        </el-col> -->
                        <el-col :span="3.9">
                            <el-input v-model="updatestatus" placeholder="请输入更新状态" size="mini" clearable @keyup.enter.native="getUpdateList('search', updatestatus)" @clear="getUpdateList('search', updatestatus)"></el-input>
                        </el-col>
                        <el-col :span="3.9">
                            <el-input v-model="updateip" placeholder="请输入ip" size="mini" clearable @keyup.enter.native="getUpdateList('search', updatestatus)" @clear="getUpdateList('search', updatestatus)"></el-input>
                        </el-col>
                        <el-col :span="3.9">
                            <el-input v-model="updateuuid" placeholder="请输入uuid" size="mini" clearable @keyup.enter.native="getUpdateList('search', updatestatus)" @clear="getUpdateList('search', updatestatus)"></el-input>
                        </el-col>
                        <el-col :span="3.9">
                            <el-input v-model="updatename" placeholder="请输入更新程序" size="mini" clearable @keyup.enter.native="getUpdateList('search', updatestatus)" @clear="getUpdateList('search', updatestatus)"></el-input>
                        </el-col>
                        <el-col :span="3.9">
                            <el-input v-model="updateuser" placeholder="请输入操作人" size="mini" clearable @keyup.enter.native="getUpdateList('search', updatestatus)" @clear="getUpdateList('search', updatestatus)"></el-input>
                        </el-col>
                        <el-col :span="3.9">
                            <el-input v-model="updateproject" placeholder="请输入项目" size="mini" clearable @keyup.enter.native="getUpdateList('search', updatestatus)" @clear="getUpdateList('search', updatestatus)"></el-input>
                        </el-col>
                    </el-row>
                </div>
                <div class="table">
                    <el-table v-loading="tableLoad2" stripe  :data="dataList2" @selection-change="handleSelectionChange"
                    element-loading-text="拼命加载中" :row-key="getRowKey"
                >
                    <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
                    <el-table-column prop="id" label="id"></el-table-column>
                    <el-table-column prop="project" label="项目"></el-table-column>
                    <el-table-column prop="ip" label="服务器" width="160"></el-table-column>
                    <el-table-column prop="operator" label="操作人" width="160"></el-table-column>
                    <el-table-column prop="uuid" label="uuid" width="350"></el-table-column>
                    <el-table-column prop="update_name" label="更新程序" width="160">
                        <template slot-scope="scope">
                            <el-tag effect="plain" size="mini">{{ scope.row.update_name }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" label="更新状态"  width="160">
                        <template slot-scope="scope">
                            <el-button type="warning" size="mini"  v-if="scope.row.status === 400" :loading="true" plain>更新中</el-button>
                            <el-link type="success" :underline="false"  size="mini" v-else-if="scope.row.status === 200" plain>完成</el-link>
                            <el-link type="danger" :underline="false"  size="mini" v-else-if="scope.row.status === 300" plain>失败</el-link>
                        </template>
                    </el-table-column>
                    <el-table-column prop="progress" label="更新进度" width="250">
                        <template slot-scope="scope">
                            <el-progress :percentage="scope.row.progress"></el-progress>
                        </template>
                    </el-table-column>
                    <el-table-column prop="process" label="过程" width="200">
                        <template slot-scope="scope">
                            <el-link slot="reference" type="success" @click="viewContent(scope.row)">查看更新进度</el-link>
                        </template>
                    </el-table-column>
                    <el-table-column prop="start" label="开始时间" width="190">
                        <template slot-scope="scope">
                            <i class="el-icon-time"></i>
                            <span style="margin-left: 10px">{{ scope.row.start | formatDate }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="end" label="结束时间" width="190">
                        <template slot-scope="scope">
                            <i class="el-icon-time"></i>
                            <span style="margin-left: 10px">{{ scope.row.end | formatDate }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="cost_time" label="耗时/秒" width="190">
                        <template slot-scope="scope">
                            <i class="el-icon-time"></i>
                            <span style="margin-left: 10px">{{ scope.row.cost_time }}s</span>
                        </template>
                    </el-table-column>
                </el-table>
                </div>
                <div class="page">
                    <el-pagination
                    background
                    small
                    @current-change="handleCurrentChange2"
                    :current-page.sync="pages2.curPage"
                    :page-size="pages2.pageSize"
                    layout="prev, pager, next, total"
                    :total="total2"
                    >
                    </el-pagination>
                </div>
            </el-card>
        </div>
        <div class="result">
            <el-dialog
                title="脚本输出"
                :visible.sync="resultVisible"
                width="50%"
                center
                >
                <div class="result-title">
                    <el-card>
                        <el-divider><strong><i class="el-icon-platform-eleme"></i>更新内容</strong></el-divider>
                        <p class="op-name">
                            <el-row :gutter="10">
                                <el-col :span="1.9" >
                                    <el-tag effect="plain"  type="success">{{ curProject }}</el-tag>
                                </el-col>
                                <el-col :span="1.9" >
                                    <el-tag effect="plain"  type="success">{{ curIp }}</el-tag>
                                </el-col>
                                <el-col :span="1.9" >
                                    <el-tag effect="plain"  type="success">{{ curName }}</el-tag>
                                </el-col>
                            </el-row>
                        </p>
                    </el-card>
                </div>
                <div class="result-data">
                    <el-card>
                        <el-divider><strong><i class="el-icon-platform-eleme"></i>脚本输出</strong></el-divider>
                        <div class="copy">
                            <el-button type="success" size="mini" plain @click="copy(content.join(''))">复制</el-button>
                        </div>
                        <div class="format-code">
                            <pre><code>{{ content.join('') }}</code></pre>
                        </div>
                    </el-card>
                </div>
                </el-dialog>
        </div>
    </div>
</template>

<script>
import { Message, MessageBox } from 'element-ui'
import { mapState } from 'vuex'
import { getAssetsList, getProcessStatus, createProcessUpdateRecord, runningProcess, getUpdateList, assetsUpload } from '../../api'
import { v4 as uuidv4 } from 'uuid';
import baseUrl from "../../utils/baseUrl";
import wssUrl from "../../utils/wssUrl";
import store from '../../store/index'

export default {
    name: "assets",
    data () {
        return {
            searchData: "",
            updateListSeach: "",
            updatestatus:"",
            updateuuid:"",
            updateip:"",
            updatename: "",
            updateproject: "",
            updateuser: "",
            ws: "",
            fileList: [],
            selectVal: [],
            runningNum: 0,
            finishedNum: 0,
            failedNum: 0,
            timer: "",
            isJump: false,
            isLoop: false,
            detailView: false,
            tableLoad2:true,
            updateRunning: [],
            detailContent: "更新设置",
            detailICon: "el-icon-arrow-down",
            tableLoad: true,
            total:5,
            total2:5,
            content: [],
            curIp: "",
            curName: "",
            curProject:"",
            resultVisible: false,
            processList: [
                {pid:2, name: "docker更新", action: 1, value: "dockerUpdate", type: 1},
                {pid:4, name: "java更新", action: 2, value: "javaUpdate", type: 1},
                {pid:5, name: "重启docker", action: 3, value: "dockerReload", type: 2},
                {pid:6, name: "重启java", action: 4, value: "javaReload", type: 2},
            ],
            processName: {
                "docker更新": "dockerUpdate", 
                "java更新": "javaUpdate", 
                "重启docker": "javaUpdate", 
                "重启java": "javaReload",
                "docker更新Log": "dockerUpdateLog",
                "java更新Log": "javaUpdateLog",
            },
            pages: {
                curPage:1,
                pageSize:5,
            },
            pages2: {
                curPage:1,
                pageSize:5,
            },
            finished: [],
            multipleSelection: [],
            dataList: [],
            dataList2: [],
        }
    },
    computed: {
        ...mapState({
            'running': state => state.runningProcess.running,
        }),
    },
    methods: {
        copy(text) {
            this.$copyText(text).then(() => {
                Message.success("已复制");
            }, () => {
                Message.error('复制失败');
            })
        },
        getRowKey(row) {
            return row.id
        },
        loopRunning() {
            this.timer = setInterval(() => {
                this.getUpdateList("page", "");
            }, 3000)
        },
        async getProcessStatus() {
            const resp = await getProcessStatus({result: "run"}).catch(()=>{
                this.runningNum = 0;
                this.finishedNum = 0;
                this.failedNum = 0;
            })

            if (resp.data.code !== 10000) {
                clearInterval(this.timer);
                return Message.error(resp.data.message)
            }

            this.runningNum = resp.data.data.running;
            this.finishedNum = resp.data.data.finished;
            this.failedNum = resp.data.data.failed;

        },
        uploadUrl() {
            return `${baseUrl}/assets/upload`
        },
        submitUpload() {
            if (this.$refs.upload.uploadFiles.length === 0) {
                return Message.error('请选取文件')
            }

            if (this.multipleSelection.length === 0) {
                return Message.error('请选勾选服务器')
            }

            this.$refs.upload.submit();
        },
        async submitUpload2() {
            if (this.$refs.upload.uploadFiles.length === 0) {
                return Message.error('请选取文件')
            }

            if (this.multipleSelection.length === 0) {
                return Message.error('请选勾选服务器')
            }

            let formData = new FormData();
            this.fileList.forEach(file=>{
                formData.append('file',file.raw);		
            })

            const resp = await assetsUpload(formData, this.callMethod);

            this.fileList.forEach(file=>{
                this.handleSuccess(resp, file);
            })

            if (resp.data.code === 10000) {
                Message.success(resp.data.message);
            } else {
                Message.error(resp.data.message);
            }
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleSuccess(response, file) {
            if (response.data.code === 10000) {
                file.status = "success";
            } else {
                file.status = "error";
            }
        },
        handleChange(file, fileList) {
            this.fileList = fileList;
            console.log(this.fileList);
        },
        beforeUpload(file) {
            
        },
        handleExceed(files, fileList) {
            Message.error("最多10个文件同时上传")
        },
        handleError(err) {
            Message.error(err);
        },
        uniqueRandom () {
            const now = Date.now();
            const randomSuffix = Math.floor(Math.random() * 1000000);
            return `${now}-${randomSuffix}`;
        },
        oc () {
            // this.detailContent = this.detailContent === "展开" ? "收起" : "展开";
            this.detailICon = this.detailICon === "el-icon-arrow-down" ? "el-icon-arrow-up" : "el-icon-arrow-down";
            this.detailView = this.detailView === false ? true : false;
        },
        createUuid() {
            return uuidv4();
        },
        open(action, title, process) {
            MessageBox.confirm(title, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let ip = "";
                let uuid = "";
                let project = "";
                let params = "";
                switch (action) {
                    case 'sin':
                        for (let i = 0; i < this.multipleSelection.length; i++) {
                            ip = this.multipleSelection[i].ip;
                            project = this.multipleSelection[i].project;
                            uuid = this.createUuid();
                            this.isJump
                            params = {ip, uuid, project};
                            this.runningJumpOrNot(params, process);
                        }
                        break
                    case 'mul':
                        for (let i = 0; i < this.multipleSelection.length; i++) {
                            for (let t = 0; t < this.selectVal.length; t++) {
                                ip = this.multipleSelection[i].ip;
                                uuid = this.createUuid();
                                project = this.multipleSelection[i].project;
                                params = {ip, uuid, project};
                                this.runningJumpOrNot(params, this.selectVal[t]);
                            }
                        }
                        break
                }

                Message.success(`${process}操作已提交`);
            }).catch((err) => {
                console.log(err);
                Message.info(`${process}操作已取消`);       
            });
        },
        // 程序更新的入口
        runProcess(action, name) {
            if (this.multipleSelection.length === 0) {
                return Message.error("请勾选服务器");
            }

            this.loopRunning();

            let title = "";
            let ip = this.multipleSelection.map(item => item.ip);

            switch (action) {
                case "sin":
                    title = "服务器: " + ip.join("&") + ", 确定操作: " + name + "吗？";
                    this.open('sin', title, name);
                    break
                case "mul":
                    title = "服务器: " + ip.join("&") + ", 确定操作: " + this.selectVal.join("&") + "吗？";
                    this.open('mul', title, this.selectVal.join("&"));
                    break
            }

            this.isLoop = true;
            
        },
        // 资产列表
        async getAssetsList() {
            let data = {page:this.pages.curPage};
            const resp = await getAssetsList(data).catch(err => {
                this.tableLoad = false;
            })

            if (resp.data.code !== 10000) {
                return Message.error(resp.data.message)
            }

            this.dataList = resp.data.data;
            this.pages.pageSize = resp.data.pageSize;
            this.total = resp.data.total;
            this.tableLoad = false;

        },
        // 更新列表
        async getUpdateList(action, status) {
            let data = {};
            let check_status = "";
            let pageNum = 1;
            if (status==="进行中") {
                this.updatestatus = status;
                check_status=400;
            } else if (status==="完成") {
                this.updatestatus = status;
                check_status=200;
            } else if (status==="失败") {
                this.updatestatus = status;
                check_status=300;
            }
            switch (action) {
                case "page":
                    pageNum = this.pages2.curPage;
                    break
                case "search":
                    pageNum = 1;
                    clearInterval(this.timer);
                    break
            }

            data = {
                page: pageNum,
                ip: this.updateip,
                uuid: this.updateuuid,
                update_name: this.updatename,
                project: this.updateproject,
                operator: this.updateuser,
                status: check_status,
            };
            
            const resp = await getUpdateList(data).catch(()=>{this.tableLoad2 = false;})
            if (resp.data.code !== 10000) {
                return Message.error(resp.data.message)
            }

            this.dataList2 = resp.data.data;
            this.pages2.pageSize = resp.data.pageSize;
            this.total2 = resp.data.total;
            this.tableLoad2 = false;

        },
        // 更新列表添加数据
        async createProcessUpdateRecord(data) {
            const resp = await createProcessUpdateRecord({
                ip: data.ip,
                uuid: data.uuid,
                project: data.project,
                operator: "lxb",
                update_name: data.update_name,
            }, this.callMethod)

            return resp
        },
        // 在当前页面执行
        async currentPageRunning(data) {
            const resp = await runningProcess({
                ip: data.ip,
                uuid: data.uuid,
                update_name: this.processName[data.update_name]
            }, this.callMethod);
            return resp
        },
        // 是否在新的页面打开程序更新
        async runningJumpOrNot(row, name) {
            let data = {};
            this.curIp = row.ip;
            this.curName = name;

            data['ip'] = row.ip;
            data['update_name'] = name;
            data['uuid'] = row.uuid;
            data['project'] = row.project;
            
            // 现在更新列表里创建
            const resp = await this.createProcessUpdateRecord(data);
            if (resp.data.code !== 10000) {
                return Message.error(resp.data.message)
            }
            
            // 在新的页面执行
            if (this.isJump) {
                let routeData = this.$router.resolve(
                    { path: `/assets/update/${row.ip}/${this.processName[name]}/${row.uuid}` }
                );
                window.open(routeData.href, '_blank');
            } else {
                // 当前页面执行
                const resp = await this.currentPageRunning(data);
                if (resp.data.code !== 10000) {
                    return Message.error(resp.data.message)
                }
            }
            
        },
        // 查看脚本执行的输出
        viewContent (row) {
            this.content = [];
            this.resultVisible = true;
            this.curIp = row.ip;
            this.curName = row.update_name;
            this.curProject = row.project;
            this.singleContent(row);
        },
        handleDelete (data) {},
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleCurrentChange(val) {
            this.pages.curPage = val;
            this.getAssetsList("page");
        },
        handleCurrentChange2(val) {
            this.pages2.curPage = val;
            this.getUpdateList('page', this.updatestatus);
        },
        singleContent(val) {
            let data = {
                ip: val.ip,
                name: this.processName[val.update_name+"Log"],
                uuid: val.uuid
            }
            this.ws = new WebSocket(wssUrl+"/assets/ws");
            this.ws.onopen = () => {
                console.log('WebSocket连接已打开');
                this.ws.send(JSON.stringify(data));
            };
            this.ws.onmessage = (event) => {
                this.content.push(event.data);
                let div = document.querySelector(".result-data");
                div.scrollTop = div.scrollHeight - div.clientHeight;
            };

            this.ws.onclose = () => {
                console.log('WebSocket连接已关闭');
            };

            this.ws.onerror = (error) => {
                Message.error('WebSocket连接出错:', error);
            };
        },
        callMethod() {},

    },
    mounted () {
        // this.loopRunning();
        this.getUpdateList('page', '');
        this.getAssetsList();
    },
    filters: {
        formatDate(date) {
            var d = date ? new Date(date) : new Date();
            var year = d.getFullYear();
            var month = d.getMonth() + 1;
            var day = d.getDate();
            var hours = d.getHours();
            var min = d.getMinutes();
            var seconds = d.getSeconds();
            if (month < 10) month = '0' + month;
            if (day < 10) day = '0' + day;
            if (hours < 0) hours = '0' + hours;
            if (min < 10) min = '0' + min;
            if (seconds < 10) seconds = '0' + seconds;
            return (year + '-' + month + '-' + day + ' ' + hours + ':' + min + ':' + seconds);
        },
    },
}
</script>

<style lang="scss" scoped>
.box {
    // padding: 15px;
    padding: 20px;
    overflow-y: auto;
    height: 96%;
    background-color: #f5f5f5;
}
.section-2, .section-1-2, .section-3, .table, .page, .result-data, .section-5 {
    margin-top: 16px;
}
.search, .upload, .operate {
    margin-top: 26px;
}
.cell button {
    margin-right: 7px;
}
// .mul-op {
//     float: right;
// }
// 修改elementui css
.op-name {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 16px;
}
.format-code {
    height: 533px;
    text-align: justify;
    font-size: 17px;
    overflow: auto;
    color: #c3c3c3;
    background-color: #292828;
    padding: 16px;
    box-sizing: border-box;
    width: auto;
    margin-top: 10px;
    white-space: pre-wrap;
}
.c1 {
    padding-top: 5px;
}
.detail {
    text-align: left;
    margin-bottom: 45px;
    border-bottom: 1px solid #f3f3f3;
    padding-bottom: 11px;
}
.title-2 {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #f3f3f3;
    padding-left: 30px;
}
.detail-content {
    margin-top: 10px;
}
.detail-2 {
    font-size: 14px;
    color: #6e6e6e;
}
.upload {
    float: left;
    margin-bottom: 19px;
}
.size {
    font-size: 12px;
    color: #e48686;
}
.upload-demo {
    text-align: left;
}
.result-data {
    overflow-y: auto;
}
:deep .el-popover__title {
    font-weight: 600;
}
.el-divider--horizontal {
    margin: 7px 0;
}
.process-running-list > div{
    padding: 4px 1px;
}
</style>