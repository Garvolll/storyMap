<template>
    <div class="index">
        <GMap @getMarkerList="getMarkerList"  @markerClick="markerClick" :showInfoItem="showInfoItem" ref="map"></GMap>
        <Ground ref="ground" :markerList="markerList" :createEventShow="createEventShow" @getshowInfoItem="getshowInfoItem" @getshowInfoItemMouseOut="getshowInfoItemMouseOut"></Ground>
    </div>
    
</template>

<script>
import GMap from './Map'
import Ground from './Ground'

export default {
    name: 'Index',
    data() {
        return {
            markerList: [],
            showInfoItem:{}
        }
    },
    props:['createEventShow'],
    methods: {
        getMarkerList(markerList) {
            this.markerList = markerList
        },
        getshowInfoItem(showInfoItem){
            this.showInfoItem = showInfoItem
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
        padding: 60px 0 0;
    }
</style>
