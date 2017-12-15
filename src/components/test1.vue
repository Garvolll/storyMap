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

        AMapUI.loadUI(['misc/PoiPicker'], function(PoiPicker) {

            var map = new AMap.Map('map', {
                zoom: 16,
                resizeEnable: true,
                scrollWheel: true
            })

            var poiPicker = new PoiPicker({
                input: 'keyword' //输入框id
            });
            //监听poi选中信息
            poiPicker.on('poiPicked', function(poiResult) {
                //用户选中的poi点信息
                console.log(poiResult)
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
