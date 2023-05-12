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
        <div class="sestion-2">
            <el-card>
                <div class="operate">
                    <el-row :gutter="10">
                        <el-col :span="1.9">
                            <el-button type="primary" size="small">更新docker</el-button>
                        </el-col>
                        <el-col :span="1.9">
                            <el-button type="primary" size="small">更新docker</el-button>
                        </el-col>
                        <el-col :span="1.9">
                            <el-button type="primary" size="small">停机维护</el-button>
                        </el-col>
                    </el-row>
                </div>
            </el-card>
        </div>
        <div class="sestion-3">
            <el-card>
                <div class="search">
                    <el-row>
                        <el-col></el-col>
                    </el-row>
                </div>
                <div class="table">
                    ccc
                </div>
                <div class="page">

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
                data: "",
            }
        },
        methods: {

        }
    }
</script>

<style lang="scss" scoped>
.box {
    padding: 15px;
}
.sestion-2, .sestion-3 {
    margin-top: 16px;
}
</style>