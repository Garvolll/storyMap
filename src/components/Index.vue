<template>
    <div class="index">
        <GMap @getMarkerList="getMarkerList"></GMap>
        <!-- <VMap @getMarkerList="getMarkerList"></VMap> -->
        <Ground :markerList="markerList"></Ground>
    </div>
</template>

<script>
import GMap from './Map'
// import VMap from './VMap'
import Ground from './Ground'

export default {
    name: 'Index',
    data() {
        return {
            markerList: []
        }
    },
    methods: {
        getMarkerList(markerList) {
            this.markerList = markerList
        }
    },
    components: {
        GMap,
        Ground,
        // VMap
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .index{
        display: flex;
        width: 1960px;
        /* height: */
    }
</style>
