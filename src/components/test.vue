<template>
    <div class="test">
        <div id="map" style="width:100%;height:100%;"></div>
        <div class="kw-container">
            <input type="text" id="keyword">
        </div>

    </div>
</template>

<script>
import AMap from 'AMap'
export default {
    data() {
        return {

        }
    },
    mounted() {
        // var map = new AMap.Map('map', {
        //     // mapStyle: 'amap://styles/f55e6c52149700def688e88d2fa2ed67',//样式URL
        //     // layers: [new AMap.TileLayer.Satellite()],
        //     mapStyle: 'amap://styles/dabfed942846f7dd21f29db8d6474128',//样式URL
        //     resizeEnable: true,
        //     zoom: 5,
        //     center: [116.480983, 40.0958]
        // });
        // AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], function() {
        //     var autoOptions = {
        //         city: "北京", //城市，默认全国
        //         input: "keyword"//使用联想输入的input的id
        //     };
        //     var autocomplete = new AMap.Autocomplete(autoOptions);
        //     var placeSearch = new AMap.PlaceSearch({
        //         city: '北京',
        //         map: map
        //     });
        //     AMap.event.addListener(autocomplete, "select", function(e) {
        //         //TODO 针对选中的poi实现自己的功能
        //         placeSearch.search(e.poi.name)
        //         console.log(e.poi)
        //     });
        // });

        AMapUI.loadUI(['misc/PositionPicker'], function(PositionPicker) {

            var map = new AMap.Map('map', {
                zoom: 16,
                resizeEnable: true,
                scrollWheel: true
            })

            /* 拖拽选址 */
            var positionPicker = new PositionPicker({
                mode: 'dragMap',
                map: map
            });
            console.log(positionPicker)
            positionPicker.on('success', function(positionResult) {
                // console.log(positionResult)
            });
            positionPicker.on('fail', function(positionResult) {

            });
            positionPicker.setMode('dragMarker')
            positionPicker.start(map.getBounds().getSouthWest())    //起始位当前地址信息


            /* 搜索建议 */
            AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch','AMap.ToolBar', 'AMap.Scale'], function() {
                /*缩放和toolbar*/
                map.addControl(new AMap.ToolBar());

                map.addControl(new AMap.Scale());


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
                    positionPicker.start(e.poi.location)
                });
            });


        });
    },
    methods: {
    },
    components: {

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.test {
    width: 100%;
    height: 100%;
    position: relative;
}

.kw-container {
    position: absolute;
    top: 10px;
    left: 50px;
}

.kw-container input {
    background: #fff;
}
</style>
