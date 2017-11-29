<template>
    <!-- <div id="storymap" style="position:relative;"> -->
    <div id="container" style="width:60%;height:100%;"></div>
    <!-- </div> -->
</template>

<script>
import {
    mapActions
} from 'vuex'

import AMap from 'AMap'
var _renderCluserMarker = function(context) {
    var factor = Math.pow(context.count / count, 1 / 18)
    var div = document.createElement('div');
    var Hue = 180 - factor * 180;
    var bgColor = 'hsla(' + Hue + ',100%,50%,0.7)';
    var fontColor = 'hsla(' + Hue + ',100%,20%,1)';
    var borderColor = 'hsla(' + Hue + ',100%,40%,1)';
    var shadowColor = 'hsla(' + Hue + ',100%,50%,1)';
    div.style.backgroundColor = bgColor
    var size = Math.round(30 + Math.pow(context.count / count, 1 / 5) * 20);
    div.style.width = div.style.height = size + 'px';
    div.style.border = 'solid 1px ' + borderColor;
    div.style.borderRadius = size / 2 + 'px';
    div.style.boxShadow = '0 0 1px ' + shadowColor;
    div.innerHTML = context.count;
    div.style.lineHeight = size + 'px';
    div.style.color = fontColor;
    div.style.fontSize = '14px';
    div.style.textAlign = 'center';
    context.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2));
    context.marker.setContent(div)
}
export default {
    name: 'map',
    props: ['showInfoItem'],
    mounted() {

        this.formattSiteArray = this.formattSite()

        this.infoWindow = new AMap.InfoWindow();
        var map = new AMap.Map('container', {
            mapStyle: 'amap://styles/f55e6c52149700def688e88d2fa2ed67',//样式URL
            resizeEnable: true,
            zoom: 5,
            center: [116.480983, 40.0958]
        });
        this.zoom = 5
        AMap.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.MarkerClusterer'],
            function() {
                map.addControl(new AMap.ToolBar());

                map.addControl(new AMap.Scale());

                map.addControl(new AMap.MarkerClusterer());
            });

        this.setCircle(map)
        this.addCityMarker(map)
        // this.addMarker(map)
        // this.addCluster(2)
        map.setFitView();

        this.map = map

        this.getMarkerList()
        //缩放结束事件
        AMap.event.addListener(map, "zoomend", this.zoomend)
        //缩放比例变化事件
        AMap.event.addListener(map, "zoomchange", this.zoomchange)
        //地图平移时触发事件
        AMap.event.addListener(map, "moveend", this.moveend)
        //停止拖拽地图时触发
        AMap.event.addListener(map, "dragend", this.dragend)
        //停止拖拽地图时触发
        AMap.event.addListener(map, "resize", this.resize)
    },
    methods: {
        ...mapActions([
            'changeActiveSite'
        ]),
        formattSite() {
            return this.site.reduce((p, v, i) => {
                p[v.id] = v
                return p
            }, {})
        },
        addCluster() {
            if (cluster) {
                cluster.setMap(null);
            }
            if (tag == 1) {
                var sts = [{ url: "js_1.png", size: new AMap.Size(32, 32), offset: new AMap.Pixel(-16, -30) },
                { url: "js_2.png", size: new AMap.Size(32, 32), offset: new AMap.Pixel(-16, -30) },
                { url: "js_3.png", size: new AMap.Size(48, 48), offset: new AMap.Pixel(-24, -45), textColor: '#CC0066' }];
                this.map.plugin(["AMap.MarkerClusterer"], function() {
                    cluster = new AMap.MarkerClusterer(this.map, this.markers, { styles: sts });
                });
            }
            else {
                this.map.plugin(["AMap.MarkerClusterer"], function() {
                    cluster = new AMap.MarkerClusterer(this.map, this.markers);
                });
            }
        },
        setCircle(map) {
            this.cities.forEach(item => {
                const lng = Number(item.location.split(",")[0])
                const lat = Number(item.location.split(",")[1])
                var circle = new AMap.Circle({
                    center: [lng, lat],
                    radius: (350000 / this.zoom) * item.count,
                    fillOpacity: 0.1,
                    fillColor: '#09f',
                    strokeColor: '#09f',
                    strokeWeight: 1
                })
                circle.setMap(map);
                circle.on('click', this.circleClick);
            })
        },
        addCityMarker(map) {
            window.AMapUI.loadUI(['overlay/SimpleMarker'], function(SimpleMarker) {
                this.cities.map(item => {
                    const lng = Number(item.location.split(",")[0])
                    const lat = Number(item.location.split(",")[1])
                    //创建SimpleMarker实例
                    new SimpleMarker({
                        //前景文字
                        iconLabel: item.count + '',
                        //图标主题
                        iconTheme: 'default',
                        //背景图标样式
                        /*iconStyle: {
                            // backgroundColor: 'transparent',
                            //margin: "auto"
                        },*/
                        //...其他Marker选项...，不包括content
                        map: map,
                        position: [lng, lat]
                    });
                })
            }.bind(this));
        },
        addMarker(map) {          //初始化设置marker
            this.site.map(item => {
                var marker = new AMap.Marker({
                    icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
                    position: [item.lng, item.lat],
                });
                marker.setMap(this.map);
                marker.content = item.id
                marker.on('click', this.markerClick);
                this.marker.push(marker)
            })

            // this.map.setFitView();
        },
        circleClick(e) {
            console.log(arguments)
            const center = e.target.F.center
            this.map.setZoomAndCenter(7, [center.lng, center.lat]);
        },
        markerClick(e) {
            // this.infoWindow.setContent(e.target.content);
            // this.infoWindow.open(this.map, e.target.getPosition());
            // const position = {
            //     lat:e.target.F.position.lat,
            //     lng:e.target.F.position.lng
            // }
            // this.changeActiveSite(e.target.content)
            this.$emit('markerClick', this.formattSiteArray[e.target.content])
        },
        showInfo(showInfoItem) {            //hover右边广场的item显示标注的info框
            AMapUI.loadUI(['overlay/SimpleInfoWindow'], function(SimpleInfoWindow) {
                var infoWindow = new SimpleInfoWindow({
                    infoTitle: '<strong>这里是标题</strong>',
                    infoBody: `<p>${showInfoItem.city + showInfoItem.img}</p>`
                });
                //显示在map上
                infoWindow.open(this.map, [showInfoItem.lng, showInfoItem.lat]);
            }.bind(this));
        },
        getMarkerList() {           //得到当前地图显示范围内的marker，讲这些marker对应的site数组返回给父组件
            let southWest = this.map.getBounds().southwest
            let northeast = this.map.getBounds().northeast

            let southWestLngLat = new AMap.LngLat(southWest.lng, southWest.lat) //西南角
            let northeastLngLat = new AMap.LngLat(northeast.lng, northeast.lat) //东北角
            let rangeBounds = new AMap.Bounds(southWestLngLat, northeastLngLat)

            const markerList = this.site.filter(item => {
                const LngLat = new AMap.LngLat(item.lng, item.lat)
                return rangeBounds.contains(LngLat) == true     //利用contains()判断点是否在当前地图显示范围内
            })
            this.markerList = markerList
            this.$emit('getMarkerList', this.markerList)
        },
        zoomend() {
            this.getMarkerList()
        },
        zoomchange() {
            this.getMarkerList()
            const zoom = this.map.getZoom()
            if (zoom >= 6) {
                this.map.clearMap()
                this.addMarker()
            } else {
                this.map.clearMap()
                this.setCircle(this.map)
                this.addCityMarker(this.map)
            }
        },
        moveend() {
            this.getMarkerList()
        },
        dragend() {
            this.getMarkerList()
        },
        resize() {
            this.getMarkerList()
        }
    },
    data() {
        return {
            markerList: [],
            map: {},
            marker:[],
            cities: [{
                "formatted_address": "湖北省宜昌市",
                "province": "湖北省",
                "citycode": "0717",
                "city": "宜昌市",
                "district": [],
                "township": [],
                "neighborhood": {
                    "name": [],
                    "type": []
                },
                "building": {
                    "name": [],
                    "type": []
                },
                "adcode": "420500",
                "street": [],
                "number": [],
                "location": "111.286471,30.691967",
                "level": "市",
                "count": 1
            }, {
                "formatted_address": "湖北省武汉市",
                "province": "湖北省",
                "citycode": "027",
                "city": "武汉市",
                "district": [],
                "township": [],
                "neighborhood": {
                    "name": [],
                    "type": []
                },
                "building": {
                    "name": [],
                    "type": []
                },
                "adcode": "420100",
                "street": [],
                "number": [],
                "location": "114.305392,30.593098",
                "level": "市",
                "count": 2
            }, {
                "formatted_address": "湖南省长沙市",
                "province": "湖南省",
                "citycode": "0731",
                "city": "长沙市",
                "district": [],
                "township": [],
                "neighborhood": {
                    "name": [],
                    "type": []
                },
                "building": {
                    "name": [],
                    "type": []
                },
                "adcode": "430100",
                "street": [],
                "number": [],
                "location": "112.938814,28.228209",
                "level": "市",
                "count": 2
            }, {
                "formatted_address": "广东省广州市",
                "province": "广东省",
                "citycode": "020",
                "city": "广州市",
                "district": [],
                "township": [],
                "neighborhood": {
                    "name": [],
                    "type": []
                },
                "building": {
                    "name": [],
                    "type": []
                },
                "adcode": "440100",
                "street": [],
                "number": [],
                "location": "113.264434,23.129162",
                "level": "市",
                "count": 1
            }, {
                "formatted_address": "广东省佛山市",
                "province": "广东省",
                "citycode": "0757",
                "city": "佛山市",
                "district": [],
                "township": [],
                "neighborhood": {
                    "name": [],
                    "type": []
                },
                "building": {
                    "name": [],
                    "type": []
                },
                "adcode": "440600",
                "street": [],
                "number": [],
                "location": "113.121416,23.021548",
                "level": "市",
                "count": 1
            }, {
                "formatted_address": "内蒙古自治区鄂尔多斯市",
                "province": "内蒙古自治区",
                "citycode": "0477",
                "city": "鄂尔多斯市",
                "district": [],
                "township": [],
                "neighborhood": {
                    "name": [],
                    "type": []
                },
                "building": {
                    "name": [],
                    "type": []
                },
                "adcode": "150600",
                "street": [],
                "number": [],
                "location": "109.781327,39.608266",
                "level": "市",
                "count": 2
            }, {
                "formatted_address": "辽宁省大连市",
                "province": "辽宁省",
                "citycode": "0411",
                "city": "大连市",
                "district": [],
                "township": [],
                "neighborhood": {
                    "name": [],
                    "type": []
                },
                "building": {
                    "name": [],
                    "type": []
                },
                "adcode": "210200",
                "street": [],
                "number": [],
                "location": "121.614682,38.914003",
                "level": "市",
                "count": 2
            }, {
                "formatted_address": "北京市",
                "province": "北京市",
                "citycode": "010",
                "city": "北京市",
                "district": [],
                "township": [],
                "neighborhood": {
                    "name": [],
                    "type": []
                },
                "building": {
                    "name": [],
                    "type": []
                },
                "adcode": "110000",
                "street": [],
                "number": [],
                "location": "116.407526,39.904030",
                "level": "省",
                "count": 4
            }, {
                "formatted_address": "山西省晋中市",
                "province": "山西省",
                "citycode": "0354",
                "city": "晋中市",
                "district": [],
                "township": [],
                "neighborhood": {
                    "name": [],
                    "type": []
                },
                "building": {
                    "name": [],
                    "type": []
                },
                "adcode": "140700",
                "street": [],
                "number": [],
                "location": "112.752694,37.687024",
                "level": "市",
                "count": 2
            }, {
                "formatted_address": "上海市",
                "province": "上海市",
                "citycode": "021",
                "city": "上海市",
                "district": [],
                "township": [],
                "neighborhood": {
                    "name": [],
                    "type": []
                },
                "building": {
                    "name": [],
                    "type": []
                },
                "adcode": "310000",
                "street": [],
                "number": [],
                "location": "121.473701,31.230416",
                "level": "省",
                "count": 3
            }, {
                "formatted_address": "江苏省苏州市",
                "province": "江苏省",
                "citycode": "0512",
                "city": "苏州市",
                "district": [],
                "township": [],
                "neighborhood": {
                    "name": [],
                    "type": []
                },
                "building": {
                    "name": [],
                    "type": []
                },
                "adcode": "320500",
                "street": [],
                "number": [],
                "location": "120.585315,31.298886",
                "level": "市",
                "count": 3
            }, {
                "formatted_address": "浙江省杭州市",
                "province": "浙江省",
                "citycode": "0571",
                "city": "杭州市",
                "district": [],
                "township": [],
                "neighborhood": {
                    "name": [],
                    "type": []
                },
                "building": {
                    "name": [],
                    "type": []
                },
                "adcode": "330100",
                "street": [],
                "number": [],
                "location": "120.155070,30.274084",
                "level": "市",
                "count": 1
            }, {
                "formatted_address": "河南省郑州市",
                "province": "河南省",
                "citycode": "0371",
                "city": "郑州市",
                "district": [],
                "township": [],
                "neighborhood": {
                    "name": [],
                    "type": []
                },
                "building": {
                    "name": [],
                    "type": []
                },
                "adcode": "410100",
                "street": [],
                "number": [],
                "location": "113.625368,34.746599",
                "level": "市",
                "count": 1
            }, {
                "formatted_address": "河南省洛阳市",
                "province": "河南省",
                "citycode": "0379",
                "city": "洛阳市",
                "district": [],
                "township": [],
                "neighborhood": {
                    "name": [],
                    "type": []
                },
                "building": {
                    "name": [],
                    "type": []
                },
                "adcode": "410300",
                "street": [],
                "number": [],
                "location": "112.454040,34.619682",
                "level": "市",
                "count": 2
            }, {
                "formatted_address": "河南省焦作市",
                "province": "河南省",
                "citycode": "0391",
                "city": "焦作市",
                "district": [],
                "township": [],
                "neighborhood": {
                    "name": [],
                    "type": []
                },
                "building": {
                    "name": [],
                    "type": []
                },
                "adcode": "410800",
                "street": [],
                "number": [],
                "location": "113.241823,35.215892",
                "level": "市",
                "count": 1
            }, {
                "formatted_address": "河南省安阳市",
                "province": "河南省",
                "citycode": "0372",
                "city": "安阳市",
                "district": [],
                "township": [],
                "neighborhood": {
                    "name": [],
                    "type": []
                },
                "building": {
                    "name": [],
                    "type": []
                },
                "adcode": "410500",
                "street": [],
                "number": [],
                "location": "114.392392,36.097577",
                "level": "市",
                "count": 1
            }, {
                "formatted_address": "河南省开封市",
                "province": "河南省",
                "citycode": "0378",
                "city": "开封市",
                "district": [],
                "township": [],
                "neighborhood": {
                    "name": [],
                    "type": []
                },
                "building": {
                    "name": [],
                    "type": []
                },
                "adcode": "410200",
                "street": [],
                "number": [],
                "location": "114.307581,34.797239",
                "level": "市",
                "count": 1
            }],
            site: [
                {
                    lng: 116.397026,
                    lat: 39.918058,
                    city: "北京",
                    city_code: "010",
                    img: "1.jpeg",
                    id: 1
                },
                {
                    lng: 116.410886,
                    lat: 39.881949,
                    city: "北京",
                    city_code: "010",
                    img: "2.jpeg",
                    id: 2
                },
                {
                    lng: 116.272876,
                    lat: 39.99243,
                    city: "北京",
                    city_code: "010",
                    img: "3.jpeg",
                    id: 3
                },
                {
                    lng: 116.544079,
                    lat: 40.417555,
                    city: "北京",
                    city_code: "010",
                    img: "4.jpeg",
                    id: 4
                },
                {
                    lng: 112.027271,
                    lat: 36.889614,
                    city: "晋中",
                    city_code: "0354",
                    img: "5.jpeg",
                    id: 5
                },
                {
                    lng: 112.437385,
                    lat: 37.406475,
                    city: "晋中",
                    city_code: "0354",
                    img: "6.jpeg",
                    id: 6
                },
                {
                    lng: 121.544098,
                    lat: 31.281193,
                    city: "上海",
                    city_code: "021",
                    img: "7.jpeg",
                    id: 7
                },
                {
                    lng: 121.721734,
                    lat: 31.055223,
                    city: "上海",
                    city_code: "021",
                    img: "8.jpeg",
                    id: 8
                },
                {
                    lng: 121.542492,
                    lat: 31.219134,
                    city: "上海",
                    city_code: "021",
                    img: "9.jpeg",
                    id: 9
                },
                {
                    lng: 120.696981,
                    lat: 31.310736,
                    city: "苏州",
                    city_code: "0512",
                    img: "10.jpeg",
                    id: 10
                },
                {
                    lng: 120.444477,
                    lat: 31.218901,
                    city: "苏州",
                    city_code: "0512",
                    img: "11.jpeg",
                    id: 11
                },
                {
                    lng: 120.709935,
                    lat: 31.622313,
                    city: "苏州",
                    city_code: "0512",
                    img: "12.jpeg",
                    id: 12
                },
                {
                    lng: 120.108478,
                    lat: 30.220671,
                    city: "杭州",
                    city_code: "0571",
                    img: "13.jpeg",
                    id: 13
                },
                {
                    lng: 112.955463,
                    lat: 34.51324,
                    city: "郑州",
                    city_code: "0371",
                    img: "14.jpeg",
                    id: 14
                },
                {
                    lng: 112.474528,
                    lat: 34.558938,
                    city: "洛阳",
                    city_code: "0379",
                    img: "15.jpeg",
                    id: 15
                },
                {
                    lng: 113.01049,
                    lat: 35.341152,
                    city: "焦作",
                    city_code: "0391",
                    img: "16.jpeg",
                    id: 16
                },
                {
                    lng: 114.324739,
                    lat: 36.12166,
                    city: "安阳",
                    city_code: "0372",
                    img: "17.jpeg",
                    id: 17
                },
                {
                    lng: 111.864642,
                    lat: 33.66533,
                    city: "洛阳",
                    city_code: "0379",
                    img: "18.jpeg",
                    id: 18
                },
                {
                    lng: 114.341092,
                    lat: 34.808158,
                    city: "开封",
                    city_code: "0378",
                    img: "19.jpeg",
                    id: 19
                },
                {
                    lng: 111.13872,
                    lat: 30.467556,
                    city: "宜昌",
                    city_code: "0371",
                    img: "20.jpeg",
                    id: 20
                },
                {
                    lng: 114.374276,
                    lat: 30.566815,
                    city: "武汉",
                    img: "21.jpeg",
                    id: 21
                },
                {
                    lng: 114.378932,
                    lat: 31.101349,
                    city: "武汉",
                    img: "22.jpeg",
                    id: 22
                },
                {
                    lng: 112.937047,
                    lat: 28.18284,
                    city: "长沙",
                    img: "23.jpeg",
                    id: 23
                },
                {
                    lng: 112.647585,
                    lat: 28.033786,
                    city: "长沙",
                    img: "24.jpeg",
                    id: 24
                },
                {
                    lng: 113.299513,
                    lat: 23.184124,
                    city: "广州",
                    img: "25.jpeg",
                    id: 25
                },
                {
                    lng: 112.977185,
                    lat: 22.924839,
                    city: "佛山",
                    img: "26.jpeg",
                    id: 26
                },
                {
                    lng: 109.956058,
                    lat: 40.244043,
                    city: "鄂尔多斯",
                    img: "27.jpeg",
                    id: 27
                },
                {
                    lng: 109.808445,
                    lat: 39.362477,
                    city: "鄂尔多斯",
                    img: "28.jpeg",
                    id: 27
                },
                {
                    lng: 121.6754,
                    lat: 38.871662,
                    city: "大连",
                    img: "29.jpeg",
                    id: 29
                },
                {
                    lng: 122.056085,
                    lat: 39.067339,
                    city: "大连",
                    img: "30.jpeg",
                    id: 30
                }
            ]
        }
    }
}
</script>

<style  >
#container {
    /* position: relative; */
    /* left: 0px;
    top: 0px; */
    min-height: 100%;
    width: 60%;
}

#container .amap-simple-marker-icon {
    opacity: 0;
}

#container .amap-simple-marker-label {
    top: initial;
    line-height: 1;
    bottom: -0.5em;
    text-align: center;
}
</style>
