<template>
    <div class="map">
        <div id="container" style="width:960px; height:600px"></div>
    </div>
</template>

<script>
import AMap from 'AMap'

function addMarker(position, map) {
    var marker = new AMap.Marker({
        icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
        position: [position[0], position[1]]
    });
    marker.setMap(map);
}

function zoomend(site) {                 //缩放结束事件
    // const lat = this.getCenter().lat
    // const lng = this.getCenter().lng
    let southWest = this.getBounds().southwest
    let northeast = this.getBounds().northeast
    southWest = AMap.LngLat(southWest.lng, southWest.lat)
    northeast = AMap.LngLat(northeast.lng, northeast.lat)

    const rangeBounds = AMap.Bounds(southWest, northeast)
    site.filter(item => {
        const LngLat = AMap.LngLat(item[0], item[1])
        return rangeBounds.contains(LngLat) == true
    })
}

function filterSite() {

}

export default {
    name: 'map',
    mounted() {
        var map = new AMap.Map('container', {
            mapStyle: 'amap://styles/f55e6c52149700def688e88d2fa2ed67',//样式URL
            resizeEnable: true,
            zoom: 10,
            center: [116.480983, 40.0958]
        });
        AMap.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.OverView'],
            function() {
                map.addControl(new AMap.ToolBar());

                map.addControl(new AMap.Scale());

                map.addControl(new AMap.OverView({ isOpen: true }));
            });
        this.site.map(item => {
            addMarker(item, map)
        })
        this.map = map
        //缩放结束事件
        AMap.event.addListener(map, "zoomend", this.zoomend)
    },
    methods: {
        zoomend(site) {                 //缩放结束事件
            // const lat = this.getCenter().lat
            // const lng = this.getCenter().lng
            let southWest = this.map.getBounds().southwest
            let northeast = this.map.getBounds().northeast
            let southWestLngLat = AMap.LngLat(southWest.lng, southWest.lat)
            let northeastLngLat = AMap.LngLat(northeast.lng, northeast.lat)
             console.log(southWestLngLat, southWestLngLat)
             
            let rangeBounds = AMap.Bounds(southWestLngLat, northeastLngLat)
            this.site.filter(item => {
                const LngLat = AMap.LngLat(item[0], item[1])
                return rangeBounds.contains(LngLat) == true
            })
        }
    },
    data() {
        return {
            site: [
                [116.397026, 39.918058],
                [116.410886, 39.881949],
                [116.272876, 39.99243],
                [116.544079, 40.417555],
                [116.225404, 40.258186],
                [116.38631, 39.937209],
                [116.399466, 39.989743],
                [117.191793, 39.143963],
                [109.808445, 39.362477],
                [123.129956, 41.009048],
                [126.26419, 48.695807],
                [121.721734, 31.055223],
                [118.463177, 31.358881],
                [117.101925, 26.863692],
                [120.696981, 31.310736],
                [120.238415, 31.484502],
                [118.596987, 24.94119],
                [120.752564, 37.825461],
                [114.341092, 34.808158],
                [111.075583, 32.479574],
                [114.378932, 31.101349],
                [112.715395, 27.269401],
                [107.127392, 29.049247],
                [105.564612, 32.218673],
                [105.978899, 31.570974]
            ]
        }
    }
}
</script>

<style scoped>

</style>
