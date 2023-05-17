<template>
    <div class="box">
        <div class="sestion-1">
            <el-card>
                <div class="process-info">
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <div>
                                <el-statistic title="总的的任务">
                                    <template slot="formatter"> 1024 </template>
                                </el-statistic>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div>
                                <el-statistic title="进行中的任务">
                                    <template slot="formatter"> 1024 </template>
                                </el-statistic>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div>
                                <el-statistic title="已完成的任务">
                                    <template slot="formatter"> 512 </template>
                                </el-statistic>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div>
                                <el-statistic title="失败的任务">
                                    <template slot="formatter"> 512 </template>
                                </el-statistic>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-card>
        </div>
        <div class="sestion-1-2">
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
        </div>
        <div class="sestion-2">
            <el-card>
                <div class="operate">
                    <el-row :gutter="10">
                        <template v-for="data in processList">
                            <template>
                                <el-col :span="1.9" :key="data.pid">
                                    <el-button v-if="data.action==1" type="primary" size="mini" icon="el-icon-basketball" @click="runProcess('sin', data.name)">{{ data.name }}</el-button>
                                </el-col>
                            </template>
                        </template>
                    </el-row>
                </div>
            </el-card>
        </div>
        <div class="sestion-3">
            <el-card>
                <div class="search">
                    <el-row :gutter=10>
                        <el-col :span=3.9>
                            <el-button-group>
                                <el-button type="primary"  size="mini">全部</el-button>
                                <el-button type="warning"  size="mini">进行中</el-button>
                                <el-button type="success" size="mini">成功</el-button>
                                <el-button type="danger"  size="mini">失败</el-button>
                            </el-button-group>
                        </el-col>
                        <el-col :span="3.9">
                            <el-input v-model="searchData" placeholder="请输入" size="mini" clearable>
                                <el-button slot="append" icon="el-icon-search" size="mini"></el-button>
                            </el-input>
                        </el-col>
                        <div class="mul-op">
                        <el-col :span="3.9">
                            <el-select v-model="selectVal" placeholder="批量操作" size="mini" clearable
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
                                <el-col :span="1.9">
                                   <label>更新程序是否直接在页面上打开:</label> <el-switch v-model="isJump" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                                </el-col>
                            </el-row>
                        </div>
                    </transition>
                    
                    <el-table v-loading="tableLoad" stripe  :data="dataList" @selection-change="handleSelectionChange"
                    element-loading-text="拼命加载中"
                >
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="ID" label="id"></el-table-column>
                    <el-table-column prop="ip" label="服务器" ></el-table-column>
                    <el-table-column prop="ouser" label="最近一次操作人" width="160"></el-table-column>
                    <el-table-column prop="status" label="更新状态" >
                        <template slot-scope="scope">
                            <el-popover
                                v-if="scope.row.status == 100"
                                placement="right"
                                title="正在更新的进程"
                                width="200"
                                trigger="click"
                                >
                                <el-divider></el-divider>
                                <el-row :gutter="20" class="process-running-list">
                                    <template v-for="data in running">
                                        <template>
                                            <el-col :span="9" :key="data.id" v-if="scope.row.ip == data.ip">
                                                <el-tag effect="plain" size="mini" type="success">{{ data.name }}</el-tag>
                                            </el-col>
                                        </template>
                                    </template>
                                </el-row>
                                <el-button slot="reference" type="warning"  size="mini" plain>进行中...</el-button>
                            </el-popover>
                            <el-tag effect="plain"  type="success" v-else-if="scope.row.status == 200">成功</el-tag>
                            <el-tag effect="plain"  type="danger" v-else-if="scope.row.status == 300">失败</el-tag>
                            <el-tag effect="plain"  v-else-if="scope.row.status == 400">全部</el-tag>
                            <el-tag effect="plain"  v-else>无操作</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="process" label="过程" width="250">
                        <template slot-scope="scope">
                            <el-popover                
                                placement="right"
                                title="查看更新结果"
                                width="230"
                                trigger="click"
                                >
                                <el-divider></el-divider>
                                <el-row :gutter="20" class="process-running-list">
                                    <template v-for="data in processList">
                                        <template >
                                            <el-col :span="12" :key="data.id">
                                                <el-button type="warning"  size="mini" plain @click="viewContent(scope.row, data.name)">{{ data.name }}</el-button>
                                            </el-col>
                                        </template>
                                    </template>
                                </el-row>
                                <el-link slot="reference" type="success">查看更新结果</el-link>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column prop="start" label="开始时间" width="190">
                        <template slot-scope="scope">
                            <i class="el-icon-time"></i>
                            <span style="margin-left: 10px">{{ scope.row.start }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="end" label="结束时间" width="190">
                        <template slot-scope="scope">
                            <i class="el-icon-time"></i>
                            <span style="margin-left: 10px">{{ scope.row.end }}</span>
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
        <div class="result">
            <el-dialog
                title="查看"
                :visible.sync="resultVisible"
                width="50%"
                center
                >
                <div class="result-title">
                    <el-card>
                        <el-divider><strong><i class="el-icon-platform-eleme"></i>操作</strong></el-divider>
                        <p class="op-name">
                            <el-row :gutter="10">
                                <el-col :span="1.9" >
                                    <el-tag effect="plain" size="mini" type="success">{{ curName }}</el-tag>
                                </el-col>
                            </el-row>
                        </p>
                    </el-card>
                </div>
                <div class="result-data">
                    <el-card>
                        <el-divider><strong><i class="el-icon-platform-eleme"></i>内容</strong></el-divider>
                        <div class="format-code">
                            <pre><code>{{ content }}}</code></pre>
                        </div>
                    </el-card>
                </div>
                </el-dialog>
        </div>
    </div>
