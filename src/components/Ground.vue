<template>
    <div class="ground-list" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(255, 255, 255, 0.8)">
        <template v-if="!isDetail">
            <template v-for="item in markerList">
                <img :src="'/static/img/banner/'+item.img" alt="" :key="item[2]" style="width:200px;height:200px;border:1px solid red;" @click="handleGroundItemClick(item)">
            </template>
        </template>
        <template v-else>
            <div>
                <el-button type="primary" icon="el-icon-arrow-left"></el-button>
                <el-button type="primary" icon="el-icon-arrow-right"></el-button>
                <el-button type="primary" icon="el-icon-close" @click="handleClose"></el-button>
            </div>
            <h1>{{siteInfo.city}}</h1>
        </template>
    </div>
</template>

<script>

export default {
    name: 'Ground-list',
    props: ['markerList'],
    data() {
        return {
            loading: false,
            isDetail: false,
           
        }
    },
    methods: {
        handleGroundItemClick(item) {
            this.loading = true
            setTimeout(function() {
                this.loading = false
                this.siteInfo = item
                this.isDetail = true
            }.bind(this), 1)
        },
        handleClose() {
            this.loading = true
            setTimeout(function() {
                this.loading = false
                this.isDetail = false
            }.bind(this), 1)
        }
    }
}
</script>

<style scoped>

</style>
