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
                        <el-col :span="1.9">
                            <el-button type="primary" size="mini" icon="el-icon-odometer">重启docker</el-button>
                        </el-col>
                        <el-col :span="1.9">
                            <el-button type="primary" size="mini" icon="el-icon-wallet">重启store</el-button>
                        </el-col>
                    </el-row>
                </div>
            </el-card>
        </div>
        <div class="sestion-2">
            <el-card>
                <div class="operate">
                    <el-row :gutter="10">
                        <el-col :span="1.9">
                            <el-button type="primary" size="mini" icon="el-icon-basketball">停机维护</el-button>
                        </el-col>
                        <el-col :span="1.9">
                            <el-button type="primary" size="mini" icon="el-icon-odometer">docker更新</el-button>
                        </el-col>
                        <el-col :span="1.9">
                            <el-button type="primary" size="mini" icon="el-icon-wallet">store更新</el-button>
                        </el-col>
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
                        <el-col :span="3.9">
                            <el-select v-model="selectVal" placeholder="批量操作" size="mini" clearable>
                                <el-option
                                    v-for="item in bulkOperation"
                                    :key="item.value"
                                    :label="item.value"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                </div>
                <div class="table">
                    <el-table v-loading="tableLoad" stripe  :data="dataList" @selection-change="handleSelectionChange"
                    element-loading-text="拼命加载中"
                >
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="ID" label="id"></el-table-column>
                    <el-table-column prop="ip" label="服务器" ></el-table-column>
                    <el-table-column prop="ouser" label="最近一次操作人" width="160"></el-table-column>
                    <el-table-column prop="status" label="更新状态" >
                        <template slot-scope="scope">
                            <el-tag effect="plain" size="small" type="warning" v-if="scope.row.status == 100">进行中...</el-tag>
                            <el-tag effect="plain" size="small" type="success" v-else-if="scope.row.status == 200">成功</el-tag>
                            <el-tag effect="plain" size="small" type="danger" v-else-if="scope.row.status == 300">失败</el-tag>
                            <el-tag effect="plain" size="small" v-else-if="scope.row.status == 400">全部</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="process" label="过程" width="250">
                        <template slot-scope="scope">
                            <el-link type="success" @click="viewContent(scope.row)">查看更新过程</el-link>
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
    </div>
</template>

<script>
    export default {
        name: "assets",
        data () {
            return {
                searchData: "",
                selectVal: "",
                tableLoad: "",
                total:0,
                bulkOperation: [
                    {
                        value: "批量删除"
                    },
                ],
                pages: {
                    curPage:1,
                    pageSize:5,
                },
                multipleSelection: [],
                dataList: [
                    {
                        ID: 1,
                        ouser: "lxb",
                        ip: "1.1.1.1",
                        status: 100,
                        start: "2023-05-14 15:02:36",
                        end: "2023-05-14 15:02:36",
                    },
                    {
                        ID: 2,
                        ouser: "lxb",
                        ip: "1.1.1.1",
                        status: 200,
                        start: "2023-05-14 15:02:36",
                        end: "2023-05-14 15:02:36",
                    },
                    {
                        ID: 3,
                        ouser: "lxb",
                        ip: "1.1.1.1",
                        status: 300,
                        start: "2023-05-14 15:02:36",
                        end: "2023-05-14 15:02:36",
                    },
                    {
                        ID: 4,
                        ouser: "lxb",
                        ip: "1.1.1.1",
                        status: 300,
                        start: "2023-05-14 15:02:36",
                        end: "2023-05-14 15:02:36",
                    },
                ],
            }
        },
        methods: {
            viewContent(data) {

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
        }
    }
</script>

<style lang="scss" scoped>
.box {
    padding: 15px;
}
.sestion-2, .sestion-1-2, .sestion-3, .table, .page {
    margin-top: 16px;
}
.cell button {
    margin-right: 7px;
}
</style>