</template>

<script>
    import { Message, MessageBox } from 'element-ui'


    export default {
        name: "assets",
        data () {
            return {
                searchData: "",
                selectVal: [],
                isJump: false,
                detailView: false,
                detailContent: "展开",
                detailICon: "el-icon-arrow-down",
                tableLoad: "",
                total:5,
                content: "",
                curIp: "",
                curName: "",
                resultVisible: false,
                processList: [
                    {pid:1, name: "停机维护", action: 1},
                    {pid:2, name: "docker更新", action: 1},
                    {pid:3, name: "store更新", action: 1},
                    {pid:4, name: "java更新", action: 1},
                    {pid:5, name: "重启docker", action: 2},
                    {pid:6, name: "重启store", action: 2},
                ],
                bulkOperation: [
                    {
                        value: "批量删除"
                    },
                    {
                        value: "停止docker"
                    },
                    {
                        value: "停止store"
                    },
                ],
                pages: {
                    curPage:1,
                    pageSize:5,
                },
                running: [],
                finished: [],
                multipleSelection: [],
                dataList: [
                    {
                        ID: 1,
                        ouser: "test",
                        ip: "1.1.1.1",
                        status: 100,
                        start: "2023-05-14 15:02:36",
                        end: "2023-05-14 15:02:36",
                    },
                    {
                        ID: 2,
                        ouser: "test",
                        ip: "1.1.1.2",
                        status: 200,
                        start: "2023-05-14 15:02:36",
                        end: "2023-05-14 15:02:36",
                    },
                    {
                        ID: 3,
                        ouser: "test",
                        ip: "1.1.1.3",
                        status: 300,
                        start: "2023-05-14 15:02:36",
                        end: "2023-05-14 15:02:36",
                    },
                    {
                        ID: 4,
                        ouser: "test",
                        ip: "1.1.1.4",
                        status: 100,
                        start: "2023-05-14 15:02:36",
                        end: "2023-05-14 15:02:36",
                    },
                    {
                        ID: 5,
                        ouser: "test",
                        ip: "1.1.1.5",
                        status: 500,
                        start: "2023-05-14 15:02:36",
                        end: "2023-05-14 15:02:36",
                    },
                ],
            }
        },
        methods: {
            oc () {
                this.detailContent = this.detailContent === "展开" ? "收起" : "展开";
                this.detailICon = this.detailICon === "el-icon-arrow-down" ? "el-icon-arrow-up" : "el-icon-arrow-down";
                this.detailView = this.detailView === false ? true : false;
            },
            open(action, title, process) {
                MessageBox.confirm(title, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let data = {};
                    let id = "";
                    let ip = "";
                    switch (action) {
                        case 'sin':
                            for (let i = 0; i < this.multipleSelection.length; i++) {
                                ip = this.multipleSelection[i].ip;
                                id = (100000000 - 1) * Math.random() + 1;
                                data["id"] = id;
                                data["ip"] = ip;
                                data["name"] = process;
                                this.running.push(data);
                            }
                            break
                        case 'mul':
                            for (let i = 0; i < this.multipleSelection.length; i++) {
                                for (let t = 0; t < this.selectVal.length; t++) {
                                    ip = this.multipleSelection[i].ip;
                                    id = (100000000 - 1) * Math.random() + 1;
                                    data["id"] = id;
                                    data["ip"] = ip;
                                    data["name"] = this.selectVal[t];
                                    this.running.push(data);
                                    data = {};
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
            runProcess(action, name) {
                if (this.multipleSelection.length === 0) {
                    return Message.error("请先勾选需要更新的服务器");
                }

                let title = "";
                let ip = this.multipleSelection.map(item => item.ip);

                switch (action) {
                    case "sin":
                        title = "服务器: " + ip.join("&") + "确定操作" + name + "吗？";
                        this.open('sin', title, name);
                        break
                    case "mul":
                        console.log(this.selectVal);
                        title = "服务器: " + ip.join("&") + "确定操作" + this.selectVal.join("&") + "吗？";
                        this.open('mul', title, this.selectVal.join("&"));
                        break
                }
                
                
            },
            viewContent(row, name) {
                // this.resultVisible = true;
                this.curIp = row.ip;
                this.curName = name;

                let routeData = this.$router.resolve(
                    { path: `/assets/update/${row.ip}/${this.curName}` }
                );
                window.open(routeData.href, '_blank');
                // this.$router.push(
                //     { 
                //         name: 'assets-update', 
                //         params: { 
                //                 ip: row.ip, 
                //                 curName: name,
                //         }, 
                //     });
                
            },
            handleDelete (data) {

            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleCurrentChange(val) {
                this.pages.curPage = val;
                // this.ListUser("page");
            },
        },
        mounted () {
            
        },
    }
</script>

<style lang="scss" scoped>
.box {
    padding: 15px;
}
.sestion-2, .sestion-1-2, .sestion-3, .table, .page, .result-data {
    margin-top: 16px;
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
    padding: 6px 12px;
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