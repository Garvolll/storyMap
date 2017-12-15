<template>
    <div class="ground-list" ref="listDiv" >

        <!-- 展示广场 !-->
        <ul class="ground-inner" ref="list" :style="{display:eventListShow?'block':'none'}">
            <template v-for="item in markerList">
                <li :key="item.img" :style="getStyle()" class="ground-item">
                    <div class="background-image lazy-image loaded" :style="{backgroundImage: `url(static/img/banner/${item.img})`}" @mouseover="handleItemMouseOver(item)" @mouseout="handleItemMouseOut" @click="handleGroundItemClick(item)">
                    </div>
                    <div class="info-card">
                        <h6>{{item.img}}</h6>
                    </div>
                </li>

            </template>

        </ul>

        <!-- 地点时间详情 !-->
        <div class="siteInfoPanel" ref="panel" :style="{display:panelShow?'block':'none'}">
            <p class="section">
                <el-button type="primary" icon="el-icon-close" @click="handleClose"></el-button>
            </p>
            <h1 style="margin:20px 0;">{{siteInfo.city}}</h1>
            <div class="desc" :style="getDescWidth()">
                <!-- <div class="media-photo" :style="{backgroundImage: `url(static/img/banner/${siteInfo.img})`}">

                                        </div> -->
                <img :src="`static/img/banner/${siteInfo.img}`" alt="" style="width:600px;">
            </div>
        </div>
        
        <!-- 创建事件表单 !-->
        <div class="create-form" ref="form" :style="{display:createEventFormShow?'block':'none'}">
            aaaa
        </div>
    </div>
</template>

<script>
import {
    mapState,
    mapActions
} from 'vuex'

export default {
    name: 'Ground-list',
    props: ['markerList'],
    data() {
        return {
            siteInfo: {}
        }
    },
    mounted() {
    },
    methods: {
        ...mapActions([
            'eventListShowEvent',
            "panelShowEvent",

        ]),
        getStyle() {
            const Wwidth = window.innerWidth
            const width = Wwidth * 0.4 / 3
            return {
                width: (width - 10 / 3) + `px`,
                height: width + 'px'
            }
        },
        getDescWidth() {
            const Wwidth = window.innerWidth
            const width = Wwidth * 0.4 - 160
            return {
                width: width + `px`,
                height: width + 'px'
            }
        },
        handleGroundItemClick(item) {
            this.panelShowEvent(true)
            this.eventListShowEvent(false)
            this.siteInfo = item
        },
        handleClose() {
            this.panelShowEvent(false)
            this.eventListShowEvent(true)
        },
        handleItemMouseOver(item) {
            this.$emit('getshowInfoItem', item)
        },
        handleItemMouseOut() {
            this.$emit('getshowInfoItemMouseOut')
        }
    },
    computed: {
        ...mapState({
            createEventFormShow: state => state.site.createEventFormShow,
            eventListShow: state => state.site.eventListShow,
            panelShow: state => state.site.panelShow,
        })
    }
}
</script>

<style scoped>
.ground-list {
    width: 40%;
    min-height: 100%;
    overflow: auto;
    position: relative;
}

.ground-inner {
    max-height: 100%;
    overflow: auto;
}

.ground-item {
    position: relative;
    float: left;
    height: 200px;
    width: 200px;
    padding: 0;
    margin: 0;
    background-color: #000;
    list-style: none;
    cursor: pointer;
    -webkit-transition: opacity 0.3s;
    -moz-transition: opacity 0.3s;
    transition: opacity 0.3s;
    color: #fff;
}

.ground-item .info-card {
    position: absolute;
    width: 100%;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
}

.ground-item .info-card h6 {
    display: block;
    display: -webkit-box;
    height: 38px;
    font-size: 14px;
    font-weight: bold;
    line-height: 1.4em;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin: 8px;
}

.loaded {
    animation: fadeIn 2s;
}

.background-image {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 0;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
}

.siteInfoPanel {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    padding: 0 80px;
}

.siteInfoPanel .section {
    text-align: right;
}

.siteInfoPanel .section .el-button--primary {
    color: black;
    background-color: #Fff;
    border-color: #ffF;
    font-size: 26px;
}

.siteInfoPanel h1 {
    text-align: center;
}

.siteInfoPanel .desc .media-photo {
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
    width: 100%;
    object-fit: cover;
}

.siteInfoPanel .desc img {
    object-fit: cover;
}
</style>
