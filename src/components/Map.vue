<template>
    <div id="container" style="width:60%;height:100%;">
        <div class="kw-container">
            <input type="text" id="keyword">
        </div>
    </div>
</template>

<script>
import {
    mapActions
} from 'vuex'

import AMap from 'AMap'

export default {
    name: 'map',
    props: ['showInfoItem'],
    mounted() {
        this.formattSiteArray = this.formattSite()
        this.infoWindow = new AMap.InfoWindow();

        AMapUI.loadUI(['misc/PositionPicker'], function(PositionPicker) {
            var map = new AMap.Map('container', {
                // mapStyle: 'amap://styles/f55e6c52149700def688e88d2fa2ed67',//样式URL
                // layers: [new AMap.TileLayer.Satellite()],
                mapStyle: 'amap://styles/dabfed942846f7dd21f29db8d6474128',//样式URL
                resizeEnable: true,
                zoom: 5,
                center: [116.480983, 40.0958]
            });
            this.zoom = 5
            AMap.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.MarkerClusterer', 'AMap.Autocomplete', 'AMap.PlaceSearch'],
                function() {
                    map.addControl(new AMap.ToolBar());

                    map.addControl(new AMap.Scale());

                    map.addControl(new AMap.MarkerClusterer());


                    /*搜索建议配置项*/
                    var autoOptions = {
                        city: "", //城市，默认全国
                        input: "keyword"//使用联想输入的input的id
                    };
                    var autocomplete = new AMap.Autocomplete(autoOptions);
                    var placeSearch = new AMap.PlaceSearch({
                        city: '',
                        map: map
                    });
                    AMap.event.addListener(autocomplete, "select", function(e) {
                        //TODO 针对选中的poi实现自己的功能
                        placeSearch.search(e.poi.name)
                        console.log(e)
                    });
                });
            this.map = map
            this.addMarker()
            this.addCluster()
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

        }.bind(this))
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
            if (this.cluster) {
                this.cluster.setMap(null);
            }
            this.cluster = new AMap.MarkerClusterer(this.map, this.markers, {
                gridSize: 80,
                renderCluserMarker: this._renderCluserMarker
            });

        },
        addMarker() {          //初始化设置marker
            this.site.map(item => {
                var marker = new AMap.Marker({
                    content: '<div style="background-color: rgb(123, 156, 16); height: 24px; width: 24px; border: 1px solid rgb(123, 156, 16); border-radius: 12px; box-shadow: rgb(123, 156, 16) 0px 0px 1px;"></div>',
                    offset: new AMap.Pixel(-15, -15),
                    position: [item.lng, item.lat],
                });
                marker.setExtData({ id: item.id })
                marker.on('click', function(e) {
                    const id = e.target.Pg.extData.id
                    const target_item = this.formattSiteArray[id]
                    this.$emit('markerClick', target_item)
                }.bind(this))
                marker.on('mouseover', function(e) {
                    const id = e.target.Pg.extData.id
                    const target_item = this.formattSiteArray[id]
                    this.showInfo(target_item)
                }.bind(this))
                this.markers.push(marker)
                this.markersCount = this.markers.length
            })

        },
        _renderCluserMarker(context) {          //自定义渲染聚合圆的样式
            var factor = Math.pow(context.count / this.markersCount, 0.8)
            var div = document.createElement('div');
            var parentDiv = document.createElement('div');
            // var Hue = 180 - factor * 90;
            var Hue = (0.20595238095238097.toFixed(4)) * 360
            var GreyLevel = 100 - ((factor * 40 + 50).toFixed(2))
            var bgColor = `hsla(${Hue},100%,${GreyLevel}%,0.9)`;
            var fontColor = 'hsla(' + Hue + ',100%,20%,1)';
            var borderColor = 'hsla(' + Hue + ',100%,40%,1)';
            var shadowColor = 'hsla(' + Hue + ',100%,50%,1)';

            div.style.backgroundColor = bgColor         //内层圆样式
            var size = Math.round(30 + Math.pow(context.count / this.markersCount, 1 / 5) * 20);
            div.style.width = div.style.height = size + 'px';
            div.style.border = 'solid 5px ' + borderColor;
            div.style.borderRadius = size / 2 + 'px';
            div.style.boxShadow = '0 0 1px ' + shadowColor;
            div.innerHTML = context.count;
            div.style.lineHeight = size - 7 + 'px';
            div.style.color = fontColor;
            div.style.color = "#fff";
            div.style.fontSize = '14px';
            div.style.textAlign = 'center';
            div.style.position = "absolute";
            div.style.top = "0";
            div.style.right = "0";
            div.style.left = "0";
            div.style.bottom = "0";
            div.style.margin = "auto";

            var parentDivBgColor = `hsla(${Hue},100%,${GreyLevel}%,0.6)`;   //外层圆样式
            parentDiv.style.backgroundColor = parentDivBgColor
            parentDiv.style.width = parentDiv.style.height = (size * 1.4) + 'px';
            parentDiv.style.border = 'solid 1px ' + borderColor;
            parentDiv.style.borderRadius = (size * 1.4) / 2 + 'px';
            parentDiv.style.boxShadow = '0 0 1px ' + shadowColor;
            parentDiv.style.lineHeight = size * 1.4 + 'px';
            parentDiv.style.position = 'relative';

            parentDiv.appendChild(div)
            context.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2));
            context.marker.setContent(parentDiv)
        },
        showInfo(showInfoItem) {            //hover右边广场的item显示标注的info框
            AMapUI.loadUI(['overlay/SimpleInfoWindow'], function(SimpleInfoWindow) {
                var infoWindow = new SimpleInfoWindow({
                    infoTitle: '<strong>这里是标题</strong>',
                    infoBody: `<p>${showInfoItem.city + showInfoItem.img}</p>`,
                    offset: new AMap.Pixel(-3, -15),
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
            markers: [],
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
    width: 100%;
    position: relative;
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
.kw-container {
    position: absolute;
    top: 10px;
    left: 50px;
    z-index:1000;
}

.kw-container input {
    background: #fff;
}
</style>
