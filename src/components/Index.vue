<template>
    <div class="index">
        <GMap @getMarkerList="getMarkerList"  @markerClick="markerClick" :showInfoItem="showInfoItem" ref="map"></GMap>
        <!-- <VMap @getMarkerList="getMarkerList"></VMap> -->
        <Ground ref="ground" :markerList="markerList" @getshowInfoItem="getshowInfoItem" @getshowInfoItemMouseOut="getshowInfoItemMouseOut"></Ground>
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
            markerList: [],
            showInfoItem:{}
        }
    },
    methods: {
        getMarkerList(markerList) {
            this.markerList = markerList
        },
        getshowInfoItem(showInfoItem){
            this.showInfoItem = showInfoItem
            // if(this.$refs.map.zoom>6)return
            this.$refs.map.showInfo(showInfoItem)
        },
        getshowInfoItemMouseOut(){
            this.$refs.map.map.clearInfoWindow( )
        },
        markerClick(item){
            this.$refs.ground.handleGroundItemClick(item)
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
        width: 100%;
        height:100%; 
        position: fixed;
    }
</style>
