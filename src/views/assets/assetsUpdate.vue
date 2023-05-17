<template>
    <div class="box">
        <div class="content">
            <div class="result-title">
                    <el-card>
                        <el-divider><strong><i class="el-icon-platform-eleme"></i>操作</strong></el-divider>
                        <p class="op-name">
                            <el-row :gutter="10">
                                <el-col :span="1.9" >
                                    <el-tag effect="plain"  type="success">{{ ip }}</el-tag>
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
                        <el-divider><strong><i class="el-icon-platform-eleme"></i>内容</strong></el-divider>
                        <div class="format-code">
                            <pre><code>{{ content.join('') }}</code></pre>
                        </div>
                    </el-card>
                </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "assetsUpdate",
    data () {
        return {
            curName: "",
            content: [],
            ip: "",
        }
    },
    methods: {
        print() {
            for(let i = 0; i < 20; i++){
                setTimeout(() => {
                    this.content.push("this is test data!!\n")
                }, i*1000);
            }
        },
    },
    created () {
        this.curName = this.$route.params.name;
        this.ip =  this.$route.params.ip;
        this.print();
    },
    
}
</script>

<style lang="scss" scoped>
.result-data {
    margin-top: 16px;
}
.op-name {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 16px;
}
.format-code {
    height: auto;
    text-align: justify;
    font-size: 17px;
    overflow: auto;
    color: #c3c3c3;
    background-color: #292828;
    padding: 6px 12px;
    box-sizing: border-box;
    width: auto;
    margin-top: 10px;
}
</style>
